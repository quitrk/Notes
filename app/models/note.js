import DS from 'ember-data';

var Note = DS.Model.extend({
  title: DS.attr('string'),
  text: DS.attr('string'),
  date: DS.attr('string'),
  color: DS.attr('string')
});

export default Note;
