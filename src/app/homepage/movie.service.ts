import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }
  private movies: Movie[] = [
    // Dummy data
    {
      id: 1,
      title: 'Movie 1',
      description: 'Description of Movie 1',
      posterUrl: 'path/to/poster1.jpg',
      year: 2020,
      language: 'English',
      genre: ['Action', 'Drama'],
    },
    // Add more movies
  ];

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }
}
