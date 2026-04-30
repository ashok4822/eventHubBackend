export interface EventBus {
    emit(eventName: string, data: any): void;
    on(eventName: string, handler: (data: any) => void): void;
}
//# sourceMappingURL=EventBus.d.ts.map