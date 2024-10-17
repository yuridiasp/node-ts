import { EntityManager, UpdateResult } from "typeorm";

import { IUser, User } from "../entities/User";

class UserRepository {
    private manager: EntityManager

    constructor(manager: EntityManager) {
        this.manager = manager
    }
    
    createUser = async (user: IUser): Promise<IUser | null> => {
        return this.manager.save(user)
    }

    findUserByID = async (id: string): Promise<IUser | null> => {
        return this.manager.findOne(User, {
            where: {
                id_user: id
            }
        })
    }

    getUsers = async (): Promise<IUser[]> => {
        return this.manager.find(User)
    }

    deleteUser = async (id: string) => {
        return this.manager.delete(User, {
            id
        })
    }

    updateUser = async (user: IUser): Promise<UpdateResult> => {
        return this.manager.update(User, {
            
        }, user)
    }
}

export default UserRepository