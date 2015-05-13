import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'notes' ],

  allNotes: Ember.computed.alias('controllers.notes.allNotes'),

  defaultCategories: ['Important', 'Meeting', 'Birthday'],

  allCategories: function () {
    var categories = this.get('model').mapBy('label');

    categories = categories.concat(this.get('defaultCategories'));

    return categories;
  }.property('model'),

  categories: function () {
    //get user defined categories retrieved by model property and concatanate them
    //with the default categories defined by the application.
    var notes = this.get('allNotes');
    var categories = this.get('allCategories');

    categories = categories.map(function (category) {
      return Ember.Object.create({
        label: category,
        notes: notes.filterBy('category', category)
      });
    });

    return categories.filter(function (category) {
      return !!category.get('notes.length');
    });
  }.property('allCategories', 'allNotes.@each', 'allNotes.@each.category')
});