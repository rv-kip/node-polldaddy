var NodePolldaddy = require('./lib/node-polldaddy');

var options = {};

var partnerGUID = "SOMETHING";
var userCode = "SOMETHING";
var url = "https://api.polldaddy.com/";

var options = { partnerGUID     : partnerGUID,
                userCode        : userCode,
                url             : url};

npd = new NodePolldaddy(options);

var folder_id = SOMEFOLDER_ID;
npd.getRatings(folder_id, null, function(err, obj){
    console.log("obj", obj);
    console.log("obj", obj.pdResponse.demands.demand[0].ratings.rating[0]);

});
