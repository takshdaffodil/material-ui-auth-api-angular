import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormEditorComponent } from '../form-editor/form-editor.component';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css'],
})
export class FormCreatorComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  editModelData: any;
  openModal = false;
  input: any;
  todo: any;
  done: any[] = [];

  myForm: FormGroup = this.fb.group({});

  ngOnInit() {
    this.http.get('../../assets/input-text.json').subscribe((inputData) => {
      this.input = inputData;
      this.todo = this.input.controls;
      this.createForm(this.todo);
    });
  }

  createForm(controls: any) {
    for (const control of controls) {
      this.myForm.addControl(control.name, this.fb.control(''));
    }
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.done);
  }

  openEditModal(formdata: any) {
    this.openModal = true;
    this.editModelData = formdata;
    this.dialog.open(FormEditorComponent, { data: formdata });
  }
}
