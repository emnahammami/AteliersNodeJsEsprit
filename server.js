/*var http = require('http');

var server = http.createServer(function(req, res) {
res.writeHead(200);
res.end('Salut les websites');})

server.listen(8080);*/
var http = require('http');
var url=require("url")




var querystring = require('querystring');


var server = http.createServer(function(req, res) {
    var page=url.parse(req.url).pathname;
    
    var params = querystring.parse(url.parse(req.url).query);

    res.writeHead(200, {"Content-Type": "text/html"});
    if('id' in params && 'login' in params){
        res.write('Votre id est '+params['id']+
        ' et votre login '+params['login']);
        if(page == '/'){
            res.write('Vous etes dans la page d\'accueil');
        }else if(page == '/Contact'){
            res.write('Vous etes dans la page Contact !');
        }else if(page == '/Affichage/1/user'){
            res.write('Afficher l\'utilisateur qui a l\'id 1 !');
        }else{
            res.write('404 not found !');
        }
    }
    else{
        res.write('Veullez saisir votre id et login !')
    }


res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');

});
server.listen(8080);





