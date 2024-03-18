import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

import { InputNumberModule } from 'primeng/inputnumber';
import { Articles } from '../Articles/article.interface';
import { ArticletService } from '../Articles/article.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { Language } from '../language.interface';
@Component({
  selector: 'app-article-list',
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
    CalendarModule,
    
  ],
  providers: [  
    MessageService, 
    ArticletService],
  templateUrl: './home-list.component.html',
  styleUrl: './home-list.component.scss',
})



export class HomeListComponent implements OnInit {
  articles$: Observable<Articles[]> = this.articleService.articles$;
  loading: boolean = true;
  selectedlanguage: Language | undefined;
  language: Language[] | undefined;
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


  async Search() {
    const currentDate = new Date();
    const from: string = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()-1}`; 
    const to: string = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()-1}`; 
    this.loading = false;
    await this.articleService.ClearArticle();
    this.articleService.getAllArticles().subscribe(); 

    if(this.selectedlanguage?.code!==undefined){
    await this.articleService.getMostPupularArticlesFromToday(from,to,this.selectedlanguage?.code); 
    this.articleService.getAllArticles().subscribe(); 
  }
    else{
      await this.articleService.getMostPupularArticlesFromToday(from,to,'en'); 
      this.articleService.getAllArticles().subscribe(); 
      this.messageService.add({
        severity: 'info',
        summary: "Language in not select!",

     });
    }


  }


}

