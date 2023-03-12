const form = document.querySelector(".formSignup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const dataForm = {};

  data.forEach((value, key) => (dataForm[key] = value));

  const url = "/users";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });
    const data = await response.json();
    if (data.message) {
      window.location.href = "/";
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
