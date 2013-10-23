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
	var currentCategory = $('#currentCategory').val();
	
	if (currentCategory == newCategory)
	{
		$(currentCategory).slideUp('slow');
		$('#currentCategory').val('');
	}
	else
	{
		if (currentCategory != '')
		{
			$(currentCategory).slideUp('slow');
		}

		$(newCategory).slideDown('slow');
		$('#currentCategory').val(newCategory);
	}
}

function openProminent()
{
	var currentCategory = $('#currentCategory').val();
	if (currentCategory != '#prominentWrapper')
	{
		toggleCategory('#prominentWrapper');
	}
}