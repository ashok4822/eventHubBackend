import { IEventBus } from '../../application/ports/EventBus';
/**
 * Concrete implementation of IEventBus using Node.js EventEmitter.
 * Suitable for in-process event handling.
 */
export declare class EventEmitterBus implements IEventBus {
    private emitter;
    constructor();
    emit(eventName: string, data: unknown): void;
    on(eventName: string, handler: (data: unknown) => void): void;
}
//# sourceMappingURL=EventEmitterBus.d.ts.map