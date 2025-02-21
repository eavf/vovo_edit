import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-vovo-preview',
  standalone: true,
  templateUrl: './vovo-preview.component.html',
  styleUrls: ['./vovo-preview.component.css']
})
export class VovoPreviewComponent {
  @Input() content: string = '';
  @Output() closePreview = new EventEmitter<void>();
  safeContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  backToEditor() {
    this.closePreview.emit();
  }
}
