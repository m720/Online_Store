import express from "express";
import productRoutes from "./handlers/products";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";
import bodyParser from "body-parser";

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
app.use(urlencodedParser);
app.use(jsonParser);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use(
  "/",
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    res.status(200).json({ name: "hello" });
    res.end();
  }
);

app.listen(3000);
console.log("app is running on http://localhost:3000");

export default app;
