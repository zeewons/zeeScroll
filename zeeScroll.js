

(function ($) {
    var scrollableTop;
    var scrolingDist;
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
            //function on the mouse scroll
            /*for Mozilla*/
            if (window.addEventListener)
                window.addEventListener('DOMMouseScroll', self.WheelHandler, false);
            /* for IE/Opera*/
            window.onmousewheel = document.onmousewheel = self.WheelHandler;
        },
        createClass: function ($elem) {
            //var self = this;
            $elem.addClass('zee-Scrollable');
            self.scrollable = $elem;
            self.scrollarea = $elem.children().addClass('zee-scrollarea');
            scroller = '<div class="zee-scroller"></div>';
            $elem.append(scroller);
            self.scroller = $elem.children('.zee-scroller');
            self.scrollareaHt = self.scrollarea.outerHeight(true);
            var scrollerHt = self.CalcHeight($elem);
            self.makeScroller(scrollerHt);
           
            scrollableTop = self.scrollable.offset().top;
            scrolingDist = self.scrollable.height() - self.scroller.height();


        },
        CalcHeight: function ($elem) {
            //var self = this;
            return self.options.scrollableHt / (self.scrollareaHt / self.options.scrollableHt);
        },
        makeScroller: function (scrollerHt) {
            //var self = this;
            self.scroller.css({ height: scrollerHt, background: self.options.scrollerColor, width: self.options.scrollerWdt });
            self.Drag();
        },
        Drag: function () {
           // var self = this;
            self.scroller.draggable({
                axis: 'y',
                containment: '.zee-Scrollable',
                drag: function (e) {
                    self.Scrolling(e);
                }
            });
        },
        Scrolling: function (e) {
            //var self = this;
            var scrollPostion = self.scroller.position().top;
            self.scrollarea.css({ top: -(scrollPostion * (self.scrollareaHt / self.options.scrollableHt) - 1) });
        },
        
        WheelHandler: function (e) {
            var delta;
            if (!e)
                e = window.event;
            if (e.wheelDelta)
                delta = e.wheelDelta / 120;
            else if (e.detail)
            {
                delta = -e.detail / 3;
            }
            var scrollerTop = self.scroller.offset().top;
            if (delta < 0) {
                console.log(scrollerTop + "-----" + scrolingDist + "-----12     " + scrollableTop);
                if (scrollerTop < scrollableTop + scrolingDist)
                {
                    console.log(1);
                    self.scroller.css({ top: scrollerTop + 3 });
                    self.Scrolling();
                }
            } else {
               console.log(scrollerTop);
                console.log(scrollableTop);
                if (scrollerTop > scrollableTop) {
                 //   console.log(2);
                    self.scroller.css({ top: scrollerTop });
                    self.Scrolling();
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
        scrollableHt: "220",
        color: "red",
        scrollerWdt: "10",
        scrollerColor: "#afa"
    };
    $.fn.zeeScroll.Settings = {
        scrollareaClass: 'zee-Scrollarea',
        scrollerClas: 'zee-scroller'
    };
})(jQuery);