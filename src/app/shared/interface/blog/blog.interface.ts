export interface IBlog {
     id: number,
     username: string,
     email: string,
     password: string
}
export interface IUsersBlog {
     id: number,
     postedBy: string,
     topic: string,
     date: Date,
     message: string
}