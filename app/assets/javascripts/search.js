function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAFxd-832oMCK_33cqsRBBoh7EdYHzV2oM');
}

function search() {
	alert("hi");
	var q = $('#query').val();
	var request = gapi.client.youtube.search.list({
	    q: q,
	    part: 'snippet'
	});

	request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    var str = JSON.stringify(response, '', 2);
    $('#search-container').html('<pre>' + str + '</pre>');
}