//********** Imports **********//
import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./pages/interfaces/ErrorResponse";

//********** Middlewares **********//
export const notFound = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  response.status(404);
  const error = new Error(`Not found - ${request.originalUrl}`);
  nextFunction(error);
};

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response<ErrorResponse>,
  nextFunction: NextFunction
) => {
  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;
  response
    .status(statusCode)
    .json({ message: error.message, stack: error.stack });
};
