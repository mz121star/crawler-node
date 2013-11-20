/*
 * GET home page.
 */
var phantom = require('node-phantom');
var events = require('events');
var querystring = require('querystring');
var url = require('url');

var getPage = function (url) {

    var emitter = new events.EventEmitter()
    var phantom = require('node-phantom');
    phantom.create(function (err, ph) {
        return ph.createPage(function (err, page) {
            return page.open(url, function (err, status) {
                console.log("opened site? ", status);
                //    page.includeJs('http://lib.sinaapp.com/js/jquery/1.8.2/jquery.js', function(err) {

                setTimeout(function () {
                    return page.evaluate(function () {


                        var head = document.getElementsByTagName("head")[0]
                        var basee = document.createElement("base")
                        basee.href = document.location.origin

                        head.insertBefore(basee, head.firstChild);

                        return   document.head.innerHTML + document.body.innerHTML

                    }, function (err, result) {
                        console.log(err + ":" + result)
                        emitter.emit("success", result);
                        ph.exit();
                    });
                }, 500);
                //  });
            });
        });
    });

    return emitter;
}
exports.index = function (req, res) {


    res.render('index', { title: 'Express' });
};
exports.getPage = function (req, res) {
    var url = req.url;
    url = url.replace("/getpage?", "")
    var params = querystring.parse(url)
    if (!params.page)
        params.page = "http://localhost";
    getPage(params.page).on("success", function (d) {
        res.send(d);
    })


};

