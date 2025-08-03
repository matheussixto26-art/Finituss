export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { user, senha } = req.body;

  if (!user || !senha) {
    return res.status(400).json({ message: 'RA e senha são obrigatórios.' });
  }

  // Chave de API fornecida na sua requisição
  const API_KEY = '2b03c1db3884488795f79c37c069381a';
  const API_URL = 'https://sedintegracoes.educacao.sp.gov.br/credenciais/api/LoginCompletoToken';

  try {
    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': API_KEY,
      },
      body: JSON.stringify({ user, senha }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      // Repassa a mensagem de erro da API original, se houver
      return res.status(apiResponse.status).json({ message: data.Message || 'Erro retornado pela API da SED.' });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error('Erro no proxy da API:', error);
    res.status(500).json({ message: 'Erro interno no servidor do nosso app.' });
  }
}
