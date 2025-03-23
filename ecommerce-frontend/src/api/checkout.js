// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const { cartItems } = req.body;

//       const lineItems = cartItems.map((item) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//             images: [item.image],
//           },
//           unit_amount: item.price * 100, // Amount in cents
//         },
//         quantity: item.quantity,
//       }));

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: "payment",
//         success_url: `${req.headers.origin}/success`,
//         cancel_url: `${req.headers.origin}/cart`,
//       });

//       res.status(200).json({ id: session.id });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
