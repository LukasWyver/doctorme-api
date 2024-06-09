import DatabaseService from "@/infra/DatabaseService";
import { BussinesError, NotFoundError } from "@/infra/helpers/Errors";

export default class CreateAppointmentUseCase {
  constructor(readonly database: DatabaseService) {

  }

  async execute(patientId: number, scheduleId: number){ 
    // verifica se o paciente existe com o id passado
    const patient = await this.database.getPatientById(patientId)

    if(!patient){
      throw new NotFoundError('Patient not found')
    }

    // verifica se a agenda existe com o id passado e está disponível
    const schedule = await this.database.getScheduleById(scheduleId)

    if(!schedule?.available){
      throw new BussinesError('Schedule not available for this date')
    }

    // atualiza a agenda para não estar mais disponível
    await this.database.updateSchedule(schedule.id, { available: false })

    // cria um novo agendamento para o paciente com o id passado e a agenda com o id passado
    const appointment = await this.database.createAppointment(
      patient.id,
      schedule.doctorId,
      schedule.date
    )

    // retorna o agendamento criado
    return appointment
  }
}