import { EntityManager } from "typeorm";

interface mockManageArgs {
    saveReturn?: object | [object]
    findOneReturn?: object
}

export const getMockEntityManager = async ({ saveReturn = undefined, findOneReturn = undefined }: mockManageArgs): Promise<EntityManager> => {
    const manager = {} as Partial<EntityManager>

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn))
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn))

    return manager as EntityManager
}