import DatabaseService from "@/infra/DatabaseService";

export default class CreateAppointmentUseCase {
  constructor(readonly database: DatabaseService) {

  }

  async execute(){ }
}