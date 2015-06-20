import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:categories', {
    needs: [ 'controller:notes' ]
});

test('allCategories returns concatanated list of default categories and user defined ones', function (assert) {
    assert.expect(2);

    var customCategory = {
        label: 'Custom category'
    };
    var controller = this.subject();
    var model = [ customCategory ];
    var containsAllDefaultCategories = true;

    controller.set('model', model);

    containsAllDefaultCategories = !controller.get('defaultCategories').any(function (category) {
        return !controller.get('allCategories').contains(category);
    });

    assert.ok(controller.get('allCategories').contains(customCategory.label));
    assert.ok(containsAllDefaultCategories);
});