define(['backbone', 'models/greeting', 'views/greeting'], function(Backbone, Greeting, GreetingView) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'home'
    },

    home: function() {
      var greetingView = new GreetingView({ model: new Greeting({
        message:  'Hello, hace tiempo que vengo al taller...'
      })});

      $('body').prepend(greetingView.render().el);
    }
  });

  return new Router();
});
