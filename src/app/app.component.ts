import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-error-handling';

  data: string| null = null;
  error: string | null = null;
  loading:boolean = false;

  constructor(private apiService: ApiService) {}

  fetchData() {
    this.apiService.simulateHttpRequest()
    .subscribe({
      next: response => {
        this.data = response.data;
        this.error = null;
        this.loading = true;
      },
      error: err => {
        this.data = null;
        this.error = err;
        this.loading = false;
      }
    })

  }

}
