(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['quick'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n	<h1>";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{},data:data},helper ? helper.call(depth0, "quick.title", options) : helperMissing.call(depth0, "t", "quick.title", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\n	<p>";
  stack1 = (helper = helpers.tf || (depth0 && depth0.tf),options={hash:{},data:data},helper ? helper.call(depth0, "quick.content", 10, options) : helperMissing.call(depth0, "tf", "quick.content", 10, options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n	<p>";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n	<p>";
  if (helper = helpers.weekday) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.weekday); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n	<p>";
  if (helper = helpers.monthDay) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.monthDay); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n</div>\n";
  return buffer;
  });
})();