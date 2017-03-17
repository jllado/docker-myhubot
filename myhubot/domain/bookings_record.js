module.exports = (function () {
  return {
    get: function (robot) {
        return robot.brain.get('record') || 0;
    },
    save: function (robot, record) {
        return robot.brain.set('record', record);
    }
  };
})();
