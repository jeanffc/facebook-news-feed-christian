var quoteList = [ 
	{
		quote: "10 I have just three things to teach: simplicity, patience, compassion. These three are your greatest treasures.",
		source: "Lao Tzu"
	}
];


var selectedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

var quoteDiv, quoteText, quoteSource, fbLink, infoPanel, taikoPic;

quoteDiv = $("<div class='nfc-quote'/>");

// Info panel, hidden by default
infoPanel = $("<div class='nfc-info-panel'></div>")
    .hide()
    .appendTo(quoteDiv);

quoteText = $("<p>“"+selectedQuote.quote+"”</p>")
    .addClass('nfc-quote-text')
    .appendTo(quoteDiv);

quoteSource = $("<p>~ "+selectedQuote.source+"</p>")
    .addClass('nfc-quote-source')
    .appendTo(quoteDiv);

var hideInfoPanel = function(){
    $('div.nfc-info-panel').hide();
}

var extensionURL = function(relativeURL){
    if(window.chrome !== undefined){
        // Chrome extension
        return chrome.extension.getURL(relativeURL);
    }else{
        // Firefox extension
        return self.options.urls[relativeURL];
    }
}

fbLink = $("<a href='javascript:;'>News Feed Eradicator :)</a>")
    .addClass('nfc-info-link')
    .on('click', function(){
      var handleClose = function() {
        $('.nfc-close-button').on('click', hideInfoPanel);
      };
      var url = 'info-panel.html';

      if (window.chrome !== undefined) {
        // Chrome extension
        infoPanel.load(chrome.extension.getURL(url),
                       handleClose);
      } else {
        // Firefox extension
        self.port.emit('requestUrl', url);
        self.port.once(url, function(data) {
          console.log("Received data for ", url);
          infoPanel.html(data);
          handleClose();
        });
      }
      infoPanel.show();
    })
	.appendTo(quoteDiv);

// This delay ensures that the elements have been created by Facebook's
// scripts before we attempt to replace them
setInterval(function(){
    // Replace the news feed
	$("div#pagelet_home_stream").replaceWith(quoteDiv);
	$("div[id^='topnews_main_stream']").replaceWith(quoteDiv);

    // Delete the ticker
    $("div#pagelet_ticker").remove();

    // Delete the trending box
    $("div#pagelet_trending_tags_and_topics").remove();
}, 1000);


