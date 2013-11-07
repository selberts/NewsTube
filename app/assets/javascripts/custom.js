function initSearch(prominentIds, localIds, advocacyIds) {

	$("#query").keyup(function (e) {
		if (e.keyCode == 13) {
	    	search(prominentIds, localIds, advocacyIds);
		}
	});

	$("#searchBtn").click(function (e) {
		search(prominentIds, localIds, advocacyIds);
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
	$('.categories').fadeIn('slow');

	$( ".header" ).animate({
	    marginTop: 50
	  }, 'slow');
}