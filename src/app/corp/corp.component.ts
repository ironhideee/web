import { FileValidators } from './../file-validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-corp',
  templateUrl: './corp.component.html',
  styleUrls: ['./corp.component.sass']
})
export class CorpComponent implements OnInit {

  formDoc: FormGroup;
  formDoc2: FormGroup;

  directors = ['Alice', 'Bob', 'Charles'];

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.formDoc = this._fb.group({
      basicfile1: [],
      basicfile2: [],
      basicfile3: [],
    });

    this.formDoc2 = this._fb.group({
      basicfile5: [],
    });
  }

  onSubmit() {
    // TODO: logic for submitting the director documents
  }

}
