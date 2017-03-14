module.exports = (function () {
  return {
    count: function (bookings) {
        let bookings_count = 0;
        for (let booking of bookings.bookedTrips) {
            bookings_count++;
        }
        return bookings_count;
    }
  };
})();
