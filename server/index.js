const path = require("path");
const express = require("express");
const app = express();
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.post("http://localhost:3001//create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://davidronnlidportfolio.netlify.app",
    cancel_url: "https://davidronnlidmovies.netlify.app",
  });

  res.redirect(303, session.url);
});

const productsData = [
  {
    title: "1 hour of Davids time",
    description:
      "David will spend one hour of his time developing whatever you want him to create.",
    id: 0,
    price: 1000,
    payment_options: ["paypal_client"],
  },
  {
    title: "Single-page static website",
    description: "Very basic static website",
    id: 1,
    price: 12200,
    payment_options: [],
  },
  {
    title: "Multiple-page static website",
    description: "Basic static website",
    id: 2,
    price: 111000,
    payment_options: [],
  },
];

let payerDetails;

app.get("/products-api", (req, res) => {
  res.json({ products: productsData });
});

app.post("/payers-api", (req, res) => {
  payerDetails = req.body;
});

app.get("/payers-api", (req, res) => {
  res.send(payerDetails);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
