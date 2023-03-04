// importando o supertest com o nome request
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    // await connection.migrate.rollback() - para zerar o banco de dados
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be albe to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      // .set('Authorization', 'kansdf') caso precise definir o conteudo do header
      .send({
        name: 'DDDD',
        email: 'dd@ddemail.com',
        whatsapp: '121212121212',
        city: 'dada',
        uf: 'll',
      })
    // console.log(response.body)
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})