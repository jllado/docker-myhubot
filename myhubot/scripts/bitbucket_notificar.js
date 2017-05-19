// Description:
//   Bitbucket notifier
//

var room_notifier = require('../domain/room_notifier.js');

module.exports = function (robot) {

  robot.router.post('/bitbucket/push', function(req, res) {
    let repository = req.body.repository;
    room_notifier.send(robot, '-197523822', 'New commits in ' + repository.name + ': ' + repository.links.html.href);
    res.status(200).send('OK');
  });

}
