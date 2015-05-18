import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'notes' ],

  allNotes: Ember.computed.alias('controllers.notes.allNotes'),

  defaultCategories: [null, 'Important', 'Meeting', 'Birthday'],

  allCategories: function () {
    var categories = this.get('model').mapBy('label');

    categories.unshiftObjects(this.get('defaultCategories'));

    return categories;
  }.property('model', 'model.@each'),

  categories: function () {
    //get user defined categories retrieved by model property and concatanate them
    //with the default categories defined by the application.
    var notes = this.get('allNotes');
    var categories = this.get('allCategories');
    var defaultCategories = this.get('defaultCategories');

    categories = categories.map(function (category) {
      return Ember.Object.create({
        label: category || 'No category',
        notes: notes.filterBy('category', category),
        isDefaultCategory: defaultCategories.contains(category)
      });
    });

    return categories;
  }.property('allCategories', 'allNotes.@each', 'allNotes.@each.category'),

  actions: {
    removeCategory: function (label) {
      this.get('allNotes').filterBy('category', label).forEach(function (note) {
        note.set('category', null);
        note.save();
      });

      this.get('model').findBy('label', label).destroyRecord();      
    }
  }
});