var child_process = require('child_process');
var events = require('events');
var httpget = require('http-get');
exports.GetPageVisual = function (url, callback) {

    var emitter = new events.EventEmitter();

    setTimeout(function () {
        child = child_process.spawn('phantomjs', ['getPage.js', url]);
        child.stdout.setEncoding('utf8');
        child.stdout.on("data", function (data) {
            emitter.emit("success", data);
        });
        child.stderr.on('data', function (data) {
            emitter.emit("error", data);
        });

        child.on('exit', function (code, signal) {
            emitter.emit("exit", code);
        });
    }, 100)

    return   emitter;

}

 exports.getPageSource=function(url,callback){
    var options = {url: url,  bufferType : "buffer"};
     httpget.get(options, function (error, result) {
         if (error) {
             console.error(error);
         } else {
             callback(result.buffer.toString("utf8"));
             console.log('The XML document contents: ' + result.buffer);
         }
     });
 }