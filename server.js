import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Node.jsのESモジュール形式で __dirname, __filename を再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Render環境ではPORT環境変数が自動的に設定されます
const PORT = process.env.PORT || 10000; 

// ビルドされたReactファイルをホスト (dist フォルダ)
const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

// どのルーティング（例: /about）に対しても index.html を返す (SPA対応)
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${buildPath}`);
});
