import { Request, Response } from "express";
import { database } from "@/infra/DatabaseService";
import { HttpStatusCode } from "@/infra/helpers/HttpStatusCode";
import DoctorController from "@/application/controller/DoctorController";
import ListDoctorUseCase from "@/application/use-cases/doctor/ListDoctor";
import GetDoctorByIdUseCase from "@/application/use-cases/doctor/GetDoctorById";

export default class DoctorControllerImpl implements DoctorController {
  async listDoctor(_req: Request, res: Response) {
    const useCase = new ListDoctorUseCase(database)
    const doctors = await useCase.execute()
    res.status(HttpStatusCode.OK).json(doctors)
  }

  async getDoctorById(req: Request, res: Response){
    const useCase = new GetDoctorByIdUseCase(database)
    const doctor = await useCase.execute(Number(req.params.id))
    res.status(HttpStatusCode.OK).json(doctor)
  }
}