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
           part: 'snippet'
   });
   var requestNBC = gapi.client.youtube.search.list({
           q: q,
   channelId: 'UCeY0bbntWzzVIaj2z3QigXg',
           video: 'CaptionclosedCaption',
           part: 'snippet'
   });
   requestCNN.execute(onSearchResponse);
   requestNBC.execute(onSearchResponse);
}


function onSearchResponse(response) {
   var str = JSON.stringify(response, '', 2);
   var idlist = getVideoId(str);
   var middle = Math.floor(idlist.length/2);
   var newlist = idlist.substr(0,middle);
  $('#prominent').html(newlist);
  //will probably change this
  openProminent();
}
//return a list of videoId separated by a comma
function getTitle(str){
  var start = str.search('title":');
  var end = str.search('description');
  var title= str.substring(start+9,end-5);
  return title
}

function getVideoId(str){
   var IDlist=""; 
   while(str.search("videoId")!=-1){
           var start = str.search("videoId");
           var id =  str.substring(start+11,start+22);
           var title= getTitle(str);
           var end = str.search("thumbnails");
           alert(end);
           IDlist =  IDlist.concat(displayVideo(id,title));
           str = str.slice(end);
   }
   
   return IDlist
}

function displayVideo(id, title)
{
 return "<div class='vid'>" +
           "<a href='http://www.youtube.com/watch?v=" + id + "'>" +
             "<img class='vidImg' src='http://img.youtube.com/vi/" + id + "/hqdefault.jpg'/>" +
           "</a>" +
           title +
         "</div>";
}