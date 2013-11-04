function onClientLoad() {
   gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
   gapi.client.setApiKey('AIzaSyAFxd-832oMCK_33cqsRBBoh7EdYHzV2oM');
}

function search(){  
  var q = $('#query').val();
  var category = '';

  //Prominent
  var category1 = 'prominent';
  displayLoading(category1);
  var channelList = ['UCBi2mrWuNuyYy4gbM6fU18Q',//ABCNews
                    'UCupvZG-5ko_eiXAupbDfxWw',//CNN
                    'UCqnbDFdCpuN8CMEg0VuEBqA',//NYTimes
                    'UC52X5wxOL_s5yw0dQk7NtgA',//AP
                    'UCf4FYTsGFFcdc68AUPIU3RA',//Buzzfeed
                    'UCGTUbwceCMibvpbd2NaIP7A',//WeatherChannel
                    'UCK7tptUDHh-RYDsdxO1-5QQ',//WSJ
                    'UCB0JdwmdBHeScbGK-q_EMSQ',//CBSNews
                    'UCXIJgqnII2ZOINSWNOGFThA',//FoxNews
                    'UCCElUBs4eYOlX6sc24EAsAw',//Reuters
                    'UCHd62-u_v4DvJ8TCFtpi4GA',//WashingtonPost
                    'UCHpw8xwDNhU9gdohEcJu4aA',//TheGuardian
                    'UCNye-wNBqNL5ZzHSJj3l8Bg',//AlJazeeraEnglish
                    'UCUMZ7gohGI9HcU9VNsr2FJQ',//Bloomberg
                    'UCP6HGa63sBC7-KHtkme-p-g',//USAToday
                    'UCb--64Gl51jIEVE-GLDAVTg',//CSPAN
                    'UCPgLNge0xqQHWM5B5EFH9Cg',//telegraphtv
                    'UCeY0bbntWzzVIaj2z3QigXg'//NBCNews
                    ];
  searchMultipleChannels(channelList, q, category1);

  //Local
  var category2 = 'local';
  displayLoading(category2);
  displayVideos([], category2);

  //Documentary
  var category3 = 'documentary';
  displayLoading(category3);
  var dq = q.concat(" documentary");
  var requestDocumentary = gapi.client.youtube.search.list({
         q: dq,
         part: 'snippet',
         maxResults: 25
  });
  requestDocumentary.execute(function(response) {
    displayVideos(response.items, category3);
  });

  //Twitter
  var category4 = 'twitter';
  displayLoading(category4);
  var search_value = encodeURLComponent(q);
  $.ajax({
    url:'search_response.php?q='+ search_value,
    success:function(data){
      alert(data);
    }
  })
  displayVideos([], category4);

  //HomeVideos
  var category5 = 'homevideos';
  displayLoading(category5);
  displayVideos([], category5);

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

    if (videoList.length > 25)
    {
      videoList = videoList.slice(0,25);
    }

    displayVideos(videoList, category)

  } else {  
     var id = channelList.pop();
     var nextRequest = gapi.client.youtube.search.list({
       q: q,
       channelId: id,
       part: 'snippet',
       order: 'date',
       maxResults: 10});

    nextRequest.execute(function(response) {
      if (typeof response.items != "undefined") {
        $.merge(videoList, response.items);
      }

      searchMultipleChannelsRecursive(channelList, q, category, videoList);
    });
  }
}

function displayVideos(items, category) {

  if (items == undefined || items.length == 0)
  {//No results
    $('#' + category).html('<h4>No videos found</h4>');
  }
  else
  {
    $('#' + category).html('');

    $.each(items, function(index, video)
    {
      var date = new Date(video.snippet.publishedAt);
        displayVideo( video.snippet.channelTitle,
                      date.toDateString(),
                      video.id.videoId,
                      video.snippet.thumbnails.medium.url,
                      video.snippet.title,
                      category);
    });
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