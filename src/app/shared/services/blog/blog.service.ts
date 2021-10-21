import { Injectable } from '@angular/core';
// import { userInfo } from 'os';
import { IBlog, IUsersBlog } from '../../interface/blog/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public topic!: string;
  public message!: string
  public arrId!: number
  private users: Array<IBlog> = [
    {
      id: 1,
      username: `admin`,
      email: `admin@gmail.com`,
      password: `admin`
    }
  ]
  private blog: Array<IUsersBlog> = [
    {
      id: 1,
      postedBy: this.users[0].username,
      topic: `First post`,
      date: new Date(),
      message: `Sign up to create your account and start to use Angular Blog.`
    }
  ];



  constructor() { }

  getBlog(): Array<IUsersBlog> {
    return this.blog
  }
  getUsers(): Array<IBlog> {
    return this.users
  }
  addUser(user: IBlog) {
    this.users.push(user)
  }
  addBlog(post: IUsersBlog) {
    this.blog.push(post)
  }
  editPost(post: IUsersBlog, id: number) {
    const index = this.blog.findIndex(p => p.id === id);
    this.blog.splice(index, 1, post)
  }
  deletePost(id: number): void {
    this.blog.splice(id, 1)
  }

}
// <!--

//    Завдання

// Потрібно реалізувати функціонал як на відео AngularBlog, а саме:
// 1.	Самі блоги та зареєстровані користувачі мають зберігатися на сервісі, тобто в масивах blogsта users
// 2.	Блог це об’єкт в якому є наступні властивості: id, postedBy, topic, date, message
// 3.	Юзер це об’єкт в якому є наступні властивості: id, username, email, password
// 4.	Юзерів можна реєструвати тільки з унікальними username та email
// 5.	Юзер може добавляти, видаляти та редагувати свій пост
// 6.	Адмін може добавляти, видаляти та редагувати свій пост та чужі пости
// 7.	Пост не має добавлятися з пустими полями -->
