import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IDepartment } from 'src/app/Models/IDepartment';
import { IEmployee } from 'src/app/Models/IEmployee';
import { DepartmentService } from 'src/app/Services/Department/department.service';
import { EmployeeService } from 'src/app/Services/Employee/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  EmpForm: FormGroup;
  Departments: IDepartment[] = [];

  constructor(
    private Fb: FormBuilder,
    private DeptServ: DepartmentService,
    private EmpServ: EmployeeService,
    private dialog: MatDialog
  ) {
    this.EmpForm = Fb.group({
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(2)]],
      title: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
      deptId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.DeptServ.GetAllDepts().subscribe((Data) => {
      this.Departments = Data;
    });
  }

  Add() {
    if (this.EmpForm.valid) {
      this.EmpServ.AddEmp(this.EmpForm.value as IEmployee).subscribe(() => {
        this.EmpForm.reset();
        this.dialog.closeAll();
      });
    }
  }
}
