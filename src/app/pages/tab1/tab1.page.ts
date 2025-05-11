import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild( IonInfiniteScroll , {static: true}) infiniteScroll: IonInfiniteScroll;

//Proporcionar art al html
  public articles: Article[] = [];

  constructor(private newService: NewsService) {}

  ngOnInit() {

    //Cuando c recibe los art. push() añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
    this.newService.getTopHeadLines()
    // .subscribe( articles =>  this.articles.push( ...articles ));
    .subscribe( articles => {this.articles = [...articles, ...this.articles]; });
  }

  loadData() {

    this.newService.getTopHeadLinesByCategory( 'business', true )
      .subscribe( articles => {

          if ( articles.length === this.articles.length ) {
             //event.target.disabled = true;
             this.infiniteScroll.disabled = true;
            return;
          }


          this.articles = articles;
          //event.target.complete();
          this.infiniteScroll.complete();
        });

        console.log(this.infiniteScroll);
      }
}
