"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterBus = void 0;
const events_1 = require("events");
/**
 * Concrete implementation of IEventBus using Node.js EventEmitter.
 * Suitable for in-process event handling.
 */
class EventEmitterBus {
    constructor() {
        this._emitter = new events_1.EventEmitter();
    }
    emit(eventName, data) {
        this._emitter.emit(eventName, data);
    }
    on(eventName, handler) {
        this._emitter.on(eventName, handler);
    }
}
exports.EventEmitterBus = EventEmitterBus;
//# sourceMappingURL=EventEmitterBus.js.map