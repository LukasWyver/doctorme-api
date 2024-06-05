import { PrismaClient } from "@prisma/client";

export default class DatabaseService {
  constructor(readonly connection: PrismaClient){  }

  listDoctor(){
    // lógica de acesso ao banco de dados
    return this.connection.doctor.findMany();
  }

  getDoctorById(id: number, includeSchedule: boolean = false){
    // lógica de acesso ao banco de dados
    return this.connection.doctor.findUnique({
      where: { id },
      include: { schedule: includeSchedule }
    })
  }

  getPatientByPhone(phone: string, includeAppointment: boolean = false){
    // lógica de acesso ao banco de dados
    return this.connection.patient.findUnique({
      where: { phone },
      include: { appointment: includeAppointment }
    })
  }

  createUser(phone: string, password: string){
    return this.connection.user.create({
      data: {
        phone,
        password,
      }
    })
  }

  createPatient(name: string, phone: string, userId: number){
    return this.connection.patient.create({
      data: {
        name,
        phone,
        userId,
      }
    })
  }

}

export const database = new DatabaseService(new PrismaClient())