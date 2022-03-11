const notFound = (req, res) => {
  return res.send("This route does not exists");
};

module.exports = notFound;
