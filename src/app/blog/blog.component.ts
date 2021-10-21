import { Component, OnInit } from '@angular/core';
import { IBlog, IUsersBlog } from '../shared/interface/blog/blog.interface';
import { BlogService } from '../shared/services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public idEdit!: number
  public editOrAdd = false
  public userOrAdmin = false
  public userLogined = false
  public newName: string = ``
  public newEmail: string = ``
  public newPassword: string = ``
  public nameLogined!: string
  public idLogined!: number
  public email!: string
  public password!: string
  public postTitle!: string;
  public postText!: string;
  public checkModal = false
  public signInOnUp = false
  public logined = true
  public newpost = false
  public users: Array<IBlog> = []
  public blogUsersPost: Array<IUsersBlog> = []

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlog()
  }
  loadBlog(): void {
    this.users = this.blogService.getUsers();
    this.blogUsersPost = this.blogService.getBlog()
    console.log(this.users);
    console.log(this.blogUsersPost);

  }

  signIn(): void {

    console.log(this.checkModal);

    this.checkModal = !this.checkModal
    this.signInOnUp = false
  }
  signUp(): void {
    console.log(this.checkModal);
    this.checkModal = !this.checkModal
    this.signInOnUp = true
    this.newName=``
    this.newPassword=``
    this.newEmail=``
  }
  modalExit(): void {
    this.checkModal = false
    this.newpost = false
  }
  signOut(): void {
    this.logined = true
    this.modalExit()
    this.userOrAdmin = false
    this.userLogined = false
    this.newName=``
    this.newPassword=``
    this.newEmail=``
    this.email =``
    this.password =``
}
  addPost(): void {
    this.newpost = true
    this.editOrAdd = false
  }
  submitNewUser(): void {
    this.users.forEach(e => {
      if (this.newEmail != e.email && this.newEmail != `` &&
        this.newName != e.username &&
        this.newName != `` && this.newPassword != `` && this.newEmail.includes('@')) {
        let newUser: IBlog = {
          id: this.users.length + 1,
          email: this.newEmail,
          password: this.newPassword,
          username: this.newName
        }
        console.log(this.users)
        this.users.push(newUser)
        this.modalExit()
        this.newEmail = ``
        this.newName = ``
        this.newPassword =``
      }
      else {
        console.log(`Перевірте правельність заповнення усіх полів! Можливо ви вже зареєстровані!`);

      }
    })

  }
  submit(): void {
    this.users.forEach(e => {
      if (e.email === this.email && e.password === this.password) {
        this.nameLogined = e.username
        this.idLogined = e.id
        this.logined = false
        this.modalExit()
        if (this.email === `admin@gmail.com` && this.password === `admin`) {
          this.userOrAdmin = true
          this.userLogined = true
        }
        else {
          this.userLogined = true
        }
      }
      else {
        console.log("Невірний пароль або електронна пошта")
      }

    })

  }
  newPost(): void {
    let newId = this.blogUsersPost.length + 1
    let postObj: IUsersBlog = {
      id: newId,
      postedBy: this.users[this.idLogined - 1].username,
      topic: this.postTitle,
      date: new Date(),
      message: this.postText
    }
    this.blogService.addBlog(postObj)
    this.postText =``
    this.postTitle = ``
    this.modalExit()
  }

  editPost(id: number): void {
    this.newpost = true
    this.editOrAdd = true 
    this.idEdit = id  
    this.postText = this.blogUsersPost[this.idEdit].message
    this.postTitle = this.blogUsersPost[this.idEdit].topic
  }
  deletePost(id: number): void {
    this.blogUsersPost.splice(id, 1)
  }
  saveEditPost(){
    let postObj: IUsersBlog = {
      id: this.idEdit,
      postedBy: this.users[this.idLogined-1].username,
      topic: this.postTitle,
      date: new Date(),
      message: this.postText
    }
    this.blogUsersPost.splice(this.idEdit, 1, postObj)
    this.postText =``
    this.postTitle =``
    this.modalExit()

  }

  clearInpField(a:string,b:string){
    a= ``
    b=``
  }

}
