import { Component, HostListener } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartOpDashboard';
  data: LocalDataSource = new LocalDataSource();
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
  isSearching: boolean = false;

  constructor(private http: HttpClient) {
    this.loadChirurgiens();
    this.data.onChanged().subscribe((change) => {
      if (change.action === 'filter') {
        this.isSearching = change.filter.filters.some((filter: any) => filter.search !== '');
      } else {
        this.isSearching = false;
      }
    });
  }

  loadChirurgiens() {
    if (this.isLoading) return;
    this.isLoading = true;
    const params = new HttpParams()
      .set('page', this.page.toString())
      .set('limit', this.limit.toString());

    this.http.get<any[]>('http://localhost:3000/api/interventions/chirurgiens', { params })
      .subscribe(newData => {
        if (this.page === 1) {
          this.data.load(newData);
        } else {
          newData.forEach(item => this.data.add(item));
          this.data.refresh();
        }
        this.page++;
        this.isLoading = false;
      }, error => {
        console.error('Error loading more data:', error);
        this.isLoading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.isSearching || this.isLoading) {
      return; // Do not load more data if a search is active or if data is already loading
    }

    const threshold = 150;
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    if (position > height - threshold) {
      this.loadChirurgiens();
    }
  }
}
