import axios from 'axios';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

const MOCK_MOVIES = [
  { id: 1, title: 'Inception', name: 'Inception', backdrop_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&q=80', overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.', vote_average: 8.8, media_type: 'movie', genre_ids: [28, 878] },
  { id: 2, title: 'Interstellar', name: 'Interstellar', backdrop_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=500&q=80', overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', vote_average: 8.6, media_type: 'movie', genre_ids: [12, 18, 878] },
  { id: 3, title: 'The Matrix', name: 'The Matrix', backdrop_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1478760327341-a20c35f21295?w=500&q=80', overview: 'A computer hacker learns from mysterious rebels.', vote_average: 8.7, media_type: 'movie', genre_ids: [28, 878] },
  { id: 4, title: 'Stranger Things', name: 'Stranger Things', backdrop_url: 'https://images.unsplash.com/photo-1614316087508-3ab09419b48b?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1579621970588-a3f5ce5ca462?w=500&q=80', overview: 'When a young boy vanishes, a small town uncovers a mystery.', vote_average: 8.6, media_type: 'tv', genre_ids: [9648, 10765, 18] },
  { id: 5, title: 'Money Heist', name: 'Money Heist', backdrop_url: 'https://images.unsplash.com/photo-1627856017091-c2f68ba60971?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1582298538104-efa9cb107842?w=500&q=80', overview: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.', vote_average: 8.2, media_type: 'tv', genre_ids: [80, 18] },
  { id: 6, title: 'Breaking Bad', name: 'Breaking Bad', backdrop_url: 'https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&q=80', overview: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.', vote_average: 9.5, media_type: 'tv', genre_ids: [18] },
  { id: 7, title: 'The Witcher', name: 'The Witcher', backdrop_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1626245039366-0e104ec033ae?w=500&q=80', overview: 'Geralt of Rivia, a mutated monster-hunter for hire.', vote_average: 8.1, media_type: 'tv', genre_ids: [10765, 18, 10759] },
  { id: 8, title: 'Squid Game', name: 'Squid Game', backdrop_url: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34ce?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1518331539949-a35978ac24ec?w=500&q=80', overview: 'Hundreds of cash-strapped players accept a strange invitation.', vote_average: 8.0, media_type: 'tv', genre_ids: [18, 9648] },
  { id: 9, title: 'Peaky Blinders', name: 'Peaky Blinders', backdrop_url: 'https://images.unsplash.com/photo-1473950489958-307994b726bc?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1471115853179-bb1d604434e0?w=500&q=80', overview: 'A gangster family epic set in 191 Birmingham, England.', vote_average: 8.8, media_type: 'tv', genre_ids: [80, 18] },
  { id: 10, title: 'Dune', name: 'Dune', backdrop_url: 'https://images.unsplash.com/photo-1542385151-54a4901f40d6?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1473634351368-21d15fdaba39?w=500&q=80', overview: 'Paul Atreides, a brilliant and gifted young man born into a great destiny.', vote_average: 7.9, media_type: 'movie', genre_ids: [878, 12] },
  { id: 11, title: 'John Wick', name: 'John Wick', backdrop_url: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=500&q=80', overview: 'Ex-hitman John Wick comes out of retirement.', vote_average: 7.4, media_type: 'movie', genre_ids: [28, 53] },
  { id: 12, title: 'The Dark Knight', name: 'The Dark Knight', backdrop_url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&q=80', overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.', vote_average: 9.0, media_type: 'movie', genre_ids: [28, 80, 18] },
  { id: 13, title: 'Spider-Man', name: 'Spider-Man', backdrop_url: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=500&q=80', overview: 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man.', vote_average: 8.3, media_type: 'movie', genre_ids: [28] },
  { id: 14, title: 'Avengers', name: 'Avengers', backdrop_url: 'https://images.unsplash.com/photo-1620037166164-cd2adbe6c0ea?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1608889175123-8ee362204631?w=500&q=80', overview: 'Earth\'s mightiest heroes must come together.', vote_average: 8.4, media_type: 'movie', genre_ids: [28, 878] },
  { id: 15, title: 'Jurassic Park', name: 'Jurassic Park', backdrop_url: 'https://images.unsplash.com/photo-1517424667503-4c90ef2fe3ca?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1550259114-1fbc8eb12d1b?w=500&q=80', overview: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.', vote_average: 8.2, media_type: 'movie', genre_ids: [12, 878] },
  { id: 16, title: 'The Terminator', name: 'The Terminator', backdrop_url: 'https://images.unsplash.com/photo-1549643276-fdf2fab574f5?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=500&q=80', overview: 'A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress.', vote_average: 8.0, media_type: 'movie', genre_ids: [28, 878] },
  { id: 17, title: 'Gladiator', name: 'Gladiator', backdrop_url: 'https://images.unsplash.com/photo-1574618712760-48eefb2d3544?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1542845607-bb894d0c1536?w=500&q=80', overview: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', vote_average: 8.5, media_type: 'movie', genre_ids: [28, 18, 12] },
  { id: 18, title: 'Titanic', name: 'Titanic', backdrop_url: 'https://images.unsplash.com/photo-1509890479184-e9edfa9bf53c?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1481846937213-91b4af269da7?w=500&q=80', overview: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', vote_average: 7.9, media_type: 'movie', genre_ids: [18, 10749] },
  { id: 19, title: 'Avatar', name: 'Avatar', backdrop_url: 'https://images.unsplash.com/photo-1532057262070-13d803c4f74d?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1518063050961-75e11416fb90?w=500&q=80', overview: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', vote_average: 7.9, media_type: 'movie', genre_ids: [878, 12, 14, 28] },
  { id: 20, title: 'Forrest Gump', name: 'Forrest Gump', backdrop_url: 'https://images.unsplash.com/photo-1476307613626-d6b79796e680?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1511405946472-a37e3b5cb4b2?w=500&q=80', overview: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', vote_average: 8.8, media_type: 'movie', genre_ids: [18, 35, 10749] },
  { id: 21, title: 'The Lion King', name: 'The Lion King', backdrop_url: 'https://images.unsplash.com/photo-1548651810-6c9abda2128b?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=500&q=80', overview: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.', vote_average: 8.5, media_type: 'movie', genre_ids: [10751, 16, 18] },
  { id: 22, title: 'Star Wars', name: 'Star Wars', backdrop_url: 'https://images.unsplash.com/photo-1596727147705-611529ce4b21?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&q=80', overview: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station.', vote_average: 8.6, media_type: 'movie', genre_ids: [12, 28, 878] },
  { id: 23, title: 'Harry Potter', name: 'Harry Potter', backdrop_url: 'https://images.unsplash.com/photo-1618944847023-383ad0fcfad3?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1610466024868-b8db2d9ec9a5?w=500&q=80', overview: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.', vote_average: 7.6, media_type: 'movie', genre_ids: [12, 14] },
  { id: 24, title: 'Lord of the Rings', name: 'Lord of the Rings', backdrop_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1280&q=80', poster_url: 'https://images.unsplash.com/photo-1606836166167-33a85b9b6e82?w=500&q=80', overview: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.', vote_average: 8.9, media_type: 'movie', genre_ids: [12, 14, 28] },
];

export default async function handler(req, res) {
  const { slug } = req.query; // e.g. ['trending'] or ['genre', '28'] or ['search', 'inception'] or ['movie', '123']
  const { page = 1 } = req.query;

  try {
    if (!API_KEY || API_KEY === 'your_tmdb_api_key_here') {
      throw new Error('API Key Missing');
    }

    let url = '';
    let params = { api_key: API_KEY, language: 'en-US', page };

    const path = Array.isArray(slug) ? slug[0] : slug;

    switch (path) {
      case 'trending':
        url = `${TMDB_BASE}/trending/all/week`;
        break;
      case 'top_rated':
        url = `${TMDB_BASE}/movie/top_rated`;
        break;
      case 'popular':
        url = `${TMDB_BASE}/movie/popular`;
        break;
      case 'upcoming':
        url = `${TMDB_BASE}/movie/upcoming`;
        break;
      case 'action':
        url = `${TMDB_BASE}/discover/movie`;
        params.with_genres = 28;
        break;
      case 'comedy':
        url = `${TMDB_BASE}/discover/movie`;
        params.with_genres = 35;
        break;
      case 'horror':
        url = `${TMDB_BASE}/discover/movie`;
        params.with_genres = 27;
        break;
      case 'romance':
        url = `${TMDB_BASE}/discover/movie`;
        params.with_genres = 10749;
        break;
      case 'scifi':
        url = `${TMDB_BASE}/discover/movie`;
        params.with_genres = 878;
        break;
      case 'animation':
        url = `${TMDB_BASE}/discover/movie`;
        params.with_genres = 16;
        break;
      case 'tvshows':
        url = `${TMDB_BASE}/tv/popular`;
        break;
      case 'search':
        url = `${TMDB_BASE}/search/multi`;
        params.query = slug[1] || req.query.q;
        break;
      case 'movie': {
        const id = slug[1];
        // Fetch movie details + videos in a single call
        const [details, videos, similar] = await Promise.all([
          axios.get(`${TMDB_BASE}/movie/${id}`, { params: { api_key: API_KEY, language: 'en-US', append_to_response: 'credits' } }),
          axios.get(`${TMDB_BASE}/movie/${id}/videos`, { params: { api_key: API_KEY } }),
          axios.get(`${TMDB_BASE}/movie/${id}/similar`, { params: { api_key: API_KEY, language: 'en-US' } }),
        ]);
        return res.status(200).json({
          ...details.data,
          videos: videos.data.results,
          similar: similar.data.results.slice(0, 12),
        });
      }
      case 'tv': {
        const id = slug[1];
        const [details, videos, similar] = await Promise.all([
          axios.get(`${TMDB_BASE}/tv/${id}`, { params: { api_key: API_KEY, language: 'en-US', append_to_response: 'credits' } }),
          axios.get(`${TMDB_BASE}/tv/${id}/videos`, { params: { api_key: API_KEY } }),
          axios.get(`${TMDB_BASE}/tv/${id}/similar`, { params: { api_key: API_KEY, language: 'en-US' } }),
        ]);
        return res.status(200).json({
          ...details.data,
          videos: videos.data.results,
          similar: similar.data.results.slice(0, 12),
        });
      }
      default:
        return res.status(400).json({ error: 'Unknown route' });
    }

    const response = await axios.get(url, { params });
    return res.status(200).json(response.data);
  } catch (err) {
    console.error('TMDB API error using mock fallback:', err.message);
    // Shuffle array automatically so every categorized API fetch returns a distinct group!
    const shuffled = [...MOCK_MOVIES].sort(() => 0.5 - Math.random());
    const path = Array.isArray(slug) ? slug[0] : slug;
    
    if (path === 'movie' || path === 'tv') {
      const match = MOCK_MOVIES.find(m => m.id === parseInt(slug[1])) || shuffled[0];
      return res.status(200).json({
        ...match,
        videos: [],
        similar: shuffled.slice(0, 10)
      });
    }
    
    return res.status(200).json({ results: shuffled.slice(0, 15) });
  }
}
