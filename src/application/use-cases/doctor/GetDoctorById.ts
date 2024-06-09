import DatabaseService from "@/infra/DatabaseService";
import { NotFoundError } from "@/infra/helpers/Errors";

export default class GetDoctorByIdUseCase {
  constructor(readonly database: DatabaseService){

  }

  async execute(id: number) {
    // lógica de negócio
    const INCLUDE_SCHEDULE = true
    const doctor = await this.database.getDoctorById(id, INCLUDE_SCHEDULE)

    if(!doctor){
      throw new NotFoundError('Doctor not found')
    }

    return doctor
  }
}