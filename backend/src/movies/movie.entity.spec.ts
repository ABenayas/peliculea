import { Movie } from './movie.entity';

describe('Movie entity', () => {
  it('should create a movie with the correct properties', () => {
    const movie = new Movie();
    movie.tmdbId = 123;
    movie.title = 'The Matrix';
    movie.releaseDate = '1999-03-31';
    movie.posterPath = '/matrix.jpg';
    movie.overview = 'Neo discovers the truth about the Matrix.';

    expect(movie.tmdbId).toBe(123);
    expect(movie.title).toBe('The Matrix');
    expect(movie.releaseDate).toBe('1999-03-31');
    expect(movie.posterPath).toBe('/matrix.jpg');
    expect(movie.overview).toContain('Matrix');
  });
});
