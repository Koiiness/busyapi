module.exports = function(app){
    // set up limiter
    // this was grabbed from: https://www.npmjs.com/package/express-rate-limiter
    var Limiter = require('express-rate-limiter');
    var MemoryStore = require('express-rate-limiter/lib/memoryStore');
    var limiter = new Limiter({ db : new MemoryStore() });

    app.post('/api/usages', limiter.middleware(), function(req, res){

        // Store the supplied usage data
        app.usages.push(req.body);

        var usageId = app.usages.length;
        console.log('Stored usage count: ' + usageId);

        res.status(201).json({'id':usageId});
    });
}
