import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { Articles } from '../Articles/article.interface';
import { ArticletService } from '../Articles/article.service';
import { Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CommentService } from '../Comment/commnet.service';
import { Comments } from '../Comment/commnet.interface';
import { DataViewModule } from 'primeng/dataview';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MenubarModule,
    TieredMenuModule, 
    DataViewModule
  ],  providers: [ArticletService , MessageService ,CommentService],

  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  id: number | undefined;
  articleType : string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  comment: string | undefined;
  visible: boolean = false;
  updateComment: string | undefined ;
  commentId: number | undefined;
  editcomment: Comments | undefined;
  disabled!: boolean;

  articles$: Observable<Articles[]> = this.articleService.articles$;
  comments$: Observable<Comments[]> = this.commentService.comments$;

  loading: boolean = true;
  isStarred: boolean = false;
  constructor(private route: ActivatedRoute, 
            private articleService: ArticletService , 
            private messageService: MessageService ,
            private commentService: CommentService) { }

  ngOnInit() {
    
    this.loading = false;
    const paramId = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('articleType');
    if (paramId !== null) {
      this.id = parseInt(paramId, 10);
      if(type === "FavariteArticle" ){
        this.isStarred =true;
        this.disabled = false;
        this.articleService.getFavoriteArticle(this.id).subscribe();
        this.commentService.getAllComments(this.id).subscribe();
      }
      else{
      this.loading = true;
      this.disabled = true;
      this.articleService.getArticle(this.id).subscribe();
      
    }

    }
  }
  async AddArticle(article: Articles){
    this.loading = false;
    this.isStarred = !this.isStarred;
    if(this.isStarred ==true){
       this.articleService.addFAvoriteArticle(article);
        this.messageService.add({
        severity: 'info',
        summary: "Article is added in favarite",
      });
      }
      else{
        this.commentService.DeleteAllCommentsByArticle(article.id);
        await this.articleService.RemoveFavoriteArticle(article.id);
        this.messageService.add({
          severity: 'info',
          summary: "Article is remove",
          });
      }
  }
   async AddComment()
  {
    const currentDate = new Date();
    const stirngDate: string = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()-1} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`; 
    if(this.firstName!== undefined && this.lastName!== undefined && this.comment!==undefined && this.id!==undefined){
    const newComment: Comments ={
   "id": 1,
    "firstName" : this.firstName,
    "lastName": this.lastName,
    "comment": this.comment,
    "date": stirngDate,
    "artickeID": this.id  
    };
   this.commentService.addCommentByFavoriteArticle(newComment);
   this.commentService.getAllComments(this.id).subscribe();
   
  }

  this.messageService.add({
      severity: 'info',
      summary: "comment is add"
      });
  window.location.reload();
  }

  editComment(id: number , editCommnet: Comments )
  {
    this.visible = true;
    this.commentId = id;
    this.editcomment = editCommnet;
  }
  async UpdateComment()
  {
    const currentDate = new Date();
    const stringDate: string = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()-1} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`; 
    if(this.commentId!==undefined && this.updateComment !== undefined && this.id !== undefined &&  this.editcomment!== undefined)
    {
      this.editcomment.comment = this.updateComment;
      this.editcomment.date = stringDate;
      await this.commentService.UpdateCommet(this.commentId, this.editcomment);
      this.commentService.getAllComments(this.id).subscribe();

    }
    this.messageService.add({
      severity: 'info',
      summary: "comment is update"
      });
      this.visible = false;

  }
  async deleteComent(id: number)
  {
    if(this.id !== undefined)
    {
      await this.commentService.RemoveComment(id);
      this.commentService.getAllComments(this.id).subscribe();

    }    this.messageService.add({
      severity: 'info',
      summary: "comment is delete"
      });
  }
  

}

