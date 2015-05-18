import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveCategory: function (value) {
      var label = this.get('category');

      if (!label) {
        return;
      }

      var category = this.store.createRecord('category', {
        label: label
      });

      category.save();
    },

    cancel: function () {
      this.set('category');
      this.send('removeModal');
    },
  }
})