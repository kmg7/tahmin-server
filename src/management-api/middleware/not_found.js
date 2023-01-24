const notFound = (req, res) =>
  res.status(404).json({
    message: `Method '${req.method}' for Route '${req.path}' does not exist`,
  });

export default notFound;
