import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDepartment } from 'src/app/Models/IDepartment';
import { IEmployee } from 'src/app/Models/IEmployee';
import { DepartmentService } from 'src/app/Services/Department/department.service';
import { EmployeeService } from 'src/app/Services/Employee/employee.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  EmpForm: FormGroup;
  Departments: IDepartment[] = [];

  constructor(
    private Fb: FormBuilder,
    private DeptServ: DepartmentService,
    private EmpServ: EmployeeService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee
  ) {
    this.EmpForm = Fb.group({
      id: [' '],
      fname: [' ', [Validators.required, Validators.minLength(2)]],
      lname: [' ', [Validators.required, Validators.minLength(2)]],
      title: [' ', [Validators.required, Validators.minLength(4)]],
      address: [' ', [Validators.required, Validators.minLength(4)]],
      deptId: [' ', [Validators.required]],
    });
  }
  Update() {
    if (this.EmpForm.valid) {
      let Employee: IEmployee = this.EmpForm.value;
      this.EmpServ.UpdateEmp(Employee.id, Employee).subscribe(() => {
        this.EmpForm.reset();
        this.dialog.closeAll();
      });
    }
  }
  ngOnInit(): void {
    this.EmpServ.GetEmp(Number(this.data.id)).subscribe((data) => {
      this.EmpForm.setValue(data);
    });
    this.DeptServ.GetAllDepts().subscribe((Data) => {
      this.Departments = Data;
    });
  }
}
