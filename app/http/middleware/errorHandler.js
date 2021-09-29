class errorHandler {
  async error404(req, res, next) {
    try {
      res.statusCode = 404;
      res.json("not found!");
    } catch (err) {
      next(err);
    }
  }

  async handler(err, req, res, next) {
    try {
      res.statusCode = 404;
      res.json("not found!");
    } catch (err) {
      next(err);
    }
  }


}

module.exports = new errorHandler();
