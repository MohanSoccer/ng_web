import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserRole } from 'src/app/enums/user-role.enum';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  filter:boolean = false;

  itemList: Item[] = [];
  constructor(private itemService: ItemService,private authService:AuthenticationService) { }

  ngOnInit() {

    // console.log( if (Object.keys(this.authService.loggedInUser).length != 0) {);
    this.getItemList();
  }
  // deleteItem(id) {
  //   this.itemService.deleteItem(id).subscribe(res => {
  //     this.utility.showSuccess("Successfully Deleted");
  //     this.getItemList();
  //   });
  // }

  hasAccess(role:string)
  {
    return this.authService.canView(role);
  }

  getItemList() {
    this.itemService.getAllItem(4552).subscribe((res: Item[]) => {
      this.itemList = res;
    })
  }

}
