const express = require('express')
     ,exphbs = require('express-handlebars')
     ,mongoose = require('mongoose')
     ,bodyParser = require('body-parser')
     ,fileupload = require('express-fileupload')
     ,expressSession = require('express-session')
     ,MongoStore = require('connect-mongo')
     ,connectFlash = require('connect-flash')
     ,{stripTags} = require('./helpers/hbs')
     ,methodeOverride = require('method-override')
     
     
 
//Controller
const consequenceAddController = require('./controllers/consequenceAdd')
      , homePageController = require('./controllers/homePage')
      ,degatsPageAddController = require('./controllers/degatsPageAdd')
      ,contactPageController = require('./controllers/contactPage')
      ,consequenceSingleController = require('./controllers/consequenceSingle')
      ,consequencePostController  = require('./controllers/consequencePost')
      ,consequenceEditController = require('./controllers/consequenceEdit')
      ,consequencePutController = require('./controllers/consequencePut')
      ,consequenceDeleteController = require('./controllers/consequenceDelete')
      ,commentairePageController = require('./controllers/commentairePage')
      ,commentaireAddController = require('./controllers/commentaireAdd')
      ,commentaireEditController = require('./controllers/commentaireEdit')
      ,commentaireSingleController = require('./controllers/commentaireSingle')
      ,commentairePostController = require('./controllers/commentairePost')
      ,commentaireDeleteController = require('./controllers/commentaireDelete')
      ,commentairePutController = require('./controllers/commentairePut')
      

//Controller 
   //User
      ,userAddController = require('./controllers/userAdd')
      ,userRegisterController = require('./controllers/userRegister')
      ,userLoginController = require('./controllers/userLogin')
      ,userLoginAuthController = require('./controllers/userLoginAuth')
      ,userLogoutController = require('./controllers/userLogout')
      
   
// Express
const port = 1976;
const app = express();

 
mongoose.connect('mongodb://localhost:27017/climat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
      }).then(() => {
          console.log('connected to database');
      }).catch(() => {
          console.log('failed connected to database');
      });

const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

//ExpressSession
app.use(expressSession({

      secret : 'securite',
      name : 'biscuit',
      saveUninitialized: true,
      resave: false,
      
      store : new mongoStore({
            mongooseConnection : mongoose.connection
      })

}))

//MethodeOverride
app.use(methodeOverride("_method"));

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileupload())

const auth = require('./Middleware/auth')
const redirectAuthSuccess = require('./Middleware/redirectAuthSuccess')

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
      MomentHandler.registerHelpers(Handlebars);


app.use(express.static('public'));

//Route
app.engine('handlebars', exphbs({
      
      helpers  : {
            stripTags : stripTags
      },

     defaultLayout: 'main', 
     extname: 'handlebars'
     
 }));
app.set('view engine', 'handlebars');

app.use('*', (req, res, next) => {

      res.locals.user = req.session.userId;
      console.log(res.locals.user);
      next()
      
})

//Middleware
const  consequenceValidPost = require('./Middleware/consequenceValidPost')
app.use("/consequences/post", consequenceValidPost)

//GET
      //home
app.get("/", homePageController)
      //degats
app.get("/degats", degatsPageAddController)
      //Consequences
app.get("/consequences/add", auth, consequenceAddController)
      //consequenceSingle(Id) 
app.get("/consequences/:id", consequenceSingleController)
       //POST
app.post("/consequences/post", auth, consequenceValidPost, consequencePostController)
app.delete("/consequences/:id", consequenceDeleteController)
app.get("/consequence/edit/:id", auth, consequenceEditController)
app.put("/consequence/edit/:id", auth, consequenceValidPost, consequencePutController)
      //contact
app.get("/contact", contactPageController)
      //Commentaire
app.get("/commentaires", commentairePageController)
app.get("/commentaires/add", commentaireAddController)
app.get("/commentaires/:id", commentaireSingleController)
app.post("/commentaires/post",commentairePostController)
app.delete("/commentaires/:id", commentaireDeleteController)
app.get("/commentaire/edit/:id", commentaireEditController)
app.put("/commentaire/edit/:id", commentairePutController)




     //Users
app.get("/user/add", redirectAuthSuccess, userAddController)
app.post("/user/register", redirectAuthSuccess, userRegisterController)
app.get("/user/login", redirectAuthSuccess, userLoginController)
app.post("/user/loginAuth", redirectAuthSuccess, userLoginAuthController)
app.get("/user/logout", userLogoutController)



 //Error404
//app.use((req, res) => {

     // res.render('error404')
//})

app.listen(port, function() {
    console.log(`Le serveur tourne sur le ${port}, lancé à : ${new Date().toLocaleString()}`);
    
})