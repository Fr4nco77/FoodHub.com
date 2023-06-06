import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validations from './validations';
import { addDiets, createRecipe } from '../../redux/actions';
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const diets = useSelector(state => state.diets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ errors, setErrors ] = useState({});
  const [recipeData, setRecipeData] = useState({
    title: '',
    image: undefined,
    summary: '',
    healthScore: 0,
    steps: '',
    diets: [],
  });
  const [ submit, setSubmit ] = useState(false);

  useEffect(() => {
    if(!diets) {
      dispatch(addDiets());
    }
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRecipeData({
      ...recipeData,
      [name]: value,
    });

    setErrors(validations({
      ...recipeData,
      [name]: value
    }))
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRecipeData((prevData) => ({
        ...prevData,
        diets: [...prevData.diets, value],
      }));
    } else {
      setRecipeData((prevData) => ({
        ...prevData,
        diets: prevData.diets.filter((diet) => diet !== value),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const requiredFields = ['title', 'summary', 'steps'];
    const hasEmptyFields = requiredFields.some((field) => !recipeData[field]);

    if(Object.values(errors).length === 0 && !hasEmptyFields) {

      if(!recipeData.image || recipeData.image.trim().length === 0) {
        recipeData.image = "https://definicion.de/wp-content/uploads/2022/08/figuras-geometricas.png";
      }
      dispatch(createRecipe(recipeData));
      alert("Recipe Created Successfully");
      navigate("/home");

    }else {
      setSubmit(true);
      alert("The Request Has Problems");
    }
  };


  return (
    <div id={styles.container}>
      <form id={styles.form} onSubmit={handleSubmit}>
        <div id={styles.top}>
          <div id={styles.left}>
            <label htmlFor="input1">Name:</label>
            <input type="text" id="input1" name="title" value={recipeData.title} onChange={handleInputChange}/>
            {errors.name && submit ? <p>{errors.name}</p> : ""}
            
            <label htmlFor="input2">Health Score:</label>
            <input type="number" id="input2" name="healthScore" value={recipeData.healthScore} onChange={handleInputChange}/>
            {errors.healthScore && submit ? <p>{errors.healthScore}</p> : ""}
            
            <label htmlFor="input3">Summary:</label>
            <textarea id="input3" name="summary" value={recipeData.summary} onChange={handleInputChange}/>
            {errors.summary && submit ? <p>{errors.summary}</p> : ""}
            
            <label>Diets:</label>
            <div id={styles.diets}>
              {
                diets?.map((diet, index) => (
                  <label key={index}>
                      {diet.name.toUpperCase()}
                      <input type="checkbox" name={diet.name} value={diet.name} checked={recipeData.diets.includes(diet.name)} onChange={handleCheckboxChange}/>
                  </label>
                ))
              }
            </div>
            {errors.diets && submit ? <p>{errors.diets}</p> : ""}
          </div>
          <div id={styles.right}>
            <label htmlFor="input8">Image:</label>
            <input type="text" id="input8" name="image" value={recipeData.image} onChange={handleInputChange}/>
            <img src={recipeData.image}/>
          </div>
        </div>
        <div id={styles.bottom}>
          <label htmlFor="input9">Steps:</label>
          <textarea id="input9" name="steps" value={recipeData.steps} onChange={handleInputChange}/>
          {errors.steps && submit ? <p>{errors.steps}</p> : ""}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  );
};

export default Form;
