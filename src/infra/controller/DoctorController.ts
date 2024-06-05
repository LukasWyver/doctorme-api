import { Request, Response } from "express";
import { database } from "@/infra/DatabaseService";
import DoctorController from "@/application/controller/DoctorController";
import ListDoctorUseCase from "@/application/use-cases/doctor/ListDoctor";

export default class DoctorControllerImpl implements DoctorController {
  async listDoctor(req: Request, res: Response) {
    const useCase = new ListDoctorUseCase(database)
    const doctors = await useCase.execute()
    res.status(200).json(doctors)
  }
}