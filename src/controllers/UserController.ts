import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

interface IUserController {
    createUser: (request: Request, response: Response) => void
    getUsers: (request: Request, response: Response) => void
    findUserByID: (request: Request, response: Response) => void
    deleteUser: (request: Request, response: Response) => void
    updateUser: (request: Request, response: Response) => void
}

export class UserController implements IUserController {
    userService: UserService
    
    constructor(userService = new UserService()) {
        this.userService = userService
    }

    getUsers = async (request: Request, response: Response) => {
        const { content, message, status } = await this.userService.getUsers()

        if (!content.length || !content) {
            response.status(status).json({ message })
        }
        
        response.status(status).json(content)
    }

    deleteUser = async (request: Request, response: Response) => {
        const { message, status } = await this.userService.deleteUser(request.body.id_user)

        response.status(status).json({ message })
    }

    updateUser = async (request: Request, response: Response) => {
        const { id_user, name, email, password } = request.body

        const { message, status } = await this.userService.updateUser({ id_user, name, email, password })

        response.status(status).json({ message })
    }

    findUserByID = async (request: Request, response: Response) => {
        const { content, message, status } = await this.userService.findUserByID(request.params.id)

        if (!content) {
            response.status(status).json({ message })
        }
        
        response.status(status).json({ content })
    }

    createUser = async (request: Request, response: Response) => {
        const { id_user, name, email } = request.body
        const { message, status } = await this.userService.createUser(id_user, name, email)

        response.status(status).json({ message })
    }
}