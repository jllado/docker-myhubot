module.exports = (function () {
  return {
    count: function (bookings) {
        let bookings_count = 0;
        let booking_list = bookings.bookedTrips || bookings.bookedTrip;
        for (let booking of booking_list) {
            bookings_count++;
        }
        return bookings_count;
    }
  };
})();
