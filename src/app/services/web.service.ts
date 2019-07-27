import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { Login } from '../services/models/login.model';
import { Observable } from 'rxjs';
import { Articles } from './models/articles.model';
import { Notify } from './models/notify.model';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  SERVER_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  checkLogin(login: Login): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/news/api/login.php`, { data: login });
  }

  getArticles(): Observable<Articles[]> {
    return this.http.get<Articles[]>(`${this.SERVER_URL}/news/api/articles/get.php`);
  }

  getSingleArticle(id: Number): Observable<Articles> {
    return this.http.get<Articles>(`${this.SERVER_URL}/news/api/articles/get_single.php?id=${id}`);
  }

  addArticle(article: Articles): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/news/api/articles/add.php`, { data: article });
  }
  updateArticle(article: Articles): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/news/api/articles/update.php`, { data: article });
  }
  deleteArticle(id: Number): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/news/api/articles/delete.php`, { data: { 'id': id } });
  }

  getNotify(): Observable<Notify[]> {
    return this.http.get<Notify[]>(`${this.SERVER_URL}/news/api/notify/get.php`);
  }
  addNotify(notify: Notify): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/news/api/notify/add.php`, { data: notify });
  }

  sentNotify(notify: Notify): Observable<any> {
    return this.http.post('https://us-central1-flutternews-66169.cloudfunctions.net/sendToTopic', { 'title': notify.title, 'content': notify.content });
  }
  deleteNotify(id: Number): Observable<any> {
    return this.http.post(`${this.SERVER_URL}/news/api/notify/delete.php`, { data: { 'id': id } });
  }
}
