import { Component, EventEmitter, Input, Output, NgZone } from '@angular/core';
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

  constructor(
    private sanitizer: DomSanitizer,
    private ngZone: NgZone // Inject NgZone
  ) {}

  ngOnInit() {
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.content);
  }

  backToEditor(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('Component triggered function triggerPreview');
    this.ngZone.runOutsideAngular(() => {
      this.closePreview.emit();   // Emitting the event
    });
  }
}
