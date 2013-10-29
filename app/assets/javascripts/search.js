function onClientLoad() {
   gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
   gapi.client.setApiKey('AIzaSyAFxd-832oMCK_33cqsRBBoh7EdYHzV2oM');
}

function search(){
   var q = $('#query').val();
   var requestCNN = gapi.client.youtube.search.list({
           q: q,
           channelId: 'UCupvZG-5ko_eiXAupbDfxWw',
           video: 'CaptionclosedCaption',
           part: 'snippet',
           maxResults: 15
   });

   var dq = q.concat(" documentary");
   var requestDocumentary = gapi.client.youtube.search.list({
           q: dq,
           videoDuration: 'long',
           part: 'snippet',
           maxResults: 15
  });

   requestCNN.execute(onSearchResponse);
   requestDocumentary.execute(onSearchResponse);
}

function onSearchResponse(response) {
  var videoList = '';

  $.each(response.items, function(index, video)
  {
    var date = new Date(video.snippet.publishedAt);
      videoList =  videoList.concat(
        displayVideo( video.snippet.channelTitle,
                      date.toDateString(),
                      video.id.videoId,
                      video.snippet.thumbnails.medium.url,
                      video.snippet.title));
  });

  $('#prominent').html(videoList);

  if ($('#currentCategory').val() == '')
  {
    openProminent();
  }
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