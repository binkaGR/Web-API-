import { Routes } from '@angular/router';
import { HomeListComponent } from './Home/home-list.component';
import { NewsComponent } from './News/news.component';
import { SearchComponent } from './Search/search-list.component';
import { PopularComponent } from './Popular/popular-list.component';
import { FavoriteListComponent } from './Favorite/favorite-list.component';

export const routes: Routes = [
    {title: 'Home', path: 'home', component: HomeListComponent},
    { path: 'search', component: SearchComponent },
    { path: 'popular', component: PopularComponent },
    { path: 'favoriteArticle', component: FavoriteListComponent },
    { path: 'news/:articleType/:id', component: NewsComponent}   , 
];
