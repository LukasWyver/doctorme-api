import { Request, Response } from "express";
import { database } from "@/infra/DatabaseService";
import PatientController from "@/application/controller/PatientController";
import CreatePatientUseCase from "@/application/use-cases/patient/CreatePatient";

export default class PatientControllerImpl implements PatientController {
  async createPatient(req: Request, res: Response) {
    const { name, phone, password } = req.body
    const useCase = new CreatePatientUseCase(database)
    const patient = await useCase.execute(name, phone, password)
    res.status(201).json(patient)
  }

  createAppointment(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented.')
  }
}