import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../../services/file-upload.service';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { SharedModule } from '../../shared.module';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFiles: FileList | null = null;
  selectedFileSize: number | null = null;
  selectedFileModified: Date | null = null;
  selectedFileName: string | null = null;
  currentFile?: File;
  progress = 0;
  message = '';
  
  // Track upload and processing status
  uploadStatus: 'idle' | 'uploading' | 'processing' | 'success' | 'error' = 'idle';

  @Input()
  fileType?: string;

  fileInfos?: Observable<object>;

  constructor(private uploadService: FileUploadService, private logger: NGXLogger) { }

  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = input.files;
      const file = input.files[0];
      this.selectedFileSize = file.size;
      this.selectedFileModified = new Date(file.lastModified);
      this.selectedFileName = file.name;
      
      // Reset message and status on new file select
      this.message = '';
      this.uploadStatus = 'idle';
      this.progress = 0;
    } else {
      this.selectedFiles = null;
      this.selectedFileSize = null;
      this.selectedFileModified = null;
      this.selectedFileName = null;
      this.message = '';
      this.uploadStatus = 'idle';
      this.progress = 0;
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.uploadStatus = 'uploading';
        this.message = '';

        this.uploadService.upload(this.currentFile, this.fileType ?? 'ManualLending').subscribe({
          next: (event: HttpEvent<unknown>) => {
            if (event.type === HttpEventType.UploadProgress && event.total) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              // Upload complete, backend processing expected
              this.uploadStatus = 'processing';
            }
          },
          error: (err: HttpErrorResponse) => {
            this.logger.error('Upload error:', err);
            this.progress = 0;
            this.uploadStatus = 'error';

            if (err.error && typeof err.error === 'object' && err.error.message) {
              this.message = err.error.message;
            } else if (typeof err.error === 'string' && err.error.trim().length > 0) {
              this.message = err.error;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          },
          complete: () => {
            // Backend finished processing and responded successfully
            this.uploadStatus = 'success';
            this.progress = 100;
            this.message = 'Upload and processing completed successfully!';
            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = null;
    }
  }

  clearSelection(): void {
    this.selectedFiles = null;
    this.selectedFileName = null;
    this.selectedFileSize = null;
    this.selectedFileModified = null;
    this.message = '';
    this.uploadStatus = 'idle';
    this.progress = 0;
    this.currentFile = undefined;
  }
  
}
