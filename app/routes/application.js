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
      note.deleteRecord();
      this.controllerFor('application').get('deletedNotes').pushObject(note);
    },

    edit: function (note) {
      this.send('showModal', 'edit', note);
    },

    undo: function () {
      var deletedNotes = this.controllerFor('application').get('deletedNotes'); 
      var targetNote = deletedNotes.get('lastObject');

      targetNote.rollback();
      deletedNotes.removeObject(targetNote);
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
