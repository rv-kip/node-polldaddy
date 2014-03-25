var request = require('request');

function NodePolldaddy(options) {
    this.partnerGUID = options.partnerGUID;
    this.userCode = options.userCode;
    this.url = options.url || 'https://api.polldaddy.com/';
}

NodePolldaddy.prototype.getBasePostBody = function() {
    this.basePostBody = {
        "pdRequest": {
            "partnerGUID": this.partnerGUID,
            "userCode": this.userCode,
            "demands": {
                "demand": {}
            }
        }
    };
    return this.basePostBody;
};


// Get all ratings items. Filter by folder_id if provided
// if raw is true, return the entire JSON response
NodePolldaddy.prototype.getRatings = function (folder_id, raw, callback) {
    var postbody = this.getBasePostBody();
    postbody.pdRequest.demands.demand = {id: "GetRatings"};

    var options = { url     : this.url,
                    body    : JSON.stringify(postbody)};

    makePostRequest(options, function(err, res, obj){
        callback(err, obj);
    });
};

// Get rating data for the desired id
// if raw is true, return the entire JSON response
NodePolldaddy.prototype.getRatingResults = function (id, raw, callback) {
    var postbody = this.getBasePostBody();
    postbody.pdRequest.demands.demand =
        { id         : "GetRatingResults",
          list       : {period: "all", id: id} };

    var options = { url     : this.url,
                    body    : JSON.stringify(postbody)};

    makePostRequest(options, function(err, res, obj){
        callback(err, obj);
    });
};

function makePostRequest(options, callback) {
    request.post(options, function(err, res, obj){
        if (err) {
            return callback(err);
        } else {
            return callback(null, res, JSON.parse(obj));
        }
    });
}


module.exports = NodePolldaddy;
