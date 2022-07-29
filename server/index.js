const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

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

app.get("/api", (req, res) => {
  res.json({ products: productsData });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
