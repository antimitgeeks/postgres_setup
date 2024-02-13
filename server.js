require('dotenv').config()
const app = require('./app/app')
const sequelize = require('./config/config')

// Sync models with the database
sequelize.sync().then(() => {
     console.log('Database synced')
}).catch((err) => {
     console.error('Error syncing database:', err)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
     console.log(`Server is running on port ${port}`)
})
