import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function LoginPage() {
  const [ra, setRa] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: ra + 'SP', senha: senha }), // Adiciona 'SP' ao RA
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userData', JSON.stringify(data));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      setError('Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>Login - MoonFuturo</title>
      </Head>
      <main style={styles.main}>
        <h1 style={styles.title}>MoonFuturo</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            placeholder="Digite seu RA (sem o SP)"
            style={styles.input}
            required
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  main: {
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 2rem 0',
    fontSize: '2.5rem',
    color: '#e0e0e0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '12px',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #4a4a70',
    backgroundColor: '#2a2a4e',
    color: 'white',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#c83a58',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#ff6b6b',
    marginTop: '1rem',
  },
};
