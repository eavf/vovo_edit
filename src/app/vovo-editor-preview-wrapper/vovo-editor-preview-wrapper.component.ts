import { Component, Input, OnInit } from '@angular/core';
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
  @Input() apiEndpoint: string = '';
  isPreviewMode = false;
  content: string = '';

  constructor(private contentService: VovoEditorContentService) {}

  ngOnInit(): void {
    let endpoint = this.apiEndpoint;
    // Check if apiEndpoint is provided as an attribute
    if (!endpoint) {

      // If not, check the window object
      if ((window as any)['apiEndpoint']) {
          endpoint = (window as any)['apiEndpoint'];
      }

      // If still no apiEndpoint, use a default
      if (!endpoint) {
          console.warn('API endpoint not specified as attribute or in window. Using default.');
      }
    }
    this.contentService.setApiEndpoint(endpoint);
  }

  goToPreview() {
    this.content = this.contentService.getContent();
    this.isPreviewMode = true;
  }

  backToEditor() {
    this.isPreviewMode = false;
  }



}
