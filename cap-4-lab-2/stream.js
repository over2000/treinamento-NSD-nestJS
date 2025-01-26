const express = require('express')
const { Readable } = require('stream')

const app = express()
const PORT = 3000

// Simula um stream de dados com ~500ms de intervalo entre os chunks
app.get('/data', (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    const data = ['this', 'is', 'a', 'stream', 'of', 'data']

    const stream = new Readable({
        read() {
            if (data.length === 0) {
                this.push(null) // Finaliza o stream
            } else {
                const chunk = data.shift() + '<br>'
                this.push(chunk) // Envia o próximo chunk
            }
        }
    })

    const interval = setInterval(() => {
        if (!stream.readableLength) {
            clearInterval(interval) // Para o intervalo se o stream estiver vazio
        } else {
            stream.read()
        }
    }, 500)

    stream.pipe(res) // Conecta o stream à resposta HTTP
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})
