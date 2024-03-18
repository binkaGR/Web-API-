import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Articles } from '../Articles/article.interface';
import { ArticletService } from '../Articles/article.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { Language } from '../language.interface';



@Component({
  selector: 'app-search',
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
    TieredMenuModule ,
    CascadeSelectModule,
    
],
providers: [  
  MessageService, 
  ArticletService],
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})

export class SearchComponent implements OnInit {
  keyword: string = "";
  language: Language[] | undefined;

  selectedlanguage: Language | undefined;

  articles$: Observable<Articles[]> = this.articleService.articles$;
  loading: boolean = true;
  constructor(
    private articleService: ArticletService,
    private messageService: MessageService
  ) {}
  


  async ngOnInit() {
    this.loading = false;      

  this.language = [ { name: 'Bulgarian', code: 'bg' },
                     { name: 'Arabic', code: 'ar' },
                     { name: 'German', code: 'de' }, 
                     { name: 'English', code: 'en' }, 
                     { name: 'Spanish', code: 'es' }, 
                     { name: 'French', code: 'fr' }, 
                     { name: 'Hebrew', code: 'he' }, 
                     { name: 'Italian', code: 'it' }, 
                     { name: 'Dutch', code: 'nl' },
                     { name: 'Norwegian', code: 'no' }, 
                     { name: 'Portuguese', code: 'pt' }, 
                     { name: 'Russian', code: 'ru' }, 
                     { name: 'Swedish', code: 'sv' },
                     { name: 'Undefined', code: 'ud' }, 
                     { name: 'Chinese', code: 'zh' } ];

    this.articleService.getAllArticles().subscribe();   

  }

  async search(keyword: string) {
    this.loading = false;
    await this.articleService.ClearArticle();
    this.articleService.getAllArticles().subscribe(); 
    if(this.selectedlanguage?.code!== undefined){
    await this.articleService.GetArticleByKeyWord(keyword,this.selectedlanguage?.code );
    this.articleService.getAllArticles().subscribe();   
    this.messageService.add({
      severity: 'success',
      summary: "Search result by kyeword: " + keyword + this.selectedlanguage?.code,
      
   });  
  }
  else{
    this.messageService.add({
      severity: 'success',
      summary: "Contry code in mising or undefined",
      
   }); 
  }
 
  }


}