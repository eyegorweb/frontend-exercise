/* global Booking */

var BookingList = Backbone.Collection.extend({
	model: Booking,
	url: '/api/bookings'
});