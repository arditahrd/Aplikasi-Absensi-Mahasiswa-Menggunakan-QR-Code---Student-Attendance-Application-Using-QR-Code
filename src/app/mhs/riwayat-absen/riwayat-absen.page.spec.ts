import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiwayatAbsenPage } from './riwayat-absen.page';

describe('RiwayatAbsenPage', () => {
  let component: RiwayatAbsenPage;
  let fixture: ComponentFixture<RiwayatAbsenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiwayatAbsenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiwayatAbsenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
