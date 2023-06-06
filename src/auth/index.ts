import express from "express";
import jwt from "jsonwebtoken";
import { hash } from "../utils/hash";
import { database } from "../utils/database";

const router = express.Router();

const prisma = database.getDB();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await prisma.account.findFirst({
      where: {
        AND: {
          username: {
            equals: username
          },
          password: {
            equals: hash(password)
          },
        }
      },
    });
    if(data) {
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
      return res.json({
        status: {
          success: true,/*  */
          message: "Auth Success!",
        },
        token,
      });
    }
    return res.json({
      status: {
        success: false,
        message: "Auth Failed!",
      },
    });
  } catch (e) {
    return res.json({
      status: {
        success: false,
        message: "Auth Failed!",
      },
    });
  }
});

router.post("/register", async (req, res) => {
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
