import bcrypt from 'bcrypt'

export function hashPassword(password: string){
  const SALT = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, SALT)
}

export function comparePassword(password: string, hash: string){
  return bcrypt.compareSync(password, hash)
}