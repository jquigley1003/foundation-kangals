import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-get-photo-modal',
  templateUrl: './get-photo-modal.component.html',
  styleUrls: ['./get-photo-modal.component.scss'],
})
export class GetPhotoModalComponent implements OnInit {

  myImage = null;
  capturedImage = null;

  constructor() { }

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;
    this.capturedImage = `data:image/jpeg;base64,${image.base64String}`;
  }
}
