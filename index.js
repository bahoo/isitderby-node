var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.get('/feed', function(request, response){

   var midnight = new Date();
      midnight.setUTCHours(5,0,0,0);   // five hour offset from UTC

   var description = 'No.';

   var dateShort = (midnight.getMonth()+1) + '/' + (Math.floor((midnight.getDate()-1)/7)+1) + '/' + midnight.getDay();

   if(dateShort == '5/1/6'){
      description = 'YES, FRIENDS! YES! IT\'S THE DERBY! IT\'S THE GODDAMN KENTUCKY DERBY, GO AND TELL THE NEWS!';
   }

   var rssResponse = '<?xml version="1.0" encoding="utf-8"?>\n' +
      '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
         '    <channel>\n' +
            '        <title>Is It Derby?</title>\n' +
            '        <link>http://www.isitderby.com/</link>\n' +
            '        <atom:link href="http://www.isitderby.com/feed" rel="self" type="application/rss+xml" />\n' +
            '        <description>Well, is it?</description>\n' +
            '        <language>en-us</language>\n' +
            '        <item>\n' +
            '            <title>Is It Derby?</title>\n' +
            '            <description>' + description + '</description>\n' +
            '            <pubDate>' + midnight.toUTCString() + '</pubDate>\n' +
            '            <link>http://www.isitderby.com/?' + midnight.getTime() + '</link>\n' +
            '            <guid>http://www.isitderby.com/?' + midnight.getTime() + '</guid>\n' +
         '        </item>\n' +
         '    </channel>\n' +
      '</rss>';

   response.set('Content-Type', 'application/rss+xml');
   response.send(rssResponse);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
