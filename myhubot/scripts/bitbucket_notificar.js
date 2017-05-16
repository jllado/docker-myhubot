// Description:
//   Bitbucket notifier
//

var room_notifier = require('../domain/room_notifier.js');

module.exports = function (robot) {

  robot.router.post('/bitbucket/push', function(req, res) {
    room_notifier.send(robot, '-197523822', 'New commits in ' + req.body.repository.name);
    res.status(200).send('OK');
  });

}
