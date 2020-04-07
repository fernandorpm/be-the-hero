const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
let createONG;
let indexIncidentONG;
let indexIncidents;

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    it('should be able to create a new ONG', async () => {
        createONG = await request(app)
            .post('/ongs')
            .send({
                name: "Amigos dos Dogs",
                email: "contato@amigodogs.com.br",
                whatsapp: "12911119333",
                city: "Paulistana",
                uf: "SP"
            });

        expect(createONG.body).toHaveProperty('id');
        expect(createONG.body.id).toHaveLength(8);
    });

});


describe('Incidents', () => {
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to register new Incident', async () => {
        createIncident = await request(app)
            .post('/incidents')
            .set('Authorization', createONG)
            .send({
                title: "Caso TESTE",
                description: "Descrição do caso TESTE TESTE TESTE",
                value: 120
            });
        expect(createIncident.body).toHaveProperty('id');
    });


    it('should be able to index all Incidents from an ONG', async () => {
        indexIncidentONG = await request(app)
            .get('/profile')
            .set('Authorization', createONG);
        expect(indexIncidentONG.body);
    });

    it('should be able to index all Incidents from the DB', async () => {
        indexIncidents = await request(app)
            .get('/incidents');
        expect(indexIncidents.body);
    });
    
})