import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Profiles.module.css';

const AVATARS = [
  { color: '#E50914', emoji: '🦁', name: 'Profile 1' },
  { color: '#0080FF', emoji: '🐯', name: 'Profile 2' },
  { color: '#00B894', emoji: '🐺', name: 'Profile 3' },
  { color: '#FDCB6E', emoji: '🦊', name: 'Kids' },
];

export default function Profiles() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return (
      <div className="loader">
        <div className="spinner" />
      </div>
    );
  }

  const userProfile = {
    color: '#E50914',
    emoji: session.user?.image ? null : '🎬',
    name: session.user?.name?.split(' ')[0] || 'User',
    image: session.user?.image,
  };

  return (
    <>
      <Head><title>Netflix — Who&apos;s watching?</title></Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Who&apos;s watching?</h1>
        <div className={styles.profiles}>
          {/* Main user profile */}
          <Link href="/browse" className={styles.profileItem} id="main-profile">
            <div className={styles.avatar} style={{ background: userProfile.color }}>
              {userProfile.image ? (
                <img src={userProfile.image} alt={userProfile.name} className={styles.avatarImg} />
              ) : (
                <span className={styles.avatarEmoji}>{userProfile.emoji}</span>
              )}
            </div>
            <span className={styles.profileName}>{userProfile.name}</span>
          </Link>

          {/* Extra profiles */}
          {AVATARS.slice(1).map((p) => (
            <Link key={p.name} href="/browse" className={styles.profileItem}>
              <div className={styles.avatar} style={{ background: p.color }}>
                <span className={styles.avatarEmoji}>{p.emoji}</span>
              </div>
              <span className={styles.profileName}>{p.name}</span>
            </Link>
          ))}

          {/* Add profile */}
          <div className={styles.profileItem}>
            <div className={`${styles.avatar} ${styles.addAvatar}`}>
              <span style={{ fontSize: 40, color: '#aaa' }}>+</span>
            </div>
            <span className={styles.profileName} style={{ color: '#aaa' }}>Add Profile</span>
          </div>
        </div>

        <button className={styles.manageBtn}>Manage Profiles</button>
      </div>
    </>
  );
}
