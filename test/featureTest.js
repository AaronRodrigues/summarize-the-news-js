var page = new Page();
var assert = new Assert();

function checkHeadOnPage() {
  var header = document.getElementById("header").innerHTML;
  page.hasContent(header, "See the latest news!", arguments.callee.name);
};

checkHeadOnPage();
