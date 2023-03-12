function handleErrors(err, req, res, next) {
  console.log(err);
  res.status(500).send("An internal server error occurred");
}

export default handleErrors;
