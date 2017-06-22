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

// function checkNewsHasHeadline() {
//   var headline = document.getElement
// }
// #1 check if there is elements of headlines list
// #2

checkHeadOnPage();
checkNewsOnPage();
