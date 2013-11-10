function onClientLoad() {
   gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
   gapi.client.setApiKey('AIzaSyAFxd-832oMCK_33cqsRBBoh7EdYHzV2oM');
}

function searchWithIds(prominentIds, advocacyIds){  
  var q = $('#query').val();
  var category = '';

  //Prominent
  var category1 = 'prominent';
  displayLoading(category1);
  searchMultipleChannels(prominentIds, q, category1);

  //Local
  searchLocal();

  //Documentary
  var category3 = 'documentary';
  displayLoading(category3);
  var dq = q.concat(" documentary");
  var requestDocumentary = gapi.client.youtube.search.list({
         q: dq,
         part: 'snippet',
         maxResults: 50
  });
  requestDocumentary.execute(function(response) {
    displayVideos(response.items, category3);
  });

  //Twitter
  var category4 = 'twitter';
  displayLoading(category4);
  displayVideos([], category4);

  //Advocacy
  var category5 = 'advocacy';
  displayLoading(category5);
  searchMultipleChannels(advocacyIds, q, category5);

  openCategories();
}

function searchLocal()
{
  var q = $('#query').val();

  var category2 = 'local';
  displayLoading(category2);
  $('#hiddenLocalHelper').load( "/localchannels?zipcode= #localChannelIds", function() {
    searchMultipleChannels(JSON.parse($('#localChannelIds').html()), q, category2);
  });
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

    displayVideos(videoList, category)

  } else {  
     var id = channelList.pop();
     var d = new Date();
     d.setFullYear(d.getFullYear() - 1);
     var nextRequest = gapi.client.youtube.search.list({
       q: q,
       channelId: id,
       part: 'snippet',
       order: 'date',
       publishedAfter: d,
       maxResults: 20});

    nextRequest.execute(function(response) {
      if (typeof response.items != "undefined") {
        $.merge(videoList, response.items);
      }

      searchMultipleChannelsRecursive(channelList, q, category, videoList);
    });
  }
}

function displayVideos(videoList, category) {

  if (videoList == undefined || videoList.length == 0)
  {//No results
    $('#' + category).html('<h4>No videos found</h4>');
  }
  else
  {
    $('#' + category).html('');
    displayNextVideos(videoList, category);
  }
}

function displayNextVideos(videoList, category)
{
  var numVideosToShow = 20;

  $.each(videoList.slice(0,Math.min(numVideosToShow,videoList.length)), function(index, video)
  {
    var date = new Date(video.snippet.publishedAt);
    displayVideo( video.snippet.channelTitle,
                  date.toDateString(),
                  video.id.videoId,
                  video.snippet.thumbnails.medium.url,
                  video.snippet.title,
                  category);
  });

  if (videoList.length > numVideosToShow)
  {

    var moreBtn = $("<button>", {  
                                  id: (category + 'MoreBtn'),
                                  class: 'moreBtn'});
    moreBtn.click(function(){
      $('#' + category + 'MoreBtn').remove();
      displayNextVideos(videoList.slice(numVideosToShow), category);
    });
    $('#' + category).append(moreBtn);
  }
}

function displayVideo(channel, time, videoId, imgUrl, title, category)
{
  var video = $("<div>", {class: "vid"});
  video.append($("<span>", {style: 'float:left', text: channel}));
  video.append($("<span>", {style: 'float:right', text: time}));

  var link = $("<a>", {href: "http://www.youtube.com/watch?v=" + videoId});
  link.append($("<img>", {src: imgUrl}));
  link.click(function() {
    $.fancybox({
        'padding'   : 0,
        'autoScale'   : false,
        'transitionIn'  : 'none',
        'transitionOut' : 'none',
        'title'     : this.title,
        'width'   : 680,
        'height'    : 495,
        'href'      : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
        'type'      : 'swf',
        'swf'     : {
            'wmode'    : 'transparent',
            'allowfullscreen' : 'true'
        }
    });
    return false;
  });
  
  video.append(link);
  video.append(title);

  $('#' + category).append(video);
}