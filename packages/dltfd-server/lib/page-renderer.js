const formatHTML = require('./array-format-html.js');

module.exports = function (bundleName, content, state) {
  let languageParts = state.page.language.split('-'); // fr-FR https://www.w3.org/International/articles/language-tags/

  let xmlLang = languageParts[0]; // xml:lang
  let ogLocale = languageParts.join('_'); // og:locale

  let isCacheEnable = false;

  let appcache = '';

  // https://en.wikipedia.org/wiki/Cache_manifest_in_HTML5
  if (isCacheEnable) {
    appcache = 'manifest="/manifest.appcache"';
  }

  // https://www.w3.org/TR/appmanifest/
  let appmanifest = '';

  if (isCacheEnable) {
    appmanifest = '<link rel="manifest" href="/manifest.appmanifest">';
  }

  let doc = [
    '<!DOCTYPE html>',
    `<html ${appcache} lang="${xmlLang}" dir="${state.page.dir}">`,
    [
      '<head>',
      [
        '<title>' + state.page.title + '</title>',
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />',
        '<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />',

        appmanifest,

        // lang
        '<link rel="alternate" hreflang="en" href="" />',

        // // alternate
        // '<link rel="alternate" type="application/rss+xml" title="" href=""/>',
        // '<link rel="alternate" type="application/atom+xml" title="" href=""/>',
        // '<link rel="alternate" type="application/epub+zip" title="" href=""/>',

        // // apple-touch-icon
        // '<link rel="apple-touch-icon" href="touch-icon-iphone.png" />',
        // '<link rel="apple-touch-icon" sizes="57×57" href="touch-icon-ipad.png" />',
        // '<link rel="apple-touch-icon" sizes="60×60" href="touch-icon-ipad.png" />',
        // '<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />',
        // '<link rel="apple-touch-icon" sizes="76×76" href="touch-icon-ipad.png" />',
        // '<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />',
        // '<link rel="apple-touch-icon" sizes="120×120" href="touch-icon-iphone4.png" />',
        // '<link rel="apple-touch-icon" sizes="144×144" href="touch-icon-iphone4.png" />',
        // '<link rel="apple-touch-icon" sizes="152×152" href="touch-icon-iphone4.png" />',
        // '<link rel="apple-touch-icon" sizes="167x167" href="touch-icon-iphone4.png" />',
        // '<link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone4.png" />',

        // // SEO
        // '<meta name="description" content=""/>',
        // '<link rel="canonical" href=""/>',
        // '<meta name="robots" content="noodp"/>',

        // // https://support.google.com/webmasters/answer/1663744?hl=en
        // '<link rel="prev" href=""/>',
        // '<link rel="next" href=""/>',

        // // https://developers.google.com/web/updates/2015/08/using-manifest-to-set-sitewide-theme-color
        // '<meta name="theme-color" content="#2196F3"',

        // // Google+
        // '<link rel="publisher" href=""/>',

        // // twitter
        // '<meta name="twitter:site" content="" />',
        // '<meta name="twitter:domain" content="" />',
        // '<meta name="twitter:description" content=""/>',
        // '<meta name="twitter:title" content=""/>',
        // '<meta name="twitter:card" content="summary"/>',

        // // facebook
        // '<meta name="fb:app_id" property="fb:app_id" content="" />',
        // '<meta name="fb:page_id" property="fb:app_id" content="" />',
        //
        // '<meta property="article:publisher" content="" />',
        // '<meta property="article:author" content="" />',

        // // http://ogp.me/
        // '<meta property="og:site_name" content="" />',
        // '<meta property="og:url" content="" />',
        // '<meta property="og:title" content="" />',
        // '<meta property="og:type" content="article" />',
        '<meta property="og:locale" content="' + ogLocale + '" />',
        // '<meta property="og:description" content="" />',
        // '<meta property="og:image" content="" />',

        // // Inline css
        // '<style type="text/css"></style>',

        // // External css
        // '<link type="text/css" rel="stylesheet" media="all" href="/' + bundleName + '.bundle.css" />'
      ],
      '</head>',
       '<body>',
       [
        '<div data-page-root>' + content + '</div>',
        '<script>window.__INITIAL_STATE__ = ' + JSON.stringify(state) + ';</script>',
        // '<script type="text/javascript" src="/commons.chunk.js"></script>',
        '<script type="text/javascript" src="/' + bundleName + '.bundle.js" async></script>'
       ],
       '</body>'
    ],
    '</html>'
  ];

  return formatHTML(doc);
};
