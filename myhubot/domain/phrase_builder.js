module.exports = (function () {
  var get_face = function (bookings_count) {
    if (bookings_count == 0) {
      return ':cry:';
    }
    return ':smile:';
  };
  return {
    build: function (bookings_count) {
        let face = get_face(bookings_count);
        return 'Ayer tuvimos ' + bookings_count + ' reservas ' + face;
    }
  };
})();
