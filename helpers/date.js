var moment = require('moment-timezone');

module.exports.generationDate = function() {
    var now = moment();
    return now.tz("America/Los_Angeles").format("YYYY-MM-DD [at] H:mm:ss");
};
