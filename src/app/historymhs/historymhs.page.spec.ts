import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorymhsPage } from './historymhs.page';

describe('HistorymhsPage', () => {
  let component: HistorymhsPage;
  let fixture: ComponentFixture<HistorymhsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorymhsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorymhsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
