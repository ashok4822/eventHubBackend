import { EventEmitter } from 'events';
import { IEventBus } from '../../application/ports/EventBus';

/**
 * Concrete implementation of IEventBus using Node.js EventEmitter.
 * Suitable for in-process event handling.
 */
export class EventEmitterBus implements IEventBus {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(eventName: string, data: unknown): void {
    this.emitter.emit(eventName, data);
  }

  on(eventName: string, handler: (data: unknown) => void): void {
    this.emitter.on(eventName, handler);
  }
}
