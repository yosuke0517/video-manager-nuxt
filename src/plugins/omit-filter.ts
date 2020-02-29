import Vue from 'vue'

Vue.filter('omitFilter', function(value) {
  if (!value) {
    return ''
  }

  if (value.length > 120) {
    return value.substr(0, 120) + '...'
  }
  return value
})
