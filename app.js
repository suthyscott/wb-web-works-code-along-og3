import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'

const PORT = 4545

const app = express()

app.use(express.urlencoded({extended: false}))
// runs for every request that comes
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'arandomstringa;sldkfajh;sdlk'
}))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.get('/', (req, res) => {
    console.log(req.session)
    const {email} = req.session

    if(email){
        res.render('index.html.njk', {email})
    } else {
        res.render('index.html.njk')
    }
})

app.get('/login', (req, res) => {
    res.render('login.html.njk')
})

app.post('/dashboard', (req,res)=>{
    const email = req.body.email
    // const {email} = req.body //destructuring the email property from the req.body object
    req.session.email = email
    res.render('dashboard.html.njk')
})

app.get('/logout', (req, res)=> {
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.listen(PORT, () => console.log(`Take us to warp ${PORT}!`))