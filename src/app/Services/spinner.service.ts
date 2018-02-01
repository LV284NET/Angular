import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FooterService } from './../Services/footer.service';

@Injectable()
export class SpinnerService {

  private spinnerSet = new Set<SpinnerComponent>();

  constructor( private footerService:FooterService ) {
    
   }

  public Register(spinner: SpinnerComponent): void {
    this.spinnerSet.add(spinner);
  }

  public ShowSpinner(spinnerName: string): void {
    this.spinnerSet.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.isShown = true;
        this.footerService.HideFooter();
      }
    });
  }

  public HideSpinner(spinnerName: string): void {
    this.spinnerSet.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.isShown = false;
        this.footerService.ShowFooter();
      }
    });
  }
}
