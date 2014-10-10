$(function () {

  var easeOutCubic = function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  };
  var easeOutQuad = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  };


  var Bars = function (options) {

    var _this = this;

    if ($.isArray(options)) {
      options = {
        bars: options
      };
    }

    var defaultOptions = {
      progressFn: easeOutQuad,
      frameRate: 60,
      spreadFactor: 3,
      secondsPerLoop: 2,
      bars: ['#008844', '#ee0000', '#0066ff', '#ffcc00'],
      parent: document.body
    };

    options = $.extend({}, defaultOptions, options);

    this.options = options;


    this.domId = 'loading-bars-' + (Bars.domId++);
    var $bars = $('<div id="' + this.domId + '" class="loading-bars">');
    var $lefts = $('<div class="loading-bars-half loading-bars-half-left">');
    var $rights = $('<div class="loading-bars-half loading-bars-half-right">');
    $bars.append($lefts);
    $bars.append($rights);


    var $parent = $(options.parent);
    $parent.append($bars);


    var optionBars = options.bars;

    var barCount = optionBars.length;
    var progressPerBar = 1 / barCount;
    var progressOffset = 1 / (barCount - 1);

    var timePerLoop = this.options.secondsPerLoop * 1000;
    var timePerFrame = this.timePerFrame = (1 / this.options.frameRate) * timePerLoop;

    this.isDone = false;

    var frameShare = this.options.frameRate / barCount;

    var bars = this.bars = [];

    $.each(optionBars, function (i, optionBar) {
      if (typeof optionBar === 'string') {
        optionBar = {
          color: optionBar
        };
      }
      var bar = optionBar;

      bar.frameOffset = i * frameShare;
      bar.index = i;

      var $left = $('<div class="loading-bars-bar loading-bars-bar-left">');
      bar.$left = $left;

      var $right = $('<div class="loading-bars-bar loading-bars-bar-right">');
      bar.$right = $right;

      var widthPercent = (200) + '%';

      $left.css({
        'background-color': bar.color,
        width: widthPercent
      });
      $right.css({
        'background-color': bar.color,
        width: widthPercent
      });

      $lefts.append($left);
      $rights.append($right);

      bars.push(optionBar);
    });

  };

  Bars.domId = 0;


  Bars.prototype.getProgress = function (frame, bar) {
    var delayFrame = frame - bar.frameOffset;
    var barFrame = delayFrame < 0 ? 0 : delayFrame;
    var modFrame = barFrame % this.options.frameRate;
    var progress = modFrame / this.options.frameRate;

    progress = this.options.progressFn(null, progress, 0, 1, 1);

    return progress;
  };


  Bars.prototype.doFrame = function (frame) {
    var _this = this;

    frame = frame || 0;

    $.each(this.bars, function (i, bar) {

      bar.progress = bar.progress || 0;
      var lastProgress = bar.progress;
      bar.progress = _this.getProgress(frame, bar);

      var progress = bar.progress;

      var progressPercent = (100 * progress) * _this.options.spreadFactor;
      var offsetPercent = (progressPercent - 100);
      offsetPercent *= -1;
      var offset = offsetPercent + '%';

      // var zIndex = (barCount + 1) - Math.floor(progress / progressPerBar);
      bar.zIndex = bar.zIndex || 0;
      if (progress !== lastProgress && progress === 0) {
        bar.zIndex += 1;
      }
      var zIndex = bar.zIndex;

      if (_this.isDone && progressPercent === 0) {
        bar.$left.remove();
        bar.$right.remove();
      }

      bar.$left.css({
        left: offset,
        'z-index': zIndex
      });

      bar.$right.css({
        right: offset,
        'z-index': zIndex
      });

    });

    setTimeout(function () {
      _this.doFrame(frame + 1);
    }, this.timePerFrame);
  };

  Bars.prototype.start = function () {
    this.doFrame();
  };

  Bars.prototype.done = function () {
    this.isDone = true;
  };

  window.Bars = Bars;

});
