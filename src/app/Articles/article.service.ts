import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Articles } from './article.interface';

@Injectable()
export class ArticletService {
  ArticlesUrl = 'http://localhost:9090/';



  article = new BehaviorSubject<Articles[]>([]);
  public  articles$ = this.article;

  constructor(private httpClient: HttpClient) {
  }
   
  get articles(): Articles[] {
    return this.article.getValue();
  }

   set articles(val: Articles[]) {
    this.article.next(val);
  }

  async getMostPupularArticlesFromToday(from: string, to: string ,language: string ) { 
    try { 
      const response = await this.httpClient.get(this.ArticlesUrl+'GetArticleMostPopular/*&from='+from+'&to='+to+"&language="+language).toPromise(); 
      this.articles = response as Articles[]; 
      
     
    } catch (error) { 
      console.log("Error"); 
    } 
  }

  async GetArticleByKeyWord(keyword: string, language: string) { 
    try { 
      const response = await this.httpClient.get(this.ArticlesUrl+'GetArticleByKeyWord/'+keyword +"&language="+language).toPromise(); 
      this.getAllArticles();
      } catch (error) { 
      console.log("Error"); 
    } 
  }



  getAllArticles() {
    
    return this.httpClient.get(this.ArticlesUrl+'GetArticle').pipe(
      map((articles) => {
        this.articles = articles  as Articles[];
      }));
  }

  getFavoriteArticles() {  
    return this.httpClient.get(this.ArticlesUrl+'FavoriteArticle').pipe(
      map((articles) => {
        this.articles = articles  as Articles[];
      }));
  }

  getArticle(id: number) 
    {
      return this.httpClient.get(this.ArticlesUrl+"GetArticleID/"+id).pipe
      ( map((articles) => 
      { this.articles[id] = articles as Articles; 
      return this.article; }) 
      ); 
    }

    getFavoriteArticle(id: number ) 
    {
      return this.httpClient.get(this.ArticlesUrl+"GetFavoriteArticleID/"+id).pipe
      ( map((articles) => 
      { this.articles[id] = articles as Articles; 
      return this.article; }) 
      ); 
    }

    async RemoveFavoriteArticle(id: number) 
    {
      try { 
        const response = await this.httpClient.delete(this.ArticlesUrl+"DeleteFavoriteArticle/"+id).toPromise(); 
        this.articles = response as Articles[]; 
      } catch (error) { 
        console.log("Error"); 
      } 
   }

     async addFAvoriteArticle(article: Articles): Promise<string> {
        const response  =await this.httpClient.post(this.ArticlesUrl + 'AddFAvaoriteArticle', article).toPromise();
        return response?.toLocaleString()|| "No infromation error";
    }

    async ClearArticle() { 
      try { 
        const response = await this.httpClient.delete(this.ArticlesUrl+"DeleteArticle").toPromise(); 
        this.articles = response as Articles[]; 
        
       
      } catch (error) { 
        console.log("Error"); 
      } 

    }

}