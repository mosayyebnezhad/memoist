export interface IUser {
    email?: string
    firstName?: string
    lastName?: string
    password?: string
    token?: string
    id?: number
}


export interface GetingData {
    token: string,
    user: {
        email: string,
        firstName: string,
        lastName: string,
        id: number
    }
}
export interface Todo {
    id: number
    createdAt: string,
    title: string,
    description: string,
    status: boolean,
    userId: number
}