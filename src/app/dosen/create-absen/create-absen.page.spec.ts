import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateAbsenPage } from './create-absen.page';

describe('CreateAbsenPage', () => {
  let component: CreateAbsenPage;
  let fixture: ComponentFixture<CreateAbsenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAbsenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAbsenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
