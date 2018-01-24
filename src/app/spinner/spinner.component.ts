import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() name: string;
  @Input() loadingImage: string;
  @Input() isShown: boolean = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    if(!this.name) throw new Error("Spinner must have a 'name' attribute.")

    this.spinnerService.Register(this);
  }

}
