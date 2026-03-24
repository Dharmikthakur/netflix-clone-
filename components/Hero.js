import styles from '../styles/Hero.module.css';

const IMG_BASE = 'https://image.tmdb.org/t/p/original';
const PLACEHOLDER = 'https://via.placeholder.com/1280x720/141414/e50914?text=Netflix';

export default function Hero({ movie, onPlay, onMoreInfo }) {
  if (!movie) return null;

  const title = movie.title || movie.name || 'Featured';
  
  let backdrop = PLACEHOLDER;
  if (movie.backdrop_url) backdrop = movie.backdrop_url;
  else if (movie.backdrop_path) backdrop = `${IMG_BASE}${movie.backdrop_path}`;
  const overview = movie.overview?.length > 200
    ? movie.overview.slice(0, 200) + '...'
    : movie.overview;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${backdrop})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.badge}>
          {movie.media_type === 'tv' ? '📺 Series' : '🎬 Movie'}
        </div>
        <h1 className={styles.title}>{title}</h1>
        {rating && (
          <div className={styles.meta}>
            <span className={styles.rating}>⭐ {rating}</span>
            {movie.release_date && (
              <span className={styles.year}>{movie.release_date.slice(0, 4)}</span>
            )}
            {movie.original_language && (
              <span className={styles.lang}>{movie.original_language.toUpperCase()}</span>
            )}
          </div>
        )}
        <p className={styles.overview}>{overview}</p>
        <div className={styles.actions}>
          <button className="btn btn-white" onClick={onPlay} id="hero-play">
            <svg fill="black" viewBox="0 0 24 24" width="20" height="20">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
          <button className="btn btn-secondary" onClick={onMoreInfo} id="hero-more-info">
            <svg fill="white" viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
