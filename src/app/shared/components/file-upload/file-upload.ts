import { Component, input, output, signal } from '@angular/core';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  readonly accept = input<string>('.pdf,.xlsx,.csv');
  readonly maxFileSizeMB = input<number>(10);

  readonly fileSelected = output<File>();
  readonly fileDeleted = output<string>();

  protected readonly isDragOver = signal(false);
  protected readonly filesList = signal<UploadedFile[]>([
    {
      id: 'mock-1',
      name: 'attendance_q1.xlsx',
      size: 15420,
      progress: 85,
      status: 'uploading'
    }
  ]);

  // Triggered when file is chosen via file selector dialog
  protected onFileChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.files && inputEl.files.length > 0) {
      this.handleFile(inputEl.files[0]);
    }
  }

  // Handle Drag Over events to update styling
  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  // Handle Drag Leave
  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  // Handle Drop
  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  // Process chosen or dropped file and simulate progress bar
  private handleFile(file: File): void {
    // Validate file size
    const maxSize = this.maxFileSizeMB() * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size exceeds the maximum limit of ${this.maxFileSizeMB()}MB.`);
      return;
    }

    const fileId = Math.random().toString(36).substring(2, 9);
    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading',
    };

    // Add to local list and emit file
    this.filesList.update(list => [...list, newFile]);
    this.fileSelected.emit(file);

    // Simulate reactive progress bar incrementing to match screenshot
    const interval = setInterval(() => {
      this.filesList.update(list => 
        list.map(f => {
          if (f.id === fileId) {
            const nextProgress = f.progress + 5;
            if (nextProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'completed' };
            }
            return { ...f, progress: nextProgress };
          }
          return f;
        })
      );
    }, 100);
  }

  protected removeFile(id: string): void {
    this.filesList.update(list => list.filter(f => f.id !== id));
    this.fileDeleted.emit(id);
  }
}
