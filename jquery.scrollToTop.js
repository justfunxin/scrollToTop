/**
 *
 * @build  : 2016-04-21
 * @author : xin
 * @version : 1.0
 *
 */
(function($) {
    $.fn.scrollToTop = function(options) {
        if(options && options.target && !options.container) {
            options.container = options.target;
        }
        options = $.extend({}, $.fn.scrollToTop.defaults, options);
        return this.each(function() {
            var $this = $(this);
            var dataOptions = getDataOptions($this);
            if(dataOptions.target && !dataOptions.container) {
                dataOptions.container = dataOptions.target;
            }
            var opts = $.extend({}, options, dataOptions);
            var $container = $(opts.container);
            if($container.scrollTop() > opts.distance) {
                $this.show();
            } else {
                $this.hide();
            }
            $container.scroll(function() {
                if ($container.scrollTop() > opts.distance) {
                    $this.fadeIn();
                } else {
                    $this.fadeOut();
                }
            });
            $this.click(function(e) {
                e.preventDefault();
                $(opts.target).animate({
                    scrollTop : opts.top
                }, opts.speed);
            });
        });
    };

    function getDataOptions(element) {
        var opt, value,
            options = {}, $element = $(element);
        for (opt in $.fn.scrollToTop.defaults) {
            value = $element.data("scroll" + opt.charAt(0).toUpperCase() + opt.substring(1).toLowerCase());
            if (value !== undefined) {
                options[opt] = value;
            }
        }
        return options;
    }

    $.fn.scrollToTop.defaults = {
        container: window,
        target : 'html, body',
        speed : 800,
        distance: 0,
        top: 0
    }
})(jQuery);
