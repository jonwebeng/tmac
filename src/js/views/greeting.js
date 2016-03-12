define(['backbone', 'templates'], function(Backbone, templates) {

  'use strict';

  var GreetingView = Backbone.View.extend({

    tpl: templates.greeting,

    render: function() {
      this.$el.html(this.tpl(this.model.toJSON()));
      return this;
    }
  });

  return GreetingView;
});
