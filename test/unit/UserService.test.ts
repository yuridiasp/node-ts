import { UserService } from '../../src/services/UserService'
import HttpStatusCode from '../../src/helpers/HTTPCode'
import ErrosMessage from '../../src/helpers/ErrorMessages'
import { IUser } from '../../src/entities/User'

const mockUserRepositoryInsert = jest.fn()
const mockUserRepositoryUpdate = jest.fn()
const mockUserRepositoryDelete = jest.fn()
const mockUserRepositoryGet = jest.fn()
const mockUserRepositoryFindById = jest.fn()

jest.mock('../../src/repositories/UserRepository', () => {

    return jest.fn().mockImplementation(() => ({
        createUser: mockUserRepositoryInsert,
        updateUser: mockUserRepositoryUpdate,
        deleteUser: mockUserRepositoryDelete,
        getUsers: mockUserRepositoryGet,
        findUserByID: mockUserRepositoryFindById
    }))
})



describe('UserService', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    const { createUser, updateUser, deleteUser, findUserByID, getUsers } = new UserService()

    const mockUser: IUser = {
        id_user: '2',
        name: 'Yuri Dias',
        email: 'yuri@gmail.com',
        password: '12345'
    }

    it('Sucesso adicionar um novo usuário', async () => {

        mockUserRepositoryInsert.mockReturnValueOnce(true)

        const { status } = await createUser(mockUser.id_user, mockUser.name, mockUser.email)

        /* expect(mockUserRepositoryInsert).toHaveBeenCalledWith(mockUser.id_user, mockUser.name, mockUser.email) */
        expect(status).toBe(HttpStatusCode.Created)
    })

    it('Falha adicionar um novo usuário', async () => {

        mockUserRepositoryInsert.mockReturnValueOnce(false)

        const { status, message } = await createUser(mockUser.id_user, mockUser.name, mockUser.email)
        
        /* expect(mockUserRepositoryInsert).toHaveBeenCalledWith('2', 'Yuri Dias', 'yuri@gmail.com') */
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe(`Error: ${ErrosMessage.processFailure.userCreation}\n`)
    })

    it('Sucesso ao editar um usuário existente', async () => {

        mockUserRepositoryUpdate.mockReturnValueOnce(true)

        const { status } = await updateUser(mockUser)

        expect(mockUserRepositoryUpdate).toHaveBeenCalledWith(mockUser)
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao editar um usuário existente', async () => {

        mockUserRepositoryUpdate.mockReturnValueOnce(false)

        const { status, message } = await updateUser(mockUser)

        expect(mockUserRepositoryUpdate).toHaveBeenCalledWith(mockUser)
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe(`Error: ${ErrosMessage.notFound.user}\n`)
    })

    it('Sucesso ao apagar um usuário existente', async () => {

        mockUserRepositoryDelete.mockReturnValueOnce(true)

        const { status } = await deleteUser(mockUser.id_user)

        expect(mockUserRepositoryDelete).toHaveBeenCalledWith(mockUser.id_user)
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao apagar um usuário existente', async () => {

        mockUserRepositoryDelete.mockReturnValueOnce(false)

        const { status, message } = await deleteUser(mockUser.id_user)

        expect(mockUserRepositoryDelete).toHaveBeenCalledWith(mockUser.id_user)
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe(`Error: ${ErrosMessage.notFound.user}\n`)
    })

    it('Sucesso ao listar um usuário existente', async () => {

        mockUserRepositoryFindById.mockReturnValueOnce(true)

        const { status } = await findUserByID(mockUser.id_user)

        expect(mockUserRepositoryFindById).toHaveBeenCalledWith(mockUser.id_user)
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao listar um usuário existente', async () => {

        mockUserRepositoryFindById.mockReturnValueOnce(false)

        const { status, message } = await findUserByID(mockUser.id_user)

        expect(mockUserRepositoryFindById).toHaveBeenCalledWith(mockUser.id_user)
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe(`Error: ${ErrosMessage.notFound.user}\n`)
    })

    it('Sucesso ao listar todos os usuários existentes', async () => {

        mockUserRepositoryGet.mockReturnValueOnce(true)

        const { status } = await getUsers()

        expect(mockUserRepositoryGet).toHaveBeenCalled()
        expect(status).toBe(HttpStatusCode.OK)
    })

    it('Falha ao listar todos os usuários existentes', async () => {

        mockUserRepositoryGet.mockReturnValueOnce(false)

        const { status, message } = await getUsers()

        expect(mockUserRepositoryGet).toHaveBeenCalled()
        expect(status).toBe(HttpStatusCode.NoContent)
        expect(message).toBe(`Error: ${ErrosMessage.notFound.allUsers}\n`)
    })
})