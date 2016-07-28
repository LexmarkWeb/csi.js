var csi = {
	aIncludeElements: [],
	nLoadedElements: 0,

	// load contents of all data-include elements
	loadAllIncludes: function(fnAllLoaded, fnProgress) {

		fnAllLoaded = (typeof(fnAllLoaded) != "undefined") ? fnAllLoaded : false;
		fnProgress = (typeof(fnProgress) != "undefined") ? fnProgress : false;

		if ( fnProgress ) fnProgress( "csi: entering loadAllIncludes()..." );

		var elements = document.getElementsByTagName('*');

		// find all elements with data-include attribute
		for (var iElement = 0; iElement < elements.length; ++iElement) {
			if (elements[iElement].hasAttribute && elements[iElement].hasAttribute('data-include')) {
				this.aIncludeElements.push(elements[iElement]);
			}
		}

		if ( fnProgress ) fnProgress("csi: Loading " + this.aIncludeElements.length + " data-include elements");

		// for all data-include elements, load their contents from data-include source file
		for (var element in this.aIncludeElements) {
			var dataIncludeURL = this.aIncludeElements[element].getAttribute('data-include');
			var dataReplaceWithin = this.getAttribute(this.aIncludeElements[element], 'data-include-within', 'false');
			var replaceType = (dataReplaceWithin == "true") ? "loading within" : "replacing";
			if ( fnProgress ) fnProgress("csi: Loading include \"" + dataIncludeURL + "\", " + replaceType + "...");
			this.loadFragment(
				this.aIncludeElements[element],
				dataIncludeURL,
				dataReplaceWithin,
				function() {
					++csi.nLoadedElements;
					if ( fnProgress ) fnProgress("csi: Loaded fragment #" + csi.nLoadedElements + " of " + csi.aIncludeElements.length);
					// if this is the last include loaded, notify the caller with fnAllLoaded()
					if ( csi.nLoadedElements == csi.aIncludeElements.length ) {
						if ( fnAllLoaded ) fnAllLoaded();
					}
				}
			);
		}
		if ( fnProgress ) fnProgress( "csi: exiting loadAllIncludes()..." );
	},
	loadFragment: function(el, url, replaceWithin, fnLoaded) {
		sendHTTPRequest( url, null, function(req){
			if ( replaceWithin == "true" ) {
				el.innerHTML = req.responseText;
			}
			else {
				el.outerHTML = req.responseText;
			}
			fnLoaded();
		});
	},
	// get element's attribute or default value if attribute isn't set
	getAttribute: function( el, attributeName, defaultValue ) {
		var value = defaultValue;
		if ( el.hasAttribute(attributeName) ) {
			value = el.getAttribute(attributeName);
			if ( typeof(value) == "undefined" || typeof(value) == null || value == "" ) {
					value = defaultValue;
			}
		};
		return value;
	}
};

function sendHTTPRequest(url,postData,callback) {
    var req = createXMLHTTPObject();
    if (req)
    {
		var localTest = /^(?:file):/
		var status;
		var method = (postData) ? "POST" : "GET";

		req.onreadystatechange = function ()
			{
				if (req.readyState == 4) {
					status = req.status;
				}
				if (localTest.test(location.href) && req.responseText) {
					status = 200;
				}
				if (req.readyState == 4 && status == 200) {
					callback(req);
				}
			};

		try {
			req.open(method,url,true);
			// req.setRequestHeader('User-Agent','XMLHTTP/1.0');
			if (postData)
				req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			req.send(postData);
		}
		catch(err) {
			console.log("Exception occurred when CSI loaded \"" + url + "\"");
			if ( err.message ) console.log(err.message);
			console.log(err);
		}
	}
} // sendHTTPRequest()

var XMLHttpFactories = [
    { name: "Microsoft.XMLHTTP", fnNew: function () {return new ActiveXObject("Microsoft.XMLHTTP")} },
    { name: "Msxml2.XMLHTTP",    fnNew: function () {return new ActiveXObject("Msxml2.XMLHTTP")} },
    { name: "Msxml3.XMLHTTP",    fnNew: function () {return new ActiveXObject("Msxml3.XMLHTTP")} },
    { name: "XMLHttpRequest",    fnNew: function () {return new XMLHttpRequest()} }
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    var xmlhttpname = "";
	for (var i=0;i<XMLHttpFactories.length;i++) {
		try {
			xmlhttpname = XMLHttpFactories[i].name;
			xmlhttp = XMLHttpFactories[i].fnNew();
		}
		catch (e) {
			continue;
		}
		break;
	}
    console.log("new HTTP request: " + xmlhttpname);
    return xmlhttp;
}
