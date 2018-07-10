class Base {
    constructor(options) {
        this.events = {};
    }

    // 事件可绑定多个回调
    on(event, callback) {
        // this.events[event] = callback.bind(this);
        (this.events[event] = this.events[event] || []).push(callback);
        // if (!this.events[event]) {
        //     this.events[event] = [];
        // }
        // this.events[event].push(callback);
    }

    trigger(event, ...args) {
        (this.events[event] = this.events[event] || []).forEach(callback => {
            callback.apply(this, args);
        });
    }
}

module.exports = Base