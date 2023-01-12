import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDepartment } from 'src/app/Models/IDepartment';
import { GenericService } from '../GenericService/generic.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private GenricServ: GenericService) {}

  GetAllDepts(): Observable<IDepartment[]> {
    return this.GenricServ.GetAll('Department');
  }

  GetDept(id: number): Observable<IDepartment> {
    return this.GenricServ.GetOne('Department', id);
  }

  AddDept(Item: IDepartment): Observable<IDepartment> {
    return this.GenricServ.Add('Department', Item);
  }

  UpdateDept(id: number, item: IDepartment): Observable<IDepartment> {
    return this.GenricServ.Update('Department', id, item);
  }

  Delete(id: number): Observable<IDepartment> {
    return this.GenricServ.Delete('Department', id);
  }
}
