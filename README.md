loading-bars
============

Loading bars like Gmail and other Google apps for Android.

Demo: [http://AndersDJohnson.github.io/loading-bars/example/index.html](http:/AndersDJohnson.github.io/loading-bars/example/index.html)


## Install

Install with bower:

```sh
$ bower install --save loading-bars
```

## Use

Include `src/bars.js` on your page.

### Simple

```js
var bars = new Bars();
bars.start();

```

### Custom colors

```js
var bars = new Bars(['red', 'orange', 'yellow', 'green', 'blue', 'purple']);
bars.start();

```

## Options

You can pass an options object to `new Bars( { /* ... */ } )`.

Here are more options - the current defaults:

```js
{
  /* you can provide an animation function in format of jQuery Easing (http://gsgd.co.uk/sandbox/jquery/easing/) */
  progressFn: easeOutQuad,
  /* control the frame rate */
  frameRate: 60,
  /* spread factor - not recommended to change */
  spreadFactor: 3,
  /* control the animation speed */
  secondsPerLoop: 2,
  /* these are the bar colors */
  bars: ['#008844', '#ee0000', '#0066ff', '#ffcc00'],
  /* the parent element to attach to */
  parent: document.body
}
```


## Inspiration

* Gmail app for Android
* Google
* YouTube
* Medium
* http://usabilitypost.com/2013/08/19/new-ui-pattern-website-loading-bars/
* https://github.com/rstacruz/nprogress
* https://github.com/peachananr/loading-bar
* https://github.com/chieffancypants/angular-loading-bar

