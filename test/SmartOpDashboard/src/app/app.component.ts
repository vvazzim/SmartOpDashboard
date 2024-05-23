import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartOpDashboard';
  data: any[] = [];
  settings = {
    columns: {
      chirurgien: { title: 'Chirurgien' },
      specialty: { title: 'Spécialité' },
      count: { title: 'Nombre d’interventions' },
      anesthesisteFavori: { title: 'Anesthésiste Favori' },
      infirmiereFavori: { title: 'Infirmière Favori' },
      salleFavori: { title: 'Salle Favori' },
      interventionFavori: { title: 'Intervention Favori' }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: false // Disable pagination display
    }
  };

  page: number = 1;
  limit: number = 10;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {
    this.loadChirurgiens();
  }

  loadChirurgiens() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.http.get<any[]>(`http://localhost:3000/api/interventions/chirurgiens?page=${this.page}&limit=${this.limit}`)
      .subscribe(newData => {
        this.data = [...this.data, ...newData];
        this.page++;
        this.isLoading = false;
      }, error => {
        console.error('Error loading more data:', error);
        this.isLoading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const threshold = 150;
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    if (position > height - threshold && !this.isLoading) {
      this.loadChirurgiens();
    }
  }
}
