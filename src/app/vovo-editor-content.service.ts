import { Injectable } from '@angular/core';

@Injectable()  // Remove providedIn: 'root'
export class VovoEditorContentService {
  private content: string = '';
  private apiEndpoint: string = '';  // Add apiEndpoint

  setContent(newContent: string) {
    this.content = newContent;
  }

  getContent(): string {
    return this.content;
  }

  setApiEndpoint(apiEndpoint: string) {  // Method to set the API endpoint
    this.apiEndpoint = apiEndpoint;
  }

  getApiEndpoint(): string {
    return this.apiEndpoint;
  }
}
