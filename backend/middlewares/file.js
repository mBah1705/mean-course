import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = file.mimetype.includes('image/')
        let error = new Error('Invalid mime type!');
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        const ext = file.mimetype.split('/')[1];
        cb(null, name + '_' + Date.now() + '.' + ext);
    }
});

export default multer({ storage: storage }).single('image');