import { Router  } from "express"

import { UserController } from "../controllers/UserController"

const { createUserController, deleteUserController, editUserController, getUserController, getUsersController } = new UserController()

export const routes = () => {
    const router = Router()

    router.get('/user', getUsersController)
    router.get('/user/:id', getUserController)
    router.post('/user', createUserController)
    router.put('/user', editUserController)
    router.delete('/user', deleteUserController)

    return router
}

export default routes