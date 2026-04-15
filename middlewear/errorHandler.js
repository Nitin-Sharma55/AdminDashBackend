const errorHandler = (err, req, res, next) => {
  // Determine status code
  const statusCode = err.statusCode || 500;

  // Send structured JSON response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    path: req.originalUrl, // URL where the error occurred
    method: req.method, // HTTP method
    data: err.data || null,
  });
};

export { errorHandler };