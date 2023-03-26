import { useContext, useEffect, useState } from "react";
import { mainContext } from "../../Context/MainContext";

function Pagination() {
  const { dataPage, setUrl } = useContext(mainContext);

  function handleNextLink() {
    console.log(dataPage.nextLink);
    setUrl(dataPage.nextLink);
  }
  function handlePrevLink() {
    console.log(dataPage.prevLink);
    setUrl(dataPage.prevLink);
  }
  return (
    <div className="pagination">
      <ul className="pagination">
        <li onClick={handlePrevLink}>{"<<"} antes</li>
        <li>{dataPage.page}</li>
        <li onClick={handleNextLink}>siguiente {">>"}</li>
      </ul>
    </div>
  );
}
export default Pagination;
