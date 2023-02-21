import React from "react";
import { useEffect, useState } from "react";
import magritte from "../../src/assets/img/beautifulWorld.jpeg";
import Button from "../Button/Button";

const products = [
  {
    title: "Mountains",
    description:
      "Philosophy against deceptions ascetic superiority reason merciful oneself deceptions convictions superiority. Intentions play decrepit derive right against dead christian morality.",
    price: 8000,
    thumbnail:
      "https://images.unsplash.com/photo-1522932753915-9ee97e43e3d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Depths god.",
    description:
      "Insofar aversion dead play spirit joy oneself prejudice. Burying reason spirit endless prejudice insofar christianity burying. Abstract sexuality salvation decieve.",
    price: 65000,
    thumbnail:
      "https://images.unsplash.com/photo-1487260211189-670c54da558d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stock: 30,
    status: true,
    category: "algo",
  },
  {
    title: "Endless strong.",
    description:
      "Faith faith madness reason dead chaos. Burying intentions ubermensch evil reason. Decrepit decieve mountains ultimate faithful spirit insofar philosophy right",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1516527547813-14b9fc6e7f28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Hope ultimate.",
    description:
      "Mountains ubermensch abstract pinnacle madness superiority joy grandeur gains eternal-return self morality decieve chaos. Faith play battle horror moral endless.",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1464423163665-75e82891f301?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Abstract gains",
    description:
      "Dead value value selfish merciful depths transvaluation holiest contradict deceptions insofar free snare. Mountains abstract truth derive eternal-return suicide will.",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1512168203104-3910bc2bcd54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Ideal enlightenment",
    description:
      "Victorious justice sea inexpedient of. Fearful inexpedient mountains aversion enlightenment of ultimate deceptions insofar play. Morality battle passion chaos revaluation",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1507608443039-bfde4fbcd142?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Value decrepit",
    description:
      "Transvaluation ocean ultimate hatred ubermensch prejudice holiest gains. Grandeur mountains disgust ultimate god contradict hatred war decieve self. Against reason.",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Free morality",
    description:
      "Against insofar noble holiest selfish moral decieve sea gains good pinnacle. Gains snare aversion insofar pinnacle passion. Christian pious suicide",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1512119587817-57d771d650c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Love depths",
    description:
      "Strong ultimate ocean zarathustra grandeur against morality burying battle. Intentions revaluation endless ultimate virtues overcome god",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1517321503770-4b74853a4a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Virtues convictions",
    description:
      "Hatred burying reason faith society noble. Aversion joy moral fearful fearful joy ultimate ultimate war decrepit. Love good passion god.",
    price: 6000,
    thumbnail:
      "https://images.unsplash.com/photo-1534670355609-1812bf4f3873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    stock: 40,
    status: true,
    category: "algo",
  },
  {
    title: "Passion morality",
    description:
      "Self contradict hope reason victorious. Reason will madness hatred oneself will. Self enlightenment evil derive ultimate value philosophy evil disgust",
    price: 900,
    thumbnail:
      "https://images.unsplash.com/photo-1599231091894-fd1d585e5d51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    stock: 1,
    status: true,
    category: "algo",
  },
];

export default function Card() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setData(data.payload);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return data.map((prod) => {
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

            <Button>Agregar</Button>
          </div>
        </div>
      </div>
    );
  });
}
