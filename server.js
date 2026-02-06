

var express = require('express')
var cors = require('cors')
var app = express()
const teams = require("./teams.json")



var corsOptions ={
    origin: 'https://play.pokemonshowdown.com/',
    optionSuccessStatus: 200
}

// Adds headers: access-control-allow-origin: *
// app.use(cors())
app.use(express.json())


app.get('/teams', function(req, res, next)
{       
        const data = teams
    
        res.json(data)
})


app.listen(3000, function()
{
    console.log('web server loading on port 3000')
})