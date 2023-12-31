export declare function some<T>(value: T): Maybe<T>;
export declare function none<T = any>(): Maybe<T>;
export declare class Maybe<T> {
    value: T;
    private static _;
    private constructor();
    unwrap(): T;
    isNone(): boolean;
    isSome(): boolean;
    static some<T>(value: T): Maybe<T>;
    static get none(): Maybe<any>;
    match<U>(none: () => U, some: (value: T) => U): U;
    chain<U>(fn: (value: T) => U): Result<U>;
    toString(): string;
}
export declare class Result<T, E = Error> {
    #private;
    private constructor();
    static Ok<T>(value?: T): Result<T>;
    get error(): Maybe<E>;
    get value(): Maybe<T>;
    static Err<E>(error: E): Result<any, E>;
    isOk(): boolean;
    isErr(): boolean;
    unwrap(): T;
    match<U>(err: (error: E) => U, ok: (value: T) => U): U;
    static encase<U>(fn: () => U): Result<U>;
    chain<U, V = Error>(fn: (value: T) => U): Result<U, V>;
    private recycle;
}
