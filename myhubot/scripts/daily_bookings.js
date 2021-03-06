// Description:
//   Daily bookings
//

var CronJob = require('cron').CronJob;
var clock = require('../domain/clock.js');
var enviorenment = require('../domain/environment');
var bookings_mapper = require('../domain/bookings_mapper.js')
var phrase_builder = require('../domain/phrase_builder.js');
var room_notifier = require('../domain/room_notifier.js');
var bookings_record = require('../domain/bookings_record.js');

module.exports = function (robot) {
  var yesterday_bookings = function (room) {
    let travelc_user = enviorenment.get('TRAVELC_USER');
    let travelc_pass =  enviorenment.get('TRAVELC_PASS');
    robot.http('https://online.travelcompositor.com/resources/authentication/getAuthToken')
      .query({'microsite': 'default', 'username': travelc_user, 'password': travelc_pass})
      .header('Accept', 'application/json')
      .get()(function (err, resp, body) {
        if (resp.statusCode !== 200) {
          room_notifier.send(robot, room, 'No se han podido consultar las reservas. No estoy autorizado :cry:');
          return;
        }
        let auth = JSON.parse(body);
        let yesterday = clock.yesterday();
        robot.http('https://online.travelcompositor.com/resources/booking/getBookings')
          .query({'from': yesterday, 'to': yesterday})
          .header('Accept', 'application/json')
          .header('auth-token', auth.token)
          .get()(function (err, resp, body) {
            let bookings = JSON.parse(body);
            let bookings_count = bookings_mapper.count(bookings);
            room_notifier.send(robot, room, phrase_builder.build(bookings_count));
            let record = bookings_record.get(robot);
            if (bookings_count > record) {
              room_notifier.send(robot, room, '¡Hemos batido el record de reservas diarias! :muscle:');
              bookings_record.save(robot, bookings_count);
            }
          });
      });
  };
  robot.hear(/yesterday bookings/, function (msg) {
    yesterday_bookings(msg.envelope.message.room);
  });
  new CronJob('00 09 * * *', function() {
      var telegram_room = '-197645752';
      yesterday_bookings(telegram_room);
    },
    null,
    true,
    'Europe/Madrid'
  );
}
