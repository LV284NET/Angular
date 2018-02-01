import { Injectable } from '@angular/core';
import {SpinnerService } from './../Services/spinner.service';
import {FooterComponent} from '../footer/footer.component';

@Injectable()
export class FooterService {

  private footerSet = new Set<FooterComponent>();
 // private footerComponent: FooterComponent ;
  constructor() { }

  public Register(footer: FooterComponent): void {
    this.footerSet.add(footer);

  }

  public ShowFooter(){
    this.footerSet.forEach(footer =>
      footer.visible = true)
  }

  public HideFooter(){
    this.footerSet.forEach(footer =>
      footer.visible = false)
  }
}
