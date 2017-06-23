// This is called when the HTML body loads.
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

    // Grab article data from array of articles and assign to variables for later use.
    function extractArticleData(articlesArray, articleIndex) {
        headline = articlesArray[articleIndex].webTitle;
        console.log(headline);
        category = articlesArray[articleIndex].sectionName;
        date = articlesArray[articleIndex].webPublicationDate;
        url = articlesArray[articleIndex].webUrl;
    }

    // Create HTML elements to later populate with article data.
    function createHtmlElements() {
        article = document.createElement("article");
        articleDetails = document.createElement("details");
        textContent = document.createElement("p");
        headlineHTML = document.createElement("summary");
        categoryAndDateHTML = document.createElement("p");
        lineBreak = document.createElement("br");
    }

    // Assign classes or IDs to newly generated HTML elements for testing and styling.
    function designateClasses() {
        article.setAttribute("class", "article");
        headlineHTML.setAttribute("class", "headline");
        categoryAndDateHTML.setAttribute("class", "category-and-date");
        textContent.setAttribute("class", "text-content");
    }

    // Structure separate HTML elements correctly inside article.
    function constructArticleTree() {
        news.appendChild(article);
        console.log(news);
        article.appendChild(categoryAndDateHTML);
        article.appendChild(articleDetails);
        articleDetails.appendChild(headlineHTML);
        articleDetails.appendChild(textContent);
        article.appendChild(lineBreak);
    }

    // Inject article data into HTMl elements.
    function injectArticleData() {
        headlineHTML.innerHTML = headline;
        categoryAndDateHTML.innerHTML = category + " - " + new Date(date).toUTCString();
        summarizeText(url, function(summary) {
            textContent.innerHTML = summary.join(" ");
            constructArticleTree();
        });
    }

    // Construct HTML elements, populate them with data from the API calls, organise them and render them on the view.
    function renderArticle(articlesArray, articleIndex) {
        var headline, category, date, url;
        var article, articleDetails, textContent, headLineHTML, CategoryAndDateHTML, lineBreak;
        extractArticleData(articlesArray, articleIndex);
        createHtmlElements();
        designateClasses();
        injectArticleData();
    }

    retrieveData()
}
