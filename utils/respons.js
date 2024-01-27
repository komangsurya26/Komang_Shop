// customError.js
class ErrorResponse {
  constructor(message, statusCode, data) {
    this.success = false;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data || null;
  }
}

class SuccessResponse {
  constructor(message, statusCode, data) {
    this.success = true;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = { ErrorResponse, SuccessResponse };
