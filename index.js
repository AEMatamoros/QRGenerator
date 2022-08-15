const QRCode = require("qrcode");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.get("/", (req, res) => {
  res.status(200).send("Welcome to code Generator API");
});

app.post("/", (req, res) => {
  try {
    QRCode.toDataURL(req.body.data)
      .then((url) => {
        res.status(201).json({ msg: "qrcodeGeerated", url });
      })
      .catch((err) => {
        res.status(400).json({
          msg: "Ocurrio un error al generar el codigo QR img en base64 invalida",
        });
      });
  } catch (error) {
    res
      .status(400)
      .json({
        msg: "Ocurrio un error al generar el codigo QR, asegurate de enviar el codigo qr {data:string}",
      });
  }
});

app.listen(8080, (req, res) => {
  console.log("App on port 8080");
});
