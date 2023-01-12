import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from 'src/app/Component/Employee/Create-PopUp/create/create.component';
import { UpdateComponent } from 'src/app/Component/Employee/update/update.component';
import { IEmployee } from 'src/app/Models/IEmployee';
import { EmployeeService } from 'src/app/Services/Employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Employees: IEmployee[] = [];
  constructor(
    private EmployeeServ: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.EmployeeServ.GetAllEmps().subscribe((Data: IEmployee[]) => {
      this.Employees = Data;
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
        title: 'Delete Employee',
        text: 'Are You Sure You Want To Delete This Employee',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.EmployeeServ.Delete(Number(id)).subscribe(() => {
            this.EmployeeServ.GetAllEmps().subscribe((Data: IEmployee[]) => {
              this.Employees = Data;
            });
          });
          swalWithBootstrapButtons.fire(
            ' Deleted',
            '  Employee Is Deleted ',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancel',
            ' Employee Not Deleted   ',
            'error'
          );
        }
      });
  }

  Create() {
    this.dialog
      .open(CreateComponent, {
        height: '80%',
        width: '50%',
      })
      .afterClosed()
      .subscribe(() => {
        this.EmployeeServ.GetAllEmps().subscribe((Data: IEmployee[]) => {
          this.Employees = Data;
        });
      });
  }

  Update(id: number) {
    this.dialog
      .open(UpdateComponent, {
        height: '80%',
        width: '50%',
        data: {
          id: id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.EmployeeServ.GetAllEmps().subscribe((Data: IEmployee[]) => {
          this.Employees = Data;
        });
      });
  }
}
