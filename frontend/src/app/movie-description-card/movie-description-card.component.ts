import {Component, Input, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
@Component({
  selector: 'app-movie-description-card',
  templateUrl: './movie-description-card.component.html',
  styleUrls: ['./movie-description-card.component.scss']
})
export class MovieDescriptionCardComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      id:number
    }
  ) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

}
