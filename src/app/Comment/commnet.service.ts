import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comments} from './commnet.interface';

@Injectable()
export class CommentService {
  ArticlesUrl = 'http://localhost:9090/';



  comment = new BehaviorSubject<Comments[]>([]);
  public  comments$ = this.comment.asObservable();

  constructor(private httpClient: HttpClient) {
  }
   
  get comments(): Comments[] {
    return this.comment.getValue();
  }

   set comments(val: Comments[]) {
    this.comment.next(val);
  }




  getAllComments(id: number) {    
    console.log(this.ArticlesUrl+'Comment/Get/'+id)
    return this.httpClient.get(this.ArticlesUrl+'Comment/Get/'+id).pipe(
      map((comments) => {
        this.comments = comments  as Comments[];
      }));
  }

  async DeleteAllCommentsByArticle(id: number) 
    {
      const response = await this.httpClient.delete(this.ArticlesUrl+"Comment/DeleteAllCommnetByArticle/"+id).toPromise();
      this.comments = response as Comments[]; 
      return "Article is delete!";
    }

    async addCommentByFavoriteArticle(commet: Comments) {
      const response  =await this.httpClient.post(this.ArticlesUrl + 'Comment/Add', commet).toPromise();
      this.comments = response as Comments[]; 
      return "Comment is add";
  }

  async RemoveComment(id: number) 
  {
    try { 
      const response = await this.httpClient.delete(this.ArticlesUrl+"Comment/DeleteCommnet/"+id).toPromise(); 
      this.comments = response as Comments[]; 
    } catch (error) { 
      console.log("Error"); 
    } 
 }
 
 async UpdateCommet(id: number , newcomment: Comments  ) { 
  try { 
    const response = await this.httpClient.put(this.ArticlesUrl+'Comment/UpdateComment/'+id ,newcomment ).toPromise(); 
    this.comments = response as Comments[]; 
      
  } catch (error) { 
    console.log("Error"); 
  } 
}

}