angular.module('app.filters', [])

.filter('filtercpf', function() {
    return function(input) {
      var str = input + '';
      if(str.length <= 11){
        str = str.replace(/\D/g, '');
        str = str.replace(/(\d{3})(\d)/, "$1.$2");
        str = str.replace(/(\d{3})(\d)/, "$1.$2");
        str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }
      return str;
    };
  });