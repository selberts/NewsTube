function init()
{
	$("#query").keyup(function (e) {
	    if (e.keyCode == 13) {
	        search();
	    }
	});
}

function toggleCategory(category)
{
	$('#' + category + 'Wrapper').slideToggle('slow');
}

function displayLoading(category)
{
	$('#' + category).html('<h4>Loading videos...</h4>');
}

function openCategories()
{
	if ($('#areCategoriesOpen').val() == '')
	{
		$('.categories').fadeIn('slow');

		$( ".header" ).animate({
		    marginTop: 50
		  }, 'slow');
	}
}