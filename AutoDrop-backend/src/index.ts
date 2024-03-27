import express from "express";
import("./utils/passport");
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import cors from "cors";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss";
import compression from "compression";
import { conect } from "./utils/DBConnection";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import handlerRoutes from "./routes/handler.routes";
import productsRoutes from "./routes/products.routes";
import sallaRoutes from "./routes/salla.routes";
import searchRoutes from "./routes/search.routes";
import shippingRoutes from "./routes/shipping.routes";
import settingRoute from "./routes/settings.route";
const app = express();

//Parse json bodies
app.use(express.json({ limit: '50mb' }));
//Parse cookies
app.use(cookieParser());

//Allow cors for all domains
app.use(
  cors({
    origin: "*",
    credentials: true,
  }) as any
);

//Session middleware
app.use(
  session({
    secret: process.env.secret!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      httpOnly: true,
    },
  })
);

//Initialize passport
app.use(passport.initialize());

//Use passport session
app.use(passport.session());

//Use morgan logger in the develpment
app.use(morgan("dev"));

//Set security http headers
app.use(helmet());

//Data sanitization against xss attacks
xss('<script>alert("xss");</script>');

//Compress all text sent in the response to the client
if (process.env.NODE_ENV === "production") {
  app.use(compression());
}

conect();

//Global resources
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/handler", handlerRoutes);
app.use("/api/v1/token", tokenRoutes);
app.use("/api/v1/aliexpress", productsRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/salla", sallaRoutes);
app.use("/api/v1/shipping", shippingRoutes);
app.use("/api/v1/settings", settingRoute  );

// Handle requests from wrong urls
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Using global error handling middleware
app.use(globalErrorHandler);

app.listen(10000, () => {
  console.log(`server is running `);
});
