import { EventBus } from '../../application/ports/EventBus';
/**
 * Concrete implementation of EventBus using Node.js EventEmitter.
 * Suitable for in-process event handling.
 */
export declare class EventEmitterBus implements EventBus {
    private emitter;
    constructor();
    emit(eventName: string, data: any): void;
    on(eventName: string, handler: (data: any) => void): void;
}
//# sourceMappingURL=EventEmitterBus.d.ts.map