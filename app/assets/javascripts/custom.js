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
	var currentCategory = $('#currentCategory').val();
	if (currentCategory != '' && category != currentCategory)
	{
		$(currentCategory).slideUp('slow');
	}

	$(category).slideToggle('slow');

	$('#currentCategory').val(category);
}

function openProminent()
{
	var currentCategory = $('#currentCategory').val();
	if (currentCategory != '#prominentWrapper')
	{
		toggleCategory('#prominentWrapper');
	}
}