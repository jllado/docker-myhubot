// Description:
//   Daily bookings
//

var cron = require('node-cron');
var clock = require('../domain/clock.js');
var phrase_builder = require('../domain/phrase_builder.js');
var travelc_user = process.env.TRAVELC_USER || 'user';
var travelc_pass = process.env.TRAVELC_PASS || 'pass';

module.exports = function(robot) {
    var yesterday_bookings = function (room) {
        robot.http('http://online.travelcompositor.com/resources/authentication/getAuthToken')
            .query({'microsite': 'default', 'username': travelc_user, 'password': travelc_pass})
            .header('Accept', 'application/json')
            .get()(function(err, resp, body) {
                let auth = JSON.parse(body);
                let yesterday = clock.yesterday();
                robot.http('http://online.travelcompositor.com/resources/booking/getBookings')
                .query({'operator': 'travelc', 'from': clock.yesterday(), 'to': yesterday})
                .header('Accept', 'application/json')
                .header('auth-token', auth.token)
                .get()(function(err, resp, body) {
                    let bookings = JSON.parse(body);
                    robot.send({room: room}, phrase_builder.build(bookings));
                });
            });
    };
    cron.schedule('29 23 * * *', function() {
        yesterday_bookings('wtf');
    });
    robot.respond(/yesterday bookings/, function(msg) {
        yesterday_bookings(msg.envelope.message.room);
    });
}
