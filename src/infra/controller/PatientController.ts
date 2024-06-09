import { Request, Response } from "express";
import { database } from "@/infra/DatabaseService";
import { HttpStatusCode } from "@/infra/helpers/HttpStatusCode";
import PatientController from "@/application/controller/PatientController";
import CreatePatientUseCase from "@/application/use-cases/patient/CreatePatient";
import CreateAppointmentUseCase from "@/application/use-cases/patient/CreateAppointment";
import AuthenticatePatientUseCase from "@/application/use-cases/patient/AuthenticatePatient";
import GetPatientByPhoneUseCase from "@/application/use-cases/patient/GetPatientByPhone";

export default class PatientControllerImpl implements PatientController {
  async createPatient(req: Request, res: Response) {
    const { name, phone, password } = req.body
    const useCase = new CreatePatientUseCase(database)
    const patient = await useCase.execute(name, phone, password)
    res.status(HttpStatusCode.CREATED).json(patient)
  }

  async createAppointment(req: Request, res: Response) {
    const { scheduleId } = req.body
    const { patientId } = req.params
    const useCase = new CreateAppointmentUseCase(database)
    const appointment = await useCase.execute(Number(patientId), Number(scheduleId))
    res.status(HttpStatusCode.CREATED).json(appointment)
  }

  async authenticatePatient(req: Request, res: Response) {
    const { phone, password } = req.body
    const useCase = new AuthenticatePatientUseCase(database)
    const patient = await useCase.execute(phone, password)
    res.status(HttpStatusCode.OK).json(patient)
  }

  async getPatientByPhone(req: Request, res: Response) {
    const { phone } = req.params
    const useCase = new GetPatientByPhoneUseCase(database)
    const patient = await useCase.execute(phone)
    res.status(HttpStatusCode.OK).json(patient)
  }
}