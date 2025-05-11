/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  //El static pq cuando iniciale no tome valor undefined
  @ViewChild( IonInfiniteScroll , {static: true}) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = ['business','entertainment','general','health','science','sports','technology'];
  public selectedCategory: string = this.categories[0];

  //Proporcionar art al html
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

//los nuevos art se acumulen dentro de esos nuevis articulos

  ngOnInit(): void {
    console.log(this.infiniteScroll);
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe(articles => {
      this.articles = [ ...articles ];
    })
  }

  segmentChanged(event: any){
    this.selectedCategory = event.detail.value;
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
    .subscribe(articles => {
      this.articles = [  ...articles,];
    })
  }



  loadData() {
    //trae info
    this.newsService.getTopHeadLinesByCategory( this.selectedCategory, true )
      .subscribe( articles => {

          if ( articles.length === this.articles.length ) {
             //event.target.disabled = true;
             this.infiniteScroll.disabled = true;
            return;
          }


          this.articles = articles;
          //event.target.complete();
          this.infiniteScroll.complete();
        })

        console.log(this.infiniteScroll);
      }

}
