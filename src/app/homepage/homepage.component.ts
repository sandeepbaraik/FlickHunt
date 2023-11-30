import { Component } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchQuery = '';
  selectedYear = 'All';
  selectedLanguage = 'All';
  selectedGenre = 'All';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.filteredMovies = this.movies;
    });
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter((movie) =>
      this.filterBySearch(movie) &&
      this.filterByYear(movie) &&
      this.filterByLanguage(movie) &&
      this.filterByGenre(movie)
    );
  }

  private filterBySearch(movie: Movie): boolean {
    return movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());
  }

  private filterByYear(movie: Movie): boolean {
    return this.selectedYear === 'All' || movie.year.toString() === this.selectedYear;
  }

  private filterByLanguage(movie: Movie): boolean {
    return this.selectedLanguage === 'All' || movie.language === this.selectedLanguage;
  }

  private filterByGenre(movie: Movie): boolean {
    return this.selectedGenre === 'All' || movie.genre.includes(this.selectedGenre);
  }

  uniqueYears(): string[] {
    return Array.from(new Set(this.movies.map((movie) => movie.year.toString())));
  }

  // Function to get unique languages from the list of movies
  uniqueLanguages(): string[] {
    return Array.from(new Set(this.movies.map((movie) => movie.language)));
  }

  // Function to get unique genres from the list of movies
  uniqueGenres(): string[] {
    const allGenres: string[] = [];
    this.movies.forEach((movie) => {
      allGenres.push(...movie.genre);
    });
    return Array.from(new Set(allGenres));
  }
}
