exports.generateFileUrl = (req, file) => {
  return `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`;
};
