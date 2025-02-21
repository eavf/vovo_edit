import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VovoEditorContentService } from '../vovo-editor-content.service';  // Import the shared service

@Component({
  selector: 'app-vovo-editor',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './vovo-editor.component.html',
  styleUrls: ['./vovo-editor.component.css']
})

export class VovoEditorComponent implements AfterViewInit {
  content: string = '';

  // Reference to the editor div
  @ViewChild('editor', { static: false }) editor!: ElementRef<HTMLDivElement>;

  // Reference to the hidden file input for image upload
  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef<HTMLInputElement>;

  @Output() goToPreview = new EventEmitter<void>();

  apiEndpoint: string = '';  // Initialize as empty, will be set in ngOnInit()
  isPreviewMode: boolean = false;
  hasApiEndpoint: boolean = false; // Add a boolean to track apiEndpoint

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private contentService: VovoEditorContentService
  ) {} // Inject the content service

  ngAfterViewInit() {
    // Load existing content when navigating back to the editor
    this.content = this.contentService.getContent() || '<p>Start writing your article...</p>';
    this.editor.nativeElement.innerHTML = this.content;

    // Trigger change detection to resolve the ExpressionChanged error
    this.cdr.detectChanges();
    setTimeout(() => {
      this.hasApiEndpoint = !!this.contentService.getApiEndpoint();   // Determine apiEndpoint after view init
    });
  }

  // Formatting functions
  format(event: Event, command: string, value: string = '') {
    event.preventDefault();
    event.stopPropagation();
    console.log('Executing command:', command, 'with value:', value);
    try {
      document.execCommand(command, false, value);
      this.updateContent();
    } catch (error) {
      console.error('Error executing command:', command, error);
    }
  }


  clearFormatting(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    document.execCommand('removeFormat');
    this.updateContent();
  }

  // Update content in real-time
  updateContent() {
    this.content = this.editor.nativeElement.innerHTML;
    this.contentService.setContent(this.content);  // Save content in service
  }

    // Submit the content to the server
  submitContent() {
    const apiEndpoint = this.contentService.getApiEndpoint();
    if (!apiEndpoint) {
      alert('API endpoint is not specified!');
      return;
    }

    const payload = { content: this.content };
    this.http.post(apiEndpoint, payload).subscribe({
      next: (response) => {
        alert('Content submitted successfully!');
        console.log('Server response:', response);
      },
      error: (error) => {
        alert('Error submitting content.');
        console.error('Submission error:', error);
      }
    });
  }

  // Trigger preview mode
  triggerPreview() {
    console.log('Componnent triggered function triggerPreview');
    this.updateContent();
    this.goToPreview.emit();
  }

  // Trigger the hidden file input to upload an image
  triggerImageUpload() {
    this.imageInput.nativeElement.click();
  }

  // Handle image upload and insert into the editor
  uploadImageEncoded(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imgSrc = e.target?.result as string;

        // Insert the uploaded image at the cursor position
        const imgTag = `<img src="${imgSrc}" style="width: 75px; height: auto; display: inline-block; margin: 10px 0;" alt="Uploaded Image">`;
        document.execCommand('insertHTML', false, imgTag);

        this.updateContent();
      };

      reader.readAsDataURL(file);
    }
  }

  uploadImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      const formData = new FormData();
      formData.append('image', file);

      // Simulate uploading the image by adding an entry to json-server
      this.http.post<{ id: number, imageUrl: string }>('http://localhost:3000/images', {
        imageUrl: `http://localhost:3000/uploads/images/${file.name}`
      }).subscribe({
        next: (response) => {
          const imgTag = `<img src="${response.imageUrl}" style="width: 75px; height: auto; display: inline-block; margin: 10px 0;" alt="Uploaded Image">`;
          document.execCommand('insertHTML', false, imgTag);
          this.updateContent();
        },
        error: (error) => {
          alert('Error uploading image.');
          console.error('Image upload error:', error);
        }
      });
    }
  }

  // Image Styling Logic
  selectedImage: HTMLImageElement | null = null;
  imageStyles = {
    width: '75px',
    height: 'auto',
    borderRadius: '0px',
    float: 'none'
  };

  onEditorClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      this.selectedImage = target as HTMLImageElement;
      this.loadCurrentImageStyles();
    } else {
      this.selectedImage = null;
    }
  }

  loadCurrentImageStyles() {
    if (this.selectedImage) {
      const style = this.selectedImage.style;
      this.imageStyles.width = style.width || '75px';
      this.imageStyles.height = style.height || 'auto';
      this.imageStyles.borderRadius = style.borderRadius || '0px';
      this.imageStyles.float = style.float || 'none';
    }
  }

  applyImageStyles() {
    if (this.selectedImage) {
      this.selectedImage.style.width = this.imageStyles.width;
      this.selectedImage.style.height = this.imageStyles.height;
      this.selectedImage.style.borderRadius = this.imageStyles.borderRadius;

      if (this.imageStyles.float === 'left' || this.imageStyles.float === 'right') {
        this.selectedImage.style.float = this.imageStyles.float;
        this.selectedImage.style.display = 'inline';
        this.selectedImage.style.margin = '10px';
      } else {
        this.selectedImage.style.float = 'none';
        this.selectedImage.style.display = 'block';
        this.selectedImage.style.margin = '10px auto';
      }

      this.updateContent();
    }
  }

  deselectImage() {
    this.selectedImage = null;
  }

}
