import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { withCache } from '@mdfrough/ngx-smart-cache';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cache-demo');
  products = signal<any[]>([]);
  constructor(private http: HttpClient) { }

  loadData() {
    this.http.get('https://dummyjson.com/products', {
      context: withCache({ ttl: 6000, tag: 'products' })
    }).subscribe((data: any) => this.products.set(data['products'] || []));
  }
}
