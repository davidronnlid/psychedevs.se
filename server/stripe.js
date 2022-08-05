// const stripe = require("stripe")(
//   "sk_test_51LQzneA8WaavwbhwiPEtQOldwUIaUNc7udAvWVgHXRX9k8rc4YjWrk1Lsic3gtSA5lCHOnEZ98d49eDOpLFKRKcP00a4c7Kg3T"
// );const express = require("express");
// const app = express();

// const createCheckoutSession = () =>
//   app.post("/create-checkout-session", async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "T-shirt",
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "https://example.com/success",
//       cancel_url: "https://example.com/cancel",
//     });

//     res.redirect(303, session.url);
//   });

// module.exports = createCheckoutSession;
