(function ($) {

    function BarcodeScannerDetector(element, options) {

        this.element = element || window;

        this.options = {
            keypressDelay: 100, // delay between pressing
            charsLength: 10 // >= 10 digits
        };

        if (options) {
            this.options = $.extend(this.options, options)
        }

        this.chars = []; // barcode result
        this.events();

    }

    BarcodeScannerDetector.prototype.delay = function (callback, ms) {

        clearTimeout(this.timer);
        this.timer = setTimeout(callback, ms);

    };

    BarcodeScannerDetector.prototype.events = function () {

        var _this = this;

        this.element.onkeypress = function (e) {
            _this.handleKeypress(e);
        };

    };

    BarcodeScannerDetector.prototype.handleKeypress = function (e) {

        var _this = this;

        if (e.which >= 48 && e.which <= 57) {

            this.chars.push(String.fromCharCode(e.which));

            this.delay(function () {

                if (_this.chars.length >= 10) {

                    if (this.element === window) {
                        console.log("Barcode scanned: " + _this.chars.join(""));
                    } else {
                        this.element.val(_this.chars.join(""));
                    }

                }

                _this.chars = [];

            }, this.options.keypressDelay);
        }

    };

    $.fn['BarcodeScannerDetector'] = function (options) {
        return this.each(function () {
            $.data(this, 'BarcodeScannerDetector', new BarcodeScannerDetector(this, options))
        });
    }

}(jQuery));