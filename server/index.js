const path = require("path");
const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.SECURE_STRIPE_TEST_API_KEY);

const PORT = process.env.PORT || 3001;
const bp = require("body-parser");
app.use(express.static(path.resolve(__dirname, "../client/build")));

const fulfillOrder = (session) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: session.customer_details.email,
    subject:
      session.customer_details.name + "! Här kommer info om PsycheDevs E-bok",
    text: "PsycheDevs E-bok är inte riktig färdig än, men du är tillagd på listan av personer som kommer att få den i sin inkorg direkt när den är klar i januari 2023! Med vänliga hälsningar, /David och Johan från PsycheDevs",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log(info);
  });

  console.log("Fulfilling order", session);
};

app.post("/webhook", bp.raw({ type: "application/json" }), (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.ENDPOINT_SECRET
    );
  } catch (err) {
    return (
      console.log(err.message) &&
      res.status(400).send(`Webhook Error: ${err.message}`)
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Fulfill the purchase...
    fulfillOrder(session);
  }

  res.status(200);
});

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const productsData = [
  {
    title: "PsycheDevs E-bok",
    description: "Förbeställ (släpps januari 2023)",
    id: 0,
    PRICE_ID: process.env.PRICE_ID_0,
    price: 99,
  },
];

let data;
let PRICE_IDs = [];

let line_items = [];

const line_items_generator = (PRICE_IDs) => {
  PRICE_IDs.forEach((PRICE_ID) =>
    line_items.length === 0
      ? line_items.push({
          price: PRICE_ID,
          quantity: 1,
        })
      : line_items.forEach((line_item) =>
          line_item.price === PRICE_ID
            ? (line_item.quantity += 1)
            : (line_items = [
                ...line_items,
                {
                  price: PRICE_ID,

                  quantity: 1,
                },
              ])
        )
  );
};

app.post("/new-api", (req, res) => {
  data = req.body;

  console.log(data);

  data.cartIds.forEach((id) =>
    productsData.forEach((obj) =>
      obj.id === id
        ? (PRICE_IDs = [...PRICE_IDs, obj.PRICE_ID])
        : console.log("No matching product was found")
    )
  );
  // PRICE_IDs is now a list of stripe price ids for the products the user added to the cart and is now attempting to go to checkout with
});

app.get("/new-api", (req, res) => {
  res.send(PRICE_IDs, line_items, line_items_generator(PRICE_IDs));
});

// Define function that takes PRICE_IDs and returns line_item obj with adequate price_ID and quantity

app.post("/create-checkout-session", async (req, res) => {
  line_items_generator(PRICE_IDs);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.PRICE_ID_0,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
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
