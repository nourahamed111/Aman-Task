import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDepartment } from 'src/app/Models/IDepartment';
import { DepartmentService } from 'src/app/Services/Department/department.service';

@Component({
  selector: 'app-update-dept',
  templateUrl: './update-dept.component.html',
  styleUrls: ['./update-dept.component.scss'],
})
export class UpdateDeptComponent implements OnInit {
  DeptForm: FormGroup;

  constructor(
    private Fb: FormBuilder,
    private DeptServ: DepartmentService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: IDepartment
  ) {
    this.DeptForm = Fb.group({
      id: [' '],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
    });
  }
  Update() {
    if (this.DeptForm.valid) {
      let department: IDepartment = this.DeptForm.value;
      this.DeptServ.UpdateDept(department.id, department).subscribe(() => {
        this.DeptForm.reset();
        this.dialog.closeAll();
      });
    }
  }
  ngOnInit(): void {
    this.DeptServ.GetDept(Number(this.data.id)).subscribe((data) => {
      this.DeptForm.setValue(data);
    });
  }
}
