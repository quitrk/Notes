import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'note',

  content: [],

  model: function () {
    var allNotes=  this.get('allNotes');
    var filteredNotes = Ember.A;
    var selectedDate = this.get('selectedDate');

    if (allNotes) {
      filteredNotes = allNotes.filter(function (note) {
        var date = new Date(note.get('date'));

        return date &&
               date.getDate() === selectedDate.getDate() &&
               date.getMonth() === selectedDate.getMonth() &&
               date.getFullYear() === selectedDate.getFullYear();
      });
    }

    return filteredNotes;
  }.property('selectedDate', 'allNotes.@each'),

  selectedDate: new Date(),

  highlightedDates: function () {
    return this.get('allNotes').mapBy('date').uniq();
  }.property('allNotes.@each'),

  actions: {
    remove: function (note) {
      note.destroyRecord();
    },

    edit: function (note) {
      this.send('showModal', 'edit', note);
    }
  }
});
