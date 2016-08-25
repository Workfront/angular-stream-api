[![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url]
[![npm][npm-download-image]][npm-download-url] [![npm][npm-version-image]][npm-version-url] [![|MITLicense][license-image]][license-url] 

# angular-stream-api
A Workfront Stream API for AngularJS
Supported API versions: 5.0+, unsupported, internal

### Table of contents

  * [Development](#development)
  * [Example](#example)

-------
## Development

For building the package, you need to have [NodeJs](https://nodejs.org/en/) with npm.
For running the package tests, you need to have [Bower](https://bower.io/).

Install npm/bower dependencies
```
npm install
```

Build the package and start local web server
```
npm run dev
```


-------
## Example

Run following command to start server
```
webpack-dev-server --host 127.0.0.1 --port 443 --content-base ./examples --devtool sourcemap --https --key o365.key --cert o365.crt  
```
Add the following in your `hosts` file
```
127.0.0.1 <any-subdomain>.attask-ondemand.com
```
Open in browser following url
```
https://<any-subdomain>.attask-ondemand.com/index.html  
```

[travis-url]: https://travis-ci.org/Workfront/angular-stream-api
[travis-image]: https://img.shields.io/travis/Workfront/angular-stream-api.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/Workfront/angular-stream-api
[coveralls-image]: https://img.shields.io/coveralls/Workfront/angular-stream-api.svg?style=flat-square

[npm-version-image]: https://img.shields.io/npm/v/angular-stream-api.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/angular-stream-api

[npm-download-image]: https://img.shields.io/npm/dm/angular-stream-api.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/angular-stream-api

[license-image]: http://img.shields.io/badge/license-APv2-blue.svg?style=flat
[license-url]: LICENSE
