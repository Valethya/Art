import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import "./assets/style/normalize.css";
import "./assets/style/main.scss";
import Header from "../components/NavBar/Header";
import CardContainer from "../components/Container/CardContainer";
import Container from "../components/Container/Container";
function App() {
  return (
    <Router>
      <NavBar />

      <StrictMode>
        <Routes>
          <Route path="/home" element={<Header />}></Route>
          <Route path="/cuadros" element={<Container />}></Route>
          <Route path="" element={<></>}></Route>
        </Routes>
      </StrictMode>
    </Router>
  );
}

export default App;
