const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/client/build")));

const productsData = [
  {
    title: "Single-page static website",
    description: "Very basic static website",
    id: 0,
    price: 12200,
  },
  {
    title: "Multiple-page static website",
    description: "Basic static website",
    id: 1,
    price: 1100,
  },
];

app.listen(port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", port);
});

app.get("/products-api", (req, res) => {
  res.send({ products: productsData });
});
