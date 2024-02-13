const app = require('../app/app')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
         cb(null, path.join(__dirname, 'images'))
    },
    filename: function (req, file, cb) {
         const originalName = file.originalname
         cb(null, originalName)
    },
})

const upload = multer({ storage: storage })

// Route to handle file upload
app.post('/api/v1/profile', upload.single('file'), (req, res) => {
    console.log(req.file)

    try {
         res.send('File uploaded successfully!')
    } catch (error) {
         console.log(error)
    }
})
app.use(express.static('public'))
app.use('/images', express.static('images'))

