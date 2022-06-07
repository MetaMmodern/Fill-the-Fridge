import { NextApiHandler } from "next";
import { hashPassword } from "../../../lib/auth";
import { MongoClient } from "mongodb";
import { NewUserRequestDetails } from "../../../types";

// import { connectToDatabase } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password, passwordSubmit }: NewUserRequestDetails = JSON.parse(
    req.body
  );

  if (password !== passwordSubmit) {
    console.log("not equal");
    res.status(422).json({
      message: "Invalid input - passwords are not equal.",
    });
    return;
  }

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    console.log("short");

    console.log(
      [!email, !email.includes("@"), !password, password.trim().length < 7],
      !email || !email.includes("@") || !password || password.trim().length < 7
    );

    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await MongoClient.connect(
    process.env.MONGODB_URI!
    // { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    console.log("user exists");
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
};

export default handler;
