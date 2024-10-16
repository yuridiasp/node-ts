import { UserService } from '../../src/services/UserService'

jest.mock('../repositories/UserRepository', () => {
    
})

describe('UserService', () => {
    const userService = new UserService()

    it('Deve adicionar um novo usuário', async () => {

        const { status } = await userService.createUserService('2', 'Yuri Dias', 'yuri@gmail.com')

        expect(status).toBeTruthy()
    })
})