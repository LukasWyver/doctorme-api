import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

// validar a requisição
function validatePayload(schema: ObjectSchema, key: 'body' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[key])
    
    if (error) {
      const message = "Invalid payload"
      return res.status(400).json({ message, error: error.message })
    }

    next()
  }
}

// validar o body da requisição
export function validateBody(schema: ObjectSchema) {
  return validatePayload(schema, 'body')
}

// validar os parâmetros da requisição
export function validateParams(schema: ObjectSchema) {
  return validatePayload(schema, 'params')
}

// validar se o token de authenticação foi enviado