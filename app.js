const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const cardsRouter = require("./routes/cardsRoutes");

const app = express();

// 1) MIDDLEWARES

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/users", userRouter);
app.use("/cards", cardsRouter);
/*PUBLIC*/
app.use("/", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  /*    console.log(req.baseUrl);*/
  if (req.baseUrl !== "/users" && req.baseUrl !== "/cards") {
    return res.status(404).json({
      status: "fail",
      requestedAt: req.requestTime,
      results: "page not found",
      data: {
        message: "Запрашиваемый ресурс не найден",
      },
    });
  }
  next();
});
module.exports = app;
