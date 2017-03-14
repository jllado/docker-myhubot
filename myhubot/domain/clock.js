moment = require('moment')

module.exports = (function () {
  return {
    yesterday: function () {
        return moment().subtract(1, 'days').format('YYYYMMDD');
    }
  };

})();
