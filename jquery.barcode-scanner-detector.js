(function ($) {

    function BarcodeScannerDetector(element, options, cb) {

        this.element = element || window;
        this.callback = cb;
        this.options = $.extend({
            keypressDelay: 100, // delay between pressing
            charsLength: 10 // >= 10 digits
        }, options);
        this.chars = []; // barcode result
        this.events();

    }

    BarcodeScannerDetector.prototype = {
        delay: function (callback, ms) {

            clearTimeout(this.timer);
            this.timer = setTimeout(callback, ms);

        },

        events: function () {

            var _this = this;

            this.element.onkeypress = function (e) {
                _this.handleKeypress(e);
            };

        },

        handleKeypress: function (e) {

            var _this = this;

            if (e.which >= 48 && e.which <= 57) {

                this.chars.push(String.fromCharCode(e.which));

                this.delay(function () {

                    var val;

                    if (_this.chars.length >= 10) {

                        val = _this.chars.join("");

                        if (_this.callback) {
                            _this.callback(val)
                        }

                    }

                    _this.chars = [];

                }, this.options.keypressDelay);
            }

        }
    };


    $.fn['BarcodeScannerDetector'] = function (options, cb) {

        if ($.isFunction(arguments[0])) {
            cb = arguments[0];
        }

        return this.each(function () {
            $.data(this, 'BarcodeScannerDetector', new BarcodeScannerDetector(this, options, cb))
        });
    }

}(jQuery));