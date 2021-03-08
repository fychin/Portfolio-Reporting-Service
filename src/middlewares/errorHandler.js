import { buildError } from '../utils/buildErrors';

export function genericErrorHandler(err, req, res, next) {
  console.log(err.stack);
  const error = buildError(err);

  res.status(error.code).json({ error });
}