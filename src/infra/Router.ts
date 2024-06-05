import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import DoctorController from '@/application/controller/DoctorController'
import PatientController from '@/application/controller/PatientController'

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

    this.app.get('/doctors', this.doctorController.listDoctor)
    this.app.post('/patient', this.patientController.createPatient)
  }

  public start(port: number){
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}