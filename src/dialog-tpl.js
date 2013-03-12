define(function(require, exports, module) {
    var Handlebars = require('handlebars');
    (function() {
      var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    module.exports = template(function (Handlebars,depth0,helpers,partials,data) {
      this.compilerInfo = [2,'>= 1.0.0-rc.3'];
    helpers = helpers || Handlebars.helpers; data = data || {};
      var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


      buffer += "<div class=\"";
      if (stack1 = helpers.classPrefix) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0.classPrefix; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "\">\n    <div class=\"";
      if (stack1 = helpers.classPrefix) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0.classPrefix; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "-close\" title=\"关闭本框\" data-role=\"close\"></div>\n    <div class=\"";
      if (stack1 = helpers.classPrefix) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
      else { stack1 = depth0.classPrefix; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
      buffer += escapeExpression(stack1)
        + "-content\" data-role=\"content\"></div>\n</div>\n";
      return buffer;
      });
    })();
});
