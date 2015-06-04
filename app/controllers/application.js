/* global $ */

import Ember from 'ember';

export default Ember.Controller.extend({
  deletedNotes: [],

  init: function () {
    var self = this;

    this._super();
    
    $(window).bind('beforeunload', function () {
      self.get('deletedNotes').forEach(function (note) {
        note.destroyRecord();
      });
    });
  },

  canUndo: function () {
    return this.get('deletedNotes.length');
  }.property('deletedNotes', 'deletedNotes.@each')
});