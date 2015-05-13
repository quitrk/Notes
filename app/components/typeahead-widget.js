import Em from 'ember';

var substringMatcher = function (data, keys, displayKey) {
  return function findMatches(q, cb) {
    var matches = [], 
        substrRegex = new RegExp(q.trim(), 'i');

    // iterate through objects to match the matching
    data.forEach(function(obj) {
      var matchingKey;

      var anyMatch = keys.any(function (key) {
        var str = Em.isEmpty(obj.get(key)) ? '' : obj.get(key);
        var doesMatch = substrRegex.test(str);

        if (doesMatch) {
          matchingKey = key;
        }

        return doesMatch;
      });

      if (anyMatch) {
        var x = {obj: obj};
        x[displayKey] = obj.get(displayKey) || '';
        matches.push(x);
      }
    });

    cb(matches);
  };
};

export default Em.TextField.extend({
  highlight: true,
  hint: true,
  minLength: 1,
  autofocus: true,

  didInsertElement: function() {
    this._super();
    this.initializeTypeahead();

    if (this.get('autofocus') === true) {
      this.$().focus();
    }
  },

  initializeTypeahead: function() {
    var that=this, t=null,
        options = {
          highlight: this.get('highlight'),
          hint: this.get('hint'),
          minLength: this.get('minLength')
        },
        dataset = this.get('dataset');

    t = this.$().typeahead(options, dataset);
    // Set selected object
    t.on('typeahead:selected', function(event, item) {
      Em.debug("Setting suggestion");
      that.set('selection', item.obj);
      that.sendAction('itemSelected', item.obj);
    });

    t.on('typeahead:autocompleted', function(event, item) {
      Em.debug("Setting suggestion");
      that.set('selection', item.obj);
      that.sendAction('itemSelected', item.obj);
    });
  },

  dataset: function() {
    var that=this,
        content=this.get('content');

    if (window.jQuery.isFunction(content.then)) {
      content.then(function(data) {
        return that.loadDataset(data);
      });
    } else {
      return this.loadDataset(content);
    }
  }.property(),

  loadDataset: function(content) {
    var name = this.get('name') || 'default',
        keys = this.get('filterKeys'),
        displayKey = this.get('displayKey');

    return {
      name: name,
      displayKey: displayKey,
      source: substringMatcher(content, keys, displayKey),
      templates: {
        suggestion: function (obj) {
          return "<div class='tt-suggestion`'><div class='color " + obj.obj.get('color') +
                 "'></div> <span>" + obj.obj.get(displayKey) + "</span>" + 
                 "<span class='pull-right'>" + moment(obj.obj.get('date')).format("MMM Do YY") + "</span>" +
                 "<p>" + obj.obj.get('text') + "</p></div>";
        }
      }
    };
  },
  
  clearDataset: function() {
    if (Em.isBlank(this.get('selection'))) {
      this.$().val('');
    }
  }.observes('selection')
});