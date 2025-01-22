// Centralized Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
  
    const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
    const message = err.message || 'Internal Server Error'; // Default message if not provided
  
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Stack trace only in development mode
    });
  };
  
export default errorHandler;  