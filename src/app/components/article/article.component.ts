import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;
  @Input() index: number;


  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
    ) { }

  ngOnInit() {}

  openArticle(){

  //si estuvieramos en navegador web; en mobil In App Browser para lanzamiento de la app en navegador
  //window.open(this.article.url, '_blank');

  if(this.platform.is('ios') || this.platform.is('android')){

    const browser = this.iab.create(this.article.url);
    browser.show();

  }
  window.open(this.article.url, '_blank');
  }


  async onOpenMenu(){

    const articleInFavorite = this.storageService.articleInFavorites(this.article);

      const normalBtns: ActionSheetButton[] = [
        {
          text: articleInFavorite? 'Remover Favorito' : 'Favorito',
          icon: articleInFavorite? 'heart': 'heart-outline',
          handler: () => {
            this.onToggleFavorite();
          },
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role:  'cancel',
        },
      ];

      const shareBtn: ActionSheetButton = {
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => this.onShareArticle()
      };
      if ( this.platform.is('capacitor') ) {
        normalBtns.unshift(shareBtn);
      }

      //ACTION SHEET
      const actionSheet =  await this.actionSheetController.create({
        header: 'Opciones',
        buttons: normalBtns
      });

      await actionSheet.present();

    }








    onShareArticle(){

      const { title, source, url } = this.article;
      this.socialSharing.share (
        title,
        source.name,
        null,
        url
      );
    }

    onToggleFavorite(){
      this.storageService.saveRemoveArticle(this.article);
    }
  }



