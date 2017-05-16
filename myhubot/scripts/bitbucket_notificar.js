// Description:
//   Bitbucket notifier
//

var room_notifier = require('../domain/room_notifier.js');

module.exports = function (robot) {

  robot.router.post('/bitbucket/push', function(req, res) {
    room_notifier.send(robot, '-197523822', "New commit");
    res.status(200).send('OK');
  });

}
