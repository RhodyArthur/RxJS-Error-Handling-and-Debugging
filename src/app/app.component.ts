import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';
import { Pet } from './interface/pet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-error-handling';

  data: Pet[] = [];
  error: string | null = null;
  loading:boolean = false;
  url: string = 'assets/data.json'

  constructor(private apiService: ApiService) {}

  fetchData() {
    this.loading = true;

    this.apiService.simulateHttpRequest(this.url)
    .subscribe({
      next: (response: Pet[]) => {
        this.data = response;
        // this.error = null;
        this.loading = false;
      },
      error: err => {
        this.error = err.message;
        this.data = [];
        this.loading = false;
      }
    })

  }

}
