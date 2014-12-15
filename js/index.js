/* global BookingList */
var bookings = new BookingList();
var moment = require('moment');
var Handlebars = require("hbsfy/runtime");

// Handlebars Helpers
Handlebars.registerHelper('formatDate', function(date, options) {
	return moment(date).fromNow();
});

var BookingView = Backbone.View.extend({
	events: {
		'click .btn-default': '_handleClickOnCommentCounter',
		'click .btn-info': '_handleClickOnCommentPost'
	},
	initialize: function(options) {
		this.comments = new CommentList();
		this.listenTo(this.comments, 'add', this._displayComment);
		this.$parent = options.parent;
		this.render();
	},
	render: function() {
		var template = require("../templates/booking.hbs");
		this.$el = $(template(this.model.toJSON())).appendTo(this.$parent);
		this.$comment_container = this.$el.find('.list-group');
		this.$comment_counter = this.$el.find('.comment-counter');
		this.comment_counter = parseInt(this.model.toJSON().number_of_comments);
	},
	_handleClickOnCommentCounter: function() {
		if (!this.comments.length) {
			this._getComments();
		}
		this.$comment_container.stop().toggleClass('active');
	},
	_handleClickOnCommentPost: function() {
		 if (!this.comments.length) {
			this._getComments(function() {
				this._addComment();
			}.bind(this));
			return false;
		}
		this._addComment();
	},
	_getComments: function(callback) {
		this.comments.url = '/api/bookings/' + this.model.get('id');
		this.comments.fetch({
			success: function() {
				if (typeof callback === 'function') {
					callback();
				}
			}
		});
	},
	_displayComment: function(model) {
		new commentView({
			parent: this.$comment_container,
			model: model
		});
	},
	_addComment: function() {
		this.$comment_container.stop().addClass('active');
		this.comment_counter++;
		this.$comment_counter.text(this.comment_counter);
		this.comments.url = '/api/bookings/' + this.model.get('id') + '/comments';
		this.comments.push({
			body: 'this is a new comment',
			author: {
				name: 'Guillaume Morin'
			},
			date: moment()
		});
	}
});

var commentView = Backbone.View.extend({
	initialize: function(options) {
		this.$parent = options.parent;
		this.render();
	},
	render: function() {
		var template = require("../templates/comment.hbs");
		this.$el = $(template(this.model.toJSON())).appendTo(this.$parent);
	},
});

var AppView = Backbone.View.extend({
	el: $('#panel-container'),
	initialize: function() {
		this.listenTo(bookings, 'sync', this.render.bind(this));
		bookings.fetch();
	},
	render: function() {
		bookings.forEach(function (booking) {
			new BookingView({ parent : this.el, model: booking });
		}.bind(this));
	}
});

var App = new AppView();