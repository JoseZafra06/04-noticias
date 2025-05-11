/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  //Otra forma aparte del input
  get articles(): Article[]{
  return this.storageService.getLocalArticles;
  }

  constructor(private storageService: StorageService) {}

}
