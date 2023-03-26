import React, { useContext } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/pagination";
import { mainContext } from "../../Context/MainContext";

export default function CardContainer() {
  const { products } = useContext(mainContext);

  return (
    <div className="cardContainer">
      {products.map((prod) => {
        return <Card key={prod.id} prod={prod}></Card>;
      })}
      <Pagination />
    </div>
  );
}
