function initSearch() {
	$("#query").keyup(function (e) {
		if (e.keyCode == 13) {
	    	search();
		}
	});

	$.get( 'http://freegeoip.net/json', function( data ) {
      if (data.zipcode != "undefined" && data.zipcode != "")
      {
      	$('#zipcode').val(data.zipcode);
      }
    });
}

function toggleCategory(category)
{
	$('#' + category + 'TriWrapper').slideToggle('slow');
	$('#' + category + 'Wrapper').slideToggle('slow');
}

function displayLoading(category)
{
	$('#' + category).html('<h4>Loading videos...</h4><img style="margin-top:30px" src="assets/fancybox_loading.gif"/>');
}

function openCategories()
{
	var isOnLandingPage = $('#landingPage').val();
	if (isOnLandingPage == 'true')
	{
		$('.categories').fadeIn('slow');

		$( ".header" ).animate({
		    marginTop: 0
		  }, 'slow');

		toggleCategory('prominent');

		$('#landingPage').val('false');
	}
}