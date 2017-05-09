
/*
*	DYNAMIC CONTENT LOADING SYSTEM (USING AJAX)
*	
*	Uses ajax requests to load the contents of .txt and .html files into elements on the page.
*	Similar to a static site generator except that the client/user does the work instead of the server.
*
** 	EXAMPLE
**	<p data-content-load="url"></p>
**	
**	- "url" should be the url to a .txt or .html file on the local server
**	- if the content is to be interpreted as html it should start with <!DOCTYPE html>
**
**
*/







var ContentLoader = (function() 
{	
	
	var htmlIdentifier = "<!DOCTYPE html>"
	var contentAttributeName = "data-content-load"
	
/*============================================================*/
	
	function LoadAllContent()
	{
		var allElements = document.getElementsByTagName("body")[0].getElementsByTagName("*");

		for(var i = 0; i < allElements.length; i++)
		{
			LoadContent(allElements[i]);
		}

	}
	
	function LoadContent(element)
	{
		var contentAttribute = element.getAttribute(contentAttributeName);
		
		if(contentAttribute == null || contentAttribute == ""){ return }
		GetContent(element, contentAttribute);
	}
	
/*============================================================*/
	
	function GetContent(element, contentURL)
	{
		if(window.XMLHttpRequest){var request = new XMLHttpRequest() }
		else
		{
			//IE 5 and 6 will use the ActiveX control
			var request = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		request.onreadystatechange = RequestCallback;
		request.open("GET", contentURL, true);
		request.overrideMimeType("text/plain")
		request.send(null);
		
		function RequestCallback()
		{
			if(this.readyState == 4)
			{
				if(this.status == 200)
				{
					InsertContentInElement(this.responseText, element);		
				}
				else
				{
					var errorString = "ERROR GETTING CONTENT FROM URL: " + contentURL + "\n STATUSE CODE: " + this.status +  "\n STATUS TEXT:" + this.statusText;
					InsertContentInElement(errorString, element);
				}
			}
		}
	}
	
	
	function InsertContentInElement(content, element)
	{
		if(IsContentHTML(content) )
		{
			element.innerHTML = content;
		}
		else
		{
			element.innerText = content;
		}
	}
	
	function IsContentHTML(content)
	{
		if(String.prototype.startsWith)
		{
			if(content.startsWith(htmlIdentifier) || content.startsWith(htmlIdentifier.toUpperCase()) )
			{return true}
			return false;
		}
		else
		{
			var subStr = content.substring(0, htmlIdentifier);
			if(subStr = htmlIdentifier || subStr == htmlIdentifier.toUpperCase){ return true }
			return false;
		}
	}
	
/*============================================================*/
	
	return {
		LoadAllContent: LoadAllContent,
		LoadContent: LoadContent,
	};
	
}) ();


