const path = require("path");
const express = require("express");
const app = express();
const bp = require("body-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const stripe = require("stripe")(process.env.SECURE_STRIPE_TEST_API_KEY);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../client/build")));

const productsData = [
  {
    title: "1 hour of Davids time",
    description:
      "David will spend one hour of his time developing whatever you want him to create.",
    id: 0,
    PRICE_ID: process.env.PRICE_ID_0,
    price: 1000,
    payment_options: ["paypal_client"],
  },
  {
    title: "Single-page static website",
    description: "Very basic static website",
    id: 1,
    PRICE_ID: process.env.PRICE_ID_1,
    price: 12200,
    payment_options: [],
  },
  {
    title: "Test product",
    description:
      "Buy this product to test Davids stripe integration actually works but without it costing you a lot of money",
    id: 2,
    PRICE_ID: process.env.PRICE_ID_2,
    price: 3,
    payment_options: [],
  },
];

let data;
let PRICE_IDs = [];

app.post("/new-api", (req, res) => {
  data = req.body;

  data.cartIds.forEach((id) =>
    productsData.forEach((obj) =>
      obj.id === id
        ? PRICE_IDs.push(obj.PRICE_ID)
        : console.log("No matching product was found")
    )
  );
  // PRICE_IDs is now a list of stripe price ids for the products the user added to the cart and is now attempting to go to checkout with
});

app.get("/new-api", (req, res) => {
  res.send(PRICE_IDs);
});

// Define function that takes PRICE_IDs and returns line_item obj with adequate price_ID and quantity

let line_items = [];

const line_items_generator = (PRICE_IDs) => {
  PRICE_IDs.forEach((PRICE_ID, idx) =>
    line_items.length === 0
      ? line_items.push({
          price: PRICE_ID,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 40,
          },
          quantity: 1,
        }) &&
        console.log(
          "1This is the " + idx + "th PRICE_ID: " + PRICE_ID,
          "and these are the line_items currently in line_items: ",
          line_items
        )
      : line_items.forEach((line_item) =>
          line_item.price === PRICE_ID
            ? (line_item.quantity += 1)
            : console.log(line_item, PRICE_ID) &&
              line_items.push({
                price: PRICE_ID,
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
                  maximum: 40,
                },
                quantity: 1,
              })
        ) &&
        console.log(
          "2This is the " + idx + "th PRICE_ID: " + PRICE_ID,
          "and these are the line_items currently in line_items: ",
          line_items
        )
  );

  return line_items;
};

app.post("/create-checkout-session", async (req, res) => {
  line_items_generator(PRICE_IDs);

  console.log(line_items, "j", line_items_generator(PRICE_IDs));

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: "http://localhost:3001/success",
    cancel_url: "http://localhost:3001/canceled",
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
});

app.get("/products-api", (req, res) => {
  res.json({ products: productsData });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
