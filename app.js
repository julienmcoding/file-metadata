const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/',  (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './file');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
});

const upload = multer({ storage: fileStorageEngine });

app.post('/upload', upload.single("upfile"), (req, res) => {
    res.json({
        name: req.file.originalname, 
        type: req.file.mimetype,
        size: req.file.size });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listenning on port ${PORT}`);
});