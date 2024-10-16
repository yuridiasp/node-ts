import { UserService } from '../../src/services/UserService'

const mockUserRepositoryInsert = jest.fn()
const mockUserRepositoryUpdate = jest.fn()
const mockUserRepositoryDelete = jest.fn()
const mockUserRepositoryGet = jest.fn()
const mockUserRepositoryFindById = jest.fn()

jest.mock('../repositories/UserRepository', () => ({
    UserRepository: {
        db: [],
        insert: mockUserRepositoryInsert,
        update: mockUserRepositoryUpdate,
        delete: mockUserRepositoryDelete,
        get: mockUserRepositoryGet,
        findById: mockUserRepositoryFindById
    }
}))

describe('UserService', () => {
    const userService = new UserService()

    it('Deve adicionar um novo usuário', async () => {

        const { status } = await userService.createUserService('2', 'Yuri Dias', 'yuri@gmail.com')

        expect(userService.createUserService).toHaveBeenCalled()
        expect(status).toBeTruthy()
    })
})