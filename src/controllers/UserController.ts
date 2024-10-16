import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

const { createUserService, deleteUserService, editUserService, getUserService, getUsersService } = new UserService()

interface IUserController {
    createUserController: (request: Request, response: Response) => void
    getUsersController: (request: Request, response: Response) => void
    getUserController: (request: Request, response: Response) => void
    deleteUserController: (request: Request, response: Response) => void
    editUserController: (request: Request, response: Response) => void
}

export class UserController implements IUserController {

    getUsersController = async (request: Request, response: Response) => {
        const { content, message, status } = await getUsersService()

        if (!content) {
            response.status(status).json({ message })
        }
        
        response.status(status).json(content)
    }

    deleteUserController = async (request: Request, response: Response) => {
        const { message, status } = await deleteUserService(request.body.id)

        response.status(status).json({ message })
    }

    editUserController = async (request: Request, response: Response) => {
        const { id, name, email } = request.body

        const { message, status } = await editUserService({ id, name, email })

        response.status(status).json({ message })
    }

    getUserController = async (request: Request, response: Response) => {
        const { content, message, status } = await getUserService(request.params.id)

        if (!content) {
            response.status(status).json({ message })
        }
        
        response.status(status).json(content)
    }

    createUserController = async (request: Request, response: Response) => {
        const { id, name, email } = request.body

        const { message, status } = await createUserService(id, name, email)

        response.status(status).json({ message })
    }
}