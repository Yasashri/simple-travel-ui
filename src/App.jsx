import "./assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  CreateUser,
  Hotels,
  Flights,
  Vehicles,
  Admin,
} from "./assets/pages";
import { Navbar, Footer } from "./assets/components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/create-user' element={<CreateUser />}></Route>
        <Route path='/flights' element={<Flights />}></Route>
        <Route path='/hotels' element={<Hotels />}></Route>
        <Route path='/vehicles' element={<Vehicles />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
