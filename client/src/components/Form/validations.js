const validations = (data) => {
    let errors = {};
  
    if (!data.title || data.title.trim().length === 0) {
      errors.name = 'Please complete with a recipe name';
    }
    if (!data.summary || data.summary.trim().length === 0) {
      errors.summary = 'Please add some comments about your recipe';
    }
    if (data.healthScore < 1 || data.healthScore > 100) {
      errors.healthScore = 'The score must be a number between 1 and 100';
    }
    if (!data.steps || data.steps.trim().length === 0) {
      errors.steps = 'Please detail the steps for your recipe';
    }
    if (data.diets.length === 0) {
      errors.diets = 'You must select at least one diet type';
    }
  
    return errors;
  };
  

export default validations;