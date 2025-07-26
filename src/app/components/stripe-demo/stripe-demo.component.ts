import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stripe-demo',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './stripe-demo.component.html',
  styleUrl: './stripe-demo.component.scss'
})
export class StripeDemoComponent implements AfterViewInit {
  @ViewChild('signaturePad', { static: false }) signaturePad!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  fetchedImage: string | null = null;
  fetchedTimestamp: string | null = null;
  loading: boolean = false;

  ngAfterViewInit() {
    const canvas = this.signaturePad.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
  }

  stopDrawing() {
    this.drawing = false;
  }

  clear() {
    const canvas = this.signaturePad.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  submit() {
    const canvas = this.signaturePad.nativeElement;
    
  
    canvas.toBlob((blob) => {
      if (!blob) {
        alert('Failed to convert canvas to Blob.');
        return;
      }
  
      const formData = new FormData();
      formData.append('signature', blob, 'signature.png');
  
      const apiKey = '$2a$10$eH/.7wgtv1TcEUonPsdxDuIzjRKmcfA1VIzBpbZTN6bnmboZagiqm';
  
      fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
          'X-Master-Key': apiKey,
          // Note: No 'Content-Type' needed — browser sets it automatically with FormData
        },
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        console.log('Saved blob to JSONBin:', data);
        alert('Signature blob saved!');
        localStorage.setItem('jsonBinId', data.metadata.id);
      })
      .catch(err => console.error('Error saving blob:', err));
  
    }, 'image/png');
  }
  
  async getSignature(retries: number = 3) {
    const binId = localStorage.getItem('jsonBinId');
    const apiKey = '$2a$10$eH/.7wgtv1TcEUonPsdxDuIzjRKmcfA1VIzBpbZTN6bnmboZagiqm';

    if (!binId) {
      alert('No saved signature found.');
      return;
    }

    this.loading = true;
    this.fetchedImage = null;
    this.fetchedTimestamp = null;

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { 'X-Master-Key': apiKey }
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();
      this.fetchedImage = data.record.signature;
      this.fetchedTimestamp = data.record.timestamp || null;

    } catch (error) {
      console.error('Fetch error:', error);
      if (retries > 0) {
        console.warn(`Retrying... (${3 - retries + 1})`);
        this.getSignature(retries - 1);
      } else {
        alert('Failed to fetch signature after multiple attempts.');
      }
    } finally {
      this.loading = false;
    }
  }

  editSignature() {
    if (!this.fetchedImage) return;
    const canvas = this.signaturePad.nativeElement;
    const image = new Image();
    image.onload = () => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = this.fetchedImage;
  }
}
