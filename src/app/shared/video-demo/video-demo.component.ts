import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'video-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './video-demo.component.html',
  styleUrls: ['./video-demo.component.css']
})
export class VideoDemoComponent {

  @Input() videoPath?: string = '../../../assets/QuizMaker_demo.mp4';

  constructor(
    public dialogRef: MatDialogRef<VideoDemoComponent>,
    private sanitizer:DomSanitizer) { }

  closeDialog(){
    this.dialogRef.close();
  }

  getURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoPath);
  }
}

