
const { ClientSecretCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const express = require('express')
const app = express()
const port = 3001

app.get('/', async (req, res) => {
    const credential = new ClientSecretCredential(
        '557d7084-72cb-4d47-8098-5b6b5ec651f2',
        '05152387-ec38-4870-a9df-53137439d5c5',
        'NNG8Q~K4XnAOyKKWEbMxbTDlGX_F.WqInx5TnaE8'
    );
    const client = new SecretClient('https://akv-portalidentificacao.vault.azure.net', credential);
    console.log(client);

    try {
        const secret = await client.getSecret('IMPORTMAP-ROOT-CONFIG');
        res.send('Hello World!' + secret.value);
    } catch (e) {
        console.log(e);
        res.send('Error' + e);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})