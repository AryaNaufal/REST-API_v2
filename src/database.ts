import express from "express";
import { database } from "./utils/database";
import { hash } from "./utils/hash";

const router = express.Router();

const prisma = database.getDB();

router.get("/getUsers", async (req, res) => {
  const getUsers = await prisma.account.findMany()

  // console.log(getUsers);
  
  return res.status(200).send(getUsers)
})

router.post("/addUsers", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const data = await prisma.account.create({
      data: {
        email: email,
        password: hash(password),
        username: username,
      },
    });
    return res.json({
      success: {
        success: true,
        message: "User created!",
      },
      data,
    });
  } catch (e) {
    return res.json({
      success: {
        success: false,
        message: "Email / Username already exist!",
      },
    });
  }
});

export default router;
