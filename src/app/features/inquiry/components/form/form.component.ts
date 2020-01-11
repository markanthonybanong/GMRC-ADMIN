import { Component, OnInit, Input } from '@angular/core';
import { FormStoreState } from '../../services/form/form.store.state';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() state$: FormStoreState;
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() knownGMRCThrough: Array<string>;
  constructor() { }

  ngOnInit() {
  }

}
