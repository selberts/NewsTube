function init()
{
	$("#query").keyup(function (e) {
	    if (e.keyCode == 13) {
	        search();
	    }
	});
}

function toggleCategory(newCategory)
{
	$(newCategory).slideToggle('slow');
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