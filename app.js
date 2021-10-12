const express = require ('express')
const app = express()
const restaurantList = require('./restaurant.json')
const exphbs = require ('express-handlebars')
const port = 3000

//express template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//routes setting 
app.get('/',(req, res)=> {
  res.render('index', {restaurants: restaurantList.results})
})

// querystring
app.get('/search', (req, res) => {

  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter((restaurant) => {
  return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
})
  res.render('index', {restaurants: restaurants, keyword: keyword})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  //定義變數 restaurant
  const restaurant = restaurantList.results.find (restaurant => restaurant.id.toString()=== req.params.restaurant_id) 
  res.render('show', {restaurant: restaurant})
})

//start and listen on the Express server
app.listen(port, ()=> {
  console.log(`Express is listening on localhost:${port}`)
})

