csi.js
======

Client-side includes via JavaScript

Usage
======
- Include `csi.min.js` in your `<head>`
- Add a `data-include` attribute on any valid HTML element.
  - csi.js will fetch the value of that attribute, and replace the **entire element** with the fetched document.
  - Or, if you'd like to keep the element and replace **only its contents** with the fetched document, add a 'data-include-within="true"' attribute.
- Call csi.loadAllIncludes() with optional callbacks for completion and progress notifications
- Note: CSI.js requires no other libraries

If, `include-me.html` looked like this:

```
<h1>Hello, world!</h1>
```

Then, a document like this:

```
<head>
	<script src="csi.js"></script>
</head>
<body>

<div data-include="include-me.html"></div>
<div id="keepme" data-include-within="true" data-include="include-me.html"></div>

window.onload = function(){
	csi.loadAllIncludes(
		function(){alert('finished')}
	);
};

</body>
```

Then, the page will load the two includes, show 'finished' in an alert box and the page will be rendered like this:

```
<body>
<h1>Hello, world!</h1>
<div id="keepme" data-include-within="true" data-include="include-me.html">
<h1>Hello, world!</h1>
</div>
</body>
```

About loading from local files
======

csi.js also works from the filesystem, enabling front end developers to splice HTML for back end implementations without the
need of running a local HTTP server or copying files to a remote environment for testing to leverage server side includes.

The only caveat is Chrome, which restricts access to local files via AJAX. To resolve this, simply add `--allow-file-access-
from-files` to your Chrome command line (see [Allow Chrome File Access](https://chrome-allow-file-access-from-file.blogspot.com/)). All other modern browsers work on direct files without any hassle. csi.js also works fine
from any web server, assuming you are following appropriate CORS policies.
