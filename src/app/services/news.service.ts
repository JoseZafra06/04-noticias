/* eslint-disable @typescript-eslint/member-ordering */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { NewResponse, Article, ArticlesByCategoryAndPage } from '../interfaces';

//  crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos
import {map} from 'rxjs/operators';


//API
const apiKey = environment.apiKey;

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor(private http: HttpClient) { }


  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};


  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey,
        country: 'us',
      }
    });
  }

  //Observable es tipo de retorno, y article lo que voa retornar... se pudp dejar asi -_-
  /*
  getTopHeadLines(): Observable<Article[]> {
    return this.http.get<NewResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
     params: {apiKey}
    }) .pipe(
      //map( resp => resp.articles)
      map( ({articles }) => articles)
    );
  }

  getTopHeadLinesByCategory(category: string): Observable<Article[]> {
    return this.http.get<NewResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}`, {
     params: {apiKey}
    }) .pipe(
      //map( resp => resp.articles)
      map( ({articles }) => articles)
    );
  }
  */

  getTopHeadLines(): Observable<Article[]> {
    //Optimizar
    return this.getTopHeadLinesByCategory('business');
    /*
    return this.executeQuery<NewResponse>(`/top-headlines?category=business`)
      .pipe(
      map( ({ articles }) => articles )
     );
     */
 }


 //si la mando en falso voy a regresar lo que ya tengo en memoria
 getTopHeadLinesByCategory(category: string, loadMore: boolean = false ): Observable<Article[]> {

    //si quiere cargar mas art llama objeto
    if ( loadMore ) {
      return this.getArticlesByCategory( category );
    }

    //si no quiere cargar mas verifica si existe una categoria y si existe regresa esos art
    if ( this.articlesByCategoryAndPage[category] ) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    //Si no existe ese categoria tiene que ir a traer esos art
    return this.getArticlesByCategory( category );
}




//ve si ya existes la categoria recibida, hace una nueva peticion a sgte pag x consecuencia se tendra que incrementar pag en 1
private getArticlesByCategory( category: string ): Observable<Article[]> {

  if ( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) {
    // si esa llave incluye la categoria significa q ya existe
  } else {
    // No existe entonces la crea
    this.articlesByCategoryAndPage[category] = {
      page: 0,
      articles: []
    };
  }


  const page = this.articlesByCategoryAndPage[category].page + 1;

  //Traigo la informacion
  return this.executeQuery<NewResponse>(`/top-headlines?category=${ category }&page=${ page }`)
  .pipe(
    map( ({ articles }) => {

      //si es cero no se incrementa la pag solo regresa los art que ya se tiene
      if ( articles.length === 0 ) {return this.articlesByCategoryAndPage[category].articles;}

      //crea entrada con pag y art y los acumula pq puede ser que se tuviera
      this.articlesByCategoryAndPage[category] = {
        page,
        articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ]
      };

      return this.articlesByCategoryAndPage[category].articles;})
  );
}


}
