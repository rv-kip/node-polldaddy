var NodePolldaddy = require('node-polldaddy');
var options = {};

var partnerGUID = "SOMETHING";
var userCode = "SOMETHING";
var url = "https://api.polldaddy.com/";

var options = { partnerGUID     : partnerGUID,
                userCode        : userCode,
                url             : url};

npd = new NodePolldaddy(options);

var options = {
    filter_folder_id: 123456,
    raw: false
};
npd.getRatings(options, function(err, res, obj){
    console.log("getRatings", obj);
});

options = {
    raw: false
};
npd.getRatingResults(123456, options, function(err, res, obj){
    console.log("getRatingResults", obj);
});
