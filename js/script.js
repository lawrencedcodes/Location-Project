function loadData() {
    //series of variables for the jQuery objects
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var streetAddress = streetStr+' , '+cityStr;
    $greeting.text('Oh, you want to know about '+streetAddress+'!');
    //IMAGE info
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+streetAddress+'';
    $body.append('<img class="bgimg" src="'+streetviewUrl+'">');
    //NYT info
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+"&api-key=a585ea5341cf4f5997a3796b43609da2"
    $.getJSON(nytUrl, function(data){
        $nytHeaderElem.text('New York Times articles about '+cityStr+"");
        entries = data.response.docs;
        for (var i=0; i<entries.length; i++){
          var entry=entries[i];
          $nytElem.append(
            '<li class="article">'+
            '<a href="'+entry.web_url+'">'+entry.headline.main+'</a>'
              +
            '<p>'+" "+entry.snippet+'</p>'+
            '</li>');   
           };
    }); 
    //Wikipedia Info
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    $.ajax({
        url: wikiUrl, 
        dataType: "jsonp",
        success: function(response){
            var articleList = response[1];
            for (var i=0; i<articleList.length; i++){
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">'+articleStr +'</a></li>');
            };
            clearTimeout(wikiRequestTimeout);
            }   
        });
  return false;
};
$('#form-container').submit(loadData);
