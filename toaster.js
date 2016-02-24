// Class Constructor
var Class = function(methods) {
    var c = function() {
        this.initialize.apply(this, arguments);
    };

    for (var property in methods) {
        c.prototype[property] = methods[property];
    }

    if (!c.prototype.initialize) c.prototype.initialize = function() {};

    return c;
};

// The toaster class
var Toaster = Class({
    // Initialise the defaults and the class
    initialize: function() {
        "use strict";

        this.class = 'toast';
        this.t = 0;
        this.cssID = 'toaster-styles';
    },
    // On click, remove the toast
    clicked: function() {
        var toast = document.querySelector('.' + this.class);
        if (toast) {
            var toaster = this;
            var toastClick = (navigator.userAgent.match(/iPad/i)) ? 'touchstart' : 'click';
            toast.addEventListener(toastClick, function() {
                toaster.removeToast();
            });
        }
    },
    // jQuery style add class to element
    addClass: function(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    },
    // jQuery style remove class from element
    removeClass: function(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = cursor.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    },
    // Add the toast css to the header (for default styling)
    addCss: function() {
        var css = '\r.' + this.class + ' {\r\n\tposition: fixed;\r\n\ttop: 5px;\r\n\tright: 15px;\r\n\tpadding: 10px 15px;\r\n\tcolor: #fff;\r\n\tbackground: #08c;\r\n\tborder-radius: 0.5em;\r\n\tz-index: 999999;\r\n\tbox-shadow: 0 0 4px rgba(255,255,255,0.1);\r\n\topacity: 0;\r\n\t-webkit-transition: opacity 0.3s, transform 0.3s;\r\n\ttransition: opacity 0.3s, transform 0.3s;\r\n\tcursor: pointer;\r\n}\r\n.' + this.class + '.active {\r\n\topacity: 1;\r\n\t-webkit-transform: translateY(10px);\r\n\ttransform: translateY(10px);\r\n}',
            style = document.createElement('style');

        style.id = this.cssID;
        style.type = 'text/css';

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(style);
    },
    // Remove the default css
    removeCss: function() {
        var el = document.getElementById(this.cssID);
        var head = document.head || document.getElementsByTagName('head')[0];
        head.removeChild(el);
    },
    // Adds a toast notification to the page
    addToast: function(text) {
        // Remove existing toast for spamability
        this.forceRemove();
        
        // Create the toast element and add it to the body
        // with the text provided
        var div = document.createElement('div');
        var txt = document.createTextNode(text);
        div.className = this.class;
        div.appendChild(txt);
        document.querySelector('body').appendChild(div);
        
        // Select the toast and store the toaster class for
        // usage in functions
        var toast = document.querySelector('.' + this.class);
        var toaster = this;

        // Set the active class to animate the toast in
        setTimeout(function() {
            toaster.addClass(toast, 'active');
        }, 10);

        // Remove the toast after 2.5s have passed
        this.t = setTimeout(function() {
            toaster.removeClass(toast, 'active');
            setTimeout(function() {
                toaster.forceRemove();
            }, 320);
        }, 2500);

        // Bind the click to remove the toast if it is clicked
        this.clicked();
    },
    // Animate the toast removal
    removeToast: function() {
        var toast = document.querySelector('.' + this.class);
        if (toast) {
            var toaster = this;

            toaster.removeClass(toast, 'active');
            setTimeout(function() {
                toaster.forceRemove();
            }, 320);
        }
    },
    // Remove the toast element
    forceRemove: function() {
        var toast = document.querySelector('.' + this.class);
        if(toast){
            clearTimeout(this.t);
            toast.parentNode.removeChild(toast);
        }
    }
});
