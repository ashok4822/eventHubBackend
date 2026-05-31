export interface IEventBus {
  emit(eventName: string, data: unknown): void;
  on(eventName: string, handler: (data: unknown) => void): void;
}
