const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

// Caminhos das pastas
const inputFolder = 'inputs';
const outputFolder = 'output';

// Verificar se a pasta de saída existe, caso contrário, criar
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Processar cada imagem na pasta de entrada
fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error('Erro ao ler a pasta de entrada:', err);
        return;
    }

    files.forEach(file => {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            const imgPath = path.join(inputFolder, file);
            Tesseract.recognize(imgPath, 'por')
                .then(({ data: { text } }) => {
                    const outputFile = path.join(outputFolder, `${path.parse(file).name}.txt`);
                    fs.writeFile(outputFile, text, 'utf8', err => {
                        if (err) {
                            console.error('Erro ao salvar o arquivo de saída:', err);
                        } else {
                            console.log(`Texto reconhecido salvo em: ${outputFile}`);
                        }
                    });
                })
                .catch(err => {
                    console.error('Erro ao reconhecer o texto:', err);
                });
        }
    });
});
