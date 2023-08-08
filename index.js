const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 5001
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const connectDB = require('./config/db')

// Routes
const homeRouter = require('./routes/homeRouter')
const aboutRouter = require('./routes/aboutRouter')
const newsRouter = require('./routes/newsRouter')
const contactRouter = require('./routes/contactRouter')
const notFound = require('./controllers/notFound')
const authRouter = require('./routes/authRouter')
const dashboardRouter = require('./routes/dashboardRouter')
const messagesRouter = require('./routes/messagesRouter')
const blogRouter = require('./routes/blogRouter')
const adminsRouter = require('./routes/adminsRouter')
const securityRouter = require('./routes/securityRouter')

const app = express()

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGO_URL,
})

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(cookieParser())

// Routes initializion
app.use(homeRouter)
app.use(aboutRouter)
app.use(newsRouter)
app.use(contactRouter)
app.use('/auth', authRouter)
app.use('/dashboard', dashboardRouter)
app.use('/dashboard/messages', messagesRouter)
app.use('/dashboard/blog', blogRouter)
app.use('/dashboard/admins', adminsRouter)
app.use('/dashboard/security', securityRouter)

// Template engine
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: path.join(__dirname, 'views', 'layouts', 'main.hbs'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))

// Set default engine 
app.set('view engine', 'hbs')

// Not found middleware
app.use(notFound)

connectDB()

// Server listen: port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})