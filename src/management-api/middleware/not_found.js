const notFound = (req, res) =>
  res.status(404).json({
    message: `Route '${req.path}' does not exist`,
  });

export default notFound;
