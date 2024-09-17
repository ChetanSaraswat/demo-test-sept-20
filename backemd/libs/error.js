/* eslint-disable snakecasejs/snakecasejs */
const { Sequelize } = require("sequelize");
const { httpStatusCode } = require("./constants");

/**
 * Handles errors and sends an appropriate HTTP response.
 * @param {object} res - The Express response object.
 * @param {Error} err - The error object.
 */
function handleError(res, err) {
  // Default values for error handling
  let error_message = "Internal Server Error";
  let status_code = httpStatusCode.INTERNAL_SERVER;

  // Extracts the validation message from a Sequelize unique error
  if (err instanceof Sequelize.UniqueConstraintError) {
    if (err.parent.code === "23505") {
      return res
        .status(httpStatusCode.CONFLICT)
        .json({ error: "Same resource already exists" });
    } else
      return res
        .status(httpStatusCode.CONFLICT)
        .json({ error: "Bad request, check the request payload." });
  }

  // Extracts the validation message from a Sequelize validation error
  if (err instanceof Sequelize.ValidationError) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ error: "Bad request, check the request payload." });
  }

  //Extracts the foreign key constraint erroe message from a Sequelize ForeignKeyConstraint Error
  if (err instanceof Sequelize.ForeignKeyConstraintError) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ error: "Bad request, check the request payload." });
  }

  if (err instanceof Sequelize.DatabaseError) {
    if (err.parent.code === "22P02") {
      if (err.parent.file === "enum.c") {
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ error: "Bad request, check the request payload." });
      }
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: "Provided uuid is invalid." });
    } else if (err.parent.code === "21000") {
      return res
        .status(httpStatusCode.CONFLICT)
        .json({ error: "Same resource already exists" });
    } else if (err.parent.code === "22003") {
      return res
        .status(httpStatusCode.BAD_REQUEST)
        .json({ error: "Bad request, check the request payload." });
    } else {
      {
        return res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ error: "Bad request, check the request payload." });
      }
    }
  }

  // Extracts the validation message from a Sequelize during bulk insert
  if (err instanceof Sequelize.AggregateError) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ error: "Invalid payload." });
  }

  if (err.message === 'WHERE parameter "uuid" has invalid "undefined" value') {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ error: "UUID is not valid." });
  }

  if (err.message === 'jwt expired') {
    return res
      .status(httpStatusCode.UNAUTHORIZED)
      .json({ error: "token is not valid." });
  }

  if (err.name === "SequelizeDatabaseError" && err.parent?.code === "22P02") {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ error: "Provided uuid is invalid." });
  }

  // Customize error handling based on the type of error
  if (err instanceof customError) {
    error_message = err.message;
    status_code = err.status_code;
  }

  if (err instanceof validationError) {
    error_message = JSON.parse(err.message);
    status_code = err.status_code;
    return res.status(status_code).json(error_message);
  }

  // Send the appropriate response to the client
  res.status(status_code).json({
    error: error_message,
  });
}
function handleSuccess(res, data, statusCode)  {
    return res.status(statusCode).json(data);
  }
  

class customError extends Error {
  constructor(message, status_code = httpStatusCode.BAD_REQUEST) {
    super(message);
    this.status_code = status_code;
  }
}

class validationError extends Error {
  constructor(message, status_code = httpStatusCode.BAD_REQUEST) {
    super(JSON.stringify(message));
    this.status_code = status_code;
  }
}

module.exports = {
  handleError,
  handleSuccess,
  customError,
  validationError,
};
