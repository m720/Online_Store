import express from "express";
import bookRouts from "./handlers/books";
import productRoutes from "./handlers/products";
import bodyParser from "body-parser";

const app = express();
const urlencodedParser =bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
app.use(urlencodedParser);
app.use(jsonParser);
app.use('/books', bookRouts);
app.use('/products', productRoutes)

app.listen(3000);
console.log("app is running on http://localhost:3000");
