/* global BookingList */

var bookings = new BookingList();

var BookingView = Backbone.View.extend({
	initialize: function(o) {
		this.$parent = o.parent;
		this.render();
	},
	render: function() {
		var source = $('#bookings-item-template').html();
		var template = Handlebars.compile(source);
		this.$el = $(template(this.model.toJSON())).appendTo(this.$parent);
	}
});

var AppView = Backbone.View.extend({
	el: $('.container'),
	initialize: function() {
		this.listenTo(bookings, 'sync', this.render.bind(this));
		bookings.fetch();
	},
	render: function() {
		var source = $('#bookings-template').html();
		var template = Handlebars.compile(source);
		this.$el.html(template());
		bookings.forEach(function (booking) {
			new BookingView({ parent : this.$('.bookings-list'), model: booking });
		}.bind(this));
	}
});

var App = new AppView();