"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterBus = void 0;
const events_1 = require("events");
/**
 * Concrete implementation of EventBus using Node.js EventEmitter.
 * Suitable for in-process event handling.
 */
class EventEmitterBus {
    constructor() {
        this.emitter = new events_1.EventEmitter();
    }
    emit(eventName, data) {
        this.emitter.emit(eventName, data);
    }
    on(eventName, handler) {
        this.emitter.on(eventName, handler);
    }
}
exports.EventEmitterBus = EventEmitterBus;
//# sourceMappingURL=EventEmitterBus.js.map