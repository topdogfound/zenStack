import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message = 'Success') => {
  res.status(200).json({ success: true, message, data });
};

export const sendCreated = (res: Response, data: any, message = 'Created successfully') => {
  res.status(201).json({ success: true, message, data });
};

export const sendValidationError = (res: Response, errors: any[], message = 'Validation failed') => {
  res.status(422).json({ success: false, message, errors });
};

export const sendError = (res: Response, error: any, statusCode = 400) => {
  const msg = error?.message || 'Error occurred';
  res.status(statusCode).json({ success: false, message: msg });
};
