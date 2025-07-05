import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().lean();
    res.json({ status: 'ok', users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to get users' });
  }
};

export const healthCheck = async (req: Request, res: Response) => {
  const dbState = await Promise.resolve(
    // mongoose.connection.readyState:
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    mongoose.connection.readyState === 1
  );

  res.status(dbState ? 200 : 500).json({
    status: dbState ? 'ok' : 'error',
    database: dbState ? 'connected' : 'disconnected',
  });
};
