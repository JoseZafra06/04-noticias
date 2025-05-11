//API transformado a tp desde https://app.quicktype.io/

export interface NewResponse {
  status:       string;
  totalResults: number;
  articles:     Article[];
}

export interface Article {
  source:       Source;
  author?:      string;
  title:        string;
  description?: string;
  url:          string;
  urlToImage?:   null | string;
  publishedAt:   Date;
  content?:     string;
}

export interface Source {
  id?:   string;
  name: string;
}

//Refactoorizacion para que no lanze de nuevo una peticion al cambiar de pag...se tienen todas las categorias

export interface ArticlesByCategoryAndPage {
  [key: string]: {
      page: number;
      articles: Article[];
  };
}
