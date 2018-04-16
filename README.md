csi.js
======

client side includes via javascript

usage
======

Simply include `csi.min.js` in your `<head>` and add a `data-include` attribute on any valid HTML element. csi.js will fetch the value of that attribute, and **replace** the element with the fetched document. 

You can also include it via CDN like this:

```html
<script src="https://cdn.jsdelivr.net/gh/LexmarkWeb/csi.js@0.1.0/csi.min.js"></script>
```

If, `include-me.html` looked like this:

```
<h1>Hello, world!</h1>
```

Then, a document like this:

```
<body>
<div data-include="include-me.html"></div>
</body>
```

would end up rendering like this:

```
<body>
<h1>Hello, world!</h1>
</body>
```

from file
======

csi.js also works from the filesystem, enabling front end developers to splice HTML for back end implementations without the need of running a local HTTP server or copying files to a remote environment for testing to leverage server side includes.

The only caveat is Chrome, which restricts access to local files via AJAX. To resolve this, simply add `--allow-file-access-from-files` to your Chrome runtime. All other modern browsers work on direct files without any hassle. csi.js also works fine from any web server, assuming you are following appropriate CORS policies.
