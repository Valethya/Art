import React, { useContext } from "react";
import { mainContext } from "../../Context/MainContext";
import Button from "../Button/Button";

export default function Card({ prod }) {
  const { setIdProd } = useContext(mainContext);

  function addProduct() {
    setIdProd(prod.id);
  }
  return (
    <div className="card ">
      <div className="contentCard">
        <div className="contentImg">
          <img src={prod.thumbnail}></img>
        </div>

        <div>
          <div className="cardTitle">
            <h4>{prod.title}</h4>
          </div>
          <span>$ {prod.price}</span>

          <Button handleClick={addProduct}>Agregar</Button>
        </div>
      </div>
    </div>
  );
}
