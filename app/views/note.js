import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'note',

  mouseEnter: function () {
    this.set('showButtons', true);
  },

  mouseLeave: function () {
    this.set('showButtons', false);
  }
});
