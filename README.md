csi.js
======

client side includes via javascript

usage
======

Simply include `csi.min.js` in your `<head>` and add a `data-include` attribute on any valid HTML element. csi.js will fetch the value of that attribute, and **replace** the element with the fetched document.

If, `include-me.html` looked like this:

```html
<h1>Hello, world!</h1>
```

Then, a document like this:

```html
<body>
<div data-include="include-me.html"></div>
</body>
```

would end up rendering like this:

```html
<body>
<h1>Hello, world!</h1>
</body>
```

There is also optional `data-include-callback` attribute:

```html
<body>
<div data-include="include-me.html" data-include-callback="someFunc"></div>

<div data-include="include-me.html" data-include-callback="NestedObj.someFunc"></div>

<script>
function someFunc(parentElement, xmlhttp) {
  console.log('Content Loaded:' + parentElement.querySelector('h1').innerText);
}

NestedObj = {
  someFunc: function (parentElement, xmlhttp) {
    console.log('Content Loaded:' + parentElement.querySelector('h1').innerText);
  }
}
</script>
</body>
```

from file
======

csi.js also works from the filesystem, enabling front end developers to splice HTML for back end implementations without the need of running a local HTTP server or copying files to a remote environment for testing to leverage server side includes.

The only caveat is Chrome, which restricts access to local files via AJAX. To resolve this, simply add `--allow-file-access-from-files` to your Chrome runtime. All other modern browsers work on direct files without any hassle. csi.js also works fine from any web server, assuming you are following appropriate CORS policies.
