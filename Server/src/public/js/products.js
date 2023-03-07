const cardContainer = document.querySelector(".cardContainer");

cardContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("add")) {
    const idProd = e.target.getAttribute("data-id");
    const idCart = "6404e70c154f3dc9e3f4fbfd";

    const url = `http://localhost:8080/api/carts/${idCart}/product/${idProd}`;
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
});
