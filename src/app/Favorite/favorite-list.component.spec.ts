import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteListComponent } from './favorite-list.component';


describe('ArticleService', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
