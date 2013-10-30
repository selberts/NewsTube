function onClientLoad() {
   gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
   gapi.client.setApiKey('AIzaSyAFxd-832oMCK_33cqsRBBoh7EdYHzV2oM');
}

function search(){
   var q = $('#query').val();

   var channelList = ['UCBi2mrWuNuyYy4gbM6fU18Q',//ABCNews
                      'UCupvZG-5ko_eiXAupbDfxWw',//CNN
                      'UCqnbDFdCpuN8CMEg0VuEBqA',//NYTimes
                      'UCrtNwz62WKCglCux1nc2OgA'];//RT
   searchMultipleChannels(channelList, q, '#prominent');

   var dq = q.concat(" documentary");
   var requestDocumentary = gapi.client.youtube.search.list({
           q: dq,
           part: 'snippet',
           maxResults: 15
  });

  requestDocumentary.execute(function(response) {
    $('#documentary').html(parseResponse(response.items));
  });

  openCategories();
}

function searchMultipleChannels(channelList, q, category) {
  searchMultipleChannelsRecursive(channelList, q, category, []);
}

function searchMultipleChannelsRecursive(channelList, q, category, videoList) {
  if (channelList.length < 1)
  {
    videoList.sort(function(a,b){
      a = new Date(a.snippet.publishedAt);
      b = new Date(b.snippet.publishedAt);
      return b-a;
    });

    $(category).html(parseResponse(videoList));
  } else {  
     var id = channelList.pop();
     var nextRequest = gapi.client.youtube.search.list({
       q: q,
       channelId: id,
       part: 'snippet',
       order: 'date',
       maxResults: 15});

    nextRequest.execute(function(response) {
      if (response.pageInfo.totalResults > 0) {
        $.merge(videoList, response.items);
      }
      searchMultipleChannelsRecursive(channelList, q, category, videoList);
    });
  }
}

function parseResponse(items) {
  var videoList = '';

  $.each(items, function(index, video)
  {
    var date = new Date(video.snippet.publishedAt);
      videoList =  videoList.concat(
        displayVideo( video.snippet.channelTitle,
                      date.toDateString(),
                      video.id.videoId,
                      video.snippet.thumbnails.medium.url,
                      video.snippet.title));
  });
  
  return videoList;
}

function displayVideo(channel, time, id, imgUrl, title)
{
 return "<div class='vid'>" + 
           "<span style='float:left'>" + channel + "</span><span style='float:right'>" + time + "</span>" +
           "<a href='http://www.youtube.com/watch?v=" + id + "'>" +
             "<img src='" + imgUrl + "'/>" +
           "</a>" +
           title +
         "</div>";
}