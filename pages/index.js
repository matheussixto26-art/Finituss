// Local do Arquivo: pages/index.js

import Head from 'next/head';

export default function TestPage() {

    async function handleSubmit(event) {
        event.preventDefault();
        const statusEl = document.getElementById('status');
        const outputEl = document.getElementById('response-output');
        const form = event.target;

        statusEl.textContent = 'Carregando...';
        outputEl.textContent = '';

        try {
            const response = await fetch('/api/dashboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: form.ra.value,
                    senha: form.senha.value
                })
            });

            const data = await response.json();

            if (!response.ok) {
                statusEl.textContent = `Erro ${response.status}`;
            } else {
                statusEl.textContent = 'Sucesso! Resposta do servidor:';
            }
            // Exibe a resposta formatada (JSON)
            outputEl.textContent = JSON.stringify(data, null, 2);

        } catch (error) {
            statusEl.textContent = 'Erro de rede.';
            outputEl.textContent = error.message;
        }
    }

    return (
        <>
            {/* O 'style' global vai aqui para manter tudo em um só lugar */}
            <style jsx global>{`
                body { background-color: #121212; color: #e0e0e0; font-family: monospace; margin: 0; padding: 2rem; }
                form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; max-width: 400px; }
                input, button { padding: 10px; border-radius: 4px; border: 1px solid #444; background-color: #333; color: #fff; font-size: 1rem; }
                button { background-color: #0070f3; cursor: pointer; font-weight: bold; }
                h1 { color: #0070f3; }
                pre { background-color: #222; padding: 1rem; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; }
            `}</style>
            
            <Head>
                <title>Teste de API</title>
            </Head>

            <main>
                <h1>Painel de Teste da API</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="ra" placeholder="RA Completo (ex: 000123456789SP)" required />
                    <input type="password" name="senha" placeholder="Senha" required />
                    <button type="submit">Enviar Requisição</button>
                </form>

                <h2 id="status">Aguardando envio...</h2>
                <pre id="response-output"></pre>
            </main>
        </>
    );
}

  
