import "./assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Login, CreateUser } from "./assets/pages";
import { Navbar, Footer } from "./assets/components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/create-user' element={<CreateUser />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
