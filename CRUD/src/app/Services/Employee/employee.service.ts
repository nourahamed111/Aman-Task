import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/Models/IEmployee';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private GenricServ: GenericService) {}

  GetAllEmps(): Observable<IEmployee[]> {
    return this.GenricServ.GetAll('Employee');
  }

  GetEmp(id: number): Observable<IEmployee> {
    return this.GenricServ.GetOne('Employee', id);
  }

  AddEmp(Item: IEmployee): Observable<IEmployee> {
    return this.GenricServ.Add('Employee', Item);
  }

  UpdateEmp(id: number, item: IEmployee): Observable<IEmployee> {
    return this.GenricServ.Update('Employee', id, item);
  }

  Delete(id: number): Observable<IEmployee> {
    return this.GenricServ.Delete('Employee', id);
  }
}
