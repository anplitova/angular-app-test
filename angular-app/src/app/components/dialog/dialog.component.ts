import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() data: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.data = null;
  }
}
