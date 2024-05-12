import { TestBed } from '@angular/core/testing';

import { CategoriaService } from './services/categoria.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('AppService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'http://45.79.199.80:8080/minidonas/categories'; // Ruta al API

  constructor(private http: HttpClient) { }

  getAllCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
