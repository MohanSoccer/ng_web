import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  employee: any = [];
  editEmployee;
  constructor(private empService: EmployeeService, private utility: UtilityService, private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.empService.getAllEmployees().subscribe(
      (employee: any) => {
        this.employee = employee;
      }
    )
  }

  deleteEmployee(employeeId: any) {
    this.confirmDialogService.confirmThis("Are you sure to delete?", () => {
      this.empService.deleteEmployeeById(employeeId).subscribe(
        (res: any) => {
          this.utility.showSuccess("Employee Deleted successfully");
          this.getAllEmployees();
        }
      )
    }, () => {
    })

  }

}
