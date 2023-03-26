import React from "react";
import Button from "../Button/Button";
import Input from "../Form/Inputs";

export default function Login() {
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("hola");
    const form = enevnt.target;
    const dataForm = new FormData(form);
    const url = "http://localhost:8080/auth";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      const data = await response.json();
      // localStorage.setItem("authToken", data.token);
      console.log(data);
      if (data.message) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="loginContent">
      <div className="login shadow">
        <form action="" className="formLogin">
          <h2>Login</h2>
          <Input placeholder={"Ingresa tu email aqui"} type={"email"}>
            Email
          </Input>
          <Input placeholder={"Ingresa tu contraseña aqui"} type={"password"}>
            Contraseña
          </Input>
          <Button className="btn" HandleSubmit={HandleSubmit} type="submit">
            Iniciar Sesión
          </Button>
          <a className="register" href="/signup">
            registrate
          </a>
          <a className="register" href="forgotPassword">
            Olvide la contraseña
          </a>
          <Button className="btn">
            <a href="/auth/github">
              Entrar con Github
              <img className="icon" src="/img/github.png" />
            </a>
          </Button>
          <Button className="btn">
            <a href="/auth/google">
              Entrar con Google
              <img className="icon" src="/img/google.png" />
            </a>
          </Button>
        </form>
      </div>
    </div>
  );
}
