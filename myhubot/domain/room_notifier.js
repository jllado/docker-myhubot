module.exports = (function () {
  return {
    send: function (robot, room, msg) {
      robot.send({room: room}, msg);
    }
  };
})();
