import dotenv from "dotenv";
dotenv.config();

console.log("✓ dotenv.config() completed");
console.log("✓ MONGODB_URI:", process.env.MONGODB_URI ? "SET" : "NOT SET");
console.log("✓ All OK");
