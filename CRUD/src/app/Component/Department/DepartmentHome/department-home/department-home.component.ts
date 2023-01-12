import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDepartment } from 'src/app/Models/IDepartment';
import { DepartmentService } from 'src/app/Services/Department/department.service';
import Swal from 'sweetalert2';
import { CreateDeptComponent } from '../../CreateDept/create-dept/create-dept.component';
import { UpdateDeptComponent } from '../../UpdateDept/update-dept/update-dept.component';

@Component({
  selector: 'app-department-home',
  templateUrl: './department-home.component.html',
  styleUrls: ['./department-home.component.scss'],
})
export class DepartmentHomeComponent implements OnInit {
  Departments: IDepartment[] = [];
  constructor(private DeptServ: DepartmentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.DeptServ.GetAllDepts().subscribe((Data: IDepartment[]) => {
      this.Departments = Data;
    });
  }

  Delete(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Delete Departemnt',
        text: 'Are You Sure You Want To Delete This Department',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.DeptServ.Delete(Number(id)).subscribe(() => {
            this.DeptServ.GetAllDepts().subscribe((Data: IDepartment[]) => {
              this.Departments = Data;
            });
          });
          swalWithBootstrapButtons.fire(
            ' Deleted',
            '  Department Is Deleted ',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancel',
            ' Department Not Deleted   ',
            'error'
          );
        }
      });
  }

  Create() {
    this.dialog
      .open(CreateDeptComponent, {
        height: '80%',
        width: '50%',
      })
      .afterClosed()
      .subscribe(() => {
        this.DeptServ.GetAllDepts().subscribe((Data: IDepartment[]) => {
          this.Departments = Data;
        });
      });
  }

  Update(id: number) {
    this.dialog
      .open(UpdateDeptComponent, {
        height: '80%',
        width: '50%',
        data: {
          id: id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.DeptServ.GetAllDepts().subscribe((Data: IDepartment[]) => {
          this.Departments = Data;
        });
      });
  }
}
