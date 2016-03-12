(function () {

  'use strict';

  require.config({

    baseUrl: 'js',

    paths: {
      jquery: '../../bower_components/jquery/dist/jquery',
      underscore: '../../bower_components/underscore/underscore',
      backbone: '../../bower_components/backbone/backbone',
      validation: '../../bower_components/backbone.validation/dist/backbone-validation-amd',
      stickit: '../../bower_components/backbone.stickit/backbone.stickit',
      touch: '../../bower_components/backbone.touch/backbone.touch',
      handlebars: '../../bower_components/handlebars/handlebars.runtime'
    },

    shim: {
      jquery: {
        exports: '$'
      },

      underscore: {
        deps: ['jquery'],
        exports: '_'
      },

      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },

      handlebars: {
        exports: 'Handlebars'
      }
    }
  });

  // TODO: startup code
  require(['backbone', 'router'], function(Backbone) {
    Backbone.history.start();
  });
})();
