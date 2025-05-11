/* eslint-disable no-underscore-dangle */
//https://github.com/ionic-team/ionic-storage
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  get getLocalArticles(){
    return [...this._localArticles];
  }

//De la pag de git::


  async init() {
    // Si lo usa, defina los controladores aquí: espere this.storage.defineDriver(/*...*/);;
    const storage = await this.storage.create();
    this._storage = storage;

    this.loadFavorites();
  }

  async saveRemoveArticle( article: Article ) {

    //si el art ya existe en _localArticles borrarlo pero si existe insertarlo
    //find() El método devuelve el primer elemento en la matriz proporcionada que satisface la función

    const exists = this._localArticles.find( localArticle => localArticle.title === article.title );

    if ( exists ) {

      this._localArticles = this._localArticles.filter( localArticle => localArticle.title !== article.title );
    } else {
       //nuevo articulo y los articulos definidos
      this._localArticles = [ article, ...this._localArticles];
    }

    //Grabar arreglo de _localArticles
    this._storage.set('articles', this._localArticles );

  }


  async loadFavorites() {

    try {

      const articles = await this._storage.get('articles');
      //si no tiene ninguna info (null) va regresar un arreglo vacio y la persona podra seguir insertan
      this._localArticles = articles || [];

    } catch (error) {

    }

  }


  //metodo que permita saber si esta en fav o no...si existe?
    articleInFavorites( article: Article ) {

    return !!this._localArticles.find( localArticle => localArticle.title === article.title );

  }
}
