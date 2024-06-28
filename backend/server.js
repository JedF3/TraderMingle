import express from "express";
import mongoose from "mongoose";
import workoutRoutes from "./routes/workouts.js";
import reviewRoutes from "./routes/reviews.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import listingsRouter from "./routes/listings.js";
import cors from "cors";
import helmet from "helmet";
dotenv.config();
// To handle this warning: 
// [MONGOOSE] DeprecationWarning: Mongoose: the strictQuery option will be switched back to false by default in Mongoose 7. Use mongoose.set('strictQuery', false); if you want to prepare for this change.
mongoose.set('strictQuery', false);

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  console.log(req.path, req.method, req.body);
  next();
});

// routes
app.use("/api/v1/workouts", workoutRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/listings", listingsRouter);
app.use("/api/v1/reviews", reviewRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
