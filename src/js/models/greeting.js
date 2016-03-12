define(['backbone'], function(Backbone) {

  'use strict';

  var Greeting = Backbone.Model.extend({

    defaults: {
      message: null
    }
  });

  return Greeting;
});
