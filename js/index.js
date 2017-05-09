



window.onload = GeneralSetup;
function GeneralSetup()
{
	$(document).click(NavControl.HideNav);
	ContentLoader.LoadAllContent();
}


var NavControl = {
/*
*	DOM Requierments
*	- CSS class "show-nav" that should display the nav. Nav should be hidden if
*	  this class is removed.
*	- Element with id "nav" (mobile navigation menue)
*	- Element with id "nav-toggle" (button that toggles mobile navigation menue)
*/
	ActivateNav: function()
	{
		console.log($("#nav"));
		$("#nav").toggleClass("show-nav");
	},
	
	HideNav: function(event)
	{
		if(event == undefined)
		{
			$("#nav").removeClass("show-nav");
			return;
		}

		var nav = $("#nav")[0];
		var navToggle = $("#nav-toggle")[0];
		var target = event.target;

		var hideNav = true;


		if($.contains(nav, target) || $.contains(navToggle, target) )
		{hideNav = false}
		else if(target == nav || target == navToggle)
		{hideNav = false}

		if(hideNav == true){$(nav).removeClass("show-nav")}
	},
}



