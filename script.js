
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
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&key=AIzaSyA5BGB9G5Uv4X0ccuJA8Z2U4ISoRZWQbOE&location='+streetAddress+'';
    $body.append('<img class="bgimg" src="'+streetviewUrl+'">');
    //NYT info
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+"&api-key=2zz24pB1jZvuH13Ckq7wFIzWpnO1oH7E"
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
  return false;
};
$('#form-container').submit(loadData);
