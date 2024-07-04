import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  constructor(private iconReg: MatIconRegistry, sanitizer: DomSanitizer) {
    this.iconReg.addSvgIcon(
      'exchange',
      sanitizer.bypassSecurityTrustResourceUrl('icons/exchange.svg')
    );
  }
}
