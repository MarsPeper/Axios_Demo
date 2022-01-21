// Load express module
const express = require('express');
// Create express server
const app = express();

const port = 3000;
const axios = require('axios')
//Loads the handlebars module
const { engine } = require('express-handlebars');
const getCoffee = async () => {
  const baseURL = 'https://api.sampleapis.com/coffee/hot';
  try {
    const resp = await axios.get(baseURL);
    console.log(resp.data);
    return JSON.stringify(resp.data);
  } catch(err) {
    console.error(err);
  }
}

//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations
app.engine('hbs', engine({
layoutsDir: __dirname + '/views/layouts',
extname: 'hbs',
defaultLayout: 'index'
}));
app.use(express.static('public'))
app.get('/', async (req, res) => {
res.render('main', {coffee: await getCoffee()});
});

app.listen(port, () => console.log(`App listening to port ${port}`))
