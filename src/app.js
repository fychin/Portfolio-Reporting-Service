import express from 'express';
import routes from './routes';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(errorHandler.genericErrorHandler);

// API Routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Service running at port ${PORT}`);
});

export default app;