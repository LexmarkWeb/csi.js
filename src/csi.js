window.onload = function() {
	var elements = document.getElementsByTagName('*'),
		i;
	for (i in elements) {
		if (elements[i].hasAttribute && elements[i].hasAttribute('data-include')) {
			fragment(elements[i], elements[i].getAttribute('data-include'), elements[i].getAttribute('data-include-callback'));
		}
	}
	function getFuncByName(functionName) {
		var context = window;
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for(var i=0; i < namespaces.length; i+=1) {
			var ns = namespaces[i];
			if (i === 0 && ns === 'window') {
				continue;
			}
			context = context[ns];
		}
		return context[func];
	}
	function fragment(el, url, callbackName) {
		var localTest = /^(?:file):/,
			xmlhttp = new XMLHttpRequest(),
			status = 0;

		xmlhttp.onreadystatechange = function() {
			/* if we are on a local protocol, and we have response text, we'll assume things were sucessful */
			if (xmlhttp.readyState == 4) {
				status = xmlhttp.status;
			}
			if (localTest.test(location.href) && xmlhttp.responseText) {
				status = 200;
			}
			if (xmlhttp.readyState == 4 && status == 200) {
				var parentElement = el.parentElement;
				
				el.outerHTML = xmlhttp.responseText;
				
				if (!!callbackName) {
					var callback = getFuncByName(callbackName);
					if (typeof callback === 'function') {
						callback(parentElement, xmlhttp);
					}
				}
			}
		}

		try { 
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		} catch(err) {
			/* todo catch error */
		}
	}
}
