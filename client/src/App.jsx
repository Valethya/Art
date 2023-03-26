import { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import "./assets/style/normalize.css";
import "./assets/style/main.scss";
import Header from "../components/NavBar/Header";
import CardContainer from "../components/Container/CardContainer";
import Container from "../components/Container/Container";
import Cart from "../components/Cart/Cart";
import { MainContextProvider } from "../Context/MainContext";
import LoginPage from "../Page/LoginPage";
import FramesPage from "../Page/FramesPage";
import CartPage from "../Page/CartPage";
function App() {
  return (
    <MainContextProvider>
      <Router>
        <StrictMode>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <Header />
                </>
              }
            ></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/cuadros" element={<FramesPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
          </Routes>
        </StrictMode>
      </Router>
    </MainContextProvider>
  );
}

export default App;
