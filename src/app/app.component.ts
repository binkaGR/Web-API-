import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockModule } from 'primeng/dock';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root' , 
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DockModule,
    TieredMenuModule,
    MenubarModule,
    TableModule,FormsModule,
    CascadeSelectModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit  {
  title = 'routing-app';
  position: PositionOption = 'top';

  items: MenuItem[] = [
    {
      label: 'Finder',
      icon: 'assets/Logo-TU.png',
    },
  ];
  itemsMenu: MenuItem[] = [
    {
      label: 'Start',routerLink: "/home",
    },
    {
      label: 'Search', routerLink: "/search"
    },
    {
      label: 'MostPopularNews', routerLink: "/popular"
    },
    {
      label: 'FavoriteArticle', routerLink: "favoriteArticle", icon: PrimeIcons.STAR_FILL
    },
  ];


  
  ngOnInit() {
  }



}

type PositionOption = 'top' | 'bottom' | 'left' | 'right';
