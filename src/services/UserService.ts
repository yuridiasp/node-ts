import ErrosMessage from "../helpers/ErrorMessages"
import HttpStatusCode from "../helpers/HTTPCode"
import { IUser, User } from "../entities/User"
import UserRepository from "../repositories/UserRepository"
import { DeleteResult, EntityManager, UpdateResult } from "typeorm"
import { AppDataSource } from "../database"

interface response {
    message: string
    status: number
    content?: IUser | null | IUser[]
}

interface IUserService {
    createUser: (id: string, name: string, email: string) => void
    getUsers: () => Promise<response>
    findUserByID: (id: string) => Promise<response>
    deleteUser: (id: string) => void
    updateUser: (user: IUser) => void
}

function buildMessageResult (successCondiction: boolean | IUser | IUser[] | null | DeleteResult | UpdateResult, erros: string[], defaultMessage: string) {
    let message = ''
    let errorMessage = 'Error: '

    if (!successCondiction) {
        message = message.concat(defaultMessage, '\n')
    }

    if (erros.length) {
        message = message.concat(erros.join('\n'))
    }
    
    if (message.length) {
        message = errorMessage.concat(message)
    }
    
    return message
}

export class UserService implements IUserService {
    private userRepository: UserRepository

    constructor(userRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository
    }

    getUsers = async () => {
        const users = await this.userRepository.getUsers()

        const message = buildMessageResult(users, [], ErrosMessage.notFound.allUsers)
        const status = users ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status, content: users }
    }
    
    createUser = async (name: string, email: string, password: string) => {

        const erros: string[] = []

        if (!name) {
            erros.push(ErrosMessage.missingArgument.name)
        }

        if (!email) {
            erros.push(ErrosMessage.missingArgument.email)
        }

        if (!password) {
            erros.push(ErrosMessage.missingArgument.password)
        }

        if (erros.length) {
            return {
                message: buildMessageResult(false, erros, ErrosMessage.processFailure.userCreation),
                status: HttpStatusCode.NoContent
            }
        }

        const newUser = new User(name, email, password)

        const result = await this.userRepository.createUser(newUser)
        
        return {
            message: buildMessageResult(result, erros, ErrosMessage.processFailure.userCreation),
            status: HttpStatusCode.Created
        }
    }

    findUserByID = async (id: string) => {
        const erros: string[] = []

        if (!id) {
            erros.push(ErrosMessage.missingArgument.id)
        }

        const user = erros.length ? null : await this.userRepository.findUserByID(id)

        const message = buildMessageResult(user, erros, ErrosMessage.notFound.user)
        const status = user ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status, content: user }
    }

    deleteUser = async (id: string) => {
        const erros: string[] = []

        if (!id) {
            erros.push(ErrosMessage.missingArgument.id)
        }

        const result = erros.length ? false : await this.userRepository.deleteUser(id)

        const message = buildMessageResult(result, erros, ErrosMessage.notFound.user)
        const status = result ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status }
    }

    updateUser = async (user: IUser) => {
        const erros: string[] = []

        if (!user) {
            erros.push(ErrosMessage.missingArgument.user)
        }

        const result = erros.length ? false : await this.userRepository.updateUser(user)

        const message = buildMessageResult(result, erros, ErrosMessage.notFound.user)
        const status = result ? HttpStatusCode.OK : HttpStatusCode.NoContent

        return { message, status }
    }
}