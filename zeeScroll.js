
(function ($) {
    var scrollableTop;
    var scrolingDist;
    var ratio;
    var self;
    var Scrolls = {
        Init: function (options, elem) {
            self = this;
            self.options = $.extend({}, $.fn.zeeScroll.options, options);
            self.settings = $.fn.zeeScroll.Settings;
            var $elem = $(elem);
            $elem.css({ height: self.options.scrollableHt });
            if ($elem.hasClass('zee-Scrollable'))
            { }
            else
            {
                self.createClass($elem);
            }
           self.scrollable.mouseover(function () {
                $(this).attr("id", "zeeId");
               var tagDiv=document.getElementById('zeeId');
               tagDiv.addEventListener('DOMMouseScroll', self.WheelHandler, false);
               tagDiv.addEventListener("mousewheel", self.WheelHandler, false);

            }).mouseout(function () { $(this).removeAttr("id"); });
        },
        createClass: function ($elem) {
            $elem.addClass('zee-Scrollable');
            self.scrollable = $elem;
            self.scrollarea = $elem.children().addClass('zee-scrollarea');
            scroller = '<div class="zee-scroller"></div>';
            $elem.append(scroller);
            self.scroller = $elem.children('.zee-scroller');
            self.scrollareaHt = self.scrollarea.height();
            var scrollerHt = self.CalcHeight($elem);
            self.makeScroller(scrollerHt);
            scrollableTop = self.scrollable.offset().top;
            self.scrollareaPos = self.scrollarea.position().top;
            scrolingDist = self.scrollable.outerHeight() - self.scroller.outerHeight();
            ratio = self.scrollareaHt / self.options.scrollableHt;
        },
        CalcHeight: function ($elem) {
            return self.options.scrollableHt / (self.scrollareaHt / self.options.scrollableHt);
        },
        makeScroller: function (scrollerHt) {
            self.scroller.css({ height: scrollerHt, background: self.options.scrollerColor, width: self.options.scrollerWdt });
            self.Drag();
        },
        Drag: function () {
            self.scroller.draggable({
                axis: 'y',
                containment: '.zee-Scrollable',
                drag: function (e) {
                    self.Scrolling(e);
                }
            });
        },
        Scrolling: function (e) {
            var scrollPostion = self.scroller.position().top;
            self.scrollarea.css({ top: -(scrollPostion * ratio - 1) });
        },
        WheelHandler: function (e) {
            var delta;
            if (!e)
                e = window.event;
            else if (e.wheelDelta)
                delta = e.wheelDelta / 120;
            else if (e.detail) {
                delta = -e.detail / 3;
            }
            var scrollerTop = self.scroller.offset().top;
            var scrollerPos = self.scroller.position().top;
            if (delta < 0) {
                if (scrollerTop < scrollableTop + scrolingDist) {
                    self.scroller.css({ top: scrollerPos + 5 });
                    scrollerPos = self.scroller.position().top;
                    if (scrollerPos > scrollableTop + scrolingDist) {
                        self.scroller.css({ top: scrollableTop + scrolingDist });
                    }
                    self.Scrolling(e);
                }
            } else {
                if (scrollerTop > scrollableTop) {
                    self.scroller.css({ top: scrollerPos - 15 });
                    scrollerPos = self.scroller.position().top;
                    if (scrollerPos < self.scrollareaPos) {
                        self.scroller.css({ top: self.scrollareaPos });
                    }
                    self.Scrolling(e);
                }
            }
        }

    };
    $.fn.zeeScroll = function (options) {
        return this.each(function () {
            if (typeof Object.create !== 'function') {
                Object.create = function (o) {
                    function F() { }
                    F.prototype = o;
                    return new F();
                }
                Scrolls.Init(options, this);
            }
            else {
                var scrolls = Object.create(Scrolls);
                scrolls.Init(options, this);
            }

        });
    };

    $.fn.zeeScroll.options = {
        scrollableHt: "200",
        color: "red",
        scrollerWdt: "10",
        scrollerColor: "#afa"
    };
    $.fn.zeeScroll.Settings = {
        scrollareaClass: 'zee-Scrollarea',
        scrollerClas: 'zee-scroller'
    };
})(jQuery);