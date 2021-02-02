import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { EventsService } from './../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  searchLoad = false;
  date: Date = new Date();
  list: Array<any> = [];
  file: any = null;
  dialogData: any;
  dialogShow: boolean = false;
  errorMessage: boolean = false;

  constructor(
    private readonly fb: FormBuilder, 
    private eventsService: EventsService,
    private datePipe: DatePipe) {
    this.addForm = this.fb.group({
      username: ['', Validators.required],
      unit: ['', Validators.required],
      list: ['', Validators.required],
      theme: ['', Validators.required],
      message: [''],
      file: [null]
    });
   }

  ngOnInit(): void {
  }

  get f() { return this.addForm.controls; }

  onInputSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if(value.length > 3 && !this.searchLoad) {
      this.searchEvents(value);
    }
  }

  searchEvents(value: string) {
    this.searchLoad = true;
    this.dialogShow = false;
    
    this.eventsService.findByTheme(value)
      .subscribe(
        response => {
          this.list = response;
          this.searchLoad = false;
        },
        error => {
          console.error(error);
          this.searchLoad = false;
        });
  }

  searchEvent(id: string) {
    this.eventsService.findById(id)
      .subscribe(
        response => {
          this.dialogData = response;
          this.dialogShow = true;
        },
        error => {
          console.error(error);
          this.dialogShow = false;
        });
  }

  onFileChange(event: Event) {
    const reader = new FileReader();
    const input = event.target as HTMLInputElement;
 
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.file = file;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.addForm.patchValue({
          file: reader.result
        });
      };
    }
  }

  checkMessageField() {
    this.errorMessage = !this.f.message.value && !this.f.file.value;
    return this.errorMessage;
  }

  onSubmit() {
    this.submitted = true;

    if (this.checkMessageField() || this.addForm.invalid) {
      return;
    }

    const data = {
      username: this.f.username.value,
      unit: this.f.unit.value,
      list: this.f.list.value.join(),
      theme: this.f.theme.value,
      message: this.f.message.value,
      file: this.f.file.value || '',
      date: this.datePipe.transform(this.date, 'dd-MM-yyyy'),
      time: this.datePipe.transform(this.date, 'HH:ss')
    }

    this.eventsService.add(JSON.stringify(data))
      .subscribe(
        response => {
          this.submitted = false;
          this.addForm.reset();
        },
        error => {
          console.log(error);
          this.submitted = false;
        });
  }

  onReset() {
    this.submitted = false;
    this.addForm.reset();
  }
}
