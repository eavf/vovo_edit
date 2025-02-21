import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VovoEditorPreviewWrapperComponent } from './vovo-editor-preview-wrapper.component';

describe('EditorPreviewWrapperComponent', () => {
  let component: VovoEditorPreviewWrapperComponent;
  let fixture: ComponentFixture<VovoEditorPreviewWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VovoEditorPreviewWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VovoEditorPreviewWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
