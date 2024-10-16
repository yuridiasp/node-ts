import db from "../db/db";
import { IUser, User } from "../models/User";

class UserRepository {
    insert = async (id: string, name: string, email: string) => {
        const newUser = new User(id, name, email)

        db.push(newUser)

        return true
    }

    update = async (newUser: IUser) => {
        const index = db.findIndex(user => user.id === newUser.id)

        if (index === -1)
            return false
        
        db[index] = newUser
        return true
    }

    delete = async (id: string) => {
        const index = db.findIndex(user => user.id === id)

        if (index === -1)
            return false
        
        db.splice(index, 1)
        
        return true
    }

    get = async () => db

    findById = async (id: string) => db.find(user => user.id === id)
}

export default UserRepository