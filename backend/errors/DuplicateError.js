class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 11000;
  }
}
module.exports = DuplicateError;
