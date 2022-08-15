const QRCode = require("qrcode");
const express = require("express");
let cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes

app.get("/", (req, res) => {
  res.status(200).send("Welcome to code Generator API");
});

app.post("/", (req, res) => {
  try {
    QRCode.toDataURL(req.body.data.replace(/\\+/g, "\\"))
      .then((url) => {
        res.status(201).json({ msg: "qrcodeGeerated", url });
      })
      .catch((err) => {
        res.status(400).json({
          msg: "Ocurrio un error al generar el codigo QR img en base64 invalida",
        });
      });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrio un error al generar el codigo QR, asegurate de enviar el codigo qr {data:string}",
    });
  }
});

app.listen(8080, (req, res) => {
  console.log("App on port 8080");
});

module.exports = app;

// git config --global --unset user.name
// git config --global --unset user.email

// git config user.name "Christian Contribution Project"
// git config user.email "christian@personalemail.com"
