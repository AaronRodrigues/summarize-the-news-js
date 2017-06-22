var page = new Page();
var assert = new Assert();

function checkHeadOnPage() {
  var header = document.getElementById("header").innerHTML;
  page.hasContent(header, "See the latest news!", arguments.callee.name);
};

function checkNewsOnPage() {
  var news = document.getElementById("news").children;
  if (news.length === 0) {
    throw new Error ("There are no news!");
  } else {
    console.log(arguments.callee.name + " test passed!")
  }
};

function checkHeadlinesOnPage() {
  var headlines = document.getElementsByClassName("headline");
  assert.isTrue(headlines.length > 0, arguments.callee.name)
};

(function(exports) {
  function executeTests() {
    checkHeadOnPage();
    checkNewsOnPage();
    checkHeadlinesOnPage();
  }
  exports.executeTests = executeTests;
})(this);
