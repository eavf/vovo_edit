import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VovoEditorComponent } from './vovo-editor.component';

describe('EditorComponent', () => {
  let component: VovoEditorComponent;
  let fixture: ComponentFixture<VovoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VovoEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VovoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
