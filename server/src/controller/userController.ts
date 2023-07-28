import { Request, Response } from "express";
import { User } from "../database/dbUserModel";

type user = {
  userName: string;
  password: string;
  userPasswords?: Array<object>;
};

const userController = () => {
  const registerUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    try {
      const existingUser: user | null = await User.findOne({ userName });

      if (existingUser) {
        return res.status(409).json({ message: "user already exists" });
      }
      const newUser = new User({ userName, password });
      await newUser.save();
      res.status(201).json({ message: "user created successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  };

  const getUser = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    try {
      const user: user | null = await User.findOne({ userName, password });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "success", user });
    } catch (error) {
      console.error("error while finding user", error);
      res.status(500).json({ message: "failed to find user" });
    }
  };

  const savePassword = async (req: Request, res: Response) => {
    const userName = req.params.name;
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(404).json({ message: "nothing to save" });
    }

    try {
      const user = await User.findOne({ userName });

      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      user.userPasswords?.push({ name, password });
      await user.save();
      res.status(200).json({ message: "Password saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "failed to save the password" });
    }
  };

  const getAllPasswords = async (req: Request, res: Response) => {

    const userName = req.params.name;

    try {
      const user = await User.findOne({ userName });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const allPasswords = user.userPasswords;

      res.status(200).json({ passwords: allPasswords });
    } catch (error) {
      console.error("Error retrieving passwords:", error);
      res.status(500).json({ message: "Failed to retrieve passwords" });
    }
  };

  return {
    registerUser,
    getUser,
    savePassword,
    getAllPasswords
  };
};

export default userController;
