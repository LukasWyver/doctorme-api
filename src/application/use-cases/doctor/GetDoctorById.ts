import DatabaseService from "@/infra/DatabaseService";

export default class GetDoctorByIdUseCase {
  constructor(readonly database: DatabaseService){

  }

  async execute(id: number) {
    // lógica de negócio
    const INCLUDE_SCHEDULE = true
    const doctor = await this.database.getDoctorById(id, INCLUDE_SCHEDULE)

    if(!doctor){
      throw new Error('Doctor not found')
    }

    return doctor
  }
}