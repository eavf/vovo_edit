import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VovoEditorComponent } from '../vovo-editor/vovo-editor.component';
import { VovoPreviewComponent } from '../vovo-preview/vovo-preview.component';
import { VovoEditorContentService } from '../vovo-editor-content.service';

@Component({
  selector: 'app-vovo-editor-preview-wrapper',
  standalone: true,
  imports: [CommonModule, VovoEditorComponent, VovoPreviewComponent],
  templateUrl: './vovo-editor-preview-wrapper.component.html',
  styleUrls: ['./vovo-editor-preview-wrapper.component.css'],
  providers: [VovoEditorContentService]
})

export class VovoEditorPreviewWrapperComponent {
  isPreviewMode = false;
  content: string = '';

  constructor(private contentService: VovoEditorContentService) {}

  goToPreview() {
    this.content = this.contentService.getContent();
    this.isPreviewMode = true;
  }

  backToEditor() {
    this.isPreviewMode = false;
  }
}
