import { EventEmitter } from 'events';
import { IEventBus } from '../../application/ports/IEventBus';

/**
 * Concrete implementation of IEventBus using Node.js EventEmitter.
 * Suitable for in-process event handling.
 */
export class EventEmitterBus implements IEventBus {
  private _emitter: EventEmitter;

  constructor() {
    this._emitter = new EventEmitter();
  }

  emit(eventName: string, data: unknown): void {
    this._emitter.emit(eventName, data);
  }

  on(eventName: string, handler: (data: unknown) => void): void {
    this._emitter.on(eventName, handler);
  }
}
