var page = new Page();
var assert = new Assert();

function checkHeadOnPage() {
  var header = document.getElementById("header").innerHTML;
  page.hasContent(header, "See the latest news!", arguments.callee.name);
};

function checkNewsOnPage() {
  var news = document.getElementsByClassName("news");
  if (news.length === 0) {
    throw new Error ("There are no news!");
  } else {
    console.log(arguments.callee.name + " test passed!")
  }
};

function checkHeadlinesOnPage() {
  var headlines = document.getElementsByClassName("news")[0].children;
  assert.isTrue(headlines[0].className === "headline", arguments.callee.name)
};

checkHeadOnPage();
checkNewsOnPage();
checkHeadlinesOnPage();
