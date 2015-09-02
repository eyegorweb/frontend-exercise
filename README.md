Project followed on 09/02/2015
Author: Igor Trifunovic
mail: igor.tri@orange.fr

upmysport Front-End Developer Exercise
======================================

An exercise to help determine a front-end developer's abilities and expertise. There are many ways to complete it, so do it however you feel best. However, it does involve use of some third-party frameworks: Backbone (MV* framework), Underscore (dependency of Backbone), Handlebars (templates) and Bootstrap (CSS). You are not required to use them, and you are more than welcome to completely switch frameworks or ditch them entirely as long as you can complete the tasks.

## Get Started

1. Fork the repo
2. Clone it
3. If you don't have it already, install gulp globally using `sudo npm install gulp -g`
4. Do `npm install` in the directory (PROCESS TO UPDATE LOCALLY:
git clone https://github.com/eyegorweb/frontend-exercise.git
git add README.md
git commit -am "init commit"
git pull https://github.com/eyegorweb/frontend-exercise.git master
git push https://github.com/eyegorweb/frontend-exercise.git master
npm install gulp --save-dev
sudo npm install gulp --save-dev
sudo npm install -g gulp
sudo npm install --save-dev gulp
sudo npm install interfake --save
sudo npm install moment --save
sudo npm install gulp-browserify
sudo npm install --save-dev gulp-browserify
sudo npm install --save-dev gulp-uglify
sudo npm install browserify-handlebars
browserify -t browserify-handlebars entry-point.js
sudo npm install --save-dev handlebars
sudo npm install --save-dev browserify-handlebars
sudo npm install --save-dev hbsfy
sudo npm install --save-dev handlebars@1
)
5. Run `gulp` in the directory
6. Go to http://localhost:3000

## Included Resources

* `js/index.js` - the main application code which uses Backbone views, models and collections.
* `vendor/` - Dependencies
* `vendor/bootstrap/` - Bootstrap JS source, SASS source and compiled CSS. Currently only the CSS is used.
* `gulpfile.js` - A file for the Gulp task runner. Includes a mocked RESTful HTTP API which delivers JSON built using [Interfake](https://github.com/basicallydan/interfake). You do not need to touch this file or understand it for this exercise, but you are welcome to if it helps. The supported API calls are:
  * `GET /api/bookings`
  * `GET /api/bookings/<booking_id>`
  * `POST /api/bookings/<booking_id>/comments`
* `main.css` is self-explanatory.
* `package.json` is also self-explanatory. You don't need to touch this either if you don't want to.
* `spec/` is the directory containing BDD-style tests, with a [Jasmine  ](http://jasmine.github.io). It starts with only one. As you go through the tasks, we recommend that you write tests as you go along, ideally using the tests to drive change in some aspects of your code.

## Scenario

You are taking over a part-completed project to display a list of Lesson Bookings of various sports to a user, Jonathan Ross.

The app's purpose is to display this from the perspective of the user, who in this case we'll assume is *already* logged in. Jonathan has made some Bookings with two Sports Instructors: Andy Murray and Gregor McGee. Currently, this is the *existing* functionality:

* View a list of bookings including the following information
  * Booking title
  * Instructor
  * Number of comments on the booking
  * Unformatted, non-localised date for the booking

We wish to extend this functionality, in ways outlined below. Please comment your code if you feel you're doing something at all unusual, or to help the reader along. And don't forget to try and use Test-Driven Development, or at least write unit tests (where appropriate) in the `spec` folder.

## Tasks

#### 1. `JavaScript:` Show all comments for a booking by clicking on the booking count.

When the comment count (e.g. "3 Comments" for the first booking) is clicked, the app should somehow display a list of those comments. The comments are available by hitting the GET endpoint for the booking, which will be `/api/bookings/<booking_id>`. This will return the full response, including the comments. Please include the author, the date/time the comment was posted and the message text of the comment itself.

#### 2. `JavaScript:` Display the date in a nicer, readable format and localise it.

The booking date starts out looking really ugly, such as `2014-08-29T08:24:25.037Z`. We need a more readable format. For anything posted in the last 24-hours, it would be nice to see it in the "6 hours ago" kind of format popular on the web these days. Otherwise, in a format like "29/08/2014 @ 8:24am" will do just fine.

#### 3. `JavaScript:` Allow the user to add a comment.

...by making a POST request to `/api/bookings/<booking_id>/comments`. Backbone should be able to help you with this with a few changes to the Booking model.

#### 4. `CSS`: Give the comment count and date badges rounded corners.

Choose whatever radius you like, but maybe just make sure it's more than a couple of pixels so that it's visible.

#### 5. `CSS`: Open the comments thread using a CSS3 transition.

Now that comments are being displayed thanks to task 1, let's see them show up with some style and flair.

#### 6. `CSS`: Change the unit used for margins, paddings and fonts.

The pixel (`px`) unit is not great at enforcing proportions in responsive design. There are better alternatives.

#### 7. `CSS`: Make the colours and margins as reusable as you can.

The following are bonus tasks which we do not necessarily expect everyone to complete, but it will help your application to attempt them or describe how you might do them.

#### 8. `JavaScript`: Describe or demonstrate how the project app could use CommonJS or RequireJS to improve modularity of code and dependency management.

#### 9. `Third-Party Tools`: Display the location of the booked lesson on a map using the latitude and longitude returned from `GET /api/bookings/<booking_id>`.

[MapBox](http://mapbox.com) and [Google Maps](https://developers.google.com/maps/documentation/javascript/) are both popular choices.

#### 10. `Impress us`: The previous tasks are quite tightly defined.  For this task, feel free to demonstrate some other skill or technique of yours to improve the bookings list further.  Please have an explanation ready of what you've done, and here are some ideas as inspiration:

* `HTML5`: Describe or demonstrate how a cutting-edge HTML5 feature help make the map in **Task 9** easier to reuse in the markup rather than having to involve your JavaScript.
* `Design / UX`: Go to town on the interface and make it much more user friendly, or get creative with the layout and design.
* `Performance`: Demonstrate a way to use caching in order to reduce communication between the front end and the "back end" API.
