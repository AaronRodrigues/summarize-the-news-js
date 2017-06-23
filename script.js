// This is called when the HTML body loads.
var fullTextArray = [];

function openLightbox (element) {

  var lightbox = document.getElementById('lightbox');
  var id = element.getAttribute("id");
  document.getElementById('article-view').innerHTML = fullTextArray[id];
  body = document.getElementsByTagName("body")[0]
  body.style.overflow = "hidden";
  lightbox.style.visibility = 'visible';
  lightbox.onclick = function() {
    lightbox.style.visibility = 'hidden';
    body.style.overflow = "scroll";
  };
}

function loadContent() {

    var news = document.getElementById("news");

    // Send get request to Guardian API, this returns 10 articles as JSON objects.
    function retrieveData() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var articles = JSON.parse(this.responseText).response.results;
                for (var index = 0; index < articles.length; index++) {
                    renderArticle(articles, index);
                }
            }
        };
        request.open("GET", "http://content.guardianapis.com/search?show-fields=bodyText&api-key=fe308324-ad4f-4317-a3df-7329ed2b238b", true);
        request.send();
    }

    // Send get request to Aylien Test Summarization API, linking to article. This finds the body of the article
    // and returns a summarized version of it.
    function summarizeText(articleUrl, callbackFunction) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                callbackFunction(JSON.parse(this.responseText).sentences);
            }
        };
        request.open("GET", "http://our-news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + articleUrl, true);
        request.send();
    }

    // Construct HTML elements, populate them with data from the API calls and render them on the view.
    function renderArticle(articlesArray, articleIndex) {



        // Grab article data from array of articles and assign to variables for later use.
        var headline = articlesArray[articleIndex].webTitle;
        var category = articlesArray[articleIndex].sectionName;
        var date = articlesArray[articleIndex].webPublicationDate;
        var url = articlesArray[articleIndex].webUrl;
        var bodyText = articlesArray[articleIndex].fields.bodyText;
        fullTextArray.push(bodyText);
        // Create HTML elements to later populate with article data.
        var article = document.createElement("article");
        var articleDetails = document.createElement("details");
        var textContent = document.createElement("p");
        var headlineHTML = document.createElement("summary");
        var categoryAndDateHTML = document.createElement("p");
        var lineBreak = document.createElement("br");

        // Assign classes or IDs to newly generated HTML elements for testing and styling.
        article.setAttribute("class", "article");
        headlineHTML.setAttribute("class", "headline");
        categoryAndDateHTML.setAttribute("class", "category-and-date");
        textContent.setAttribute("class", "text-content");
        textContent.setAttribute("id", articleIndex);
        textContent.setAttribute("onclick", "openLightbox(this)");

        // Inject article data into HTMl elements.
        headlineHTML.innerHTML = headline;
        categoryAndDateHTML.innerHTML = category + " - " + new Date(date).toUTCString();

        summarizeText(url, function(summary) {
            // Inject article data into HTMl elements (cont.)
            textContent.innerHTML = summary.join(" ");

            // Structure separate HTML elements correctly inside article.
            news.appendChild(article);
            article.appendChild(categoryAndDateHTML);
            article.appendChild(articleDetails);
            articleDetails.appendChild(headlineHTML);
            articleDetails.appendChild(textContent);
            article.appendChild(lineBreak);
        });
    }

    retrieveData()

}
