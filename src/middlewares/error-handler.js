const errorHandler = (err, req, res, next) => {
  console.log(err);
  // console.log(err.message);
  return res.status(500).json({ msg: err.message });
};

module.exports = errorHandler;
