type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type BadChars = '~' | '`' | '!' | '@' | '#' | '%' | '^' | '&' | '*' | '(' | ')' | '-' | '+'
    | '=' | '{' | '}' | ';' | ':' | '\'' | '"' | '<' | '>' | ',' | '.' | '/' | '?'
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

type ExtractDottable<K extends PropertyKey> =
    K extends string ? string extends K ? never :
    K extends `${Digit}${infer _}` | `${infer _}${BadChars}${infer _}` ? never :
    K
    : never

type DottablePaths<T, P extends Prev[number] = 10> = [] | ([P] extends [never] ? never :
    T extends readonly any[] ? never :
    T extends object ? {
        [K in ExtractDottable<keyof T>]: [K, ...DottablePaths<T[K], Prev[P]>]
    }[ExtractDottable<keyof T>] : never);

type Join<T extends string[], D extends string> =
    T extends [] ? never :
    T extends [infer F] ? F :
    T extends [infer F, ...infer R] ?
    F extends string ? string extends F ? string : `${F}${D}${Join<Extract<R, string[]>, D>}` : never : string;

export type ObjectPath<T> = Join<Extract<DottablePaths<T>, string[]>, "."> extends string ? Join<Extract<DottablePaths<T>, string[]>, "."> : never;

/**  returns the value of an object at a specified path
 * ```ts
 * //example:
 * const obj = { a: { b: { c: 1 } } };
 * const value = valueAt(obj, "a.b.c"); // value is 1
 * ```
*/
export function valueAt<T>(obj: T, path: ObjectPath<T>): unknown;
export function valueAt<T>(obj: T, path: string): unknown;
export function valueAt<T>(obj: T, path: ObjectPath<T> | string): unknown { return _valueAt(obj, path as string) };

const _valueAt = (obj: any, path: string) => path.split(".").reduce((a, v) => (a ? a[v] : undefined), obj);