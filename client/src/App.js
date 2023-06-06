import { Routes, Route, useLocation } from "react-router-dom";
import { Landing } from "./components/LandingPage/Landing";
import { Nav } from "./components/Nav/Nav";
import { Home } from "./components/Home/Home";
import { Detail } from "./components/Detail/Detail";
import { Form } from "./components/Form/Form";
function App() {

  const {pathname} = useLocation()

  return (
    <div>
      {
        pathname !== '/' && <Nav/>
      }
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/detail/:id" element={<Detail/>}></Route>
        <Route path="/form" element={<Form/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
