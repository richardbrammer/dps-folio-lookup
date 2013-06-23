dps-folio-lookup
================

Gets back an array of folios from the distributon service of ADPS for a given account (Adobe Digital Publishing Suite).

Installation
------------

```
npm install dps-folio-lookup
```

Usage
-----

dps-folio-lookup has one function `getFolios(accountId, all, callback)`. Use the callback function to access the array of issues. If you set `all` to `true` issues will include every rendition.

```javascript
var lookup = require('dps-folio-lookup'),
	accountId = '' // get your account ID from Adobe here: http://lighthouse.adobe.com/dps/entitlement/index.php

lookup.getFolios(accountId, false, function (issues) {
	console.log(issues);
});
```
