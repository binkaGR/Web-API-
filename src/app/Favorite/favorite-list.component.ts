import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { CommentService } from '../Comment/commnet.service';
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
    CalendarModule    
  ],
  providers: [  
    MessageService, 
    ArticletService , 
    CommentService],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss',
})

export class FavoriteListComponent implements OnInit {
  articles$: Observable<Articles[]> = this.articleService.articles$;
  loading: boolean = true;
  articleType : string | undefined;
  constructor(
    private articleService: ArticletService,
    private messageService: MessageService,
    private commentService: CommentService
  ) {}
  

  ngOnInit() {
    this.articleType = "FavariteArticle";
    this.loading = false;
    this.articleService.getFavoriteArticles().subscribe();  
  }

  async DeleteArticle(id: number)
  {
    this.loading = false;
    this.commentService.DeleteAllCommentsByArticle(id);
    await this.articleService.RemoveFavoriteArticle(id);
    this.articleService.getFavoriteArticles().subscribe();  

    this.messageService.add({
      severity: 'info',
      summary: "Article with id: "+ id +" is remove",
    });
  }
}

