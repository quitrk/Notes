/* global moment */

import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['notes', 'categories'],

  notes: Ember.computed.alias('controllers.notes'),
  categories: Ember.computed.alias('controllers.categories.allCategories'),

  init: function () {
    this._super();
    this.setDefaults();
  },

  setDefaults: function () {
    this.set('selectedCategory', null);
    this.set('title', '');
    this.set('text', '');
    this.set('selectedColor', 'gray');
    this.set('date', moment(this.get('notes.selectedDate')).format('L'));
  },

  updateDate: function () {
    this.set('date', moment(this.get('notes.selectedDate')).format('L'));
  }.observes('notes.selectedDate'),

  updateProperties: function () {
    if (this.get('model.id')) {
      this.set('title', this.get('model.title'));
      this.set('text', this.get('model.text'));
      this.set('date', this.get('model.date'));
      this.set('selectedColor', this.get('model.color'));
      this.set('selectedCategory', this.get('model.category'));
    } else {
      this.setDefaults();
    }
  }.observes('model.id'),

  actions: {
    saveNote: function () {
      if (!this.get('model.id')) {
        var note = this.store.createRecord('note', {
          title: this.get('title'),
          text: this.get('text'),
          date: this.get('date'),
          color: this.get('selectedColor'),
          category: this.get('selectedCategory')
        });

        note.save();
      } else {
        this.model.set('title', this.get('title'));
        this.model.set('text', this.get('text'));
        this.model.set('date', this.get('date'));
        this.model.set('color', this.get('selectedColor'));
        this.model.set('category', this.get('selectedCategory'));

        this.model.save();
      }
    },

    cancel: function () {
      if (this.get('model.id')) {
        this.model.rollback();
      } else {
        this.setDefaults();
      }

      this.send('removeModal');
    },

    selectColor: function (color) {
      this.set('selectedColor', color);
    }
  }
});
