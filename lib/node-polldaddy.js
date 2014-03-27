var request = require('request'),
    util = require('util');

function NodePolldaddy(options) {
    this.partnerGUID = options.partnerGUID;
    this.userCode = options.userCode;
    this.url = options.url || 'https://api.polldaddy.com/';
}

// The base polldaddy API Post structure
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

// Get all ratings items. Doesn't include the rating values (votes, etc)
// Use getRatingsDetails for that
// Options:
//    {
//      filter_folder_id : 1234,
//      raw              : false
//    }
//    filter_folder_id: Filter by filter_folder_id if provided
//    raw [true|false]: return raw json or trim down
NodePolldaddy.prototype.getRatings = function (options, callback) {
    var raw = false,
        filter_folder_id;

    if (options) {
        raw = options.raw || false;
        filter_folder_id = options.filter_folder_id || undefined;
    }

    var postbody = this.getBasePostBody();
    postbody.pdRequest.demands.demand = { id: "GetRatings"};

    var postOptions = {
        url     : this.url,
        body    : JSON.stringify(postbody)
    };

    makePostRequest(postOptions, function(err, res, obj){
        if (err) {
            return callback(err);
        }

        var response_obj;
        if (res.statusCode === 200) {
            var ratings_resp = obj;
            var filtered_ratings = [];
            var rating_items = ratings_resp.pdResponse.demands.demand[0].ratings.rating;

            // Filter out ratings items that don't match the desired
            // folder_id
            if (filter_folder_id) {
                rating_items.forEach(function(item){
                    if (item.folder_id && +item.folder_id === +filter_folder_id){
                        filtered_ratings.push(item);
                    }
                });

                rating_items = filtered_ratings;
            }

            // return raw data or trimmed down (preferrable)
            if (raw === true) {
                ratings_resp.pdResponse.demands.demand[0].ratings.rating = rating_items;
                response_obj = ratings_resp;
            } else {
                response_obj = rating_items;
            }
        }
        // return whatever we got.
        callback(err, res, response_obj);
    });
};

// Get rating data for the desired id
// if raw is true, return the entire JSON response,
//    { userCode: 'SOMETHING',
//         demands: { demand: [Object] },
//         partnerGUID: 'SOMETHING',
//         partnerUserID: 0 } }
// otherwise trim it down to the essentials
//  EX: obj.pdResponse.demands.demand[0].rating_result.ratings.rating[0];
NodePolldaddy.prototype.getRatingResults = function (id, options, callback) {
    var raw = false;
    if (options) {
        raw = options.raw || false;
    }

    var postbody = this.getBasePostBody();
    postbody.pdRequest.demands.demand = {
            id         : "GetRatingResults",
            list       : {
                            "period"    : "-1", // PD API docs say "all", but it doesn't work
                            "id"        : id
                         }
    };

    var postOptions = {
            url     : this.url,
            body    : JSON.stringify(postbody)
    };

    makePostRequest(postOptions, function(err, res, obj){
        if (err) {
            return callback(err);
        }
        var response_obj = obj;

        if (res.statusCode === 200) {
            if (raw === false) {
                if (obj.pdResponse.demands.demand[0].rating_result.ratings.total &&
                    obj.pdResponse.demands.demand[0].rating_result.ratings.rating &&
                    obj.pdResponse.demands.demand[0].rating_result.ratings.rating.length > 0) {
                        response_obj = obj.pdResponse.demands.demand[0].rating_result.ratings.rating[0];
                } else {
                    response_obj = [];
                }
            }
        }

        callback(err, res, response_obj);
    });
};

// Utility belt
function makePostRequest(options, callback) {
    if (!options.timeout) {
        options.timeout = 10000;
    }
    request.post(options, function(err, res, obj){
        if (err) {
            return callback(err);
        } else {
            return callback(null, res, JSON.parse(obj));
        }
    });
}

module.exports = NodePolldaddy;
