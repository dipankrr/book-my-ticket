import { ZodError } from 'zod'
import ApiError  from '../utils/ApiError.js'


export const validate = (schema) => (req, res, next) => {
  try {
    
    req.body = schema.parse(req.body)
    next()
  } catch (err) {
    
    if (err instanceof ZodError) {
  return next(
    ApiError.validation(
      err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }))
    )
  );
}

    next(err)
  }
}