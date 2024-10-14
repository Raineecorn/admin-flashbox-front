import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Frontend listening at http://0.0.0.0:${port}`);
});

