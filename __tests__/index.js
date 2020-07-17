const supertest = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')


beforeEach(async () => {
    await db.seed.run()
})


afterAll(async () => {
    await db.destroy()
})

describe('accounts integration tests', () => {
    it('Get /accounts', async () => {
        const res = await supertest(server).get('/accounts')
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body).toHaveLength(13)
        expect(res.body[0].name).toBe('account-01')
    })
    it('Get /accounts/:id', async () => {
        const res = await supertest(server).get('/accounts/5')
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.id).toBe(5)
        expect(res.body.name).toBe('account-05')
    })
    it('post /accounts', async () => {
        const res = await supertest(server)
                .post('/accounts')
                .send({name:'account-14', budget:'4250'})
        expect(res.statusCode).toBe(201)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.id).toBeDefined()
        expect(res.body.name).toBe('account-14')
    })
    it('Delete /accounts/:id', async () => {
        const res = await supertest(server).delete('/accounts/14')
        expect(res.statusCode).toBe(202)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.id).toBeUndefined()
        expect(res.body.message).toBe('the account has been removed')
    })
    it('Put /accounts/:id', async () => {
        const res = await supertest(server).put('/accounts/13')
                .send({name:'account-15', budget:'4350'})
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        expect(res.body.name).toBe('account-15')
    })
})