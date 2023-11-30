const express = require("express");
const globalErrorHandler = require("./utils/globalErrorHandler");
const connectDB = require("./db/connectDB");
const applyMiddleware = require("./middlewares");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require("./routes/v1/authentication");
const usersRoutes = require("./routes/v1/users");
const campsRoutes = require("./routes/v1/camps");
const upCommingCampRoutes = require("./routes/v1/UpCommingCamp");
const registerRoutes = require("./routes/v1/Joincamp");
const paymentRoutes = require("./routes/v1/payment");
const feedbackRoutes = require("./routes/v1/feedback");
const upcomingParticipantsRoutes = require("./routes/v1/upcomingParticipants");
const upcomingProfessionalRoutes = require("./routes/v1/UpcomingProfessional");

applyMiddleware(app);

app.use(authRoutes);
app.use(usersRoutes);
app.use(campsRoutes);
app.use(upCommingCampRoutes);
app.use(registerRoutes);
app.use(paymentRoutes);
app.use(feedbackRoutes);
app.use(upcomingParticipantsRoutes);
app.use(upcomingProfessionalRoutes);

app.get("/health", (req, res) => {
  res.send("medical camp management system server is running....");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

// error handling middleware
app.use(globalErrorHandler);

// const main = async () => {
//   await connectDB();
//   app.listen(port, () => {
//     console.log(
//       `medical camp management system server is running on port ${port}`
//     );
//   });
// };

// main();

module.exports = app;
