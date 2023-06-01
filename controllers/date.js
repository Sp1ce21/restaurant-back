import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dayModel } from "../models/date.js";
import User from "../models/user.js";
import { formatDate } from "../utils/formatDate.js";
import { getToken } from "../utils/getToken.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exists" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCurrent = async (req, res) => {
  try {
    const token = getToken(req);
    const { id } = jwt.decode(token);
    const user = await User.findOne({ _id: id });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDates = async (req, res) => {
  try {
    const dates = [];
    let currentDate = new Date();

    for (let i = 0; i < 10; i++) {
      dates.push(formatDate(currentDate));
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    for (const date of dates) {
      const existingDate = await dayModel.findOne({ day: date });

      if (!existingDate) {
        const hours = [];

        for (let i = 0; i < 9; i++) {
          hours.push({
            tablesOrderes: [],
            time: `${9 + i}:00`,
          });
        }

        await dayModel.create({
          day: date,
          hours,
        });
      }
    }

    const result = await dayModel.find().sort({ _id: -1 }).limit(10);

    res.json(result.reverse());
  } catch (e) {
    res.json(e);
  }
};

export const orderTable = async (req, res) => {
  try {
    const { day, hour, tableNumber } = req.body;
    
    const result = await dayModel.findOneAndUpdate(
      { day: day, "hours.time": hour },
      { $push: { "hours.$.tablesOrdered": tableNumber } },
      { new: true }
    );

    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

export const getTest = async (req, res) => {
  res.json({ message: "success" });
};
