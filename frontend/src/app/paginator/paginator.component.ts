import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MoviesService} from "../movies/movies.service";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {


  pages?: number;
  @Input() currentPage!: number;

  @Output() currentPageEmitter = new EventEmitter<number>()
  numberOfPage: number = 5;
  constructor(private service: MoviesService) { }

  ngOnInit(): void {
    this.service.getPages()
      .then(result =>{
        if(result.success){
          this.pages = result.size
          if(this.pages < this.numberOfPage){
            this.numberOfPage = this.pages;
          }
        }
        else{
          this.ngOnInit()
        }
      })
  }
  nextPage(): void{
    this.currentPage += 1
    this.currentPageEmitter.emit(this.currentPage);
  }
  previousPage(): void{
    this.currentPage -= 1
    this.currentPageEmitter.emit(this.currentPage);

  }
  setPage(event: any): void{
    this.currentPage = parseInt(event.target.id)
    this.currentPageEmitter.emit(this.currentPage);

  }

}
