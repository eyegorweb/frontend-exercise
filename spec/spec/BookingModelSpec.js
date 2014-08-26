/* global Booking */
describe('Booking', function() {
  var booking;

  beforeEach(function() {
    booking = new Booking();
  });

  it('should correctly determine the URL of the booking', function() {
    booking.set('id', 1);
    expect(booking.url()).toEqual('/api/bookings/1');
  });
});
