const form = document.querySelector(".formSignup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("holaaaas maldita");
  const data = new FormData(form);
  const dataForm = {};

  data.forEach((value, key) => (dataForm[key] = value));

  const url = "http://localhost:8080/users/";
  console.log(dataForm);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
