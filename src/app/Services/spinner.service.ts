import { Injectable } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';


@Injectable()
export class SpinnerService {

  private spinnerSet = new Set<SpinnerComponent>();

  constructor(  ) {
    
   }

  public Register(spinner: SpinnerComponent): void {
    this.spinnerSet.add(spinner);
  }

  public ShowSpinner(spinnerName: string): void {
    this.spinnerSet.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.isShown = true;
        
      }
    });
  }

  public HideSpinner(spinnerName: string): void {
    this.spinnerSet.forEach(spinner => {
      if (spinner.name === spinnerName) {
        spinner.isShown = false;
       
      }
    });
  }
}
