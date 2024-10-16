import { IUser, User } from "../models/User"
import UserRepository from "../repositories/UserRepository"

interface response {
    message: string
    status: number
    content?: User[] | User | undefined
}

interface IUserService {
    userRepository: UserRepository
    createUserService: (id: string, name: string, email: string) => void
    getUsersService: () => Promise<response>
    getUserService: (id: string) => Promise<response>
    deleteUserService: (id: string) => void
    editUserService: (user: IUser) => void
}

export class UserService implements IUserService {
    userRepository = new UserRepository()

    getUsersService = async () => {
        const users = await this.userRepository.get()

        const message = users ? '' : 'Users not found'
        const status = users ? 200 : 204

        return { message, status, content: users }
    }
    
    createUserService = async (id: string, name: string, email: string) => {
        const result = await this.userRepository.insert(id, name, email)

        const message = result ? '' : 'User not found'
        const status = result ? 201 : 204

        return { message, status }
    }

    getUserService = async (id: string) => {
        const user = await this.userRepository.findById(id)

        const message = user ? '' : 'User not found'
        const status = user ? 200 : 204

        return { message, status, content: user }
    }

    deleteUserService = async (id: string) => {
        const result = await this.userRepository.delete(id)

        const message = result ? '' : 'User not found'
        const status = result ? 200 : 204

        return { message, status }
    }

    editUserService = async (user: IUser) => {
        const result = await this.userRepository.update(user)

        const message = result ? '' : 'User not found'
        const status = result ? 200 : 204

        return { message, status }
    }
}