import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import AddUser from "./components/AddUser";
import Edit from "./components/Edit";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addUser" element={<AddUser/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
