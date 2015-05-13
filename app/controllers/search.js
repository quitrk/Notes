import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['notes'],

  notes: Ember.computed.alias('controllers.notes'),

  allNotes: Ember.computed.alias('controllers.notes.allNotes'),

  filterKeys:  ['title', 'text', 'date'],
  
  actions: {
    jumpToNote: function (note) {
      this.transitionToRoute('notes');
      this.set('notes.selectedDate', new Date(note.get('date')));
    }
  }
});
