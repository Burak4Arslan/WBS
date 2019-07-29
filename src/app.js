const express = require('express')
const path = require('path');

const app = express()

const port = process.env.PORT || 3000

const fd = path.join(__dirname,'../public');

app.set('view engine','hbs')

app.use(express.static(fd));

app.get('',(req,res) => {

    res.render('wbs');

})


app.get('/wbs',(req,res)=>{

    res.render('wbs');

})

app.get('*',(req,res)=> {

    res.redirect('/');

})



app.listen(port, () => {

    console.log("Server is up and running on port " + port);

})