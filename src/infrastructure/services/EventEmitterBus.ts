import { EventEmitter } from 'events';
import { EventBus } from '../../application/ports/EventBus';

/**
 * Concrete implementation of EventBus using Node.js EventEmitter.
 * Suitable for in-process event handling.
 */
export class EventEmitterBus implements EventBus {
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  emit(eventName: string, data: any): void {
    this.emitter.emit(eventName, data);
  }

  on(eventName: string, handler: (data: any) => void): void {
    this.emitter.on(eventName, handler);
  }
}
