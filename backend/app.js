const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

//config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  express.json({
    limit: "100mb",
  })
);

//Route Imports
const product = require("./routes/productroute");
const user = require("./routes/userroute");
const order = require("./routes/orderroute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/public")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/public/index.html"));
});

//MIddleware for Errors
app.use(errorMiddleware);
// app.listen(process.env.PORT)
// {
//     console.log("hi")
// }

module.exports = app;
// const express = require("express");
// const app = express();
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
// const path = require("path");

// const errorMiddleware = require("./middleware/error");

// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// // Route Imports
// const product = require("./routes/productRoute");
// const user = require("./routes/userRoute");
// const order = require("./routes/orderroute");
// const payment = require("./routes/paymentRoute");

// app.use("/api/v1", product);
// app.use("/api/v1", user);
// app.use("/api/v1", order);
// app.use("/api/v1", payment);

// // Middleware for Errors
// app.use(errorMiddleware);

// module.exports = app;
