import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import DoctorController from '@/application/controller/DoctorController'
import PatientController from '@/application/controller/PatientController'
import { validateBody, validateParams } from '@/infra/ValidationMiddleware'
import { authenticationSchema, createAppointmentPatientIdSchema, createAppointmentScheduleIdSchema, getDoctorByIdSchema, getPatientByPhoneSchema } from '@/infra/ValidationSchemas'

export default class Router {
  app: express.Express

  constructor(
    readonly doctorController: DoctorController,
    readonly patientController: PatientController
  ){
    this.app = express()
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(express.json())

    this.setRoutes()
  }

  private setRoutes(){
    // rotas da aplicação
    this.app.get('/', (_,res) => {
      res.send('Hello World')
    })

    // Authenticate
    this.app.post(
      '/authenticate',
      validateBody(authenticationSchema),
      this.patientController.authenticatePatient
    )
    
    // Doctors
    this.app.get('/doctors', this.doctorController.listDoctor)
    this.app.get(
      '/doctor/:id',
      validateParams(getDoctorByIdSchema),
      this.doctorController.getDoctorById
    )

    // Patient
    this.app.get(
      '/patient/:phone',
      validateParams(getPatientByPhoneSchema),
      this.patientController.getPatientByPhone
    )

    this.app.post('/patient', this.patientController.createPatient)

    // Appointment
    this.app.post(
      '/patient/:patientId/appointment',
      validateParams(createAppointmentPatientIdSchema),
      validateBody(createAppointmentScheduleIdSchema),
      this.patientController.createAppointment
    )
  }

  public start(port: number){
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}