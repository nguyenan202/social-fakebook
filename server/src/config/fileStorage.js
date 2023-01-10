
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';

const startFileStorage = () => {
    const __filename = fileURLToPath(import.meta.url);
    let __dirname = path.dirname(__filename)

    __dirname = __dirname.replace('\\config','');
    
    const urlToImages = path.join(__dirname, '/public/images');
    
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, urlToImages);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });

    return multer({ storage });
}

export default startFileStorage