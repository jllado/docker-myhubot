module.exports = (function () {
  return {
    get: function (key) {
        return process.env[key];
    }
  };
})();
