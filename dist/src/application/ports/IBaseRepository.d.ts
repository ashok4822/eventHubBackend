export interface IBaseRepository<T> {
    findById(id: string): Promise<T | null>;
    save(data: T): Promise<T>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=IBaseRepository.d.ts.map