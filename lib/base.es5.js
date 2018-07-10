var slice = [].slice // [].slice === Array.prototype.slice;
function merge(target) {
    var sources = slice.call(arguments, 1); // 把target参数去掉
    sources.forEach(function(source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    });
}

function Base() {
    this.events = {};
    Base.prototype.on = function(event, callback) {
        (this.events[event] = this.events[event] || []).push(callback);
    }

    Base.prototype.trigger = function(event) {
        var args = slice.call(arguments, 1);
        var self = this;
        (this.events[event] = this.events[event] || []).forEach(function(callback) {
            callback.apply(self, args);
        });
    }
}

Base.extend = function (proto, static) {
    var Super = this;
    var Sub = function() {
        Super.apply(this);
    }
    var Func = function() {};
    Func.prototype = Super.prototype;
    Sub.prototype = new Func();
    merge(Sub.prototype, proto);
    merge(Sub, Super, static);
    return Sub;
}

module.exports = Base