// Everything is wrapped in an immediate function in case the name 'loadCSI' is already in use
(function() {
	function loadCSI() {
		var elements = document.getElementsByTagName('*'),
			i;
		for (i in elements) {
			if (elements[i].hasAttribute && elements[i].hasAttribute('data-include')) {
				fragment(elements[i], elements[i].getAttribute('data-include'));
			}
		}
		function fragment(el, url) {
			var localTest = /^(?:file):/,
				xmlhttp = new XMLHttpRequest(),
				status = 0;

			xmlhttp.onreadystatechange = function() {
				/* if we are on a local protocol, and we have response text, we'll assume
	*  				things were sucessful */
				if (xmlhttp.readyState == 4) {
					status = xmlhttp.status;
				}
				if (localTest.test(location.href) && xmlhttp.responseText) {
					status = 200;
				}
				if (xmlhttp.readyState == 4 && status == 200) {
					// Added try/catch to suppress 'element has no parent' error
					try{
						el.outerHTML = xmlhttp.responseText;
					}catch(err){}
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

	window.addEventListener("load", loadCSI);

	if(window.MutationObserver){
		var observer = new MutationObserver(function() {
			loadCSI();
		});

		observer.observe(document.body, {
			attributes: true,
			childList: true,
			characterData: true
		});
	}
})();