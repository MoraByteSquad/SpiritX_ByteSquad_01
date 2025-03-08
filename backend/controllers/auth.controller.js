import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // Start a session to handle transactions in MongoDB
  session.startTransaction(); // Start a transaction

  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
  
    if (existingUser) {
      const error = new Error('Username already exists');
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nweUsers = await User.create([{ username, password: hashedPassword }], { session }); // session is passed as an option to prevent the transaction from being committed

    const token = jwt.sign({ userId: nweUsers[0]._id, userName: nweUsers[0].username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

    await session.commitTransaction(); // Commit the transaction
    session.endSession(); // End the session

    res.status(201).json({ 
      success: true,
      message: 'User created successfully',
      data: { token } 
    });
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction
    session.endSession(); // End the session
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id, userName: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

    res.status(200).json({ 
      success: true,
      message: 'User signed in successfully',
      data: { token } 
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('token');
    console.log('Cookie cleared');
    res.status(200).json({ success: true, message: 'User signed out successfully' });
  } catch (error) {
    next(error);
  }
};