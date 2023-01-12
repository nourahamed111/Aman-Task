import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDepartment } from 'src/app/Models/IDepartment';
import { DepartmentService } from 'src/app/Services/Department/department.service';

@Component({
  selector: 'app-create-dept',
  templateUrl: './create-dept.component.html',
  styleUrls: ['./create-dept.component.scss'],
})
export class CreateDeptComponent implements OnInit {
  DeptForm: FormGroup;

  constructor(
    private Fb: FormBuilder,
    private DeptServ: DepartmentService,
    private dialog: MatDialog
  ) {
    this.DeptForm = Fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
    });
  }

  ngOnInit(): void {}

  Add() {
    if (this.DeptForm.valid) {
      this.DeptServ.AddDept(this.DeptForm.value as IDepartment).subscribe(
        () => {
          this.DeptForm.reset();
          this.dialog.closeAll();
        }
      );
    }
  }
}
