import { PrismaClient } from "@prisma/client";

export default class DatabaseService {
  constructor(readonly connection: PrismaClient){  }

  listDoctor(){
    // lógica de acesso ao banco de dados
    return this.connection.doctor.findMany({
      include: { schedule: true }
    });
  }

  getDoctorById( id: number, includeSchedule: boolean = false ){
    // lógica de acesso ao banco de dados
    return this.connection.doctor.findUnique({
      where: { id },
      include: { schedule: includeSchedule }
    })
  }

  getPatientByPhone(
    phone: string,
    includeAppointment: boolean = false,
    includeDoctor: boolean = false
  ){
    // lógica de acesso ao banco de dados
    return this.connection.patient.findUnique({
      where: { phone },
      include: { 
        appointment: !includeAppointment
        ? false
        : {
            include: {
            doctor: includeDoctor,
          } 
        }
      }
    })
  }

  getUserByPhone(phone: string){
    return this.connection.user.findUnique({
      where: { phone }
    })
  }

  getPatientById(id: number){
    return this.connection.patient.findUnique({
      where: { id },
    })
  }

  getScheduleById(id: number){
    return this.connection.schedule.findUnique({
      where: { id },
    })
  }

  updateSchedule(id: number, data: { available: boolean }) {
    return this.connection.schedule.update({
      where: { id },
      data,
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

  createAppointment(patientId: number, doctorId: number, date: Date){
    return this.connection.appointment.create({
      data: {
        patientId,
        doctorId,
        date,
      }
    })
  }

}

export const database = new DatabaseService(new PrismaClient())