import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'calendar',

  weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

  months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], 

  updateSelectedDate: function () {
    if (this.get('selectedDate')) {
      this.generateMonth(this.get('selectedDate'));
    }
  }.observes('selectedDate').on('didInsertElement'),

  displayedMonth: function () {
    if (!this.get('selectedDate')) {
      return;
    }

    return this.months[this.get('selectedDate').getMonth()];
  }.property('dayRows'),

  displayedYear: function () {
    if (!this.get('selectedDate')) {
      return;
    }

    return this.get('selectedDate').getFullYear();
  }.property('dayRows'),

  generateMonth: function (date) {
    var i;
    var dayObj;
    var numberOfDays;
    var firstDayOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    switch (this.months[date.getMonth()]) {
      case "April":
      case "June":
      case "September":
      case "November":
        numberOfDays = 30;
        break;
      case "February":
        numberOfDays = date.getFullYear() % 4 === 0 ? 29 : 28;
        break;
      default:
        numberOfDays = 31;
        break;
    }

    this.set('dayRows', [[]]);

    if (firstDayOfTheMonth.getDay() > 1) {

      for (i = 1; i < firstDayOfTheMonth.getDay(); i++) {
        this.dayRows[0].pushObject(Ember.Object.create());
      }
    }

    for (i = 1; i <= numberOfDays; i++) {
      if (this.dayRows[this.dayRows.length - 1].length === 7) {
        this.dayRows.pushObject([]);
      }

      dayObj = Ember.Object.create({
        day: i,
        active: false
      });

      if (this.get('selectedDate').getDate() === i) {
        dayObj.active = true;
      } 

      this.dayRows[this.dayRows.length - 1].pushObject(dayObj);
    }

    this.markToday();
    this.highlightDates();
  },

  markToday: function () {
    var today = new Date();

    if (today.getMonth() === this.get('months').indexOf(this.get('displayedMonth')) &&
        today.getFullYear() === this.get('displayedYear')) {
      this.get('dayRows').any(function (row) {
        var foundToday = row.findBy('day', today.getDate());

        if (foundToday) {
          foundToday.set('today', true);
          return true;
        }
      });
    }
  }.observes('displayedMonth'),

  highlightDates: function () {
    var month = this.get('months').indexOf(this.get('displayedMonth'));
    var year = this.get('displayedYear');
    var dayRows = this.get('dayRows');
    var self = this;

    var highlight = function (day) {
      var result = self.get('highlightedDates').any(function (hDate) {
        var dateObj = new Date(hDate);
        
        if (day) {
          return dateObj.getMonth() === month &&
                 dateObj.getFullYear() === year &&
                 dateObj.getDate() === day.get('day');
        } 
      });

      if (day) {
        day.set('highlight', result);
      }
    };

    for (var i = 0; i < dayRows.get('length'); i++) {
      for (var j = 1; j <= dayRows.objectAt(i).length; j++) {
        highlight(dayRows.objectAt(i).objectAt(j));
      }
    }
  }.observes('highlightedDates'),

  actions: {
    getNextMonth: function () {
      var date = new Date(this.get('selectedDate'));
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);

      this.set('selectedDate', date);
    },

    getPreviousMonth: function () {
      var date = new Date(this.get('selectedDate'));
      date.setMonth(date.getMonth() - 1);
      date.setDate(1);

      this.set('selectedDate', date);
    },

    setActive: function (day) {
      this.dayRows.forEach(function (row) {
        row.forEach(function (dayParam) {
          dayParam.set('active', false);
        });
      });

      day.set('active', true);
      
      this.set('selectedDate', new Date(this.get('displayedYear'), this.months.indexOf(this.get('displayedMonth')), day.day));
    }
  }
});
