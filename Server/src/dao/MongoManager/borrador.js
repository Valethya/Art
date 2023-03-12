// file = `${process.cwd()}/files/product.json`;

//   async createMany() {

//     if (fs.existsSync(this.file)) {
//       const data = await fs.promises.readFile(this.file);
//       const response = JSON.parse(data);

//       return response;
//     }
//     return "no se encuentra el archivo";
// }

// populate
// router.post("/", async (req, res) => {
//   try {
//     const product = await products.createMany();
//     await productsModel.insertMany(product);
//     res.json({ message: "productos cargados" });
//   } catch (error) {
//     console.log(error);
//   }
// });
