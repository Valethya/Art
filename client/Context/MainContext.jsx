import { createContext, useEffect, useState } from "react";

export const mainContext = createContext();

export function MainContextProvider({ children }) {
  ///mostrar productos
  const [products, setProducts] = useState([]);
  const [dataPage, setDataPage] = useState([]);
  const [url, setUrl] = useState("http://localhost:8080/api/products");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.message.payload);
        setDataPage(data.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);

  ///carrito
  const [idProd, setIdProd] = useState(null);
  const [idCart, setIdCart] = useState("6404e70c154f3dc9e3f4fbfd");

  useEffect(() => {
    async function fetchData() {
      const url = `http://localhost:8080/api/carts/${idCart}/product/${idProd}`;
      console.log(url, "esta es la url del fetch add carrito");
      try {
        const response = await fetch(url, {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    if (idProd && idCart) {
      fetchData();
    }
  }, [idProd, idCart]);

  return (
    <mainContext.Provider
      value={{ products, dataPage, setUrl, setIdCart, setIdProd }}
    >
      {children}
    </mainContext.Provider>
  );
}
