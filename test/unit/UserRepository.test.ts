import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"

import UserRepository from "../../src/repositories/UserRepository"
import { User } from "../../src/entities/User"
import { EntityManager } from "typeorm"

describe('UserRepository', () => {
    let userRepository: UserRepository
    let mockEntityManager: EntityManager

    const mockUser: User = {
        id_user: '1',
        email: 'test@example.com.br',
        name: 'Test User',
        password: 'Teste@123'
    }

    beforeAll(async () => {
        mockEntityManager = await getMockEntityManager({
            saveReturn: mockUser
        })

        userRepository = new UserRepository(mockEntityManager)
    })

    it('Deve cadastrar um novo usuário no banco de dados', async () => {
        const response = await userRepository.createUser(mockUser)

        expect(mockEntityManager.save).toHaveBeenCalledWith(mockUser)
        expect(response).toMatchObject(mockUser)
    })
})