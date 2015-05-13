import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('note');
  },

  setupController: function (controller, model) {
    controller.set('allNotes', model);
  }
});
