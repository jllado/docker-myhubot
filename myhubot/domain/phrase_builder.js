var bookings_mapper = require('./bookings_mapper.js')

module.exports = (function () {
  var get_face = function (bookings_count) {
    if (bookings_count == 0) {
      return ':cry:';
    }
    return ':smile:';
  };
  return {
    build: function (bookings) {
        let bookings_count = bookings_mapper.count(bookings);
        let face = get_face(bookings_count);
        return 'Ayer tuvimos ' + bookings_count + ' reservas ' + face;
    }
  };
})();
