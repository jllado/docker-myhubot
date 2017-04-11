// Description:
//   Build notifier
//

var room_notifier = require('../domain/room_notifier.js');

module.exports = function (robot) {
  console.log("Build notifier started. Awaiting requests.");
  var buildMessage = function (job, status) {
    if ('success' === status) {
      return 'New version: ' + job;
    }
    if ('unstable' === status) {
      return job + ': unstable';
    }
    return job + ': failed';
  };
  robot.router.get("/build/:job/:status", function(req, res) {
    let build_message = buildMessage(req.params.job, req.params.status);
    room_notifier.send(robot, '-197645752', build_message);
    res.status(200).send(build_message);
  });

}
