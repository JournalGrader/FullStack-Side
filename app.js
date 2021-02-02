var pythonShell = require('python-shell') //*used for testing connections
var fs = require('fs')                    //*used for creating files
//var qs = require("qs")
//var events = require('events')
//var sqlite3 = require('sqlite3').verbose()
var express = require('express')
const bodyParser = require('body-parser');
//const { values } = require('lodash')

//initializing the app
var app = express()
app.use(bodyParser.json());
// Normal Log
app.get('/result',(req,res)=>{
	//res.setHeader('type','text/html')
    fs.readFile('python/result.txt',(err,data)=>{
    	if(err)console.log(err)
    	 d=String(data).split('\n#######################')
    	 d.unshift(d[d.length-1])
    	 d.pop()
    	 d = d.join('\n\n')
    	 //console.log(d)
    	 res.send(d)
    })
   
})

app.use('/', express.static('static'))

app.post('/grade',(req,res)=>{
	console.log(req.body)
    if(req.body){
        console.log("Starting Process to grade. (0/3)")
        fs.writeFileSync("./python/ans.txt",req.body.ans)
        console.log("Written Answer into file (1/3)")
        fs.writeFileSync("./python/que.txt",req.body.question)
        console.log("Written Question into file (2/3)")
        pythonShell.PythonShell.run("./python/jornals_evaluator.py",{},(err,output)=>{
            if(err)console.log(err)
            if(output)console.log(output[0])
            console.log("Journal Grader process finished. (3/3)")
            fs.writeFileSync('python/result.txt',output.join('\n'))
            console.log("Everthing is in place now!")
            setTimeout(()=>{res.sendStatus(200)},100)
            
            

        })
    }
    else{
        res.redirect('/')
    }
})
// here is the part we should
// recieve the location via post request [DONE]
// use sqlite instead of an array [DONE]


ip = '0.0.0.0'
port = 2005




app.listen(port,()=>{
    console.log(`Starting server...`)
})

// Functions
// First Finding Number of Venues
// Getting  in the form yyyymmdd







//connection tests
/*
**First It will create a python file
**then type in it testing code, in other words it 
**will write code for the python file
**Send requests to the server to test it 
*/
console.log('Running Connection Tests...')
//python code
var testerpy = (
`import requests;hostIP = 'http://${ip}'
port = ${port}
R = requests.get(f'{hostIP}:{port}/test')
`)
//creating the file
fs.writeFile('./tester.py',testerpy,(err)=>{
    if(err)console.log(err)
    //running it after creation
    pythonShell.PythonShell.run("./tester.py",{},(err)=>{
        if(err){
            //an error handler if it failed
            console.log("An Error Happened! Server Did not Run successfully!")
        }else{
        //stating the server on the console, including the link
        console.log('Success! Server is running')
        console.log(`listening on ${ip}:${port}`)
        }
    })

})
