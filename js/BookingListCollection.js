/* global Booking */

var BookingList = Backbone.Collection.extend({
	model: Booking,
	url: '/api/bookings'
});

var CommentList = Backbone.Collection.extend({
	model: Comment
});