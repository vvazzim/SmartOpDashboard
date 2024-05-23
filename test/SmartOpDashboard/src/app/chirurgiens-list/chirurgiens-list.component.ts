import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chirurgiens-list',
  templateUrl: './chirurgiens-list.component.html',
  styleUrls: ['./chirurgiens-list.component.css']
})
export class ChirurgiensListComponent implements OnInit {
  settings = {
    columns: {
      chirurgien: { title: 'Chirurgien' },
      specialty: { title: 'Spécialité' },
      count: { title: 'Nombre d\'interventions' },
      anesthesisteFavori: { title: 'Anesthésiste Favori' },
      infirmiereFavori: { title: 'Infirmière Favori' },
      salleFavori: { title: 'Salle Favori' },
      interventionFavori: { title: 'Intervention Favori' }
    }
  };

  data = [];
  page = 1;
  limit = 10;
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMoreData();
  }

  loadMoreData() {
    if (this.isLoading) {
      return; // Prevent multiple calls
    }
    this.isLoading = true;
    this.http.get<any[]>(`http://localhost:3000/api/interventions/chirurgiens?page=${this.page}&limit=${this.limit}`)
      .subscribe(newData => {
        this.data = [...this.data, ...newData];
        this.page++;
        this.isLoading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const threshold = 150;
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    if (position > height - threshold && !this.isLoading) {
      this.loadMoreData();
    }
  }
}
