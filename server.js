
 FileSystem = require('fs')
var express = require('express')
var cors = require('cors')
var app = express()
const teams = FileSystem.existsSync("./teams.json")
if (!teams)
{
    makeTeamJSONFile()
}
const { json } = require('express')
const { fstat } = require('fs')




var corsOptions ={
    origin: 'https://play.pokemonshowdown.com/',
    optionSuccessStatus: 200
}

// Adds headers: access-control-allow-origin: *
// app.use(cors())
app.use(express.json())


app.get('/teams', function(req, res, next)
{       
    const data = JSON.parse(FileSystem.readFileSync("./teams.json", "utf-8"))
    res.json(data)
})




// curl -X POST http://localhost:3000/team
app.post('/team', function(req, res, next)
{      
        data = FileSystem.readFileSync("./teams.json", "utf-8")
    // expected:
        //  req.body =         {
        //     "pokemon": [
        //     ],
        //     "result": "",
        //     "rating": "",
        //     "ratingChange": "",
        //     "opponent": "",
        //     "date": ""
        // }


        update = JSON.parse(data)
        update.teams.push(req.body)
        FileSystem.writeFileSync("./teams.json", JSON.stringify(update, null, 4))
})


function makeTeamJSONFile()
{
    const basic = {
        "teams": [

        ]
    }

    FileSystem.writeFileSync("./teams.json", JSON.stringify(basic))
}



app.listen(3000, function()
{
    console.log('web server loading on port 3000')
})