import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit {
  x = this.form.group({
    password: [null, Validators.required],
    one: [null, Validators.required],
    two: [null, Validators.required],
    three: [null, Validators.required],
    four: [null, Validators.required],
    five: [null, Validators.required],
    // password: [null, Validators.required],
    // password: [null, Validators.required],
    // password: [null, Validators.required],
    // password: [null, Validators.required],
    // password: [null, Validators.required],
    // password: [null, Validators.required],

  });
  constructor(private form: FormBuilder) { }

  ngOnInit() {
  }

}
