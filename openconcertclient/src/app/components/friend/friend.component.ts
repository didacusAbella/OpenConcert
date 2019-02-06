import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friend.component.html',
  host: { 'class': 'p-col-8' }
})
export class FriendComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }



}