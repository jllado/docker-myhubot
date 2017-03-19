// Description:
//   Daily bookings
//

var cron = require('node-cron');
var clock = require('../domain/clock.js');
var bookings_mapper = require('../domain/bookings_mapper.js')
var phrase_builder = require('../domain/phrase_builder.js');
var bookings_record = require('../domain/bookings_record.js');
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
                .query({'from': clock.yesterday(), 'to': yesterday})
                .header('Accept', 'application/json')
                .header('auth-token', auth.token)
                .get()(function(err, resp, body) {
                    let bookings = JSON.parse(body);
                    let bookings_count = bookings_mapper.count(bookings);
                    robot.send({room: room}, phrase_builder.build(bookings_count));
                    let record = bookings_record.get(robot);
                    if (bookings_count > record) {
                        robot.send({room: room}, '¡Hemos batido el record de reservas diarias! :muscle:');
                        bookings_record.save(robot, bookings_count);
                    }
                });
            });
    };
    cron.schedule('00 09 * * *', function() {
        yesterday_bookings('-197523822'); //telegram group id
    });
    robot.respond(/yesterday bookings/, function(msg) {
        yesterday_bookings(msg.envelope.message.room);
    });
}
