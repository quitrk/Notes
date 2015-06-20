import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleFor('controller:notes', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('the model property filters allNotes collection by selected date', function (assert) {
    var controller = this.subject();
    var selectedDate = new Date(2005, 5, 5);

    var allNotes = [
        Ember.Object.create({
            date: selectedDate
        }),
        Ember.Object.create({
            date: new Date()
        })
    ];

    controller.set('selectedDate', selectedDate);
    controller.set('allNotes', allNotes);

    assert.equal(controller.get('model.length'), 1);
    assert.equal(controller.get('model.firstObject'), allNotes.get('firstObject'));
});