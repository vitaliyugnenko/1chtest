const request = require("request");

export default function handler(req, res) {
  if (req.method === "GET") {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${req.query.symbol}&convert=${req.query.convert}`;

    request(
      {
        url: url,
        headers: {
          "X-CMC_PRO_API_KEY": "48d81810-7c07-454d-a289-436eeb9e9743",
        },
      },
      (error, response, body) => {
        if (error) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(body);
        }
      }
    );
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
