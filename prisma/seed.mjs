import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { faker } from '@faker-js/faker';

const specialities = [
	'Cardiologista',
	'Endocrinologista',
	'Clinico Geral',
	'Pediatra',
	'Urologista',
];

// gerar médicos
function createDoctor() {
  // retornar um obj contendo os dados do médico
  // retornar um objeto contendo os dados do médico
	const speciality =  specialities[Math.floor(Math.random() * specialities.length)];
  const experience = `${Math.floor(Math.random() * 5)} anos de experiência`;

  const doctor = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.location.city(),
    state: faker.location.state(),
    speciality,
    bio: `Dr formado em ${speciality} com ${experience}`,
    picture: `photo-${Math.floor(Math.random() * 9)}.jpg`,
    price: parseFloat(faker.commerce.price({min: 100, max: 500})),
    discountPercentage: parseInt(faker.commerce.price({ min: 0, max: 20, dec: 0})),
    availability: 'Segunda à Sexta das 10:00 às 16:00',
    experience,
    attendances: Math.floor(Math.random() * 10),
    address: faker.location.streetAddress(),
  }

  return doctor
}

// gerar horários para a agenda dos médicos
function generateSchedule(quantity) {
  const dates = [ 
    '2024-06-03 19:00:00',
    '2024-06-04 19:00:00',
    '2024-06-05 19:00:00',
    '2024-06-06 19:00:00',
    '2024-06-07 19:00:00',
  ]

  return dates.splice(0,quantity)
}

async function main() {
  console.log(`Seed está iniciando... 🌱`)
  // quantidade de médicos para serem inseridos
  const ROWS_QUANTITY = Math.floor(Math.random() * 10)

  for (let index = 0; index < ROWS_QUANTITY; index++){
    // gerar o médico
    const doctor = createDoctor();
    const SCHEDULE_QUANTITY = Math.floor(Math.random() * 5);
    const schedule = generateSchedule(SCHEDULE_QUANTITY)
    
    // adicionar o médico no DB
    await prisma.doctor.create({
      data: {
        ...doctor,
        schedule: {
          createMany: {
            data: schedule.map((item) => ({
              date: new Date(item).toISOString()
            }))
          }
        }
      }
    })
  }

  console.log(`Seed concluído com sucesso... ✅`)
}

main();