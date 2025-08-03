import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      router.push('/'); // Se não houver dados, volta para o login
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    router.push('/');
  };

  if (!userData) {
    return <div style={styles.container}><p>Carregando...</p></div>;
  }

  return (
    <div style={styles.container}>
      <Head>
        <title>Dashboard - {userData.nome}</title>
      </Head>
      <header style={styles.header}>
        <h2>Bem-vindo, {userData.nome.split(' ')[0]}!</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Sair</button>
      </header>
      <main style={styles.main}>
        <div style={styles.infoBar}>
            <p>Escola: {userData.escola}</p>
            <p>Turma: {userData.turma}</p>
        </div>
        <div style={styles.grid}>
          <div style={styles.card}><p>Faltas</p><span>0</span></div>
          <div style={styles.card}><p>Tarefas Pendentes</p><span>2</span></div>
          <div style={styles.card}><p>Ver Conquistas</p><span>🏆</span></div>
          <div style={styles.card}><p>Mensagens</p><span>✉️</span></div>
        </div>
      </main>
    </div>
  );
}

const styles = {
    container: { minHeight: '100vh', backgroundColor: '#1a1a2e', color: 'white', fontFamily: 'Arial, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#2a2a4e' },
    logoutButton: { padding: '8px 16px', border: 'none', borderRadius: '5px', backgroundColor: '#c83a58', color: 'white', cursor: 'pointer' },
    main: { padding: '2rem' },
    infoBar: { backgroundColor: '#2a2a4e', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' },
    card: { backgroundColor: '#2a2a4e', padding: '2rem', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' },
};
