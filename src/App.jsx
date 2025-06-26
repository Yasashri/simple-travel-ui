import "./assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./assets/pages";
import { Navbar, Footer } from "./assets/components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
