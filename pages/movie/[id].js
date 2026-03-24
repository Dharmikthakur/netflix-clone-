import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

export default function MovieDetail() {
  const router = useRouter();
  const { id, type = 'movie' } = router.query;
  const [movie, setMovie] = useState(null);
  
  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`/api/movies/${type}/${id}`);
        setMovie(data);
      } catch (e) {
        console.error('Fetch error:', e);
      }
    };
    fetchMovie();
  }, [id, type]);

  if (!movie) {
    return <div className="loader"><div className="spinner" /></div>;
  }

  const trailer = movie.videos?.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube') 
                  || movie.videos?.[0];

  return (
    <>
      <Head>
        <title>{movie.title || movie.name} - Netflix</title>
      </Head>
      <div style={{ background: '#000', minHeight: '100vh' }}>
        <Navbar user={{ name: 'Guest' }} onSearch={() => {}} />
        
        {trailer ? (
          <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
             <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Trailer"
              />
          </div>
        ) : (
          <div style={{ padding: '100px 48px', color: '#fff' }}>
            <h1>{movie.title || movie.name}</h1>
            <p>No video available.</p>
          </div>
        )}
      </div>
    </>
  );
}
