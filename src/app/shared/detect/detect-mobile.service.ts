import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectMobileService {
  hasTouchScreen = false;

  constructor() { }

  checkForMobile() {
    if (navigator.maxTouchPoints > 0) {
      this.hasTouchScreen = true;
    } else if (navigator.maxTouchPoints > 0) {
      this.hasTouchScreen = true;
    } else {
      const mQ = window.matchMedia && matchMedia('(pointer:coarse)');
      if (mQ && mQ.media === '(pointer:coarse)') {
          this.hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
          this.hasTouchScreen = true; // deprecated, but good fallback
      } else {
          // Only as a last resort, fall back to user agent sniffing
          const UA = navigator.userAgent;
          this.hasTouchScreen = (
              /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
              /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
          );
      }
    }
  }
  // this.hasTouchScreen = true;
  // }
}
