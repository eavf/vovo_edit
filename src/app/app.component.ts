import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VovoEditorPreviewWrapperComponent } from './vovo-editor-preview-wrapper/vovo-editor-preview-wrapper.component'; // ✅ Import Wrapper Component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VovoEditorPreviewWrapperComponent], // ✅ Add it to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {}
