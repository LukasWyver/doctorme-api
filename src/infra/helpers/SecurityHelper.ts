import bcrypt from 'bcrypt'

export function hashPassword(password: string){
  const SALT = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, SALT)
}

export function comparePassword(password: string, hash: string){
  return bcrypt.compareSync(password, hash)
}

// Função para codificar uma string para Base64
export function encodeToBase64(data: string){
  return Buffer.from(data, 'utf-8').toString('base64');
}

// Função para decodificar uma string de Base64 para UTF-8
export function decodeFromBase64(data: string){
  return Buffer.from(data, 'base64').toString('utf-8');
}