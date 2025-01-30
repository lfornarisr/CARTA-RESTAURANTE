import server from "./server.js";
import { connectDB } from "./db.js";

const PORT = 4000;

connectDB();

server.listen(PORT);
console.log("Server listen on port", PORT);
