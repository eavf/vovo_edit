import { TestBed } from '@angular/core/testing';

import { VovoEditorContentService } from './vovo-editor-content.service';

describe('EditorContentService', () => {
  let service: VovoEditorContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VovoEditorContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
