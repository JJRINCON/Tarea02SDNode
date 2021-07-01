const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

data = ["Colombia", "Argentina", "Bolivia", "Ecuador"]

var requestFile = '<html><body><form action="/" method="post"> '

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/data', (req, res) => {
    console.log(req.query)
    let position = req.body.position - 1;
    if (position >= 0 && position < data.length) {
       sendInfo(res, position)
    } else {
        sendError(res)
    }
})

app.post('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

var sendInfo = (res, position) => {
    let country = data[position]
    requestFile += '<h1>El pais que se encuentra en la posicion ' +  (position + 1)  + ' es: ' + country + '</h1>'+  
                    '<input type="submit" value="Regresar">'+
                    '</form><body><html>'
    res.send(requestFile)
    resetRequestFile()
}

var sendError = (res) =>{
    requestFile += '<h2>Datos erroneos</h2>'+
                        '<input type="submit" value="Regresar">'+
                        '</form><body><html>'
    res.send(requestFile)
    resetRequestFile()
}

var resetRequestFile = () =>{
    requestFile = '<html><body><form action="/" method="post"> '
}

app.listen(5000, () =>{
    console.log('Server on port 5000')
})