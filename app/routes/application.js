import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function () {
    var self = this;

    this.store.find('category').then(function (categories) {
      self.controllerFor('categories').set('model', categories);
    });

    this.store.find('note').then(function (notes) {
      self.controllerFor('notes').set('allNotes', notes);
    });
  },

  actions: {
    remove: function (note) {
      note.destroyRecord();
    },

    edit: function (note) {
      this.send('showModal', 'edit', note);
    },
    
    showModal: function(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model || Ember.K
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
