import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VovoPreviewComponent } from './vovo-preview.component';

describe('VovoPreviewComponent', () => {
  let component: VovoPreviewComponent;
  let fixture: ComponentFixture<VovoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VovoPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VovoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
