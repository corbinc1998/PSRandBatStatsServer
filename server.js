
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
 
 
 function isWin(result)
 {
     if (result === 'win')
     {
         return true
     }
         return false
 }
 
 
 var corsOptions ={
     origin: 'https://play.pokemonshowdown.com/',
     optionSuccessStatus: 200
 }
 
 // Adds headers: access-control-allow-origin: *
 app.use(cors())
 app.use(express.json())
 
 
 app.get('/teams', function(req, res, next)
 {   
     const data = JSON.parse(FileSystem.readFileSync("./teams.json", "utf-8"))
     if (req.query.sort === 'wins')
     {
         data.teams = data.teams.filter(team => team.result === 'win');
     }
     if (req.query.sort === 'loses')
     {
         data.teams = data.teams.filter(team => team.result === 'loss');
     }
 
     
 
 
 
     res.json(data)
 })
 
 
 app.get('/teams/pokemon', function(req, res, next)
 {   
     pokemonSorter = new Map();
     // pokemonName, win/loss count
     const data = JSON.parse(FileSystem.readFileSync("./teams.json", "utf-8"))
     if (req.query.sort === 'wins') // Total wins per Pokemon
     {
         data.teams = data.teams.filter(team => team.result === 'win');
         for (team in data.teams)
         {
             for (member in data.teams[team].pokemon){
                 if (pokemonSorter.has(data.teams[team].pokemon[member]))
                 {
                     pokemonSorter.set(data.teams[team].pokemon[member],pokemonSorter.get(data.teams[team].pokemon[member])+1)
                 }
                 else pokemonSorter.set(data.teams[team].pokemon[member], 1)
 
                 
             }
         }
 
        
     }
     else if (req.query.sort === 'loses') // Total loses per Pokemon
     {
         data.teams = data.teams.filter(team => team.result === 'loss');
         for (team in data.teams)
         {
             for (member in data.teams[team].pokemon){
                 if (pokemonSorter.has(data.teams[team].pokemon[member]))
                 {
                     pokemonSorter.set(data.teams[team].pokemon[member],pokemonSorter.get(data.teams[team].pokemon[member])+1)
                 }
                 else pokemonSorter.set(data.teams[team].pokemon[member], 1)
 
                 
             }
         }
     }
     else // Total appearances per Pokemon
     {
         for (team in data.teams)
         {
             for (member in data.teams[team].pokemon){
                 if (pokemonSorter.has(data.teams[team].pokemon[member]))
                 {
                     pokemonSorter.set(data.teams[team].pokemon[member],pokemonSorter.get(data.teams[team].pokemon[member])+1)
                 }
                 else pokemonSorter.set(data.teams[team].pokemon[member], 1)
 
                 
             }
         }
     }
     
 
 
     sortedPokemon = Array.from(pokemonSorter).sort((a, b) => b[1] - a[1] ).map((item) => ({ name: item[0], amount: item[1] })) 
     // .sort((a, b) => ...), a[1] and b[1]
     res.json({ pokemon: sortedPokemon, total: pokemonSorter.size })
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
 