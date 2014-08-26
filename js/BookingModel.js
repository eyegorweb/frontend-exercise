var Booking = Backbone.Model.extend({
	url: function () { return '/api/bookings/' + this.get('id'); }
});