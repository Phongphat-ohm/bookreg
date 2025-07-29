
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model TeachingAssignment
 * 
 */
export type TeachingAssignment = $Result.DefaultSelection<Prisma.$TeachingAssignmentPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Book
 * 
 */
export type Book = $Result.DefaultSelection<Prisma.$BookPayload>
/**
 * Model BookRegistration
 * 
 */
export type BookRegistration = $Result.DefaultSelection<Prisma.$BookRegistrationPayload>
/**
 * Model SubjectClass
 * 
 */
export type SubjectClass = $Result.DefaultSelection<Prisma.$SubjectClassPayload>
/**
 * Model AcademicYear
 * 
 */
export type AcademicYear = $Result.DefaultSelection<Prisma.$AcademicYearPayload>
/**
 * Model SubjectGroup
 * 
 */
export type SubjectGroup = $Result.DefaultSelection<Prisma.$SubjectGroupPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Teachers
 * const teachers = await prisma.teacher.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Teachers
   * const teachers = await prisma.teacher.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teachingAssignment`: Exposes CRUD operations for the **TeachingAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeachingAssignments
    * const teachingAssignments = await prisma.teachingAssignment.findMany()
    * ```
    */
  get teachingAssignment(): Prisma.TeachingAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.book`: Exposes CRUD operations for the **Book** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.book.findMany()
    * ```
    */
  get book(): Prisma.BookDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookRegistration`: Exposes CRUD operations for the **BookRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookRegistrations
    * const bookRegistrations = await prisma.bookRegistration.findMany()
    * ```
    */
  get bookRegistration(): Prisma.BookRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subjectClass`: Exposes CRUD operations for the **SubjectClass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubjectClasses
    * const subjectClasses = await prisma.subjectClass.findMany()
    * ```
    */
  get subjectClass(): Prisma.SubjectClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicYear`: Exposes CRUD operations for the **AcademicYear** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicYears
    * const academicYears = await prisma.academicYear.findMany()
    * ```
    */
  get academicYear(): Prisma.AcademicYearDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subjectGroup`: Exposes CRUD operations for the **SubjectGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubjectGroups
    * const subjectGroups = await prisma.subjectGroup.findMany()
    * ```
    */
  get subjectGroup(): Prisma.SubjectGroupDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Teacher: 'Teacher',
    Class: 'Class',
    Subject: 'Subject',
    TeachingAssignment: 'TeachingAssignment',
    Student: 'Student',
    Book: 'Book',
    BookRegistration: 'BookRegistration',
    SubjectClass: 'SubjectClass',
    AcademicYear: 'AcademicYear',
    SubjectGroup: 'SubjectGroup'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "teacher" | "class" | "subject" | "teachingAssignment" | "student" | "book" | "bookRegistration" | "subjectClass" | "academicYear" | "subjectGroup"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      TeachingAssignment: {
        payload: Prisma.$TeachingAssignmentPayload<ExtArgs>
        fields: Prisma.TeachingAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeachingAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeachingAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>
          }
          findFirst: {
            args: Prisma.TeachingAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeachingAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>
          }
          findMany: {
            args: Prisma.TeachingAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>[]
          }
          create: {
            args: Prisma.TeachingAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>
          }
          createMany: {
            args: Prisma.TeachingAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeachingAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>[]
          }
          delete: {
            args: Prisma.TeachingAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>
          }
          update: {
            args: Prisma.TeachingAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.TeachingAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeachingAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeachingAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.TeachingAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeachingAssignmentPayload>
          }
          aggregate: {
            args: Prisma.TeachingAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeachingAssignment>
          }
          groupBy: {
            args: Prisma.TeachingAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeachingAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeachingAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<TeachingAssignmentCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Book: {
        payload: Prisma.$BookPayload<ExtArgs>
        fields: Prisma.BookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findFirst: {
            args: Prisma.BookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findMany: {
            args: Prisma.BookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          create: {
            args: Prisma.BookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          createMany: {
            args: Prisma.BookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          delete: {
            args: Prisma.BookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          update: {
            args: Prisma.BookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          deleteMany: {
            args: Prisma.BookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          upsert: {
            args: Prisma.BookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          aggregate: {
            args: Prisma.BookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook>
          }
          groupBy: {
            args: Prisma.BookGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookCountArgs<ExtArgs>
            result: $Utils.Optional<BookCountAggregateOutputType> | number
          }
        }
      }
      BookRegistration: {
        payload: Prisma.$BookRegistrationPayload<ExtArgs>
        fields: Prisma.BookRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>
          }
          findFirst: {
            args: Prisma.BookRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>
          }
          findMany: {
            args: Prisma.BookRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>[]
          }
          create: {
            args: Prisma.BookRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>
          }
          createMany: {
            args: Prisma.BookRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>[]
          }
          delete: {
            args: Prisma.BookRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>
          }
          update: {
            args: Prisma.BookRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.BookRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.BookRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookRegistrationPayload>
          }
          aggregate: {
            args: Prisma.BookRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookRegistration>
          }
          groupBy: {
            args: Prisma.BookRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<BookRegistrationCountAggregateOutputType> | number
          }
        }
      }
      SubjectClass: {
        payload: Prisma.$SubjectClassPayload<ExtArgs>
        fields: Prisma.SubjectClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>
          }
          findFirst: {
            args: Prisma.SubjectClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>
          }
          findMany: {
            args: Prisma.SubjectClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>[]
          }
          create: {
            args: Prisma.SubjectClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>
          }
          createMany: {
            args: Prisma.SubjectClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>[]
          }
          delete: {
            args: Prisma.SubjectClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>
          }
          update: {
            args: Prisma.SubjectClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>
          }
          deleteMany: {
            args: Prisma.SubjectClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>[]
          }
          upsert: {
            args: Prisma.SubjectClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectClassPayload>
          }
          aggregate: {
            args: Prisma.SubjectClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubjectClass>
          }
          groupBy: {
            args: Prisma.SubjectClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectClassCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectClassCountAggregateOutputType> | number
          }
        }
      }
      AcademicYear: {
        payload: Prisma.$AcademicYearPayload<ExtArgs>
        fields: Prisma.AcademicYearFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicYearFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicYearFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          findFirst: {
            args: Prisma.AcademicYearFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicYearFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          findMany: {
            args: Prisma.AcademicYearFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>[]
          }
          create: {
            args: Prisma.AcademicYearCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          createMany: {
            args: Prisma.AcademicYearCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicYearCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>[]
          }
          delete: {
            args: Prisma.AcademicYearDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          update: {
            args: Prisma.AcademicYearUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          deleteMany: {
            args: Prisma.AcademicYearDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicYearUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicYearUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>[]
          }
          upsert: {
            args: Prisma.AcademicYearUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          aggregate: {
            args: Prisma.AcademicYearAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicYear>
          }
          groupBy: {
            args: Prisma.AcademicYearGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicYearGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicYearCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicYearCountAggregateOutputType> | number
          }
        }
      }
      SubjectGroup: {
        payload: Prisma.$SubjectGroupPayload<ExtArgs>
        fields: Prisma.SubjectGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>
          }
          findFirst: {
            args: Prisma.SubjectGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>
          }
          findMany: {
            args: Prisma.SubjectGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>[]
          }
          create: {
            args: Prisma.SubjectGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>
          }
          createMany: {
            args: Prisma.SubjectGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>[]
          }
          delete: {
            args: Prisma.SubjectGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>
          }
          update: {
            args: Prisma.SubjectGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>
          }
          deleteMany: {
            args: Prisma.SubjectGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>[]
          }
          upsert: {
            args: Prisma.SubjectGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectGroupPayload>
          }
          aggregate: {
            args: Prisma.SubjectGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubjectGroup>
          }
          groupBy: {
            args: Prisma.SubjectGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectGroupCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    teacher?: TeacherOmit
    class?: ClassOmit
    subject?: SubjectOmit
    teachingAssignment?: TeachingAssignmentOmit
    student?: StudentOmit
    book?: BookOmit
    bookRegistration?: BookRegistrationOmit
    subjectClass?: SubjectClassOmit
    academicYear?: AcademicYearOmit
    subjectGroup?: SubjectGroupOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    advisingClasses: number
    teachingAssignments: number
    SubjectGroup: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advisingClasses?: boolean | TeacherCountOutputTypeCountAdvisingClassesArgs
    teachingAssignments?: boolean | TeacherCountOutputTypeCountTeachingAssignmentsArgs
    SubjectGroup?: boolean | TeacherCountOutputTypeCountSubjectGroupArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountAdvisingClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountTeachingAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeachingAssignmentWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountSubjectGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectGroupWhereInput
  }


  /**
   * Count Type ClassCountOutputType
   */

  export type ClassCountOutputType = {
    advisors: number
    students: number
    subjectClasses: number
    teachingAssignments: number
  }

  export type ClassCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advisors?: boolean | ClassCountOutputTypeCountAdvisorsArgs
    students?: boolean | ClassCountOutputTypeCountStudentsArgs
    subjectClasses?: boolean | ClassCountOutputTypeCountSubjectClassesArgs
    teachingAssignments?: boolean | ClassCountOutputTypeCountTeachingAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassCountOutputType
     */
    select?: ClassCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountAdvisorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountSubjectClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectClassWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountTeachingAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeachingAssignmentWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    books: number
    subjectClasses: number
    registrations: number
    teachingAssignments: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | SubjectCountOutputTypeCountBooksArgs
    subjectClasses?: boolean | SubjectCountOutputTypeCountSubjectClassesArgs
    registrations?: boolean | SubjectCountOutputTypeCountRegistrationsArgs
    teachingAssignments?: boolean | SubjectCountOutputTypeCountTeachingAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountSubjectClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectClassWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookRegistrationWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountTeachingAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeachingAssignmentWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    registrations: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | StudentCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookRegistrationWhereInput
  }


  /**
   * Count Type BookCountOutputType
   */

  export type BookCountOutputType = {
    registrations: number
  }

  export type BookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registrations?: boolean | BookCountOutputTypeCountRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookCountOutputType
     */
    select?: BookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookRegistrationWhereInput
  }


  /**
   * Count Type AcademicYearCountOutputType
   */

  export type AcademicYearCountOutputType = {
    Book: number
  }

  export type AcademicYearCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Book?: boolean | AcademicYearCountOutputTypeCountBookArgs
  }

  // Custom InputTypes
  /**
   * AcademicYearCountOutputType without action
   */
  export type AcademicYearCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYearCountOutputType
     */
    select?: AcademicYearCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcademicYearCountOutputType without action
   */
  export type AcademicYearCountOutputTypeCountBookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
  }


  /**
   * Count Type SubjectGroupCountOutputType
   */

  export type SubjectGroupCountOutputType = {
    Subject: number
  }

  export type SubjectGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Subject?: boolean | SubjectGroupCountOutputTypeCountSubjectArgs
  }

  // Custom InputTypes
  /**
   * SubjectGroupCountOutputType without action
   */
  export type SubjectGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroupCountOutputType
     */
    select?: SubjectGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectGroupCountOutputType without action
   */
  export type SubjectGroupCountOutputTypeCountSubjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    id: number | null
  }

  export type TeacherSumAggregateOutputType = {
    id: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: number | null
    name: string | null
    username: string | null
    password: string | null
    role: string | null
    create_at: Date | null
    update_at: Date | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: number | null
    name: string | null
    username: string | null
    password: string | null
    role: string | null
    create_at: Date | null
    update_at: Date | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    name: number
    username: number
    password: number
    role: number
    create_at: number
    update_at: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    id?: true
  }

  export type TeacherSumAggregateInputType = {
    id?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    role?: true
    create_at?: true
    update_at?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    role?: true
    create_at?: true
    update_at?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    name?: true
    username?: true
    password?: true
    role?: true
    create_at?: true
    update_at?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: number
    name: string
    username: string
    password: string
    role: string
    create_at: Date
    update_at: Date
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    create_at?: boolean
    update_at?: boolean
    advisingClasses?: boolean | Teacher$advisingClassesArgs<ExtArgs>
    teachingAssignments?: boolean | Teacher$teachingAssignmentsArgs<ExtArgs>
    SubjectGroup?: boolean | Teacher$SubjectGroupArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    create_at?: boolean
    update_at?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    create_at?: boolean
    update_at?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    create_at?: boolean
    update_at?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "username" | "password" | "role" | "create_at" | "update_at", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advisingClasses?: boolean | Teacher$advisingClassesArgs<ExtArgs>
    teachingAssignments?: boolean | Teacher$teachingAssignmentsArgs<ExtArgs>
    SubjectGroup?: boolean | Teacher$SubjectGroupArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      advisingClasses: Prisma.$ClassPayload<ExtArgs>[]
      teachingAssignments: Prisma.$TeachingAssignmentPayload<ExtArgs>[]
      SubjectGroup: Prisma.$SubjectGroupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      username: string
      password: string
      role: string
      create_at: Date
      update_at: Date
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    advisingClasses<T extends Teacher$advisingClassesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$advisingClassesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teachingAssignments<T extends Teacher$teachingAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$teachingAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    SubjectGroup<T extends Teacher$SubjectGroupArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$SubjectGroupArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'Int'>
    readonly name: FieldRef<"Teacher", 'String'>
    readonly username: FieldRef<"Teacher", 'String'>
    readonly password: FieldRef<"Teacher", 'String'>
    readonly role: FieldRef<"Teacher", 'String'>
    readonly create_at: FieldRef<"Teacher", 'DateTime'>
    readonly update_at: FieldRef<"Teacher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.advisingClasses
   */
  export type Teacher$advisingClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    cursor?: ClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Teacher.teachingAssignments
   */
  export type Teacher$teachingAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    where?: TeachingAssignmentWhereInput
    orderBy?: TeachingAssignmentOrderByWithRelationInput | TeachingAssignmentOrderByWithRelationInput[]
    cursor?: TeachingAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeachingAssignmentScalarFieldEnum | TeachingAssignmentScalarFieldEnum[]
  }

  /**
   * Teacher.SubjectGroup
   */
  export type Teacher$SubjectGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    where?: SubjectGroupWhereInput
    orderBy?: SubjectGroupOrderByWithRelationInput | SubjectGroupOrderByWithRelationInput[]
    cursor?: SubjectGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectGroupScalarFieldEnum | SubjectGroupScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassAvgAggregateOutputType = {
    id: number | null
  }

  export type ClassSumAggregateOutputType = {
    id: number | null
  }

  export type ClassMinAggregateOutputType = {
    id: number | null
    grade: string | null
    name: string | null
  }

  export type ClassMaxAggregateOutputType = {
    id: number | null
    grade: string | null
    name: string | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    grade: number
    name: number
    _all: number
  }


  export type ClassAvgAggregateInputType = {
    id?: true
  }

  export type ClassSumAggregateInputType = {
    id?: true
  }

  export type ClassMinAggregateInputType = {
    id?: true
    grade?: true
    name?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    grade?: true
    name?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    grade?: true
    name?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _avg?: ClassAvgAggregateInputType
    _sum?: ClassSumAggregateInputType
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: number
    grade: string
    name: string
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    grade?: boolean
    name?: boolean
    advisors?: boolean | Class$advisorsArgs<ExtArgs>
    students?: boolean | Class$studentsArgs<ExtArgs>
    subjectClasses?: boolean | Class$subjectClassesArgs<ExtArgs>
    teachingAssignments?: boolean | Class$teachingAssignmentsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    grade?: boolean
    name?: boolean
  }, ExtArgs["result"]["class"]>

  export type ClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    grade?: boolean
    name?: boolean
  }, ExtArgs["result"]["class"]>

  export type ClassSelectScalar = {
    id?: boolean
    grade?: boolean
    name?: boolean
  }

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "grade" | "name", ExtArgs["result"]["class"]>
  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    advisors?: boolean | Class$advisorsArgs<ExtArgs>
    students?: boolean | Class$studentsArgs<ExtArgs>
    subjectClasses?: boolean | Class$subjectClassesArgs<ExtArgs>
    teachingAssignments?: boolean | Class$teachingAssignmentsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {
      advisors: Prisma.$TeacherPayload<ExtArgs>[]
      students: Prisma.$StudentPayload<ExtArgs>[]
      subjectClasses: Prisma.$SubjectClassPayload<ExtArgs>[]
      teachingAssignments: Prisma.$TeachingAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      grade: string
      name: string
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes and returns the data updated in the database.
     * @param {ClassUpdateManyAndReturnArgs} args - Arguments to update many Classes.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClassUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    advisors<T extends Class$advisorsArgs<ExtArgs> = {}>(args?: Subset<T, Class$advisorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    students<T extends Class$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subjectClasses<T extends Class$subjectClassesArgs<ExtArgs> = {}>(args?: Subset<T, Class$subjectClassesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teachingAssignments<T extends Class$teachingAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$teachingAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'Int'>
    readonly grade: FieldRef<"Class", 'String'>
    readonly name: FieldRef<"Class", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
  }

  /**
   * Class updateManyAndReturn
   */
  export type ClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to delete.
     */
    limit?: number
  }

  /**
   * Class.advisors
   */
  export type Class$advisorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    cursor?: TeacherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Class.students
   */
  export type Class$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Class.subjectClasses
   */
  export type Class$subjectClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    where?: SubjectClassWhereInput
    orderBy?: SubjectClassOrderByWithRelationInput | SubjectClassOrderByWithRelationInput[]
    cursor?: SubjectClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectClassScalarFieldEnum | SubjectClassScalarFieldEnum[]
  }

  /**
   * Class.teachingAssignments
   */
  export type Class$teachingAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    where?: TeachingAssignmentWhereInput
    orderBy?: TeachingAssignmentOrderByWithRelationInput | TeachingAssignmentOrderByWithRelationInput[]
    cursor?: TeachingAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeachingAssignmentScalarFieldEnum | TeachingAssignmentScalarFieldEnum[]
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectAvgAggregateOutputType = {
    id: number | null
    subject_group_id: number | null
  }

  export type SubjectSumAggregateOutputType = {
    id: number | null
    subject_group_id: number | null
  }

  export type SubjectMinAggregateOutputType = {
    id: number | null
    code: string | null
    grade: string | null
    name: string | null
    description: string | null
    create_at: Date | null
    update_at: Date | null
    subject_group_id: number | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: number | null
    code: string | null
    grade: string | null
    name: string | null
    description: string | null
    create_at: Date | null
    update_at: Date | null
    subject_group_id: number | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    code: number
    grade: number
    name: number
    description: number
    create_at: number
    update_at: number
    subject_group_id: number
    _all: number
  }


  export type SubjectAvgAggregateInputType = {
    id?: true
    subject_group_id?: true
  }

  export type SubjectSumAggregateInputType = {
    id?: true
    subject_group_id?: true
  }

  export type SubjectMinAggregateInputType = {
    id?: true
    code?: true
    grade?: true
    name?: true
    description?: true
    create_at?: true
    update_at?: true
    subject_group_id?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    code?: true
    grade?: true
    name?: true
    description?: true
    create_at?: true
    update_at?: true
    subject_group_id?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    code?: true
    grade?: true
    name?: true
    description?: true
    create_at?: true
    update_at?: true
    subject_group_id?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _avg?: SubjectAvgAggregateInputType
    _sum?: SubjectSumAggregateInputType
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: number
    code: string
    grade: string
    name: string
    description: string | null
    create_at: Date
    update_at: Date
    subject_group_id: number | null
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    grade?: boolean
    name?: boolean
    description?: boolean
    create_at?: boolean
    update_at?: boolean
    subject_group_id?: boolean
    books?: boolean | Subject$booksArgs<ExtArgs>
    subjectClasses?: boolean | Subject$subjectClassesArgs<ExtArgs>
    registrations?: boolean | Subject$registrationsArgs<ExtArgs>
    teachingAssignments?: boolean | Subject$teachingAssignmentsArgs<ExtArgs>
    SubjectGroup?: boolean | Subject$SubjectGroupArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    grade?: boolean
    name?: boolean
    description?: boolean
    create_at?: boolean
    update_at?: boolean
    subject_group_id?: boolean
    SubjectGroup?: boolean | Subject$SubjectGroupArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    grade?: boolean
    name?: boolean
    description?: boolean
    create_at?: boolean
    update_at?: boolean
    subject_group_id?: boolean
    SubjectGroup?: boolean | Subject$SubjectGroupArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    code?: boolean
    grade?: boolean
    name?: boolean
    description?: boolean
    create_at?: boolean
    update_at?: boolean
    subject_group_id?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "grade" | "name" | "description" | "create_at" | "update_at" | "subject_group_id", ExtArgs["result"]["subject"]>
  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | Subject$booksArgs<ExtArgs>
    subjectClasses?: boolean | Subject$subjectClassesArgs<ExtArgs>
    registrations?: boolean | Subject$registrationsArgs<ExtArgs>
    teachingAssignments?: boolean | Subject$teachingAssignmentsArgs<ExtArgs>
    SubjectGroup?: boolean | Subject$SubjectGroupArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SubjectGroup?: boolean | Subject$SubjectGroupArgs<ExtArgs>
  }
  export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    SubjectGroup?: boolean | Subject$SubjectGroupArgs<ExtArgs>
  }

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      books: Prisma.$BookPayload<ExtArgs>[]
      subjectClasses: Prisma.$SubjectClassPayload<ExtArgs>[]
      registrations: Prisma.$BookRegistrationPayload<ExtArgs>[]
      teachingAssignments: Prisma.$TeachingAssignmentPayload<ExtArgs>[]
      SubjectGroup: Prisma.$SubjectGroupPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      grade: string
      name: string
      description: string | null
      create_at: Date
      update_at: Date
      subject_group_id: number | null
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends Subject$booksArgs<ExtArgs> = {}>(args?: Subset<T, Subject$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subjectClasses<T extends Subject$subjectClassesArgs<ExtArgs> = {}>(args?: Subset<T, Subject$subjectClassesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    registrations<T extends Subject$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teachingAssignments<T extends Subject$teachingAssignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$teachingAssignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    SubjectGroup<T extends Subject$SubjectGroupArgs<ExtArgs> = {}>(args?: Subset<T, Subject$SubjectGroupArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'Int'>
    readonly code: FieldRef<"Subject", 'String'>
    readonly grade: FieldRef<"Subject", 'String'>
    readonly name: FieldRef<"Subject", 'String'>
    readonly description: FieldRef<"Subject", 'String'>
    readonly create_at: FieldRef<"Subject", 'DateTime'>
    readonly update_at: FieldRef<"Subject", 'DateTime'>
    readonly subject_group_id: FieldRef<"Subject", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject.books
   */
  export type Subject$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Subject.subjectClasses
   */
  export type Subject$subjectClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    where?: SubjectClassWhereInput
    orderBy?: SubjectClassOrderByWithRelationInput | SubjectClassOrderByWithRelationInput[]
    cursor?: SubjectClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectClassScalarFieldEnum | SubjectClassScalarFieldEnum[]
  }

  /**
   * Subject.registrations
   */
  export type Subject$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    where?: BookRegistrationWhereInput
    orderBy?: BookRegistrationOrderByWithRelationInput | BookRegistrationOrderByWithRelationInput[]
    cursor?: BookRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookRegistrationScalarFieldEnum | BookRegistrationScalarFieldEnum[]
  }

  /**
   * Subject.teachingAssignments
   */
  export type Subject$teachingAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    where?: TeachingAssignmentWhereInput
    orderBy?: TeachingAssignmentOrderByWithRelationInput | TeachingAssignmentOrderByWithRelationInput[]
    cursor?: TeachingAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeachingAssignmentScalarFieldEnum | TeachingAssignmentScalarFieldEnum[]
  }

  /**
   * Subject.SubjectGroup
   */
  export type Subject$SubjectGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    where?: SubjectGroupWhereInput
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model TeachingAssignment
   */

  export type AggregateTeachingAssignment = {
    _count: TeachingAssignmentCountAggregateOutputType | null
    _avg: TeachingAssignmentAvgAggregateOutputType | null
    _sum: TeachingAssignmentSumAggregateOutputType | null
    _min: TeachingAssignmentMinAggregateOutputType | null
    _max: TeachingAssignmentMaxAggregateOutputType | null
  }

  export type TeachingAssignmentAvgAggregateOutputType = {
    id: number | null
    teacher_id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type TeachingAssignmentSumAggregateOutputType = {
    id: number | null
    teacher_id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type TeachingAssignmentMinAggregateOutputType = {
    id: number | null
    teacher_id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type TeachingAssignmentMaxAggregateOutputType = {
    id: number | null
    teacher_id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type TeachingAssignmentCountAggregateOutputType = {
    id: number
    teacher_id: number
    subject_id: number
    class_id: number
    _all: number
  }


  export type TeachingAssignmentAvgAggregateInputType = {
    id?: true
    teacher_id?: true
    subject_id?: true
    class_id?: true
  }

  export type TeachingAssignmentSumAggregateInputType = {
    id?: true
    teacher_id?: true
    subject_id?: true
    class_id?: true
  }

  export type TeachingAssignmentMinAggregateInputType = {
    id?: true
    teacher_id?: true
    subject_id?: true
    class_id?: true
  }

  export type TeachingAssignmentMaxAggregateInputType = {
    id?: true
    teacher_id?: true
    subject_id?: true
    class_id?: true
  }

  export type TeachingAssignmentCountAggregateInputType = {
    id?: true
    teacher_id?: true
    subject_id?: true
    class_id?: true
    _all?: true
  }

  export type TeachingAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeachingAssignment to aggregate.
     */
    where?: TeachingAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeachingAssignments to fetch.
     */
    orderBy?: TeachingAssignmentOrderByWithRelationInput | TeachingAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeachingAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeachingAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeachingAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeachingAssignments
    **/
    _count?: true | TeachingAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeachingAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeachingAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeachingAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeachingAssignmentMaxAggregateInputType
  }

  export type GetTeachingAssignmentAggregateType<T extends TeachingAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTeachingAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeachingAssignment[P]>
      : GetScalarType<T[P], AggregateTeachingAssignment[P]>
  }




  export type TeachingAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeachingAssignmentWhereInput
    orderBy?: TeachingAssignmentOrderByWithAggregationInput | TeachingAssignmentOrderByWithAggregationInput[]
    by: TeachingAssignmentScalarFieldEnum[] | TeachingAssignmentScalarFieldEnum
    having?: TeachingAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeachingAssignmentCountAggregateInputType | true
    _avg?: TeachingAssignmentAvgAggregateInputType
    _sum?: TeachingAssignmentSumAggregateInputType
    _min?: TeachingAssignmentMinAggregateInputType
    _max?: TeachingAssignmentMaxAggregateInputType
  }

  export type TeachingAssignmentGroupByOutputType = {
    id: number
    teacher_id: number
    subject_id: number
    class_id: number
    _count: TeachingAssignmentCountAggregateOutputType | null
    _avg: TeachingAssignmentAvgAggregateOutputType | null
    _sum: TeachingAssignmentSumAggregateOutputType | null
    _min: TeachingAssignmentMinAggregateOutputType | null
    _max: TeachingAssignmentMaxAggregateOutputType | null
  }

  type GetTeachingAssignmentGroupByPayload<T extends TeachingAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeachingAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeachingAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeachingAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], TeachingAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type TeachingAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacher_id?: boolean
    subject_id?: boolean
    class_id?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teachingAssignment"]>

  export type TeachingAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacher_id?: boolean
    subject_id?: boolean
    class_id?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teachingAssignment"]>

  export type TeachingAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacher_id?: boolean
    subject_id?: boolean
    class_id?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teachingAssignment"]>

  export type TeachingAssignmentSelectScalar = {
    id?: boolean
    teacher_id?: boolean
    subject_id?: boolean
    class_id?: boolean
  }

  export type TeachingAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teacher_id" | "subject_id" | "class_id", ExtArgs["result"]["teachingAssignment"]>
  export type TeachingAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type TeachingAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type TeachingAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $TeachingAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeachingAssignment"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
      class: Prisma.$ClassPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      teacher_id: number
      subject_id: number
      class_id: number
    }, ExtArgs["result"]["teachingAssignment"]>
    composites: {}
  }

  type TeachingAssignmentGetPayload<S extends boolean | null | undefined | TeachingAssignmentDefaultArgs> = $Result.GetResult<Prisma.$TeachingAssignmentPayload, S>

  type TeachingAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeachingAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeachingAssignmentCountAggregateInputType | true
    }

  export interface TeachingAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeachingAssignment'], meta: { name: 'TeachingAssignment' } }
    /**
     * Find zero or one TeachingAssignment that matches the filter.
     * @param {TeachingAssignmentFindUniqueArgs} args - Arguments to find a TeachingAssignment
     * @example
     * // Get one TeachingAssignment
     * const teachingAssignment = await prisma.teachingAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeachingAssignmentFindUniqueArgs>(args: SelectSubset<T, TeachingAssignmentFindUniqueArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeachingAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeachingAssignmentFindUniqueOrThrowArgs} args - Arguments to find a TeachingAssignment
     * @example
     * // Get one TeachingAssignment
     * const teachingAssignment = await prisma.teachingAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeachingAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TeachingAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeachingAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeachingAssignmentFindFirstArgs} args - Arguments to find a TeachingAssignment
     * @example
     * // Get one TeachingAssignment
     * const teachingAssignment = await prisma.teachingAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeachingAssignmentFindFirstArgs>(args?: SelectSubset<T, TeachingAssignmentFindFirstArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeachingAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeachingAssignmentFindFirstOrThrowArgs} args - Arguments to find a TeachingAssignment
     * @example
     * // Get one TeachingAssignment
     * const teachingAssignment = await prisma.teachingAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeachingAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TeachingAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeachingAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeachingAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeachingAssignments
     * const teachingAssignments = await prisma.teachingAssignment.findMany()
     * 
     * // Get first 10 TeachingAssignments
     * const teachingAssignments = await prisma.teachingAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teachingAssignmentWithIdOnly = await prisma.teachingAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeachingAssignmentFindManyArgs>(args?: SelectSubset<T, TeachingAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeachingAssignment.
     * @param {TeachingAssignmentCreateArgs} args - Arguments to create a TeachingAssignment.
     * @example
     * // Create one TeachingAssignment
     * const TeachingAssignment = await prisma.teachingAssignment.create({
     *   data: {
     *     // ... data to create a TeachingAssignment
     *   }
     * })
     * 
     */
    create<T extends TeachingAssignmentCreateArgs>(args: SelectSubset<T, TeachingAssignmentCreateArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeachingAssignments.
     * @param {TeachingAssignmentCreateManyArgs} args - Arguments to create many TeachingAssignments.
     * @example
     * // Create many TeachingAssignments
     * const teachingAssignment = await prisma.teachingAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeachingAssignmentCreateManyArgs>(args?: SelectSubset<T, TeachingAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeachingAssignments and returns the data saved in the database.
     * @param {TeachingAssignmentCreateManyAndReturnArgs} args - Arguments to create many TeachingAssignments.
     * @example
     * // Create many TeachingAssignments
     * const teachingAssignment = await prisma.teachingAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeachingAssignments and only return the `id`
     * const teachingAssignmentWithIdOnly = await prisma.teachingAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeachingAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TeachingAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeachingAssignment.
     * @param {TeachingAssignmentDeleteArgs} args - Arguments to delete one TeachingAssignment.
     * @example
     * // Delete one TeachingAssignment
     * const TeachingAssignment = await prisma.teachingAssignment.delete({
     *   where: {
     *     // ... filter to delete one TeachingAssignment
     *   }
     * })
     * 
     */
    delete<T extends TeachingAssignmentDeleteArgs>(args: SelectSubset<T, TeachingAssignmentDeleteArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeachingAssignment.
     * @param {TeachingAssignmentUpdateArgs} args - Arguments to update one TeachingAssignment.
     * @example
     * // Update one TeachingAssignment
     * const teachingAssignment = await prisma.teachingAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeachingAssignmentUpdateArgs>(args: SelectSubset<T, TeachingAssignmentUpdateArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeachingAssignments.
     * @param {TeachingAssignmentDeleteManyArgs} args - Arguments to filter TeachingAssignments to delete.
     * @example
     * // Delete a few TeachingAssignments
     * const { count } = await prisma.teachingAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeachingAssignmentDeleteManyArgs>(args?: SelectSubset<T, TeachingAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeachingAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeachingAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeachingAssignments
     * const teachingAssignment = await prisma.teachingAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeachingAssignmentUpdateManyArgs>(args: SelectSubset<T, TeachingAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeachingAssignments and returns the data updated in the database.
     * @param {TeachingAssignmentUpdateManyAndReturnArgs} args - Arguments to update many TeachingAssignments.
     * @example
     * // Update many TeachingAssignments
     * const teachingAssignment = await prisma.teachingAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeachingAssignments and only return the `id`
     * const teachingAssignmentWithIdOnly = await prisma.teachingAssignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeachingAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TeachingAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeachingAssignment.
     * @param {TeachingAssignmentUpsertArgs} args - Arguments to update or create a TeachingAssignment.
     * @example
     * // Update or create a TeachingAssignment
     * const teachingAssignment = await prisma.teachingAssignment.upsert({
     *   create: {
     *     // ... data to create a TeachingAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeachingAssignment we want to update
     *   }
     * })
     */
    upsert<T extends TeachingAssignmentUpsertArgs>(args: SelectSubset<T, TeachingAssignmentUpsertArgs<ExtArgs>>): Prisma__TeachingAssignmentClient<$Result.GetResult<Prisma.$TeachingAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeachingAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeachingAssignmentCountArgs} args - Arguments to filter TeachingAssignments to count.
     * @example
     * // Count the number of TeachingAssignments
     * const count = await prisma.teachingAssignment.count({
     *   where: {
     *     // ... the filter for the TeachingAssignments we want to count
     *   }
     * })
    **/
    count<T extends TeachingAssignmentCountArgs>(
      args?: Subset<T, TeachingAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeachingAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeachingAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeachingAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeachingAssignmentAggregateArgs>(args: Subset<T, TeachingAssignmentAggregateArgs>): Prisma.PrismaPromise<GetTeachingAssignmentAggregateType<T>>

    /**
     * Group by TeachingAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeachingAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeachingAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeachingAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: TeachingAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeachingAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeachingAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeachingAssignment model
   */
  readonly fields: TeachingAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeachingAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeachingAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeachingAssignment model
   */
  interface TeachingAssignmentFieldRefs {
    readonly id: FieldRef<"TeachingAssignment", 'Int'>
    readonly teacher_id: FieldRef<"TeachingAssignment", 'Int'>
    readonly subject_id: FieldRef<"TeachingAssignment", 'Int'>
    readonly class_id: FieldRef<"TeachingAssignment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TeachingAssignment findUnique
   */
  export type TeachingAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TeachingAssignment to fetch.
     */
    where: TeachingAssignmentWhereUniqueInput
  }

  /**
   * TeachingAssignment findUniqueOrThrow
   */
  export type TeachingAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TeachingAssignment to fetch.
     */
    where: TeachingAssignmentWhereUniqueInput
  }

  /**
   * TeachingAssignment findFirst
   */
  export type TeachingAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TeachingAssignment to fetch.
     */
    where?: TeachingAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeachingAssignments to fetch.
     */
    orderBy?: TeachingAssignmentOrderByWithRelationInput | TeachingAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeachingAssignments.
     */
    cursor?: TeachingAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeachingAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeachingAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeachingAssignments.
     */
    distinct?: TeachingAssignmentScalarFieldEnum | TeachingAssignmentScalarFieldEnum[]
  }

  /**
   * TeachingAssignment findFirstOrThrow
   */
  export type TeachingAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TeachingAssignment to fetch.
     */
    where?: TeachingAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeachingAssignments to fetch.
     */
    orderBy?: TeachingAssignmentOrderByWithRelationInput | TeachingAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeachingAssignments.
     */
    cursor?: TeachingAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeachingAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeachingAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeachingAssignments.
     */
    distinct?: TeachingAssignmentScalarFieldEnum | TeachingAssignmentScalarFieldEnum[]
  }

  /**
   * TeachingAssignment findMany
   */
  export type TeachingAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which TeachingAssignments to fetch.
     */
    where?: TeachingAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeachingAssignments to fetch.
     */
    orderBy?: TeachingAssignmentOrderByWithRelationInput | TeachingAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeachingAssignments.
     */
    cursor?: TeachingAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeachingAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeachingAssignments.
     */
    skip?: number
    distinct?: TeachingAssignmentScalarFieldEnum | TeachingAssignmentScalarFieldEnum[]
  }

  /**
   * TeachingAssignment create
   */
  export type TeachingAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a TeachingAssignment.
     */
    data: XOR<TeachingAssignmentCreateInput, TeachingAssignmentUncheckedCreateInput>
  }

  /**
   * TeachingAssignment createMany
   */
  export type TeachingAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeachingAssignments.
     */
    data: TeachingAssignmentCreateManyInput | TeachingAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeachingAssignment createManyAndReturn
   */
  export type TeachingAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many TeachingAssignments.
     */
    data: TeachingAssignmentCreateManyInput | TeachingAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeachingAssignment update
   */
  export type TeachingAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a TeachingAssignment.
     */
    data: XOR<TeachingAssignmentUpdateInput, TeachingAssignmentUncheckedUpdateInput>
    /**
     * Choose, which TeachingAssignment to update.
     */
    where: TeachingAssignmentWhereUniqueInput
  }

  /**
   * TeachingAssignment updateMany
   */
  export type TeachingAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeachingAssignments.
     */
    data: XOR<TeachingAssignmentUpdateManyMutationInput, TeachingAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which TeachingAssignments to update
     */
    where?: TeachingAssignmentWhereInput
    /**
     * Limit how many TeachingAssignments to update.
     */
    limit?: number
  }

  /**
   * TeachingAssignment updateManyAndReturn
   */
  export type TeachingAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update TeachingAssignments.
     */
    data: XOR<TeachingAssignmentUpdateManyMutationInput, TeachingAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which TeachingAssignments to update
     */
    where?: TeachingAssignmentWhereInput
    /**
     * Limit how many TeachingAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeachingAssignment upsert
   */
  export type TeachingAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the TeachingAssignment to update in case it exists.
     */
    where: TeachingAssignmentWhereUniqueInput
    /**
     * In case the TeachingAssignment found by the `where` argument doesn't exist, create a new TeachingAssignment with this data.
     */
    create: XOR<TeachingAssignmentCreateInput, TeachingAssignmentUncheckedCreateInput>
    /**
     * In case the TeachingAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeachingAssignmentUpdateInput, TeachingAssignmentUncheckedUpdateInput>
  }

  /**
   * TeachingAssignment delete
   */
  export type TeachingAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
    /**
     * Filter which TeachingAssignment to delete.
     */
    where: TeachingAssignmentWhereUniqueInput
  }

  /**
   * TeachingAssignment deleteMany
   */
  export type TeachingAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeachingAssignments to delete
     */
    where?: TeachingAssignmentWhereInput
    /**
     * Limit how many TeachingAssignments to delete.
     */
    limit?: number
  }

  /**
   * TeachingAssignment without action
   */
  export type TeachingAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeachingAssignment
     */
    select?: TeachingAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeachingAssignment
     */
    omit?: TeachingAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeachingAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
    class_id: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
    class_id: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    name: string | null
    stu_code: string | null
    password: string | null
    class_id: number | null
    create_at: Date | null
    update_at: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    stu_code: string | null
    password: string | null
    class_id: number | null
    create_at: Date | null
    update_at: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    stu_code: number
    password: number
    class_id: number
    create_at: number
    update_at: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
    class_id?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
    class_id?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    stu_code?: true
    password?: true
    class_id?: true
    create_at?: true
    update_at?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    stu_code?: true
    password?: true
    class_id?: true
    create_at?: true
    update_at?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    stu_code?: true
    password?: true
    class_id?: true
    create_at?: true
    update_at?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    name: string
    stu_code: string
    password: string
    class_id: number
    create_at: Date
    update_at: Date
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    stu_code?: boolean
    password?: boolean
    class_id?: boolean
    create_at?: boolean
    update_at?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    registrations?: boolean | Student$registrationsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    stu_code?: boolean
    password?: boolean
    class_id?: boolean
    create_at?: boolean
    update_at?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    stu_code?: boolean
    password?: boolean
    class_id?: boolean
    create_at?: boolean
    update_at?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    stu_code?: boolean
    password?: boolean
    class_id?: boolean
    create_at?: boolean
    update_at?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "stu_code" | "password" | "class_id" | "create_at" | "update_at", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    registrations?: boolean | Student$registrationsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      class: Prisma.$ClassPayload<ExtArgs>
      registrations: Prisma.$BookRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      stu_code: string
      password: string
      class_id: number
      create_at: Date
      update_at: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    registrations<T extends Student$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Student$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly name: FieldRef<"Student", 'String'>
    readonly stu_code: FieldRef<"Student", 'String'>
    readonly password: FieldRef<"Student", 'String'>
    readonly class_id: FieldRef<"Student", 'Int'>
    readonly create_at: FieldRef<"Student", 'DateTime'>
    readonly update_at: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.registrations
   */
  export type Student$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    where?: BookRegistrationWhereInput
    orderBy?: BookRegistrationOrderByWithRelationInput | BookRegistrationOrderByWithRelationInput[]
    cursor?: BookRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookRegistrationScalarFieldEnum | BookRegistrationScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Book
   */

  export type AggregateBook = {
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  export type BookAvgAggregateOutputType = {
    id: number | null
    subject_id: number | null
    academic_year_id: number | null
  }

  export type BookSumAggregateOutputType = {
    id: number | null
    subject_id: number | null
    academic_year_id: number | null
  }

  export type BookMinAggregateOutputType = {
    id: number | null
    barcode: string | null
    name: string | null
    description: string | null
    subject_id: number | null
    academic_year_id: number | null
    create_at: Date | null
    update_at: Date | null
  }

  export type BookMaxAggregateOutputType = {
    id: number | null
    barcode: string | null
    name: string | null
    description: string | null
    subject_id: number | null
    academic_year_id: number | null
    create_at: Date | null
    update_at: Date | null
  }

  export type BookCountAggregateOutputType = {
    id: number
    barcode: number
    name: number
    description: number
    subject_id: number
    academic_year_id: number
    create_at: number
    update_at: number
    _all: number
  }


  export type BookAvgAggregateInputType = {
    id?: true
    subject_id?: true
    academic_year_id?: true
  }

  export type BookSumAggregateInputType = {
    id?: true
    subject_id?: true
    academic_year_id?: true
  }

  export type BookMinAggregateInputType = {
    id?: true
    barcode?: true
    name?: true
    description?: true
    subject_id?: true
    academic_year_id?: true
    create_at?: true
    update_at?: true
  }

  export type BookMaxAggregateInputType = {
    id?: true
    barcode?: true
    name?: true
    description?: true
    subject_id?: true
    academic_year_id?: true
    create_at?: true
    update_at?: true
  }

  export type BookCountAggregateInputType = {
    id?: true
    barcode?: true
    name?: true
    description?: true
    subject_id?: true
    academic_year_id?: true
    create_at?: true
    update_at?: true
    _all?: true
  }

  export type BookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Book to aggregate.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Books
    **/
    _count?: true | BookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookMaxAggregateInputType
  }

  export type GetBookAggregateType<T extends BookAggregateArgs> = {
        [P in keyof T & keyof AggregateBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook[P]>
      : GetScalarType<T[P], AggregateBook[P]>
  }




  export type BookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
    orderBy?: BookOrderByWithAggregationInput | BookOrderByWithAggregationInput[]
    by: BookScalarFieldEnum[] | BookScalarFieldEnum
    having?: BookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookCountAggregateInputType | true
    _avg?: BookAvgAggregateInputType
    _sum?: BookSumAggregateInputType
    _min?: BookMinAggregateInputType
    _max?: BookMaxAggregateInputType
  }

  export type BookGroupByOutputType = {
    id: number
    barcode: string
    name: string
    description: string | null
    subject_id: number
    academic_year_id: number
    create_at: Date
    update_at: Date
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  type GetBookGroupByPayload<T extends BookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookGroupByOutputType[P]>
            : GetScalarType<T[P], BookGroupByOutputType[P]>
        }
      >
    >


  export type BookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    name?: boolean
    description?: boolean
    subject_id?: boolean
    academic_year_id?: boolean
    create_at?: boolean
    update_at?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    registrations?: boolean | Book$registrationsArgs<ExtArgs>
    AcademicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    name?: boolean
    description?: boolean
    subject_id?: boolean
    academic_year_id?: boolean
    create_at?: boolean
    update_at?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    AcademicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    name?: boolean
    description?: boolean
    subject_id?: boolean
    academic_year_id?: boolean
    create_at?: boolean
    update_at?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    AcademicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectScalar = {
    id?: boolean
    barcode?: boolean
    name?: boolean
    description?: boolean
    subject_id?: boolean
    academic_year_id?: boolean
    create_at?: boolean
    update_at?: boolean
  }

  export type BookOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barcode" | "name" | "description" | "subject_id" | "academic_year_id" | "create_at" | "update_at", ExtArgs["result"]["book"]>
  export type BookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    registrations?: boolean | Book$registrationsArgs<ExtArgs>
    AcademicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    AcademicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }
  export type BookIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    AcademicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }

  export type $BookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Book"
    objects: {
      subject: Prisma.$SubjectPayload<ExtArgs>
      registrations: Prisma.$BookRegistrationPayload<ExtArgs>[]
      AcademicYear: Prisma.$AcademicYearPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      barcode: string
      name: string
      description: string | null
      subject_id: number
      academic_year_id: number
      create_at: Date
      update_at: Date
    }, ExtArgs["result"]["book"]>
    composites: {}
  }

  type BookGetPayload<S extends boolean | null | undefined | BookDefaultArgs> = $Result.GetResult<Prisma.$BookPayload, S>

  type BookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookCountAggregateInputType | true
    }

  export interface BookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Book'], meta: { name: 'Book' } }
    /**
     * Find zero or one Book that matches the filter.
     * @param {BookFindUniqueArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookFindUniqueArgs>(args: SelectSubset<T, BookFindUniqueArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Book that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookFindUniqueOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookFindUniqueOrThrowArgs>(args: SelectSubset<T, BookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookFindFirstArgs>(args?: SelectSubset<T, BookFindFirstArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Book that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookFindFirstOrThrowArgs>(args?: SelectSubset<T, BookFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.book.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.book.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookWithIdOnly = await prisma.book.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookFindManyArgs>(args?: SelectSubset<T, BookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Book.
     * @param {BookCreateArgs} args - Arguments to create a Book.
     * @example
     * // Create one Book
     * const Book = await prisma.book.create({
     *   data: {
     *     // ... data to create a Book
     *   }
     * })
     * 
     */
    create<T extends BookCreateArgs>(args: SelectSubset<T, BookCreateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Books.
     * @param {BookCreateManyArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookCreateManyArgs>(args?: SelectSubset<T, BookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Books and returns the data saved in the database.
     * @param {BookCreateManyAndReturnArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Books and only return the `id`
     * const bookWithIdOnly = await prisma.book.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookCreateManyAndReturnArgs>(args?: SelectSubset<T, BookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Book.
     * @param {BookDeleteArgs} args - Arguments to delete one Book.
     * @example
     * // Delete one Book
     * const Book = await prisma.book.delete({
     *   where: {
     *     // ... filter to delete one Book
     *   }
     * })
     * 
     */
    delete<T extends BookDeleteArgs>(args: SelectSubset<T, BookDeleteArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Book.
     * @param {BookUpdateArgs} args - Arguments to update one Book.
     * @example
     * // Update one Book
     * const book = await prisma.book.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookUpdateArgs>(args: SelectSubset<T, BookUpdateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Books.
     * @param {BookDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.book.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookDeleteManyArgs>(args?: SelectSubset<T, BookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookUpdateManyArgs>(args: SelectSubset<T, BookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books and returns the data updated in the database.
     * @param {BookUpdateManyAndReturnArgs} args - Arguments to update many Books.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Books and only return the `id`
     * const bookWithIdOnly = await prisma.book.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookUpdateManyAndReturnArgs>(args: SelectSubset<T, BookUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Book.
     * @param {BookUpsertArgs} args - Arguments to update or create a Book.
     * @example
     * // Update or create a Book
     * const book = await prisma.book.upsert({
     *   create: {
     *     // ... data to create a Book
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book we want to update
     *   }
     * })
     */
    upsert<T extends BookUpsertArgs>(args: SelectSubset<T, BookUpsertArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.book.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends BookCountArgs>(
      args?: Subset<T, BookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookAggregateArgs>(args: Subset<T, BookAggregateArgs>): Prisma.PrismaPromise<GetBookAggregateType<T>>

    /**
     * Group by Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookGroupByArgs['orderBy'] }
        : { orderBy?: BookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Book model
   */
  readonly fields: BookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Book.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    registrations<T extends Book$registrationsArgs<ExtArgs> = {}>(args?: Subset<T, Book$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AcademicYear<T extends AcademicYearDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcademicYearDefaultArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Book model
   */
  interface BookFieldRefs {
    readonly id: FieldRef<"Book", 'Int'>
    readonly barcode: FieldRef<"Book", 'String'>
    readonly name: FieldRef<"Book", 'String'>
    readonly description: FieldRef<"Book", 'String'>
    readonly subject_id: FieldRef<"Book", 'Int'>
    readonly academic_year_id: FieldRef<"Book", 'Int'>
    readonly create_at: FieldRef<"Book", 'DateTime'>
    readonly update_at: FieldRef<"Book", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Book findUnique
   */
  export type BookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findUniqueOrThrow
   */
  export type BookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findFirst
   */
  export type BookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findFirstOrThrow
   */
  export type BookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findMany
   */
  export type BookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book create
   */
  export type BookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to create a Book.
     */
    data: XOR<BookCreateInput, BookUncheckedCreateInput>
  }

  /**
   * Book createMany
   */
  export type BookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Book createManyAndReturn
   */
  export type BookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Book update
   */
  export type BookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to update a Book.
     */
    data: XOR<BookUpdateInput, BookUncheckedUpdateInput>
    /**
     * Choose, which Book to update.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book updateMany
   */
  export type BookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
  }

  /**
   * Book updateManyAndReturn
   */
  export type BookUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Book upsert
   */
  export type BookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The filter to search for the Book to update in case it exists.
     */
    where: BookWhereUniqueInput
    /**
     * In case the Book found by the `where` argument doesn't exist, create a new Book with this data.
     */
    create: XOR<BookCreateInput, BookUncheckedCreateInput>
    /**
     * In case the Book was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookUpdateInput, BookUncheckedUpdateInput>
  }

  /**
   * Book delete
   */
  export type BookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter which Book to delete.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book deleteMany
   */
  export type BookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to delete
     */
    where?: BookWhereInput
    /**
     * Limit how many Books to delete.
     */
    limit?: number
  }

  /**
   * Book.registrations
   */
  export type Book$registrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    where?: BookRegistrationWhereInput
    orderBy?: BookRegistrationOrderByWithRelationInput | BookRegistrationOrderByWithRelationInput[]
    cursor?: BookRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookRegistrationScalarFieldEnum | BookRegistrationScalarFieldEnum[]
  }

  /**
   * Book without action
   */
  export type BookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
  }


  /**
   * Model BookRegistration
   */

  export type AggregateBookRegistration = {
    _count: BookRegistrationCountAggregateOutputType | null
    _avg: BookRegistrationAvgAggregateOutputType | null
    _sum: BookRegistrationSumAggregateOutputType | null
    _min: BookRegistrationMinAggregateOutputType | null
    _max: BookRegistrationMaxAggregateOutputType | null
  }

  export type BookRegistrationAvgAggregateOutputType = {
    id: number | null
    student_id: number | null
    book_id: number | null
    subject_id: number | null
  }

  export type BookRegistrationSumAggregateOutputType = {
    id: number | null
    student_id: number | null
    book_id: number | null
    subject_id: number | null
  }

  export type BookRegistrationMinAggregateOutputType = {
    id: number | null
    student_id: number | null
    book_id: number | null
    subject_id: number | null
    register_code: string | null
    registered_at: Date | null
  }

  export type BookRegistrationMaxAggregateOutputType = {
    id: number | null
    student_id: number | null
    book_id: number | null
    subject_id: number | null
    register_code: string | null
    registered_at: Date | null
  }

  export type BookRegistrationCountAggregateOutputType = {
    id: number
    student_id: number
    book_id: number
    subject_id: number
    register_code: number
    registered_at: number
    _all: number
  }


  export type BookRegistrationAvgAggregateInputType = {
    id?: true
    student_id?: true
    book_id?: true
    subject_id?: true
  }

  export type BookRegistrationSumAggregateInputType = {
    id?: true
    student_id?: true
    book_id?: true
    subject_id?: true
  }

  export type BookRegistrationMinAggregateInputType = {
    id?: true
    student_id?: true
    book_id?: true
    subject_id?: true
    register_code?: true
    registered_at?: true
  }

  export type BookRegistrationMaxAggregateInputType = {
    id?: true
    student_id?: true
    book_id?: true
    subject_id?: true
    register_code?: true
    registered_at?: true
  }

  export type BookRegistrationCountAggregateInputType = {
    id?: true
    student_id?: true
    book_id?: true
    subject_id?: true
    register_code?: true
    registered_at?: true
    _all?: true
  }

  export type BookRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookRegistration to aggregate.
     */
    where?: BookRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookRegistrations to fetch.
     */
    orderBy?: BookRegistrationOrderByWithRelationInput | BookRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookRegistrations
    **/
    _count?: true | BookRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookRegistrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookRegistrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookRegistrationMaxAggregateInputType
  }

  export type GetBookRegistrationAggregateType<T extends BookRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateBookRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookRegistration[P]>
      : GetScalarType<T[P], AggregateBookRegistration[P]>
  }




  export type BookRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookRegistrationWhereInput
    orderBy?: BookRegistrationOrderByWithAggregationInput | BookRegistrationOrderByWithAggregationInput[]
    by: BookRegistrationScalarFieldEnum[] | BookRegistrationScalarFieldEnum
    having?: BookRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookRegistrationCountAggregateInputType | true
    _avg?: BookRegistrationAvgAggregateInputType
    _sum?: BookRegistrationSumAggregateInputType
    _min?: BookRegistrationMinAggregateInputType
    _max?: BookRegistrationMaxAggregateInputType
  }

  export type BookRegistrationGroupByOutputType = {
    id: number
    student_id: number
    book_id: number
    subject_id: number
    register_code: string | null
    registered_at: Date
    _count: BookRegistrationCountAggregateOutputType | null
    _avg: BookRegistrationAvgAggregateOutputType | null
    _sum: BookRegistrationSumAggregateOutputType | null
    _min: BookRegistrationMinAggregateOutputType | null
    _max: BookRegistrationMaxAggregateOutputType | null
  }

  type GetBookRegistrationGroupByPayload<T extends BookRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], BookRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type BookRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    book_id?: boolean
    subject_id?: boolean
    register_code?: boolean
    registered_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookRegistration"]>

  export type BookRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    book_id?: boolean
    subject_id?: boolean
    register_code?: boolean
    registered_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookRegistration"]>

  export type BookRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    book_id?: boolean
    subject_id?: boolean
    register_code?: boolean
    registered_at?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookRegistration"]>

  export type BookRegistrationSelectScalar = {
    id?: boolean
    student_id?: boolean
    book_id?: boolean
    subject_id?: boolean
    register_code?: boolean
    registered_at?: boolean
  }

  export type BookRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "book_id" | "subject_id" | "register_code" | "registered_at", ExtArgs["result"]["bookRegistration"]>
  export type BookRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type BookRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type BookRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    book?: boolean | BookDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $BookRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookRegistration"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      book: Prisma.$BookPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      student_id: number
      book_id: number
      subject_id: number
      register_code: string | null
      registered_at: Date
    }, ExtArgs["result"]["bookRegistration"]>
    composites: {}
  }

  type BookRegistrationGetPayload<S extends boolean | null | undefined | BookRegistrationDefaultArgs> = $Result.GetResult<Prisma.$BookRegistrationPayload, S>

  type BookRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookRegistrationCountAggregateInputType | true
    }

  export interface BookRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookRegistration'], meta: { name: 'BookRegistration' } }
    /**
     * Find zero or one BookRegistration that matches the filter.
     * @param {BookRegistrationFindUniqueArgs} args - Arguments to find a BookRegistration
     * @example
     * // Get one BookRegistration
     * const bookRegistration = await prisma.bookRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookRegistrationFindUniqueArgs>(args: SelectSubset<T, BookRegistrationFindUniqueArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookRegistrationFindUniqueOrThrowArgs} args - Arguments to find a BookRegistration
     * @example
     * // Get one BookRegistration
     * const bookRegistration = await prisma.bookRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, BookRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookRegistrationFindFirstArgs} args - Arguments to find a BookRegistration
     * @example
     * // Get one BookRegistration
     * const bookRegistration = await prisma.bookRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookRegistrationFindFirstArgs>(args?: SelectSubset<T, BookRegistrationFindFirstArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookRegistrationFindFirstOrThrowArgs} args - Arguments to find a BookRegistration
     * @example
     * // Get one BookRegistration
     * const bookRegistration = await prisma.bookRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, BookRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookRegistrations
     * const bookRegistrations = await prisma.bookRegistration.findMany()
     * 
     * // Get first 10 BookRegistrations
     * const bookRegistrations = await prisma.bookRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookRegistrationWithIdOnly = await prisma.bookRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookRegistrationFindManyArgs>(args?: SelectSubset<T, BookRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookRegistration.
     * @param {BookRegistrationCreateArgs} args - Arguments to create a BookRegistration.
     * @example
     * // Create one BookRegistration
     * const BookRegistration = await prisma.bookRegistration.create({
     *   data: {
     *     // ... data to create a BookRegistration
     *   }
     * })
     * 
     */
    create<T extends BookRegistrationCreateArgs>(args: SelectSubset<T, BookRegistrationCreateArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookRegistrations.
     * @param {BookRegistrationCreateManyArgs} args - Arguments to create many BookRegistrations.
     * @example
     * // Create many BookRegistrations
     * const bookRegistration = await prisma.bookRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookRegistrationCreateManyArgs>(args?: SelectSubset<T, BookRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookRegistrations and returns the data saved in the database.
     * @param {BookRegistrationCreateManyAndReturnArgs} args - Arguments to create many BookRegistrations.
     * @example
     * // Create many BookRegistrations
     * const bookRegistration = await prisma.bookRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookRegistrations and only return the `id`
     * const bookRegistrationWithIdOnly = await prisma.bookRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, BookRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookRegistration.
     * @param {BookRegistrationDeleteArgs} args - Arguments to delete one BookRegistration.
     * @example
     * // Delete one BookRegistration
     * const BookRegistration = await prisma.bookRegistration.delete({
     *   where: {
     *     // ... filter to delete one BookRegistration
     *   }
     * })
     * 
     */
    delete<T extends BookRegistrationDeleteArgs>(args: SelectSubset<T, BookRegistrationDeleteArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookRegistration.
     * @param {BookRegistrationUpdateArgs} args - Arguments to update one BookRegistration.
     * @example
     * // Update one BookRegistration
     * const bookRegistration = await prisma.bookRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookRegistrationUpdateArgs>(args: SelectSubset<T, BookRegistrationUpdateArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookRegistrations.
     * @param {BookRegistrationDeleteManyArgs} args - Arguments to filter BookRegistrations to delete.
     * @example
     * // Delete a few BookRegistrations
     * const { count } = await prisma.bookRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookRegistrationDeleteManyArgs>(args?: SelectSubset<T, BookRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookRegistrations
     * const bookRegistration = await prisma.bookRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookRegistrationUpdateManyArgs>(args: SelectSubset<T, BookRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookRegistrations and returns the data updated in the database.
     * @param {BookRegistrationUpdateManyAndReturnArgs} args - Arguments to update many BookRegistrations.
     * @example
     * // Update many BookRegistrations
     * const bookRegistration = await prisma.bookRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookRegistrations and only return the `id`
     * const bookRegistrationWithIdOnly = await prisma.bookRegistration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, BookRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookRegistration.
     * @param {BookRegistrationUpsertArgs} args - Arguments to update or create a BookRegistration.
     * @example
     * // Update or create a BookRegistration
     * const bookRegistration = await prisma.bookRegistration.upsert({
     *   create: {
     *     // ... data to create a BookRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookRegistration we want to update
     *   }
     * })
     */
    upsert<T extends BookRegistrationUpsertArgs>(args: SelectSubset<T, BookRegistrationUpsertArgs<ExtArgs>>): Prisma__BookRegistrationClient<$Result.GetResult<Prisma.$BookRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookRegistrationCountArgs} args - Arguments to filter BookRegistrations to count.
     * @example
     * // Count the number of BookRegistrations
     * const count = await prisma.bookRegistration.count({
     *   where: {
     *     // ... the filter for the BookRegistrations we want to count
     *   }
     * })
    **/
    count<T extends BookRegistrationCountArgs>(
      args?: Subset<T, BookRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookRegistrationAggregateArgs>(args: Subset<T, BookRegistrationAggregateArgs>): Prisma.PrismaPromise<GetBookRegistrationAggregateType<T>>

    /**
     * Group by BookRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookRegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: BookRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookRegistration model
   */
  readonly fields: BookRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookRegistration model
   */
  interface BookRegistrationFieldRefs {
    readonly id: FieldRef<"BookRegistration", 'Int'>
    readonly student_id: FieldRef<"BookRegistration", 'Int'>
    readonly book_id: FieldRef<"BookRegistration", 'Int'>
    readonly subject_id: FieldRef<"BookRegistration", 'Int'>
    readonly register_code: FieldRef<"BookRegistration", 'String'>
    readonly registered_at: FieldRef<"BookRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookRegistration findUnique
   */
  export type BookRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BookRegistration to fetch.
     */
    where: BookRegistrationWhereUniqueInput
  }

  /**
   * BookRegistration findUniqueOrThrow
   */
  export type BookRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BookRegistration to fetch.
     */
    where: BookRegistrationWhereUniqueInput
  }

  /**
   * BookRegistration findFirst
   */
  export type BookRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BookRegistration to fetch.
     */
    where?: BookRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookRegistrations to fetch.
     */
    orderBy?: BookRegistrationOrderByWithRelationInput | BookRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookRegistrations.
     */
    cursor?: BookRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookRegistrations.
     */
    distinct?: BookRegistrationScalarFieldEnum | BookRegistrationScalarFieldEnum[]
  }

  /**
   * BookRegistration findFirstOrThrow
   */
  export type BookRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BookRegistration to fetch.
     */
    where?: BookRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookRegistrations to fetch.
     */
    orderBy?: BookRegistrationOrderByWithRelationInput | BookRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookRegistrations.
     */
    cursor?: BookRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookRegistrations.
     */
    distinct?: BookRegistrationScalarFieldEnum | BookRegistrationScalarFieldEnum[]
  }

  /**
   * BookRegistration findMany
   */
  export type BookRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which BookRegistrations to fetch.
     */
    where?: BookRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookRegistrations to fetch.
     */
    orderBy?: BookRegistrationOrderByWithRelationInput | BookRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookRegistrations.
     */
    cursor?: BookRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookRegistrations.
     */
    skip?: number
    distinct?: BookRegistrationScalarFieldEnum | BookRegistrationScalarFieldEnum[]
  }

  /**
   * BookRegistration create
   */
  export type BookRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a BookRegistration.
     */
    data: XOR<BookRegistrationCreateInput, BookRegistrationUncheckedCreateInput>
  }

  /**
   * BookRegistration createMany
   */
  export type BookRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookRegistrations.
     */
    data: BookRegistrationCreateManyInput | BookRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookRegistration createManyAndReturn
   */
  export type BookRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many BookRegistrations.
     */
    data: BookRegistrationCreateManyInput | BookRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookRegistration update
   */
  export type BookRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a BookRegistration.
     */
    data: XOR<BookRegistrationUpdateInput, BookRegistrationUncheckedUpdateInput>
    /**
     * Choose, which BookRegistration to update.
     */
    where: BookRegistrationWhereUniqueInput
  }

  /**
   * BookRegistration updateMany
   */
  export type BookRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookRegistrations.
     */
    data: XOR<BookRegistrationUpdateManyMutationInput, BookRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which BookRegistrations to update
     */
    where?: BookRegistrationWhereInput
    /**
     * Limit how many BookRegistrations to update.
     */
    limit?: number
  }

  /**
   * BookRegistration updateManyAndReturn
   */
  export type BookRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update BookRegistrations.
     */
    data: XOR<BookRegistrationUpdateManyMutationInput, BookRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which BookRegistrations to update
     */
    where?: BookRegistrationWhereInput
    /**
     * Limit how many BookRegistrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookRegistration upsert
   */
  export type BookRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the BookRegistration to update in case it exists.
     */
    where: BookRegistrationWhereUniqueInput
    /**
     * In case the BookRegistration found by the `where` argument doesn't exist, create a new BookRegistration with this data.
     */
    create: XOR<BookRegistrationCreateInput, BookRegistrationUncheckedCreateInput>
    /**
     * In case the BookRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookRegistrationUpdateInput, BookRegistrationUncheckedUpdateInput>
  }

  /**
   * BookRegistration delete
   */
  export type BookRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
    /**
     * Filter which BookRegistration to delete.
     */
    where: BookRegistrationWhereUniqueInput
  }

  /**
   * BookRegistration deleteMany
   */
  export type BookRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookRegistrations to delete
     */
    where?: BookRegistrationWhereInput
    /**
     * Limit how many BookRegistrations to delete.
     */
    limit?: number
  }

  /**
   * BookRegistration without action
   */
  export type BookRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookRegistration
     */
    select?: BookRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookRegistration
     */
    omit?: BookRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model SubjectClass
   */

  export type AggregateSubjectClass = {
    _count: SubjectClassCountAggregateOutputType | null
    _avg: SubjectClassAvgAggregateOutputType | null
    _sum: SubjectClassSumAggregateOutputType | null
    _min: SubjectClassMinAggregateOutputType | null
    _max: SubjectClassMaxAggregateOutputType | null
  }

  export type SubjectClassAvgAggregateOutputType = {
    id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type SubjectClassSumAggregateOutputType = {
    id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type SubjectClassMinAggregateOutputType = {
    id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type SubjectClassMaxAggregateOutputType = {
    id: number | null
    subject_id: number | null
    class_id: number | null
  }

  export type SubjectClassCountAggregateOutputType = {
    id: number
    subject_id: number
    class_id: number
    _all: number
  }


  export type SubjectClassAvgAggregateInputType = {
    id?: true
    subject_id?: true
    class_id?: true
  }

  export type SubjectClassSumAggregateInputType = {
    id?: true
    subject_id?: true
    class_id?: true
  }

  export type SubjectClassMinAggregateInputType = {
    id?: true
    subject_id?: true
    class_id?: true
  }

  export type SubjectClassMaxAggregateInputType = {
    id?: true
    subject_id?: true
    class_id?: true
  }

  export type SubjectClassCountAggregateInputType = {
    id?: true
    subject_id?: true
    class_id?: true
    _all?: true
  }

  export type SubjectClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubjectClass to aggregate.
     */
    where?: SubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectClasses to fetch.
     */
    orderBy?: SubjectClassOrderByWithRelationInput | SubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubjectClasses
    **/
    _count?: true | SubjectClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectClassMaxAggregateInputType
  }

  export type GetSubjectClassAggregateType<T extends SubjectClassAggregateArgs> = {
        [P in keyof T & keyof AggregateSubjectClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubjectClass[P]>
      : GetScalarType<T[P], AggregateSubjectClass[P]>
  }




  export type SubjectClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectClassWhereInput
    orderBy?: SubjectClassOrderByWithAggregationInput | SubjectClassOrderByWithAggregationInput[]
    by: SubjectClassScalarFieldEnum[] | SubjectClassScalarFieldEnum
    having?: SubjectClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectClassCountAggregateInputType | true
    _avg?: SubjectClassAvgAggregateInputType
    _sum?: SubjectClassSumAggregateInputType
    _min?: SubjectClassMinAggregateInputType
    _max?: SubjectClassMaxAggregateInputType
  }

  export type SubjectClassGroupByOutputType = {
    id: number
    subject_id: number
    class_id: number
    _count: SubjectClassCountAggregateOutputType | null
    _avg: SubjectClassAvgAggregateOutputType | null
    _sum: SubjectClassSumAggregateOutputType | null
    _min: SubjectClassMinAggregateOutputType | null
    _max: SubjectClassMaxAggregateOutputType | null
  }

  type GetSubjectClassGroupByPayload<T extends SubjectClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectClassGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectClassGroupByOutputType[P]>
        }
      >
    >


  export type SubjectClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject_id?: boolean
    class_id?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectClass"]>

  export type SubjectClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject_id?: boolean
    class_id?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectClass"]>

  export type SubjectClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject_id?: boolean
    class_id?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectClass"]>

  export type SubjectClassSelectScalar = {
    id?: boolean
    subject_id?: boolean
    class_id?: boolean
  }

  export type SubjectClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subject_id" | "class_id", ExtArgs["result"]["subjectClass"]>
  export type SubjectClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type SubjectClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type SubjectClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $SubjectClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubjectClass"
    objects: {
      subject: Prisma.$SubjectPayload<ExtArgs>
      class: Prisma.$ClassPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      subject_id: number
      class_id: number
    }, ExtArgs["result"]["subjectClass"]>
    composites: {}
  }

  type SubjectClassGetPayload<S extends boolean | null | undefined | SubjectClassDefaultArgs> = $Result.GetResult<Prisma.$SubjectClassPayload, S>

  type SubjectClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectClassCountAggregateInputType | true
    }

  export interface SubjectClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubjectClass'], meta: { name: 'SubjectClass' } }
    /**
     * Find zero or one SubjectClass that matches the filter.
     * @param {SubjectClassFindUniqueArgs} args - Arguments to find a SubjectClass
     * @example
     * // Get one SubjectClass
     * const subjectClass = await prisma.subjectClass.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectClassFindUniqueArgs>(args: SelectSubset<T, SubjectClassFindUniqueArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubjectClass that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectClassFindUniqueOrThrowArgs} args - Arguments to find a SubjectClass
     * @example
     * // Get one SubjectClass
     * const subjectClass = await prisma.subjectClass.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectClassFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubjectClass that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectClassFindFirstArgs} args - Arguments to find a SubjectClass
     * @example
     * // Get one SubjectClass
     * const subjectClass = await prisma.subjectClass.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectClassFindFirstArgs>(args?: SelectSubset<T, SubjectClassFindFirstArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubjectClass that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectClassFindFirstOrThrowArgs} args - Arguments to find a SubjectClass
     * @example
     * // Get one SubjectClass
     * const subjectClass = await prisma.subjectClass.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectClassFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubjectClasses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubjectClasses
     * const subjectClasses = await prisma.subjectClass.findMany()
     * 
     * // Get first 10 SubjectClasses
     * const subjectClasses = await prisma.subjectClass.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectClassWithIdOnly = await prisma.subjectClass.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectClassFindManyArgs>(args?: SelectSubset<T, SubjectClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubjectClass.
     * @param {SubjectClassCreateArgs} args - Arguments to create a SubjectClass.
     * @example
     * // Create one SubjectClass
     * const SubjectClass = await prisma.subjectClass.create({
     *   data: {
     *     // ... data to create a SubjectClass
     *   }
     * })
     * 
     */
    create<T extends SubjectClassCreateArgs>(args: SelectSubset<T, SubjectClassCreateArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubjectClasses.
     * @param {SubjectClassCreateManyArgs} args - Arguments to create many SubjectClasses.
     * @example
     * // Create many SubjectClasses
     * const subjectClass = await prisma.subjectClass.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectClassCreateManyArgs>(args?: SelectSubset<T, SubjectClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubjectClasses and returns the data saved in the database.
     * @param {SubjectClassCreateManyAndReturnArgs} args - Arguments to create many SubjectClasses.
     * @example
     * // Create many SubjectClasses
     * const subjectClass = await prisma.subjectClass.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubjectClasses and only return the `id`
     * const subjectClassWithIdOnly = await prisma.subjectClass.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectClassCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubjectClass.
     * @param {SubjectClassDeleteArgs} args - Arguments to delete one SubjectClass.
     * @example
     * // Delete one SubjectClass
     * const SubjectClass = await prisma.subjectClass.delete({
     *   where: {
     *     // ... filter to delete one SubjectClass
     *   }
     * })
     * 
     */
    delete<T extends SubjectClassDeleteArgs>(args: SelectSubset<T, SubjectClassDeleteArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubjectClass.
     * @param {SubjectClassUpdateArgs} args - Arguments to update one SubjectClass.
     * @example
     * // Update one SubjectClass
     * const subjectClass = await prisma.subjectClass.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectClassUpdateArgs>(args: SelectSubset<T, SubjectClassUpdateArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubjectClasses.
     * @param {SubjectClassDeleteManyArgs} args - Arguments to filter SubjectClasses to delete.
     * @example
     * // Delete a few SubjectClasses
     * const { count } = await prisma.subjectClass.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectClassDeleteManyArgs>(args?: SelectSubset<T, SubjectClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubjectClasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubjectClasses
     * const subjectClass = await prisma.subjectClass.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectClassUpdateManyArgs>(args: SelectSubset<T, SubjectClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubjectClasses and returns the data updated in the database.
     * @param {SubjectClassUpdateManyAndReturnArgs} args - Arguments to update many SubjectClasses.
     * @example
     * // Update many SubjectClasses
     * const subjectClass = await prisma.subjectClass.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubjectClasses and only return the `id`
     * const subjectClassWithIdOnly = await prisma.subjectClass.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectClassUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubjectClass.
     * @param {SubjectClassUpsertArgs} args - Arguments to update or create a SubjectClass.
     * @example
     * // Update or create a SubjectClass
     * const subjectClass = await prisma.subjectClass.upsert({
     *   create: {
     *     // ... data to create a SubjectClass
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubjectClass we want to update
     *   }
     * })
     */
    upsert<T extends SubjectClassUpsertArgs>(args: SelectSubset<T, SubjectClassUpsertArgs<ExtArgs>>): Prisma__SubjectClassClient<$Result.GetResult<Prisma.$SubjectClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubjectClasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectClassCountArgs} args - Arguments to filter SubjectClasses to count.
     * @example
     * // Count the number of SubjectClasses
     * const count = await prisma.subjectClass.count({
     *   where: {
     *     // ... the filter for the SubjectClasses we want to count
     *   }
     * })
    **/
    count<T extends SubjectClassCountArgs>(
      args?: Subset<T, SubjectClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubjectClass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectClassAggregateArgs>(args: Subset<T, SubjectClassAggregateArgs>): Prisma.PrismaPromise<GetSubjectClassAggregateType<T>>

    /**
     * Group by SubjectClass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectClassGroupByArgs['orderBy'] }
        : { orderBy?: SubjectClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubjectClass model
   */
  readonly fields: SubjectClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubjectClass.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubjectClass model
   */
  interface SubjectClassFieldRefs {
    readonly id: FieldRef<"SubjectClass", 'Int'>
    readonly subject_id: FieldRef<"SubjectClass", 'Int'>
    readonly class_id: FieldRef<"SubjectClass", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SubjectClass findUnique
   */
  export type SubjectClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which SubjectClass to fetch.
     */
    where: SubjectClassWhereUniqueInput
  }

  /**
   * SubjectClass findUniqueOrThrow
   */
  export type SubjectClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which SubjectClass to fetch.
     */
    where: SubjectClassWhereUniqueInput
  }

  /**
   * SubjectClass findFirst
   */
  export type SubjectClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which SubjectClass to fetch.
     */
    where?: SubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectClasses to fetch.
     */
    orderBy?: SubjectClassOrderByWithRelationInput | SubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubjectClasses.
     */
    cursor?: SubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubjectClasses.
     */
    distinct?: SubjectClassScalarFieldEnum | SubjectClassScalarFieldEnum[]
  }

  /**
   * SubjectClass findFirstOrThrow
   */
  export type SubjectClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which SubjectClass to fetch.
     */
    where?: SubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectClasses to fetch.
     */
    orderBy?: SubjectClassOrderByWithRelationInput | SubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubjectClasses.
     */
    cursor?: SubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubjectClasses.
     */
    distinct?: SubjectClassScalarFieldEnum | SubjectClassScalarFieldEnum[]
  }

  /**
   * SubjectClass findMany
   */
  export type SubjectClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which SubjectClasses to fetch.
     */
    where?: SubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectClasses to fetch.
     */
    orderBy?: SubjectClassOrderByWithRelationInput | SubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubjectClasses.
     */
    cursor?: SubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectClasses.
     */
    skip?: number
    distinct?: SubjectClassScalarFieldEnum | SubjectClassScalarFieldEnum[]
  }

  /**
   * SubjectClass create
   */
  export type SubjectClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * The data needed to create a SubjectClass.
     */
    data: XOR<SubjectClassCreateInput, SubjectClassUncheckedCreateInput>
  }

  /**
   * SubjectClass createMany
   */
  export type SubjectClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubjectClasses.
     */
    data: SubjectClassCreateManyInput | SubjectClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubjectClass createManyAndReturn
   */
  export type SubjectClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * The data used to create many SubjectClasses.
     */
    data: SubjectClassCreateManyInput | SubjectClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubjectClass update
   */
  export type SubjectClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * The data needed to update a SubjectClass.
     */
    data: XOR<SubjectClassUpdateInput, SubjectClassUncheckedUpdateInput>
    /**
     * Choose, which SubjectClass to update.
     */
    where: SubjectClassWhereUniqueInput
  }

  /**
   * SubjectClass updateMany
   */
  export type SubjectClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubjectClasses.
     */
    data: XOR<SubjectClassUpdateManyMutationInput, SubjectClassUncheckedUpdateManyInput>
    /**
     * Filter which SubjectClasses to update
     */
    where?: SubjectClassWhereInput
    /**
     * Limit how many SubjectClasses to update.
     */
    limit?: number
  }

  /**
   * SubjectClass updateManyAndReturn
   */
  export type SubjectClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * The data used to update SubjectClasses.
     */
    data: XOR<SubjectClassUpdateManyMutationInput, SubjectClassUncheckedUpdateManyInput>
    /**
     * Filter which SubjectClasses to update
     */
    where?: SubjectClassWhereInput
    /**
     * Limit how many SubjectClasses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubjectClass upsert
   */
  export type SubjectClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * The filter to search for the SubjectClass to update in case it exists.
     */
    where: SubjectClassWhereUniqueInput
    /**
     * In case the SubjectClass found by the `where` argument doesn't exist, create a new SubjectClass with this data.
     */
    create: XOR<SubjectClassCreateInput, SubjectClassUncheckedCreateInput>
    /**
     * In case the SubjectClass was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectClassUpdateInput, SubjectClassUncheckedUpdateInput>
  }

  /**
   * SubjectClass delete
   */
  export type SubjectClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
    /**
     * Filter which SubjectClass to delete.
     */
    where: SubjectClassWhereUniqueInput
  }

  /**
   * SubjectClass deleteMany
   */
  export type SubjectClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubjectClasses to delete
     */
    where?: SubjectClassWhereInput
    /**
     * Limit how many SubjectClasses to delete.
     */
    limit?: number
  }

  /**
   * SubjectClass without action
   */
  export type SubjectClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectClass
     */
    select?: SubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectClass
     */
    omit?: SubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectClassInclude<ExtArgs> | null
  }


  /**
   * Model AcademicYear
   */

  export type AggregateAcademicYear = {
    _count: AcademicYearCountAggregateOutputType | null
    _avg: AcademicYearAvgAggregateOutputType | null
    _sum: AcademicYearSumAggregateOutputType | null
    _min: AcademicYearMinAggregateOutputType | null
    _max: AcademicYearMaxAggregateOutputType | null
  }

  export type AcademicYearAvgAggregateOutputType = {
    id: number | null
  }

  export type AcademicYearSumAggregateOutputType = {
    id: number | null
  }

  export type AcademicYearMinAggregateOutputType = {
    id: number | null
    year: string | null
    is_now: boolean | null
    create_at: Date | null
    update_at: Date | null
  }

  export type AcademicYearMaxAggregateOutputType = {
    id: number | null
    year: string | null
    is_now: boolean | null
    create_at: Date | null
    update_at: Date | null
  }

  export type AcademicYearCountAggregateOutputType = {
    id: number
    year: number
    is_now: number
    create_at: number
    update_at: number
    _all: number
  }


  export type AcademicYearAvgAggregateInputType = {
    id?: true
  }

  export type AcademicYearSumAggregateInputType = {
    id?: true
  }

  export type AcademicYearMinAggregateInputType = {
    id?: true
    year?: true
    is_now?: true
    create_at?: true
    update_at?: true
  }

  export type AcademicYearMaxAggregateInputType = {
    id?: true
    year?: true
    is_now?: true
    create_at?: true
    update_at?: true
  }

  export type AcademicYearCountAggregateInputType = {
    id?: true
    year?: true
    is_now?: true
    create_at?: true
    update_at?: true
    _all?: true
  }

  export type AcademicYearAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicYear to aggregate.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicYears
    **/
    _count?: true | AcademicYearCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicYearAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicYearSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicYearMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicYearMaxAggregateInputType
  }

  export type GetAcademicYearAggregateType<T extends AcademicYearAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicYear]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicYear[P]>
      : GetScalarType<T[P], AggregateAcademicYear[P]>
  }




  export type AcademicYearGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicYearWhereInput
    orderBy?: AcademicYearOrderByWithAggregationInput | AcademicYearOrderByWithAggregationInput[]
    by: AcademicYearScalarFieldEnum[] | AcademicYearScalarFieldEnum
    having?: AcademicYearScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicYearCountAggregateInputType | true
    _avg?: AcademicYearAvgAggregateInputType
    _sum?: AcademicYearSumAggregateInputType
    _min?: AcademicYearMinAggregateInputType
    _max?: AcademicYearMaxAggregateInputType
  }

  export type AcademicYearGroupByOutputType = {
    id: number
    year: string
    is_now: boolean
    create_at: Date
    update_at: Date
    _count: AcademicYearCountAggregateOutputType | null
    _avg: AcademicYearAvgAggregateOutputType | null
    _sum: AcademicYearSumAggregateOutputType | null
    _min: AcademicYearMinAggregateOutputType | null
    _max: AcademicYearMaxAggregateOutputType | null
  }

  type GetAcademicYearGroupByPayload<T extends AcademicYearGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicYearGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicYearGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicYearGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicYearGroupByOutputType[P]>
        }
      >
    >


  export type AcademicYearSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    is_now?: boolean
    create_at?: boolean
    update_at?: boolean
    Book?: boolean | AcademicYear$BookArgs<ExtArgs>
    _count?: boolean | AcademicYearCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicYear"]>

  export type AcademicYearSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    is_now?: boolean
    create_at?: boolean
    update_at?: boolean
  }, ExtArgs["result"]["academicYear"]>

  export type AcademicYearSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    is_now?: boolean
    create_at?: boolean
    update_at?: boolean
  }, ExtArgs["result"]["academicYear"]>

  export type AcademicYearSelectScalar = {
    id?: boolean
    year?: boolean
    is_now?: boolean
    create_at?: boolean
    update_at?: boolean
  }

  export type AcademicYearOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year" | "is_now" | "create_at" | "update_at", ExtArgs["result"]["academicYear"]>
  export type AcademicYearInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Book?: boolean | AcademicYear$BookArgs<ExtArgs>
    _count?: boolean | AcademicYearCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AcademicYearIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AcademicYearIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AcademicYearPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicYear"
    objects: {
      Book: Prisma.$BookPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      year: string
      is_now: boolean
      create_at: Date
      update_at: Date
    }, ExtArgs["result"]["academicYear"]>
    composites: {}
  }

  type AcademicYearGetPayload<S extends boolean | null | undefined | AcademicYearDefaultArgs> = $Result.GetResult<Prisma.$AcademicYearPayload, S>

  type AcademicYearCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicYearFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicYearCountAggregateInputType | true
    }

  export interface AcademicYearDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicYear'], meta: { name: 'AcademicYear' } }
    /**
     * Find zero or one AcademicYear that matches the filter.
     * @param {AcademicYearFindUniqueArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicYearFindUniqueArgs>(args: SelectSubset<T, AcademicYearFindUniqueArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicYear that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicYearFindUniqueOrThrowArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicYearFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicYearFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicYear that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearFindFirstArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicYearFindFirstArgs>(args?: SelectSubset<T, AcademicYearFindFirstArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicYear that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearFindFirstOrThrowArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicYearFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicYearFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicYears that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicYears
     * const academicYears = await prisma.academicYear.findMany()
     * 
     * // Get first 10 AcademicYears
     * const academicYears = await prisma.academicYear.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicYearWithIdOnly = await prisma.academicYear.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicYearFindManyArgs>(args?: SelectSubset<T, AcademicYearFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicYear.
     * @param {AcademicYearCreateArgs} args - Arguments to create a AcademicYear.
     * @example
     * // Create one AcademicYear
     * const AcademicYear = await prisma.academicYear.create({
     *   data: {
     *     // ... data to create a AcademicYear
     *   }
     * })
     * 
     */
    create<T extends AcademicYearCreateArgs>(args: SelectSubset<T, AcademicYearCreateArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicYears.
     * @param {AcademicYearCreateManyArgs} args - Arguments to create many AcademicYears.
     * @example
     * // Create many AcademicYears
     * const academicYear = await prisma.academicYear.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicYearCreateManyArgs>(args?: SelectSubset<T, AcademicYearCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicYears and returns the data saved in the database.
     * @param {AcademicYearCreateManyAndReturnArgs} args - Arguments to create many AcademicYears.
     * @example
     * // Create many AcademicYears
     * const academicYear = await prisma.academicYear.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicYears and only return the `id`
     * const academicYearWithIdOnly = await prisma.academicYear.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicYearCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicYearCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AcademicYear.
     * @param {AcademicYearDeleteArgs} args - Arguments to delete one AcademicYear.
     * @example
     * // Delete one AcademicYear
     * const AcademicYear = await prisma.academicYear.delete({
     *   where: {
     *     // ... filter to delete one AcademicYear
     *   }
     * })
     * 
     */
    delete<T extends AcademicYearDeleteArgs>(args: SelectSubset<T, AcademicYearDeleteArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicYear.
     * @param {AcademicYearUpdateArgs} args - Arguments to update one AcademicYear.
     * @example
     * // Update one AcademicYear
     * const academicYear = await prisma.academicYear.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicYearUpdateArgs>(args: SelectSubset<T, AcademicYearUpdateArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicYears.
     * @param {AcademicYearDeleteManyArgs} args - Arguments to filter AcademicYears to delete.
     * @example
     * // Delete a few AcademicYears
     * const { count } = await prisma.academicYear.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicYearDeleteManyArgs>(args?: SelectSubset<T, AcademicYearDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicYears
     * const academicYear = await prisma.academicYear.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicYearUpdateManyArgs>(args: SelectSubset<T, AcademicYearUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicYears and returns the data updated in the database.
     * @param {AcademicYearUpdateManyAndReturnArgs} args - Arguments to update many AcademicYears.
     * @example
     * // Update many AcademicYears
     * const academicYear = await prisma.academicYear.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicYears and only return the `id`
     * const academicYearWithIdOnly = await prisma.academicYear.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicYearUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicYearUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AcademicYear.
     * @param {AcademicYearUpsertArgs} args - Arguments to update or create a AcademicYear.
     * @example
     * // Update or create a AcademicYear
     * const academicYear = await prisma.academicYear.upsert({
     *   create: {
     *     // ... data to create a AcademicYear
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicYear we want to update
     *   }
     * })
     */
    upsert<T extends AcademicYearUpsertArgs>(args: SelectSubset<T, AcademicYearUpsertArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearCountArgs} args - Arguments to filter AcademicYears to count.
     * @example
     * // Count the number of AcademicYears
     * const count = await prisma.academicYear.count({
     *   where: {
     *     // ... the filter for the AcademicYears we want to count
     *   }
     * })
    **/
    count<T extends AcademicYearCountArgs>(
      args?: Subset<T, AcademicYearCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicYearCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicYearAggregateArgs>(args: Subset<T, AcademicYearAggregateArgs>): Prisma.PrismaPromise<GetAcademicYearAggregateType<T>>

    /**
     * Group by AcademicYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcademicYearGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicYearGroupByArgs['orderBy'] }
        : { orderBy?: AcademicYearGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcademicYearGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicYearGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicYear model
   */
  readonly fields: AcademicYearFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicYear.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicYearClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Book<T extends AcademicYear$BookArgs<ExtArgs> = {}>(args?: Subset<T, AcademicYear$BookArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicYear model
   */
  interface AcademicYearFieldRefs {
    readonly id: FieldRef<"AcademicYear", 'Int'>
    readonly year: FieldRef<"AcademicYear", 'String'>
    readonly is_now: FieldRef<"AcademicYear", 'Boolean'>
    readonly create_at: FieldRef<"AcademicYear", 'DateTime'>
    readonly update_at: FieldRef<"AcademicYear", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicYear findUnique
   */
  export type AcademicYearFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear findUniqueOrThrow
   */
  export type AcademicYearFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear findFirst
   */
  export type AcademicYearFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicYears.
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicYears.
     */
    distinct?: AcademicYearScalarFieldEnum | AcademicYearScalarFieldEnum[]
  }

  /**
   * AcademicYear findFirstOrThrow
   */
  export type AcademicYearFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicYears.
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicYears.
     */
    distinct?: AcademicYearScalarFieldEnum | AcademicYearScalarFieldEnum[]
  }

  /**
   * AcademicYear findMany
   */
  export type AcademicYearFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYears to fetch.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicYears.
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    distinct?: AcademicYearScalarFieldEnum | AcademicYearScalarFieldEnum[]
  }

  /**
   * AcademicYear create
   */
  export type AcademicYearCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicYear.
     */
    data: XOR<AcademicYearCreateInput, AcademicYearUncheckedCreateInput>
  }

  /**
   * AcademicYear createMany
   */
  export type AcademicYearCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicYears.
     */
    data: AcademicYearCreateManyInput | AcademicYearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicYear createManyAndReturn
   */
  export type AcademicYearCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicYears.
     */
    data: AcademicYearCreateManyInput | AcademicYearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicYear update
   */
  export type AcademicYearUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicYear.
     */
    data: XOR<AcademicYearUpdateInput, AcademicYearUncheckedUpdateInput>
    /**
     * Choose, which AcademicYear to update.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear updateMany
   */
  export type AcademicYearUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicYears.
     */
    data: XOR<AcademicYearUpdateManyMutationInput, AcademicYearUncheckedUpdateManyInput>
    /**
     * Filter which AcademicYears to update
     */
    where?: AcademicYearWhereInput
    /**
     * Limit how many AcademicYears to update.
     */
    limit?: number
  }

  /**
   * AcademicYear updateManyAndReturn
   */
  export type AcademicYearUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * The data used to update AcademicYears.
     */
    data: XOR<AcademicYearUpdateManyMutationInput, AcademicYearUncheckedUpdateManyInput>
    /**
     * Filter which AcademicYears to update
     */
    where?: AcademicYearWhereInput
    /**
     * Limit how many AcademicYears to update.
     */
    limit?: number
  }

  /**
   * AcademicYear upsert
   */
  export type AcademicYearUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicYear to update in case it exists.
     */
    where: AcademicYearWhereUniqueInput
    /**
     * In case the AcademicYear found by the `where` argument doesn't exist, create a new AcademicYear with this data.
     */
    create: XOR<AcademicYearCreateInput, AcademicYearUncheckedCreateInput>
    /**
     * In case the AcademicYear was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicYearUpdateInput, AcademicYearUncheckedUpdateInput>
  }

  /**
   * AcademicYear delete
   */
  export type AcademicYearDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter which AcademicYear to delete.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear deleteMany
   */
  export type AcademicYearDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicYears to delete
     */
    where?: AcademicYearWhereInput
    /**
     * Limit how many AcademicYears to delete.
     */
    limit?: number
  }

  /**
   * AcademicYear.Book
   */
  export type AcademicYear$BookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Book
     */
    omit?: BookOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    where?: BookWhereInput
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    cursor?: BookWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * AcademicYear without action
   */
  export type AcademicYearDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
  }


  /**
   * Model SubjectGroup
   */

  export type AggregateSubjectGroup = {
    _count: SubjectGroupCountAggregateOutputType | null
    _avg: SubjectGroupAvgAggregateOutputType | null
    _sum: SubjectGroupSumAggregateOutputType | null
    _min: SubjectGroupMinAggregateOutputType | null
    _max: SubjectGroupMaxAggregateOutputType | null
  }

  export type SubjectGroupAvgAggregateOutputType = {
    id: number | null
    header_id: number | null
  }

  export type SubjectGroupSumAggregateOutputType = {
    id: number | null
    header_id: number | null
  }

  export type SubjectGroupMinAggregateOutputType = {
    id: number | null
    name: string | null
    header_id: number | null
  }

  export type SubjectGroupMaxAggregateOutputType = {
    id: number | null
    name: string | null
    header_id: number | null
  }

  export type SubjectGroupCountAggregateOutputType = {
    id: number
    name: number
    header_id: number
    _all: number
  }


  export type SubjectGroupAvgAggregateInputType = {
    id?: true
    header_id?: true
  }

  export type SubjectGroupSumAggregateInputType = {
    id?: true
    header_id?: true
  }

  export type SubjectGroupMinAggregateInputType = {
    id?: true
    name?: true
    header_id?: true
  }

  export type SubjectGroupMaxAggregateInputType = {
    id?: true
    name?: true
    header_id?: true
  }

  export type SubjectGroupCountAggregateInputType = {
    id?: true
    name?: true
    header_id?: true
    _all?: true
  }

  export type SubjectGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubjectGroup to aggregate.
     */
    where?: SubjectGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectGroups to fetch.
     */
    orderBy?: SubjectGroupOrderByWithRelationInput | SubjectGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubjectGroups
    **/
    _count?: true | SubjectGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectGroupMaxAggregateInputType
  }

  export type GetSubjectGroupAggregateType<T extends SubjectGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateSubjectGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubjectGroup[P]>
      : GetScalarType<T[P], AggregateSubjectGroup[P]>
  }




  export type SubjectGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectGroupWhereInput
    orderBy?: SubjectGroupOrderByWithAggregationInput | SubjectGroupOrderByWithAggregationInput[]
    by: SubjectGroupScalarFieldEnum[] | SubjectGroupScalarFieldEnum
    having?: SubjectGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectGroupCountAggregateInputType | true
    _avg?: SubjectGroupAvgAggregateInputType
    _sum?: SubjectGroupSumAggregateInputType
    _min?: SubjectGroupMinAggregateInputType
    _max?: SubjectGroupMaxAggregateInputType
  }

  export type SubjectGroupGroupByOutputType = {
    id: number
    name: string
    header_id: number
    _count: SubjectGroupCountAggregateOutputType | null
    _avg: SubjectGroupAvgAggregateOutputType | null
    _sum: SubjectGroupSumAggregateOutputType | null
    _min: SubjectGroupMinAggregateOutputType | null
    _max: SubjectGroupMaxAggregateOutputType | null
  }

  type GetSubjectGroupGroupByPayload<T extends SubjectGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupGroupByOutputType[P]>
        }
      >
    >


  export type SubjectGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    header_id?: boolean
    Subject?: boolean | SubjectGroup$SubjectArgs<ExtArgs>
    Teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    _count?: boolean | SubjectGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectGroup"]>

  export type SubjectGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    header_id?: boolean
    Teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectGroup"]>

  export type SubjectGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    header_id?: boolean
    Teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectGroup"]>

  export type SubjectGroupSelectScalar = {
    id?: boolean
    name?: boolean
    header_id?: boolean
  }

  export type SubjectGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "header_id", ExtArgs["result"]["subjectGroup"]>
  export type SubjectGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Subject?: boolean | SubjectGroup$SubjectArgs<ExtArgs>
    Teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    _count?: boolean | SubjectGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }
  export type SubjectGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }

  export type $SubjectGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubjectGroup"
    objects: {
      Subject: Prisma.$SubjectPayload<ExtArgs>[]
      Teacher: Prisma.$TeacherPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      header_id: number
    }, ExtArgs["result"]["subjectGroup"]>
    composites: {}
  }

  type SubjectGroupGetPayload<S extends boolean | null | undefined | SubjectGroupDefaultArgs> = $Result.GetResult<Prisma.$SubjectGroupPayload, S>

  type SubjectGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectGroupCountAggregateInputType | true
    }

  export interface SubjectGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubjectGroup'], meta: { name: 'SubjectGroup' } }
    /**
     * Find zero or one SubjectGroup that matches the filter.
     * @param {SubjectGroupFindUniqueArgs} args - Arguments to find a SubjectGroup
     * @example
     * // Get one SubjectGroup
     * const subjectGroup = await prisma.subjectGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectGroupFindUniqueArgs>(args: SelectSubset<T, SubjectGroupFindUniqueArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubjectGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectGroupFindUniqueOrThrowArgs} args - Arguments to find a SubjectGroup
     * @example
     * // Get one SubjectGroup
     * const subjectGroup = await prisma.subjectGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubjectGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupFindFirstArgs} args - Arguments to find a SubjectGroup
     * @example
     * // Get one SubjectGroup
     * const subjectGroup = await prisma.subjectGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectGroupFindFirstArgs>(args?: SelectSubset<T, SubjectGroupFindFirstArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubjectGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupFindFirstOrThrowArgs} args - Arguments to find a SubjectGroup
     * @example
     * // Get one SubjectGroup
     * const subjectGroup = await prisma.subjectGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubjectGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubjectGroups
     * const subjectGroups = await prisma.subjectGroup.findMany()
     * 
     * // Get first 10 SubjectGroups
     * const subjectGroups = await prisma.subjectGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectGroupWithIdOnly = await prisma.subjectGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectGroupFindManyArgs>(args?: SelectSubset<T, SubjectGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubjectGroup.
     * @param {SubjectGroupCreateArgs} args - Arguments to create a SubjectGroup.
     * @example
     * // Create one SubjectGroup
     * const SubjectGroup = await prisma.subjectGroup.create({
     *   data: {
     *     // ... data to create a SubjectGroup
     *   }
     * })
     * 
     */
    create<T extends SubjectGroupCreateArgs>(args: SelectSubset<T, SubjectGroupCreateArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubjectGroups.
     * @param {SubjectGroupCreateManyArgs} args - Arguments to create many SubjectGroups.
     * @example
     * // Create many SubjectGroups
     * const subjectGroup = await prisma.subjectGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectGroupCreateManyArgs>(args?: SelectSubset<T, SubjectGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubjectGroups and returns the data saved in the database.
     * @param {SubjectGroupCreateManyAndReturnArgs} args - Arguments to create many SubjectGroups.
     * @example
     * // Create many SubjectGroups
     * const subjectGroup = await prisma.subjectGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubjectGroups and only return the `id`
     * const subjectGroupWithIdOnly = await prisma.subjectGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubjectGroup.
     * @param {SubjectGroupDeleteArgs} args - Arguments to delete one SubjectGroup.
     * @example
     * // Delete one SubjectGroup
     * const SubjectGroup = await prisma.subjectGroup.delete({
     *   where: {
     *     // ... filter to delete one SubjectGroup
     *   }
     * })
     * 
     */
    delete<T extends SubjectGroupDeleteArgs>(args: SelectSubset<T, SubjectGroupDeleteArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubjectGroup.
     * @param {SubjectGroupUpdateArgs} args - Arguments to update one SubjectGroup.
     * @example
     * // Update one SubjectGroup
     * const subjectGroup = await prisma.subjectGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectGroupUpdateArgs>(args: SelectSubset<T, SubjectGroupUpdateArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubjectGroups.
     * @param {SubjectGroupDeleteManyArgs} args - Arguments to filter SubjectGroups to delete.
     * @example
     * // Delete a few SubjectGroups
     * const { count } = await prisma.subjectGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectGroupDeleteManyArgs>(args?: SelectSubset<T, SubjectGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubjectGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubjectGroups
     * const subjectGroup = await prisma.subjectGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectGroupUpdateManyArgs>(args: SelectSubset<T, SubjectGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubjectGroups and returns the data updated in the database.
     * @param {SubjectGroupUpdateManyAndReturnArgs} args - Arguments to update many SubjectGroups.
     * @example
     * // Update many SubjectGroups
     * const subjectGroup = await prisma.subjectGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubjectGroups and only return the `id`
     * const subjectGroupWithIdOnly = await prisma.subjectGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubjectGroup.
     * @param {SubjectGroupUpsertArgs} args - Arguments to update or create a SubjectGroup.
     * @example
     * // Update or create a SubjectGroup
     * const subjectGroup = await prisma.subjectGroup.upsert({
     *   create: {
     *     // ... data to create a SubjectGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubjectGroup we want to update
     *   }
     * })
     */
    upsert<T extends SubjectGroupUpsertArgs>(args: SelectSubset<T, SubjectGroupUpsertArgs<ExtArgs>>): Prisma__SubjectGroupClient<$Result.GetResult<Prisma.$SubjectGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubjectGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupCountArgs} args - Arguments to filter SubjectGroups to count.
     * @example
     * // Count the number of SubjectGroups
     * const count = await prisma.subjectGroup.count({
     *   where: {
     *     // ... the filter for the SubjectGroups we want to count
     *   }
     * })
    **/
    count<T extends SubjectGroupCountArgs>(
      args?: Subset<T, SubjectGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubjectGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectGroupAggregateArgs>(args: Subset<T, SubjectGroupAggregateArgs>): Prisma.PrismaPromise<GetSubjectGroupAggregateType<T>>

    /**
     * Group by SubjectGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubjectGroup model
   */
  readonly fields: SubjectGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubjectGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Subject<T extends SubjectGroup$SubjectArgs<ExtArgs> = {}>(args?: Subset<T, SubjectGroup$SubjectArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubjectGroup model
   */
  interface SubjectGroupFieldRefs {
    readonly id: FieldRef<"SubjectGroup", 'Int'>
    readonly name: FieldRef<"SubjectGroup", 'String'>
    readonly header_id: FieldRef<"SubjectGroup", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SubjectGroup findUnique
   */
  export type SubjectGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * Filter, which SubjectGroup to fetch.
     */
    where: SubjectGroupWhereUniqueInput
  }

  /**
   * SubjectGroup findUniqueOrThrow
   */
  export type SubjectGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * Filter, which SubjectGroup to fetch.
     */
    where: SubjectGroupWhereUniqueInput
  }

  /**
   * SubjectGroup findFirst
   */
  export type SubjectGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * Filter, which SubjectGroup to fetch.
     */
    where?: SubjectGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectGroups to fetch.
     */
    orderBy?: SubjectGroupOrderByWithRelationInput | SubjectGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubjectGroups.
     */
    cursor?: SubjectGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubjectGroups.
     */
    distinct?: SubjectGroupScalarFieldEnum | SubjectGroupScalarFieldEnum[]
  }

  /**
   * SubjectGroup findFirstOrThrow
   */
  export type SubjectGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * Filter, which SubjectGroup to fetch.
     */
    where?: SubjectGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectGroups to fetch.
     */
    orderBy?: SubjectGroupOrderByWithRelationInput | SubjectGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubjectGroups.
     */
    cursor?: SubjectGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubjectGroups.
     */
    distinct?: SubjectGroupScalarFieldEnum | SubjectGroupScalarFieldEnum[]
  }

  /**
   * SubjectGroup findMany
   */
  export type SubjectGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * Filter, which SubjectGroups to fetch.
     */
    where?: SubjectGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectGroups to fetch.
     */
    orderBy?: SubjectGroupOrderByWithRelationInput | SubjectGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubjectGroups.
     */
    cursor?: SubjectGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectGroups.
     */
    skip?: number
    distinct?: SubjectGroupScalarFieldEnum | SubjectGroupScalarFieldEnum[]
  }

  /**
   * SubjectGroup create
   */
  export type SubjectGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a SubjectGroup.
     */
    data: XOR<SubjectGroupCreateInput, SubjectGroupUncheckedCreateInput>
  }

  /**
   * SubjectGroup createMany
   */
  export type SubjectGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubjectGroups.
     */
    data: SubjectGroupCreateManyInput | SubjectGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubjectGroup createManyAndReturn
   */
  export type SubjectGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * The data used to create many SubjectGroups.
     */
    data: SubjectGroupCreateManyInput | SubjectGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubjectGroup update
   */
  export type SubjectGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a SubjectGroup.
     */
    data: XOR<SubjectGroupUpdateInput, SubjectGroupUncheckedUpdateInput>
    /**
     * Choose, which SubjectGroup to update.
     */
    where: SubjectGroupWhereUniqueInput
  }

  /**
   * SubjectGroup updateMany
   */
  export type SubjectGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubjectGroups.
     */
    data: XOR<SubjectGroupUpdateManyMutationInput, SubjectGroupUncheckedUpdateManyInput>
    /**
     * Filter which SubjectGroups to update
     */
    where?: SubjectGroupWhereInput
    /**
     * Limit how many SubjectGroups to update.
     */
    limit?: number
  }

  /**
   * SubjectGroup updateManyAndReturn
   */
  export type SubjectGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * The data used to update SubjectGroups.
     */
    data: XOR<SubjectGroupUpdateManyMutationInput, SubjectGroupUncheckedUpdateManyInput>
    /**
     * Filter which SubjectGroups to update
     */
    where?: SubjectGroupWhereInput
    /**
     * Limit how many SubjectGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubjectGroup upsert
   */
  export type SubjectGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the SubjectGroup to update in case it exists.
     */
    where: SubjectGroupWhereUniqueInput
    /**
     * In case the SubjectGroup found by the `where` argument doesn't exist, create a new SubjectGroup with this data.
     */
    create: XOR<SubjectGroupCreateInput, SubjectGroupUncheckedCreateInput>
    /**
     * In case the SubjectGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectGroupUpdateInput, SubjectGroupUncheckedUpdateInput>
  }

  /**
   * SubjectGroup delete
   */
  export type SubjectGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
    /**
     * Filter which SubjectGroup to delete.
     */
    where: SubjectGroupWhereUniqueInput
  }

  /**
   * SubjectGroup deleteMany
   */
  export type SubjectGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubjectGroups to delete
     */
    where?: SubjectGroupWhereInput
    /**
     * Limit how many SubjectGroups to delete.
     */
    limit?: number
  }

  /**
   * SubjectGroup.Subject
   */
  export type SubjectGroup$SubjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    cursor?: SubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * SubjectGroup without action
   */
  export type SubjectGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectGroup
     */
    select?: SubjectGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectGroup
     */
    omit?: SubjectGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectGroupInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    name: 'name',
    username: 'username',
    password: 'password',
    role: 'role',
    create_at: 'create_at',
    update_at: 'update_at'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    grade: 'grade',
    name: 'name'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    code: 'code',
    grade: 'grade',
    name: 'name',
    description: 'description',
    create_at: 'create_at',
    update_at: 'update_at',
    subject_group_id: 'subject_group_id'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const TeachingAssignmentScalarFieldEnum: {
    id: 'id',
    teacher_id: 'teacher_id',
    subject_id: 'subject_id',
    class_id: 'class_id'
  };

  export type TeachingAssignmentScalarFieldEnum = (typeof TeachingAssignmentScalarFieldEnum)[keyof typeof TeachingAssignmentScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    stu_code: 'stu_code',
    password: 'password',
    class_id: 'class_id',
    create_at: 'create_at',
    update_at: 'update_at'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const BookScalarFieldEnum: {
    id: 'id',
    barcode: 'barcode',
    name: 'name',
    description: 'description',
    subject_id: 'subject_id',
    academic_year_id: 'academic_year_id',
    create_at: 'create_at',
    update_at: 'update_at'
  };

  export type BookScalarFieldEnum = (typeof BookScalarFieldEnum)[keyof typeof BookScalarFieldEnum]


  export const BookRegistrationScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    book_id: 'book_id',
    subject_id: 'subject_id',
    register_code: 'register_code',
    registered_at: 'registered_at'
  };

  export type BookRegistrationScalarFieldEnum = (typeof BookRegistrationScalarFieldEnum)[keyof typeof BookRegistrationScalarFieldEnum]


  export const SubjectClassScalarFieldEnum: {
    id: 'id',
    subject_id: 'subject_id',
    class_id: 'class_id'
  };

  export type SubjectClassScalarFieldEnum = (typeof SubjectClassScalarFieldEnum)[keyof typeof SubjectClassScalarFieldEnum]


  export const AcademicYearScalarFieldEnum: {
    id: 'id',
    year: 'year',
    is_now: 'is_now',
    create_at: 'create_at',
    update_at: 'update_at'
  };

  export type AcademicYearScalarFieldEnum = (typeof AcademicYearScalarFieldEnum)[keyof typeof AcademicYearScalarFieldEnum]


  export const SubjectGroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    header_id: 'header_id'
  };

  export type SubjectGroupScalarFieldEnum = (typeof SubjectGroupScalarFieldEnum)[keyof typeof SubjectGroupScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: IntFilter<"Teacher"> | number
    name?: StringFilter<"Teacher"> | string
    username?: StringFilter<"Teacher"> | string
    password?: StringFilter<"Teacher"> | string
    role?: StringFilter<"Teacher"> | string
    create_at?: DateTimeFilter<"Teacher"> | Date | string
    update_at?: DateTimeFilter<"Teacher"> | Date | string
    advisingClasses?: ClassListRelationFilter
    teachingAssignments?: TeachingAssignmentListRelationFilter
    SubjectGroup?: SubjectGroupListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    advisingClasses?: ClassOrderByRelationAggregateInput
    teachingAssignments?: TeachingAssignmentOrderByRelationAggregateInput
    SubjectGroup?: SubjectGroupOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    name?: StringFilter<"Teacher"> | string
    password?: StringFilter<"Teacher"> | string
    role?: StringFilter<"Teacher"> | string
    create_at?: DateTimeFilter<"Teacher"> | Date | string
    update_at?: DateTimeFilter<"Teacher"> | Date | string
    advisingClasses?: ClassListRelationFilter
    teachingAssignments?: TeachingAssignmentListRelationFilter
    SubjectGroup?: SubjectGroupListRelationFilter
  }, "id" | "username">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Teacher"> | number
    name?: StringWithAggregatesFilter<"Teacher"> | string
    username?: StringWithAggregatesFilter<"Teacher"> | string
    password?: StringWithAggregatesFilter<"Teacher"> | string
    role?: StringWithAggregatesFilter<"Teacher"> | string
    create_at?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: IntFilter<"Class"> | number
    grade?: StringFilter<"Class"> | string
    name?: StringFilter<"Class"> | string
    advisors?: TeacherListRelationFilter
    students?: StudentListRelationFilter
    subjectClasses?: SubjectClassListRelationFilter
    teachingAssignments?: TeachingAssignmentListRelationFilter
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    grade?: SortOrder
    name?: SortOrder
    advisors?: TeacherOrderByRelationAggregateInput
    students?: StudentOrderByRelationAggregateInput
    subjectClasses?: SubjectClassOrderByRelationAggregateInput
    teachingAssignments?: TeachingAssignmentOrderByRelationAggregateInput
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    grade?: StringFilter<"Class"> | string
    name?: StringFilter<"Class"> | string
    advisors?: TeacherListRelationFilter
    students?: StudentListRelationFilter
    subjectClasses?: SubjectClassListRelationFilter
    teachingAssignments?: TeachingAssignmentListRelationFilter
  }, "id">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    grade?: SortOrder
    name?: SortOrder
    _count?: ClassCountOrderByAggregateInput
    _avg?: ClassAvgOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
    _sum?: ClassSumOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class"> | number
    grade?: StringWithAggregatesFilter<"Class"> | string
    name?: StringWithAggregatesFilter<"Class"> | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: IntFilter<"Subject"> | number
    code?: StringFilter<"Subject"> | string
    grade?: StringFilter<"Subject"> | string
    name?: StringFilter<"Subject"> | string
    description?: StringNullableFilter<"Subject"> | string | null
    create_at?: DateTimeFilter<"Subject"> | Date | string
    update_at?: DateTimeFilter<"Subject"> | Date | string
    subject_group_id?: IntNullableFilter<"Subject"> | number | null
    books?: BookListRelationFilter
    subjectClasses?: SubjectClassListRelationFilter
    registrations?: BookRegistrationListRelationFilter
    teachingAssignments?: TeachingAssignmentListRelationFilter
    SubjectGroup?: XOR<SubjectGroupNullableScalarRelationFilter, SubjectGroupWhereInput> | null
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    grade?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    subject_group_id?: SortOrderInput | SortOrder
    books?: BookOrderByRelationAggregateInput
    subjectClasses?: SubjectClassOrderByRelationAggregateInput
    registrations?: BookRegistrationOrderByRelationAggregateInput
    teachingAssignments?: TeachingAssignmentOrderByRelationAggregateInput
    SubjectGroup?: SubjectGroupOrderByWithRelationInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    grade?: StringFilter<"Subject"> | string
    name?: StringFilter<"Subject"> | string
    description?: StringNullableFilter<"Subject"> | string | null
    create_at?: DateTimeFilter<"Subject"> | Date | string
    update_at?: DateTimeFilter<"Subject"> | Date | string
    subject_group_id?: IntNullableFilter<"Subject"> | number | null
    books?: BookListRelationFilter
    subjectClasses?: SubjectClassListRelationFilter
    registrations?: BookRegistrationListRelationFilter
    teachingAssignments?: TeachingAssignmentListRelationFilter
    SubjectGroup?: XOR<SubjectGroupNullableScalarRelationFilter, SubjectGroupWhereInput> | null
  }, "id" | "code">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    grade?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    subject_group_id?: SortOrderInput | SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _avg?: SubjectAvgOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
    _sum?: SubjectSumOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subject"> | number
    code?: StringWithAggregatesFilter<"Subject"> | string
    grade?: StringWithAggregatesFilter<"Subject"> | string
    name?: StringWithAggregatesFilter<"Subject"> | string
    description?: StringNullableWithAggregatesFilter<"Subject"> | string | null
    create_at?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    subject_group_id?: IntNullableWithAggregatesFilter<"Subject"> | number | null
  }

  export type TeachingAssignmentWhereInput = {
    AND?: TeachingAssignmentWhereInput | TeachingAssignmentWhereInput[]
    OR?: TeachingAssignmentWhereInput[]
    NOT?: TeachingAssignmentWhereInput | TeachingAssignmentWhereInput[]
    id?: IntFilter<"TeachingAssignment"> | number
    teacher_id?: IntFilter<"TeachingAssignment"> | number
    subject_id?: IntFilter<"TeachingAssignment"> | number
    class_id?: IntFilter<"TeachingAssignment"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }

  export type TeachingAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    teacher_id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
  }

  export type TeachingAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    subject_id_class_id?: TeachingAssignmentSubject_idClass_idCompoundUniqueInput
    AND?: TeachingAssignmentWhereInput | TeachingAssignmentWhereInput[]
    OR?: TeachingAssignmentWhereInput[]
    NOT?: TeachingAssignmentWhereInput | TeachingAssignmentWhereInput[]
    teacher_id?: IntFilter<"TeachingAssignment"> | number
    subject_id?: IntFilter<"TeachingAssignment"> | number
    class_id?: IntFilter<"TeachingAssignment"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }, "id" | "subject_id_class_id">

  export type TeachingAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    teacher_id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
    _count?: TeachingAssignmentCountOrderByAggregateInput
    _avg?: TeachingAssignmentAvgOrderByAggregateInput
    _max?: TeachingAssignmentMaxOrderByAggregateInput
    _min?: TeachingAssignmentMinOrderByAggregateInput
    _sum?: TeachingAssignmentSumOrderByAggregateInput
  }

  export type TeachingAssignmentScalarWhereWithAggregatesInput = {
    AND?: TeachingAssignmentScalarWhereWithAggregatesInput | TeachingAssignmentScalarWhereWithAggregatesInput[]
    OR?: TeachingAssignmentScalarWhereWithAggregatesInput[]
    NOT?: TeachingAssignmentScalarWhereWithAggregatesInput | TeachingAssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TeachingAssignment"> | number
    teacher_id?: IntWithAggregatesFilter<"TeachingAssignment"> | number
    subject_id?: IntWithAggregatesFilter<"TeachingAssignment"> | number
    class_id?: IntWithAggregatesFilter<"TeachingAssignment"> | number
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    name?: StringFilter<"Student"> | string
    stu_code?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    class_id?: IntFilter<"Student"> | number
    create_at?: DateTimeFilter<"Student"> | Date | string
    update_at?: DateTimeFilter<"Student"> | Date | string
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    registrations?: BookRegistrationListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    stu_code?: SortOrder
    password?: SortOrder
    class_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    class?: ClassOrderByWithRelationInput
    registrations?: BookRegistrationOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    stu_code?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    class_id?: IntFilter<"Student"> | number
    create_at?: DateTimeFilter<"Student"> | Date | string
    update_at?: DateTimeFilter<"Student"> | Date | string
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    registrations?: BookRegistrationListRelationFilter
  }, "id" | "stu_code">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    stu_code?: SortOrder
    password?: SortOrder
    class_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    name?: StringWithAggregatesFilter<"Student"> | string
    stu_code?: StringWithAggregatesFilter<"Student"> | string
    password?: StringWithAggregatesFilter<"Student"> | string
    class_id?: IntWithAggregatesFilter<"Student"> | number
    create_at?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type BookWhereInput = {
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    id?: IntFilter<"Book"> | number
    barcode?: StringFilter<"Book"> | string
    name?: StringFilter<"Book"> | string
    description?: StringNullableFilter<"Book"> | string | null
    subject_id?: IntFilter<"Book"> | number
    academic_year_id?: IntFilter<"Book"> | number
    create_at?: DateTimeFilter<"Book"> | Date | string
    update_at?: DateTimeFilter<"Book"> | Date | string
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    registrations?: BookRegistrationListRelationFilter
    AcademicYear?: XOR<AcademicYearScalarRelationFilter, AcademicYearWhereInput>
  }

  export type BookOrderByWithRelationInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    subject_id?: SortOrder
    academic_year_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    subject?: SubjectOrderByWithRelationInput
    registrations?: BookRegistrationOrderByRelationAggregateInput
    AcademicYear?: AcademicYearOrderByWithRelationInput
  }

  export type BookWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    barcode?: string
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    name?: StringFilter<"Book"> | string
    description?: StringNullableFilter<"Book"> | string | null
    subject_id?: IntFilter<"Book"> | number
    academic_year_id?: IntFilter<"Book"> | number
    create_at?: DateTimeFilter<"Book"> | Date | string
    update_at?: DateTimeFilter<"Book"> | Date | string
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    registrations?: BookRegistrationListRelationFilter
    AcademicYear?: XOR<AcademicYearScalarRelationFilter, AcademicYearWhereInput>
  }, "id" | "barcode">

  export type BookOrderByWithAggregationInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    subject_id?: SortOrder
    academic_year_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    _count?: BookCountOrderByAggregateInput
    _avg?: BookAvgOrderByAggregateInput
    _max?: BookMaxOrderByAggregateInput
    _min?: BookMinOrderByAggregateInput
    _sum?: BookSumOrderByAggregateInput
  }

  export type BookScalarWhereWithAggregatesInput = {
    AND?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    OR?: BookScalarWhereWithAggregatesInput[]
    NOT?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Book"> | number
    barcode?: StringWithAggregatesFilter<"Book"> | string
    name?: StringWithAggregatesFilter<"Book"> | string
    description?: StringNullableWithAggregatesFilter<"Book"> | string | null
    subject_id?: IntWithAggregatesFilter<"Book"> | number
    academic_year_id?: IntWithAggregatesFilter<"Book"> | number
    create_at?: DateTimeWithAggregatesFilter<"Book"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"Book"> | Date | string
  }

  export type BookRegistrationWhereInput = {
    AND?: BookRegistrationWhereInput | BookRegistrationWhereInput[]
    OR?: BookRegistrationWhereInput[]
    NOT?: BookRegistrationWhereInput | BookRegistrationWhereInput[]
    id?: IntFilter<"BookRegistration"> | number
    student_id?: IntFilter<"BookRegistration"> | number
    book_id?: IntFilter<"BookRegistration"> | number
    subject_id?: IntFilter<"BookRegistration"> | number
    register_code?: StringNullableFilter<"BookRegistration"> | string | null
    registered_at?: DateTimeFilter<"BookRegistration"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }

  export type BookRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    book_id?: SortOrder
    subject_id?: SortOrder
    register_code?: SortOrderInput | SortOrder
    registered_at?: SortOrder
    student?: StudentOrderByWithRelationInput
    book?: BookOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
  }

  export type BookRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookRegistrationWhereInput | BookRegistrationWhereInput[]
    OR?: BookRegistrationWhereInput[]
    NOT?: BookRegistrationWhereInput | BookRegistrationWhereInput[]
    student_id?: IntFilter<"BookRegistration"> | number
    book_id?: IntFilter<"BookRegistration"> | number
    subject_id?: IntFilter<"BookRegistration"> | number
    register_code?: StringNullableFilter<"BookRegistration"> | string | null
    registered_at?: DateTimeFilter<"BookRegistration"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    book?: XOR<BookScalarRelationFilter, BookWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }, "id">

  export type BookRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    book_id?: SortOrder
    subject_id?: SortOrder
    register_code?: SortOrderInput | SortOrder
    registered_at?: SortOrder
    _count?: BookRegistrationCountOrderByAggregateInput
    _avg?: BookRegistrationAvgOrderByAggregateInput
    _max?: BookRegistrationMaxOrderByAggregateInput
    _min?: BookRegistrationMinOrderByAggregateInput
    _sum?: BookRegistrationSumOrderByAggregateInput
  }

  export type BookRegistrationScalarWhereWithAggregatesInput = {
    AND?: BookRegistrationScalarWhereWithAggregatesInput | BookRegistrationScalarWhereWithAggregatesInput[]
    OR?: BookRegistrationScalarWhereWithAggregatesInput[]
    NOT?: BookRegistrationScalarWhereWithAggregatesInput | BookRegistrationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BookRegistration"> | number
    student_id?: IntWithAggregatesFilter<"BookRegistration"> | number
    book_id?: IntWithAggregatesFilter<"BookRegistration"> | number
    subject_id?: IntWithAggregatesFilter<"BookRegistration"> | number
    register_code?: StringNullableWithAggregatesFilter<"BookRegistration"> | string | null
    registered_at?: DateTimeWithAggregatesFilter<"BookRegistration"> | Date | string
  }

  export type SubjectClassWhereInput = {
    AND?: SubjectClassWhereInput | SubjectClassWhereInput[]
    OR?: SubjectClassWhereInput[]
    NOT?: SubjectClassWhereInput | SubjectClassWhereInput[]
    id?: IntFilter<"SubjectClass"> | number
    subject_id?: IntFilter<"SubjectClass"> | number
    class_id?: IntFilter<"SubjectClass"> | number
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }

  export type SubjectClassOrderByWithRelationInput = {
    id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
    subject?: SubjectOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
  }

  export type SubjectClassWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubjectClassWhereInput | SubjectClassWhereInput[]
    OR?: SubjectClassWhereInput[]
    NOT?: SubjectClassWhereInput | SubjectClassWhereInput[]
    subject_id?: IntFilter<"SubjectClass"> | number
    class_id?: IntFilter<"SubjectClass"> | number
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }, "id">

  export type SubjectClassOrderByWithAggregationInput = {
    id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
    _count?: SubjectClassCountOrderByAggregateInput
    _avg?: SubjectClassAvgOrderByAggregateInput
    _max?: SubjectClassMaxOrderByAggregateInput
    _min?: SubjectClassMinOrderByAggregateInput
    _sum?: SubjectClassSumOrderByAggregateInput
  }

  export type SubjectClassScalarWhereWithAggregatesInput = {
    AND?: SubjectClassScalarWhereWithAggregatesInput | SubjectClassScalarWhereWithAggregatesInput[]
    OR?: SubjectClassScalarWhereWithAggregatesInput[]
    NOT?: SubjectClassScalarWhereWithAggregatesInput | SubjectClassScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubjectClass"> | number
    subject_id?: IntWithAggregatesFilter<"SubjectClass"> | number
    class_id?: IntWithAggregatesFilter<"SubjectClass"> | number
  }

  export type AcademicYearWhereInput = {
    AND?: AcademicYearWhereInput | AcademicYearWhereInput[]
    OR?: AcademicYearWhereInput[]
    NOT?: AcademicYearWhereInput | AcademicYearWhereInput[]
    id?: IntFilter<"AcademicYear"> | number
    year?: StringFilter<"AcademicYear"> | string
    is_now?: BoolFilter<"AcademicYear"> | boolean
    create_at?: DateTimeFilter<"AcademicYear"> | Date | string
    update_at?: DateTimeFilter<"AcademicYear"> | Date | string
    Book?: BookListRelationFilter
  }

  export type AcademicYearOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    is_now?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    Book?: BookOrderByRelationAggregateInput
  }

  export type AcademicYearWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    year?: string
    AND?: AcademicYearWhereInput | AcademicYearWhereInput[]
    OR?: AcademicYearWhereInput[]
    NOT?: AcademicYearWhereInput | AcademicYearWhereInput[]
    is_now?: BoolFilter<"AcademicYear"> | boolean
    create_at?: DateTimeFilter<"AcademicYear"> | Date | string
    update_at?: DateTimeFilter<"AcademicYear"> | Date | string
    Book?: BookListRelationFilter
  }, "id" | "id" | "year">

  export type AcademicYearOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    is_now?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    _count?: AcademicYearCountOrderByAggregateInput
    _avg?: AcademicYearAvgOrderByAggregateInput
    _max?: AcademicYearMaxOrderByAggregateInput
    _min?: AcademicYearMinOrderByAggregateInput
    _sum?: AcademicYearSumOrderByAggregateInput
  }

  export type AcademicYearScalarWhereWithAggregatesInput = {
    AND?: AcademicYearScalarWhereWithAggregatesInput | AcademicYearScalarWhereWithAggregatesInput[]
    OR?: AcademicYearScalarWhereWithAggregatesInput[]
    NOT?: AcademicYearScalarWhereWithAggregatesInput | AcademicYearScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AcademicYear"> | number
    year?: StringWithAggregatesFilter<"AcademicYear"> | string
    is_now?: BoolWithAggregatesFilter<"AcademicYear"> | boolean
    create_at?: DateTimeWithAggregatesFilter<"AcademicYear"> | Date | string
    update_at?: DateTimeWithAggregatesFilter<"AcademicYear"> | Date | string
  }

  export type SubjectGroupWhereInput = {
    AND?: SubjectGroupWhereInput | SubjectGroupWhereInput[]
    OR?: SubjectGroupWhereInput[]
    NOT?: SubjectGroupWhereInput | SubjectGroupWhereInput[]
    id?: IntFilter<"SubjectGroup"> | number
    name?: StringFilter<"SubjectGroup"> | string
    header_id?: IntFilter<"SubjectGroup"> | number
    Subject?: SubjectListRelationFilter
    Teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
  }

  export type SubjectGroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    header_id?: SortOrder
    Subject?: SubjectOrderByRelationAggregateInput
    Teacher?: TeacherOrderByWithRelationInput
  }

  export type SubjectGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubjectGroupWhereInput | SubjectGroupWhereInput[]
    OR?: SubjectGroupWhereInput[]
    NOT?: SubjectGroupWhereInput | SubjectGroupWhereInput[]
    name?: StringFilter<"SubjectGroup"> | string
    header_id?: IntFilter<"SubjectGroup"> | number
    Subject?: SubjectListRelationFilter
    Teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
  }, "id" | "id">

  export type SubjectGroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    header_id?: SortOrder
    _count?: SubjectGroupCountOrderByAggregateInput
    _avg?: SubjectGroupAvgOrderByAggregateInput
    _max?: SubjectGroupMaxOrderByAggregateInput
    _min?: SubjectGroupMinOrderByAggregateInput
    _sum?: SubjectGroupSumOrderByAggregateInput
  }

  export type SubjectGroupScalarWhereWithAggregatesInput = {
    AND?: SubjectGroupScalarWhereWithAggregatesInput | SubjectGroupScalarWhereWithAggregatesInput[]
    OR?: SubjectGroupScalarWhereWithAggregatesInput[]
    NOT?: SubjectGroupScalarWhereWithAggregatesInput | SubjectGroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubjectGroup"> | number
    name?: StringWithAggregatesFilter<"SubjectGroup"> | string
    header_id?: IntWithAggregatesFilter<"SubjectGroup"> | number
  }

  export type TeacherCreateInput = {
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    advisingClasses?: ClassCreateNestedManyWithoutAdvisorsInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutTeacherInput
    SubjectGroup?: SubjectGroupCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: number
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    advisingClasses?: ClassUncheckedCreateNestedManyWithoutAdvisorsInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutTeacherInput
    SubjectGroup?: SubjectGroupUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    advisingClasses?: ClassUpdateManyWithoutAdvisorsNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutTeacherNestedInput
    SubjectGroup?: SubjectGroupUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    advisingClasses?: ClassUncheckedUpdateManyWithoutAdvisorsNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutTeacherNestedInput
    SubjectGroup?: SubjectGroupUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: number
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
  }

  export type TeacherUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateInput = {
    grade: string
    name: string
    advisors?: TeacherCreateNestedManyWithoutAdvisingClassesInput
    students?: StudentCreateNestedManyWithoutClassInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateInput = {
    id?: number
    grade: string
    name: string
    advisors?: TeacherUncheckedCreateNestedManyWithoutAdvisingClassesInput
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassUpdateInput = {
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUpdateManyWithoutAdvisingClassesNestedInput
    students?: StudentUpdateManyWithoutClassNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUncheckedUpdateManyWithoutAdvisingClassesNestedInput
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateManyInput = {
    id?: number
    grade: string
    name: string
  }

  export type ClassUpdateManyMutationInput = {
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectCreateInput = {
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    books?: BookCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutSubjectInput
    SubjectGroup?: SubjectGroupCreateNestedOneWithoutSubjectInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject_group_id?: number | null
    books?: BookUncheckedCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutSubjectNestedInput
    SubjectGroup?: SubjectGroupUpdateOneWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    books?: BookUncheckedUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUncheckedUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject_group_id?: number | null
  }

  export type SubjectUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject_group_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TeachingAssignmentCreateInput = {
    teacher: TeacherCreateNestedOneWithoutTeachingAssignmentsInput
    subject: SubjectCreateNestedOneWithoutTeachingAssignmentsInput
    class: ClassCreateNestedOneWithoutTeachingAssignmentsInput
  }

  export type TeachingAssignmentUncheckedCreateInput = {
    id?: number
    teacher_id: number
    subject_id: number
    class_id: number
  }

  export type TeachingAssignmentUpdateInput = {
    teacher?: TeacherUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
    class?: ClassUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
  }

  export type TeachingAssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacher_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type TeachingAssignmentCreateManyInput = {
    id?: number
    teacher_id: number
    subject_id: number
    class_id: number
  }

  export type TeachingAssignmentUpdateManyMutationInput = {

  }

  export type TeachingAssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacher_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type StudentCreateInput = {
    name: string
    stu_code: string
    password: string
    create_at?: Date | string
    update_at?: Date | string
    class: ClassCreateNestedOneWithoutStudentsInput
    registrations?: BookRegistrationCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    name: string
    stu_code: string
    password: string
    class_id: number
    create_at?: Date | string
    update_at?: Date | string
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutStudentsNestedInput
    registrations?: BookRegistrationUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    class_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: BookRegistrationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    name: string
    stu_code: string
    password: string
    class_id: number
    create_at?: Date | string
    update_at?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    class_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookCreateInput = {
    barcode: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject: SubjectCreateNestedOneWithoutBooksInput
    registrations?: BookRegistrationCreateNestedManyWithoutBookInput
    AcademicYear: AcademicYearCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateInput = {
    id?: number
    barcode: string
    name: string
    description?: string | null
    subject_id: number
    academic_year_id: number
    create_at?: Date | string
    update_at?: Date | string
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookUpdateInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutBooksNestedInput
    registrations?: BookRegistrationUpdateManyWithoutBookNestedInput
    AcademicYear?: AcademicYearUpdateOneRequiredWithoutBookNestedInput
  }

  export type BookUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subject_id?: IntFieldUpdateOperationsInput | number
    academic_year_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: BookRegistrationUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookCreateManyInput = {
    id?: number
    barcode: string
    name: string
    description?: string | null
    subject_id: number
    academic_year_id: number
    create_at?: Date | string
    update_at?: Date | string
  }

  export type BookUpdateManyMutationInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subject_id?: IntFieldUpdateOperationsInput | number
    academic_year_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookRegistrationCreateInput = {
    register_code?: string | null
    registered_at?: Date | string
    student: StudentCreateNestedOneWithoutRegistrationsInput
    book: BookCreateNestedOneWithoutRegistrationsInput
    subject: SubjectCreateNestedOneWithoutRegistrationsInput
  }

  export type BookRegistrationUncheckedCreateInput = {
    id?: number
    student_id: number
    book_id: number
    subject_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type BookRegistrationUpdateInput = {
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutRegistrationsNestedInput
    book?: BookUpdateOneRequiredWithoutRegistrationsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type BookRegistrationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookRegistrationCreateManyInput = {
    id?: number
    student_id: number
    book_id: number
    subject_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type BookRegistrationUpdateManyMutationInput = {
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookRegistrationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectClassCreateInput = {
    subject: SubjectCreateNestedOneWithoutSubjectClassesInput
    class: ClassCreateNestedOneWithoutSubjectClassesInput
  }

  export type SubjectClassUncheckedCreateInput = {
    id?: number
    subject_id: number
    class_id: number
  }

  export type SubjectClassUpdateInput = {
    subject?: SubjectUpdateOneRequiredWithoutSubjectClassesNestedInput
    class?: ClassUpdateOneRequiredWithoutSubjectClassesNestedInput
  }

  export type SubjectClassUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectClassCreateManyInput = {
    id?: number
    subject_id: number
    class_id: number
  }

  export type SubjectClassUpdateManyMutationInput = {

  }

  export type SubjectClassUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type AcademicYearCreateInput = {
    year: string
    is_now?: boolean
    create_at?: Date | string
    update_at?: Date | string
    Book?: BookCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearUncheckedCreateInput = {
    id?: number
    year: string
    is_now?: boolean
    create_at?: Date | string
    update_at?: Date | string
    Book?: BookUncheckedCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearUpdateInput = {
    year?: StringFieldUpdateOperationsInput | string
    is_now?: BoolFieldUpdateOperationsInput | boolean
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Book?: BookUpdateManyWithoutAcademicYearNestedInput
  }

  export type AcademicYearUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: StringFieldUpdateOperationsInput | string
    is_now?: BoolFieldUpdateOperationsInput | boolean
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Book?: BookUncheckedUpdateManyWithoutAcademicYearNestedInput
  }

  export type AcademicYearCreateManyInput = {
    id?: number
    year: string
    is_now?: boolean
    create_at?: Date | string
    update_at?: Date | string
  }

  export type AcademicYearUpdateManyMutationInput = {
    year?: StringFieldUpdateOperationsInput | string
    is_now?: BoolFieldUpdateOperationsInput | boolean
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicYearUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: StringFieldUpdateOperationsInput | string
    is_now?: BoolFieldUpdateOperationsInput | boolean
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectGroupCreateInput = {
    name: string
    Subject?: SubjectCreateNestedManyWithoutSubjectGroupInput
    Teacher: TeacherCreateNestedOneWithoutSubjectGroupInput
  }

  export type SubjectGroupUncheckedCreateInput = {
    id?: number
    name: string
    header_id: number
    Subject?: SubjectUncheckedCreateNestedManyWithoutSubjectGroupInput
  }

  export type SubjectGroupUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    Subject?: SubjectUpdateManyWithoutSubjectGroupNestedInput
    Teacher?: TeacherUpdateOneRequiredWithoutSubjectGroupNestedInput
  }

  export type SubjectGroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    header_id?: IntFieldUpdateOperationsInput | number
    Subject?: SubjectUncheckedUpdateManyWithoutSubjectGroupNestedInput
  }

  export type SubjectGroupCreateManyInput = {
    id?: number
    name: string
    header_id: number
  }

  export type SubjectGroupUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectGroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    header_id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClassListRelationFilter = {
    every?: ClassWhereInput
    some?: ClassWhereInput
    none?: ClassWhereInput
  }

  export type TeachingAssignmentListRelationFilter = {
    every?: TeachingAssignmentWhereInput
    some?: TeachingAssignmentWhereInput
    none?: TeachingAssignmentWhereInput
  }

  export type SubjectGroupListRelationFilter = {
    every?: SubjectGroupWhereInput
    some?: SubjectGroupWhereInput
    none?: SubjectGroupWhereInput
  }

  export type ClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeachingAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TeacherListRelationFilter = {
    every?: TeacherWhereInput
    some?: TeacherWhereInput
    none?: TeacherWhereInput
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type SubjectClassListRelationFilter = {
    every?: SubjectClassWhereInput
    some?: SubjectClassWhereInput
    none?: SubjectClassWhereInput
  }

  export type TeacherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    grade?: SortOrder
    name?: SortOrder
  }

  export type ClassAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    grade?: SortOrder
    name?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    grade?: SortOrder
    name?: SortOrder
  }

  export type ClassSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BookListRelationFilter = {
    every?: BookWhereInput
    some?: BookWhereInput
    none?: BookWhereInput
  }

  export type BookRegistrationListRelationFilter = {
    every?: BookRegistrationWhereInput
    some?: BookRegistrationWhereInput
    none?: BookRegistrationWhereInput
  }

  export type SubjectGroupNullableScalarRelationFilter = {
    is?: SubjectGroupWhereInput | null
    isNot?: SubjectGroupWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    grade?: SortOrder
    name?: SortOrder
    description?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    subject_group_id?: SortOrder
  }

  export type SubjectAvgOrderByAggregateInput = {
    id?: SortOrder
    subject_group_id?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    grade?: SortOrder
    name?: SortOrder
    description?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    subject_group_id?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    grade?: SortOrder
    name?: SortOrder
    description?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
    subject_group_id?: SortOrder
  }

  export type SubjectSumOrderByAggregateInput = {
    id?: SortOrder
    subject_group_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TeacherScalarRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type SubjectScalarRelationFilter = {
    is?: SubjectWhereInput
    isNot?: SubjectWhereInput
  }

  export type ClassScalarRelationFilter = {
    is?: ClassWhereInput
    isNot?: ClassWhereInput
  }

  export type TeachingAssignmentSubject_idClass_idCompoundUniqueInput = {
    subject_id: number
    class_id: number
  }

  export type TeachingAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    teacher_id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type TeachingAssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    teacher_id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type TeachingAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    teacher_id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type TeachingAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    teacher_id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type TeachingAssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    teacher_id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    stu_code?: SortOrder
    password?: SortOrder
    class_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
    class_id?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    stu_code?: SortOrder
    password?: SortOrder
    class_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    stu_code?: SortOrder
    password?: SortOrder
    class_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
    class_id?: SortOrder
  }

  export type AcademicYearScalarRelationFilter = {
    is?: AcademicYearWhereInput
    isNot?: AcademicYearWhereInput
  }

  export type BookCountOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subject_id?: SortOrder
    academic_year_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type BookAvgOrderByAggregateInput = {
    id?: SortOrder
    subject_id?: SortOrder
    academic_year_id?: SortOrder
  }

  export type BookMaxOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subject_id?: SortOrder
    academic_year_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type BookMinOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    description?: SortOrder
    subject_id?: SortOrder
    academic_year_id?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type BookSumOrderByAggregateInput = {
    id?: SortOrder
    subject_id?: SortOrder
    academic_year_id?: SortOrder
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type BookScalarRelationFilter = {
    is?: BookWhereInput
    isNot?: BookWhereInput
  }

  export type BookRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    book_id?: SortOrder
    subject_id?: SortOrder
    register_code?: SortOrder
    registered_at?: SortOrder
  }

  export type BookRegistrationAvgOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    book_id?: SortOrder
    subject_id?: SortOrder
  }

  export type BookRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    book_id?: SortOrder
    subject_id?: SortOrder
    register_code?: SortOrder
    registered_at?: SortOrder
  }

  export type BookRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    book_id?: SortOrder
    subject_id?: SortOrder
    register_code?: SortOrder
    registered_at?: SortOrder
  }

  export type BookRegistrationSumOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    book_id?: SortOrder
    subject_id?: SortOrder
  }

  export type SubjectClassCountOrderByAggregateInput = {
    id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type SubjectClassAvgOrderByAggregateInput = {
    id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type SubjectClassMaxOrderByAggregateInput = {
    id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type SubjectClassMinOrderByAggregateInput = {
    id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type SubjectClassSumOrderByAggregateInput = {
    id?: SortOrder
    subject_id?: SortOrder
    class_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AcademicYearCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    is_now?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type AcademicYearAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AcademicYearMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    is_now?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type AcademicYearMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    is_now?: SortOrder
    create_at?: SortOrder
    update_at?: SortOrder
  }

  export type AcademicYearSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SubjectListRelationFilter = {
    every?: SubjectWhereInput
    some?: SubjectWhereInput
    none?: SubjectWhereInput
  }

  export type SubjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectGroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    header_id?: SortOrder
  }

  export type SubjectGroupAvgOrderByAggregateInput = {
    id?: SortOrder
    header_id?: SortOrder
  }

  export type SubjectGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    header_id?: SortOrder
  }

  export type SubjectGroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    header_id?: SortOrder
  }

  export type SubjectGroupSumOrderByAggregateInput = {
    id?: SortOrder
    header_id?: SortOrder
  }

  export type ClassCreateNestedManyWithoutAdvisorsInput = {
    create?: XOR<ClassCreateWithoutAdvisorsInput, ClassUncheckedCreateWithoutAdvisorsInput> | ClassCreateWithoutAdvisorsInput[] | ClassUncheckedCreateWithoutAdvisorsInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutAdvisorsInput | ClassCreateOrConnectWithoutAdvisorsInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type TeachingAssignmentCreateNestedManyWithoutTeacherInput = {
    create?: XOR<TeachingAssignmentCreateWithoutTeacherInput, TeachingAssignmentUncheckedCreateWithoutTeacherInput> | TeachingAssignmentCreateWithoutTeacherInput[] | TeachingAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutTeacherInput | TeachingAssignmentCreateOrConnectWithoutTeacherInput[]
    createMany?: TeachingAssignmentCreateManyTeacherInputEnvelope
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
  }

  export type SubjectGroupCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SubjectGroupCreateWithoutTeacherInput, SubjectGroupUncheckedCreateWithoutTeacherInput> | SubjectGroupCreateWithoutTeacherInput[] | SubjectGroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectGroupCreateOrConnectWithoutTeacherInput | SubjectGroupCreateOrConnectWithoutTeacherInput[]
    createMany?: SubjectGroupCreateManyTeacherInputEnvelope
    connect?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
  }

  export type ClassUncheckedCreateNestedManyWithoutAdvisorsInput = {
    create?: XOR<ClassCreateWithoutAdvisorsInput, ClassUncheckedCreateWithoutAdvisorsInput> | ClassCreateWithoutAdvisorsInput[] | ClassUncheckedCreateWithoutAdvisorsInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutAdvisorsInput | ClassCreateOrConnectWithoutAdvisorsInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type TeachingAssignmentUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<TeachingAssignmentCreateWithoutTeacherInput, TeachingAssignmentUncheckedCreateWithoutTeacherInput> | TeachingAssignmentCreateWithoutTeacherInput[] | TeachingAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutTeacherInput | TeachingAssignmentCreateOrConnectWithoutTeacherInput[]
    createMany?: TeachingAssignmentCreateManyTeacherInputEnvelope
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
  }

  export type SubjectGroupUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SubjectGroupCreateWithoutTeacherInput, SubjectGroupUncheckedCreateWithoutTeacherInput> | SubjectGroupCreateWithoutTeacherInput[] | SubjectGroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectGroupCreateOrConnectWithoutTeacherInput | SubjectGroupCreateOrConnectWithoutTeacherInput[]
    createMany?: SubjectGroupCreateManyTeacherInputEnvelope
    connect?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClassUpdateManyWithoutAdvisorsNestedInput = {
    create?: XOR<ClassCreateWithoutAdvisorsInput, ClassUncheckedCreateWithoutAdvisorsInput> | ClassCreateWithoutAdvisorsInput[] | ClassUncheckedCreateWithoutAdvisorsInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutAdvisorsInput | ClassCreateOrConnectWithoutAdvisorsInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutAdvisorsInput | ClassUpsertWithWhereUniqueWithoutAdvisorsInput[]
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutAdvisorsInput | ClassUpdateWithWhereUniqueWithoutAdvisorsInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutAdvisorsInput | ClassUpdateManyWithWhereWithoutAdvisorsInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type TeachingAssignmentUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<TeachingAssignmentCreateWithoutTeacherInput, TeachingAssignmentUncheckedCreateWithoutTeacherInput> | TeachingAssignmentCreateWithoutTeacherInput[] | TeachingAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutTeacherInput | TeachingAssignmentCreateOrConnectWithoutTeacherInput[]
    upsert?: TeachingAssignmentUpsertWithWhereUniqueWithoutTeacherInput | TeachingAssignmentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: TeachingAssignmentCreateManyTeacherInputEnvelope
    set?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    disconnect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    delete?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    update?: TeachingAssignmentUpdateWithWhereUniqueWithoutTeacherInput | TeachingAssignmentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: TeachingAssignmentUpdateManyWithWhereWithoutTeacherInput | TeachingAssignmentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
  }

  export type SubjectGroupUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SubjectGroupCreateWithoutTeacherInput, SubjectGroupUncheckedCreateWithoutTeacherInput> | SubjectGroupCreateWithoutTeacherInput[] | SubjectGroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectGroupCreateOrConnectWithoutTeacherInput | SubjectGroupCreateOrConnectWithoutTeacherInput[]
    upsert?: SubjectGroupUpsertWithWhereUniqueWithoutTeacherInput | SubjectGroupUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SubjectGroupCreateManyTeacherInputEnvelope
    set?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    disconnect?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    delete?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    connect?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    update?: SubjectGroupUpdateWithWhereUniqueWithoutTeacherInput | SubjectGroupUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SubjectGroupUpdateManyWithWhereWithoutTeacherInput | SubjectGroupUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SubjectGroupScalarWhereInput | SubjectGroupScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClassUncheckedUpdateManyWithoutAdvisorsNestedInput = {
    create?: XOR<ClassCreateWithoutAdvisorsInput, ClassUncheckedCreateWithoutAdvisorsInput> | ClassCreateWithoutAdvisorsInput[] | ClassUncheckedCreateWithoutAdvisorsInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutAdvisorsInput | ClassCreateOrConnectWithoutAdvisorsInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutAdvisorsInput | ClassUpsertWithWhereUniqueWithoutAdvisorsInput[]
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutAdvisorsInput | ClassUpdateWithWhereUniqueWithoutAdvisorsInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutAdvisorsInput | ClassUpdateManyWithWhereWithoutAdvisorsInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type TeachingAssignmentUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<TeachingAssignmentCreateWithoutTeacherInput, TeachingAssignmentUncheckedCreateWithoutTeacherInput> | TeachingAssignmentCreateWithoutTeacherInput[] | TeachingAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutTeacherInput | TeachingAssignmentCreateOrConnectWithoutTeacherInput[]
    upsert?: TeachingAssignmentUpsertWithWhereUniqueWithoutTeacherInput | TeachingAssignmentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: TeachingAssignmentCreateManyTeacherInputEnvelope
    set?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    disconnect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    delete?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    update?: TeachingAssignmentUpdateWithWhereUniqueWithoutTeacherInput | TeachingAssignmentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: TeachingAssignmentUpdateManyWithWhereWithoutTeacherInput | TeachingAssignmentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
  }

  export type SubjectGroupUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SubjectGroupCreateWithoutTeacherInput, SubjectGroupUncheckedCreateWithoutTeacherInput> | SubjectGroupCreateWithoutTeacherInput[] | SubjectGroupUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectGroupCreateOrConnectWithoutTeacherInput | SubjectGroupCreateOrConnectWithoutTeacherInput[]
    upsert?: SubjectGroupUpsertWithWhereUniqueWithoutTeacherInput | SubjectGroupUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SubjectGroupCreateManyTeacherInputEnvelope
    set?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    disconnect?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    delete?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    connect?: SubjectGroupWhereUniqueInput | SubjectGroupWhereUniqueInput[]
    update?: SubjectGroupUpdateWithWhereUniqueWithoutTeacherInput | SubjectGroupUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SubjectGroupUpdateManyWithWhereWithoutTeacherInput | SubjectGroupUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SubjectGroupScalarWhereInput | SubjectGroupScalarWhereInput[]
  }

  export type TeacherCreateNestedManyWithoutAdvisingClassesInput = {
    create?: XOR<TeacherCreateWithoutAdvisingClassesInput, TeacherUncheckedCreateWithoutAdvisingClassesInput> | TeacherCreateWithoutAdvisingClassesInput[] | TeacherUncheckedCreateWithoutAdvisingClassesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutAdvisingClassesInput | TeacherCreateOrConnectWithoutAdvisingClassesInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
  }

  export type StudentCreateNestedManyWithoutClassInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type SubjectClassCreateNestedManyWithoutClassInput = {
    create?: XOR<SubjectClassCreateWithoutClassInput, SubjectClassUncheckedCreateWithoutClassInput> | SubjectClassCreateWithoutClassInput[] | SubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutClassInput | SubjectClassCreateOrConnectWithoutClassInput[]
    createMany?: SubjectClassCreateManyClassInputEnvelope
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
  }

  export type TeachingAssignmentCreateNestedManyWithoutClassInput = {
    create?: XOR<TeachingAssignmentCreateWithoutClassInput, TeachingAssignmentUncheckedCreateWithoutClassInput> | TeachingAssignmentCreateWithoutClassInput[] | TeachingAssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutClassInput | TeachingAssignmentCreateOrConnectWithoutClassInput[]
    createMany?: TeachingAssignmentCreateManyClassInputEnvelope
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
  }

  export type TeacherUncheckedCreateNestedManyWithoutAdvisingClassesInput = {
    create?: XOR<TeacherCreateWithoutAdvisingClassesInput, TeacherUncheckedCreateWithoutAdvisingClassesInput> | TeacherCreateWithoutAdvisingClassesInput[] | TeacherUncheckedCreateWithoutAdvisingClassesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutAdvisingClassesInput | TeacherCreateOrConnectWithoutAdvisingClassesInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type SubjectClassUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<SubjectClassCreateWithoutClassInput, SubjectClassUncheckedCreateWithoutClassInput> | SubjectClassCreateWithoutClassInput[] | SubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutClassInput | SubjectClassCreateOrConnectWithoutClassInput[]
    createMany?: SubjectClassCreateManyClassInputEnvelope
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
  }

  export type TeachingAssignmentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<TeachingAssignmentCreateWithoutClassInput, TeachingAssignmentUncheckedCreateWithoutClassInput> | TeachingAssignmentCreateWithoutClassInput[] | TeachingAssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutClassInput | TeachingAssignmentCreateOrConnectWithoutClassInput[]
    createMany?: TeachingAssignmentCreateManyClassInputEnvelope
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
  }

  export type TeacherUpdateManyWithoutAdvisingClassesNestedInput = {
    create?: XOR<TeacherCreateWithoutAdvisingClassesInput, TeacherUncheckedCreateWithoutAdvisingClassesInput> | TeacherCreateWithoutAdvisingClassesInput[] | TeacherUncheckedCreateWithoutAdvisingClassesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutAdvisingClassesInput | TeacherCreateOrConnectWithoutAdvisingClassesInput[]
    upsert?: TeacherUpsertWithWhereUniqueWithoutAdvisingClassesInput | TeacherUpsertWithWhereUniqueWithoutAdvisingClassesInput[]
    set?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    disconnect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    delete?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    update?: TeacherUpdateWithWhereUniqueWithoutAdvisingClassesInput | TeacherUpdateWithWhereUniqueWithoutAdvisingClassesInput[]
    updateMany?: TeacherUpdateManyWithWhereWithoutAdvisingClassesInput | TeacherUpdateManyWithWhereWithoutAdvisingClassesInput[]
    deleteMany?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
  }

  export type StudentUpdateManyWithoutClassNestedInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutClassInput | StudentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutClassInput | StudentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutClassInput | StudentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type SubjectClassUpdateManyWithoutClassNestedInput = {
    create?: XOR<SubjectClassCreateWithoutClassInput, SubjectClassUncheckedCreateWithoutClassInput> | SubjectClassCreateWithoutClassInput[] | SubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutClassInput | SubjectClassCreateOrConnectWithoutClassInput[]
    upsert?: SubjectClassUpsertWithWhereUniqueWithoutClassInput | SubjectClassUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: SubjectClassCreateManyClassInputEnvelope
    set?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    disconnect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    delete?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    update?: SubjectClassUpdateWithWhereUniqueWithoutClassInput | SubjectClassUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: SubjectClassUpdateManyWithWhereWithoutClassInput | SubjectClassUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: SubjectClassScalarWhereInput | SubjectClassScalarWhereInput[]
  }

  export type TeachingAssignmentUpdateManyWithoutClassNestedInput = {
    create?: XOR<TeachingAssignmentCreateWithoutClassInput, TeachingAssignmentUncheckedCreateWithoutClassInput> | TeachingAssignmentCreateWithoutClassInput[] | TeachingAssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutClassInput | TeachingAssignmentCreateOrConnectWithoutClassInput[]
    upsert?: TeachingAssignmentUpsertWithWhereUniqueWithoutClassInput | TeachingAssignmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: TeachingAssignmentCreateManyClassInputEnvelope
    set?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    disconnect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    delete?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    update?: TeachingAssignmentUpdateWithWhereUniqueWithoutClassInput | TeachingAssignmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: TeachingAssignmentUpdateManyWithWhereWithoutClassInput | TeachingAssignmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
  }

  export type TeacherUncheckedUpdateManyWithoutAdvisingClassesNestedInput = {
    create?: XOR<TeacherCreateWithoutAdvisingClassesInput, TeacherUncheckedCreateWithoutAdvisingClassesInput> | TeacherCreateWithoutAdvisingClassesInput[] | TeacherUncheckedCreateWithoutAdvisingClassesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutAdvisingClassesInput | TeacherCreateOrConnectWithoutAdvisingClassesInput[]
    upsert?: TeacherUpsertWithWhereUniqueWithoutAdvisingClassesInput | TeacherUpsertWithWhereUniqueWithoutAdvisingClassesInput[]
    set?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    disconnect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    delete?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    update?: TeacherUpdateWithWhereUniqueWithoutAdvisingClassesInput | TeacherUpdateWithWhereUniqueWithoutAdvisingClassesInput[]
    updateMany?: TeacherUpdateManyWithWhereWithoutAdvisingClassesInput | TeacherUpdateManyWithWhereWithoutAdvisingClassesInput[]
    deleteMany?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutClassInput | StudentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutClassInput | StudentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutClassInput | StudentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type SubjectClassUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<SubjectClassCreateWithoutClassInput, SubjectClassUncheckedCreateWithoutClassInput> | SubjectClassCreateWithoutClassInput[] | SubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutClassInput | SubjectClassCreateOrConnectWithoutClassInput[]
    upsert?: SubjectClassUpsertWithWhereUniqueWithoutClassInput | SubjectClassUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: SubjectClassCreateManyClassInputEnvelope
    set?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    disconnect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    delete?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    update?: SubjectClassUpdateWithWhereUniqueWithoutClassInput | SubjectClassUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: SubjectClassUpdateManyWithWhereWithoutClassInput | SubjectClassUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: SubjectClassScalarWhereInput | SubjectClassScalarWhereInput[]
  }

  export type TeachingAssignmentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<TeachingAssignmentCreateWithoutClassInput, TeachingAssignmentUncheckedCreateWithoutClassInput> | TeachingAssignmentCreateWithoutClassInput[] | TeachingAssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutClassInput | TeachingAssignmentCreateOrConnectWithoutClassInput[]
    upsert?: TeachingAssignmentUpsertWithWhereUniqueWithoutClassInput | TeachingAssignmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: TeachingAssignmentCreateManyClassInputEnvelope
    set?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    disconnect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    delete?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    update?: TeachingAssignmentUpdateWithWhereUniqueWithoutClassInput | TeachingAssignmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: TeachingAssignmentUpdateManyWithWhereWithoutClassInput | TeachingAssignmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
  }

  export type BookCreateNestedManyWithoutSubjectInput = {
    create?: XOR<BookCreateWithoutSubjectInput, BookUncheckedCreateWithoutSubjectInput> | BookCreateWithoutSubjectInput[] | BookUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSubjectInput | BookCreateOrConnectWithoutSubjectInput[]
    createMany?: BookCreateManySubjectInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type SubjectClassCreateNestedManyWithoutSubjectInput = {
    create?: XOR<SubjectClassCreateWithoutSubjectInput, SubjectClassUncheckedCreateWithoutSubjectInput> | SubjectClassCreateWithoutSubjectInput[] | SubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutSubjectInput | SubjectClassCreateOrConnectWithoutSubjectInput[]
    createMany?: SubjectClassCreateManySubjectInputEnvelope
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
  }

  export type BookRegistrationCreateNestedManyWithoutSubjectInput = {
    create?: XOR<BookRegistrationCreateWithoutSubjectInput, BookRegistrationUncheckedCreateWithoutSubjectInput> | BookRegistrationCreateWithoutSubjectInput[] | BookRegistrationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutSubjectInput | BookRegistrationCreateOrConnectWithoutSubjectInput[]
    createMany?: BookRegistrationCreateManySubjectInputEnvelope
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
  }

  export type TeachingAssignmentCreateNestedManyWithoutSubjectInput = {
    create?: XOR<TeachingAssignmentCreateWithoutSubjectInput, TeachingAssignmentUncheckedCreateWithoutSubjectInput> | TeachingAssignmentCreateWithoutSubjectInput[] | TeachingAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutSubjectInput | TeachingAssignmentCreateOrConnectWithoutSubjectInput[]
    createMany?: TeachingAssignmentCreateManySubjectInputEnvelope
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
  }

  export type SubjectGroupCreateNestedOneWithoutSubjectInput = {
    create?: XOR<SubjectGroupCreateWithoutSubjectInput, SubjectGroupUncheckedCreateWithoutSubjectInput>
    connectOrCreate?: SubjectGroupCreateOrConnectWithoutSubjectInput
    connect?: SubjectGroupWhereUniqueInput
  }

  export type BookUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<BookCreateWithoutSubjectInput, BookUncheckedCreateWithoutSubjectInput> | BookCreateWithoutSubjectInput[] | BookUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSubjectInput | BookCreateOrConnectWithoutSubjectInput[]
    createMany?: BookCreateManySubjectInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type SubjectClassUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<SubjectClassCreateWithoutSubjectInput, SubjectClassUncheckedCreateWithoutSubjectInput> | SubjectClassCreateWithoutSubjectInput[] | SubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutSubjectInput | SubjectClassCreateOrConnectWithoutSubjectInput[]
    createMany?: SubjectClassCreateManySubjectInputEnvelope
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
  }

  export type BookRegistrationUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<BookRegistrationCreateWithoutSubjectInput, BookRegistrationUncheckedCreateWithoutSubjectInput> | BookRegistrationCreateWithoutSubjectInput[] | BookRegistrationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutSubjectInput | BookRegistrationCreateOrConnectWithoutSubjectInput[]
    createMany?: BookRegistrationCreateManySubjectInputEnvelope
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
  }

  export type TeachingAssignmentUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<TeachingAssignmentCreateWithoutSubjectInput, TeachingAssignmentUncheckedCreateWithoutSubjectInput> | TeachingAssignmentCreateWithoutSubjectInput[] | TeachingAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutSubjectInput | TeachingAssignmentCreateOrConnectWithoutSubjectInput[]
    createMany?: TeachingAssignmentCreateManySubjectInputEnvelope
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BookUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<BookCreateWithoutSubjectInput, BookUncheckedCreateWithoutSubjectInput> | BookCreateWithoutSubjectInput[] | BookUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSubjectInput | BookCreateOrConnectWithoutSubjectInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSubjectInput | BookUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: BookCreateManySubjectInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSubjectInput | BookUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSubjectInput | BookUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type SubjectClassUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<SubjectClassCreateWithoutSubjectInput, SubjectClassUncheckedCreateWithoutSubjectInput> | SubjectClassCreateWithoutSubjectInput[] | SubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutSubjectInput | SubjectClassCreateOrConnectWithoutSubjectInput[]
    upsert?: SubjectClassUpsertWithWhereUniqueWithoutSubjectInput | SubjectClassUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: SubjectClassCreateManySubjectInputEnvelope
    set?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    disconnect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    delete?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    update?: SubjectClassUpdateWithWhereUniqueWithoutSubjectInput | SubjectClassUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: SubjectClassUpdateManyWithWhereWithoutSubjectInput | SubjectClassUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: SubjectClassScalarWhereInput | SubjectClassScalarWhereInput[]
  }

  export type BookRegistrationUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<BookRegistrationCreateWithoutSubjectInput, BookRegistrationUncheckedCreateWithoutSubjectInput> | BookRegistrationCreateWithoutSubjectInput[] | BookRegistrationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutSubjectInput | BookRegistrationCreateOrConnectWithoutSubjectInput[]
    upsert?: BookRegistrationUpsertWithWhereUniqueWithoutSubjectInput | BookRegistrationUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: BookRegistrationCreateManySubjectInputEnvelope
    set?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    disconnect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    delete?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    update?: BookRegistrationUpdateWithWhereUniqueWithoutSubjectInput | BookRegistrationUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: BookRegistrationUpdateManyWithWhereWithoutSubjectInput | BookRegistrationUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
  }

  export type TeachingAssignmentUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<TeachingAssignmentCreateWithoutSubjectInput, TeachingAssignmentUncheckedCreateWithoutSubjectInput> | TeachingAssignmentCreateWithoutSubjectInput[] | TeachingAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutSubjectInput | TeachingAssignmentCreateOrConnectWithoutSubjectInput[]
    upsert?: TeachingAssignmentUpsertWithWhereUniqueWithoutSubjectInput | TeachingAssignmentUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: TeachingAssignmentCreateManySubjectInputEnvelope
    set?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    disconnect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    delete?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    update?: TeachingAssignmentUpdateWithWhereUniqueWithoutSubjectInput | TeachingAssignmentUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: TeachingAssignmentUpdateManyWithWhereWithoutSubjectInput | TeachingAssignmentUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
  }

  export type SubjectGroupUpdateOneWithoutSubjectNestedInput = {
    create?: XOR<SubjectGroupCreateWithoutSubjectInput, SubjectGroupUncheckedCreateWithoutSubjectInput>
    connectOrCreate?: SubjectGroupCreateOrConnectWithoutSubjectInput
    upsert?: SubjectGroupUpsertWithoutSubjectInput
    disconnect?: SubjectGroupWhereInput | boolean
    delete?: SubjectGroupWhereInput | boolean
    connect?: SubjectGroupWhereUniqueInput
    update?: XOR<XOR<SubjectGroupUpdateToOneWithWhereWithoutSubjectInput, SubjectGroupUpdateWithoutSubjectInput>, SubjectGroupUncheckedUpdateWithoutSubjectInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<BookCreateWithoutSubjectInput, BookUncheckedCreateWithoutSubjectInput> | BookCreateWithoutSubjectInput[] | BookUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookCreateOrConnectWithoutSubjectInput | BookCreateOrConnectWithoutSubjectInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutSubjectInput | BookUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: BookCreateManySubjectInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutSubjectInput | BookUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: BookUpdateManyWithWhereWithoutSubjectInput | BookUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type SubjectClassUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<SubjectClassCreateWithoutSubjectInput, SubjectClassUncheckedCreateWithoutSubjectInput> | SubjectClassCreateWithoutSubjectInput[] | SubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectClassCreateOrConnectWithoutSubjectInput | SubjectClassCreateOrConnectWithoutSubjectInput[]
    upsert?: SubjectClassUpsertWithWhereUniqueWithoutSubjectInput | SubjectClassUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: SubjectClassCreateManySubjectInputEnvelope
    set?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    disconnect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    delete?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    connect?: SubjectClassWhereUniqueInput | SubjectClassWhereUniqueInput[]
    update?: SubjectClassUpdateWithWhereUniqueWithoutSubjectInput | SubjectClassUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: SubjectClassUpdateManyWithWhereWithoutSubjectInput | SubjectClassUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: SubjectClassScalarWhereInput | SubjectClassScalarWhereInput[]
  }

  export type BookRegistrationUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<BookRegistrationCreateWithoutSubjectInput, BookRegistrationUncheckedCreateWithoutSubjectInput> | BookRegistrationCreateWithoutSubjectInput[] | BookRegistrationUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutSubjectInput | BookRegistrationCreateOrConnectWithoutSubjectInput[]
    upsert?: BookRegistrationUpsertWithWhereUniqueWithoutSubjectInput | BookRegistrationUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: BookRegistrationCreateManySubjectInputEnvelope
    set?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    disconnect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    delete?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    update?: BookRegistrationUpdateWithWhereUniqueWithoutSubjectInput | BookRegistrationUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: BookRegistrationUpdateManyWithWhereWithoutSubjectInput | BookRegistrationUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
  }

  export type TeachingAssignmentUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<TeachingAssignmentCreateWithoutSubjectInput, TeachingAssignmentUncheckedCreateWithoutSubjectInput> | TeachingAssignmentCreateWithoutSubjectInput[] | TeachingAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeachingAssignmentCreateOrConnectWithoutSubjectInput | TeachingAssignmentCreateOrConnectWithoutSubjectInput[]
    upsert?: TeachingAssignmentUpsertWithWhereUniqueWithoutSubjectInput | TeachingAssignmentUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: TeachingAssignmentCreateManySubjectInputEnvelope
    set?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    disconnect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    delete?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    connect?: TeachingAssignmentWhereUniqueInput | TeachingAssignmentWhereUniqueInput[]
    update?: TeachingAssignmentUpdateWithWhereUniqueWithoutSubjectInput | TeachingAssignmentUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: TeachingAssignmentUpdateManyWithWhereWithoutSubjectInput | TeachingAssignmentUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
  }

  export type TeacherCreateNestedOneWithoutTeachingAssignmentsInput = {
    create?: XOR<TeacherCreateWithoutTeachingAssignmentsInput, TeacherUncheckedCreateWithoutTeachingAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutTeachingAssignmentsInput
    connect?: TeacherWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutTeachingAssignmentsInput = {
    create?: XOR<SubjectCreateWithoutTeachingAssignmentsInput, SubjectUncheckedCreateWithoutTeachingAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutTeachingAssignmentsInput
    connect?: SubjectWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutTeachingAssignmentsInput = {
    create?: XOR<ClassCreateWithoutTeachingAssignmentsInput, ClassUncheckedCreateWithoutTeachingAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutTeachingAssignmentsInput
    connect?: ClassWhereUniqueInput
  }

  export type TeacherUpdateOneRequiredWithoutTeachingAssignmentsNestedInput = {
    create?: XOR<TeacherCreateWithoutTeachingAssignmentsInput, TeacherUncheckedCreateWithoutTeachingAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutTeachingAssignmentsInput
    upsert?: TeacherUpsertWithoutTeachingAssignmentsInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutTeachingAssignmentsInput, TeacherUpdateWithoutTeachingAssignmentsInput>, TeacherUncheckedUpdateWithoutTeachingAssignmentsInput>
  }

  export type SubjectUpdateOneRequiredWithoutTeachingAssignmentsNestedInput = {
    create?: XOR<SubjectCreateWithoutTeachingAssignmentsInput, SubjectUncheckedCreateWithoutTeachingAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutTeachingAssignmentsInput
    upsert?: SubjectUpsertWithoutTeachingAssignmentsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutTeachingAssignmentsInput, SubjectUpdateWithoutTeachingAssignmentsInput>, SubjectUncheckedUpdateWithoutTeachingAssignmentsInput>
  }

  export type ClassUpdateOneRequiredWithoutTeachingAssignmentsNestedInput = {
    create?: XOR<ClassCreateWithoutTeachingAssignmentsInput, ClassUncheckedCreateWithoutTeachingAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutTeachingAssignmentsInput
    upsert?: ClassUpsertWithoutTeachingAssignmentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutTeachingAssignmentsInput, ClassUpdateWithoutTeachingAssignmentsInput>, ClassUncheckedUpdateWithoutTeachingAssignmentsInput>
  }

  export type ClassCreateNestedOneWithoutStudentsInput = {
    create?: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutStudentsInput
    connect?: ClassWhereUniqueInput
  }

  export type BookRegistrationCreateNestedManyWithoutStudentInput = {
    create?: XOR<BookRegistrationCreateWithoutStudentInput, BookRegistrationUncheckedCreateWithoutStudentInput> | BookRegistrationCreateWithoutStudentInput[] | BookRegistrationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutStudentInput | BookRegistrationCreateOrConnectWithoutStudentInput[]
    createMany?: BookRegistrationCreateManyStudentInputEnvelope
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
  }

  export type BookRegistrationUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<BookRegistrationCreateWithoutStudentInput, BookRegistrationUncheckedCreateWithoutStudentInput> | BookRegistrationCreateWithoutStudentInput[] | BookRegistrationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutStudentInput | BookRegistrationCreateOrConnectWithoutStudentInput[]
    createMany?: BookRegistrationCreateManyStudentInputEnvelope
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
  }

  export type ClassUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutStudentsInput
    upsert?: ClassUpsertWithoutStudentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutStudentsInput, ClassUpdateWithoutStudentsInput>, ClassUncheckedUpdateWithoutStudentsInput>
  }

  export type BookRegistrationUpdateManyWithoutStudentNestedInput = {
    create?: XOR<BookRegistrationCreateWithoutStudentInput, BookRegistrationUncheckedCreateWithoutStudentInput> | BookRegistrationCreateWithoutStudentInput[] | BookRegistrationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutStudentInput | BookRegistrationCreateOrConnectWithoutStudentInput[]
    upsert?: BookRegistrationUpsertWithWhereUniqueWithoutStudentInput | BookRegistrationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: BookRegistrationCreateManyStudentInputEnvelope
    set?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    disconnect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    delete?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    update?: BookRegistrationUpdateWithWhereUniqueWithoutStudentInput | BookRegistrationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: BookRegistrationUpdateManyWithWhereWithoutStudentInput | BookRegistrationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
  }

  export type BookRegistrationUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<BookRegistrationCreateWithoutStudentInput, BookRegistrationUncheckedCreateWithoutStudentInput> | BookRegistrationCreateWithoutStudentInput[] | BookRegistrationUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutStudentInput | BookRegistrationCreateOrConnectWithoutStudentInput[]
    upsert?: BookRegistrationUpsertWithWhereUniqueWithoutStudentInput | BookRegistrationUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: BookRegistrationCreateManyStudentInputEnvelope
    set?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    disconnect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    delete?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    update?: BookRegistrationUpdateWithWhereUniqueWithoutStudentInput | BookRegistrationUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: BookRegistrationUpdateManyWithWhereWithoutStudentInput | BookRegistrationUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
  }

  export type SubjectCreateNestedOneWithoutBooksInput = {
    create?: XOR<SubjectCreateWithoutBooksInput, SubjectUncheckedCreateWithoutBooksInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutBooksInput
    connect?: SubjectWhereUniqueInput
  }

  export type BookRegistrationCreateNestedManyWithoutBookInput = {
    create?: XOR<BookRegistrationCreateWithoutBookInput, BookRegistrationUncheckedCreateWithoutBookInput> | BookRegistrationCreateWithoutBookInput[] | BookRegistrationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutBookInput | BookRegistrationCreateOrConnectWithoutBookInput[]
    createMany?: BookRegistrationCreateManyBookInputEnvelope
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
  }

  export type AcademicYearCreateNestedOneWithoutBookInput = {
    create?: XOR<AcademicYearCreateWithoutBookInput, AcademicYearUncheckedCreateWithoutBookInput>
    connectOrCreate?: AcademicYearCreateOrConnectWithoutBookInput
    connect?: AcademicYearWhereUniqueInput
  }

  export type BookRegistrationUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<BookRegistrationCreateWithoutBookInput, BookRegistrationUncheckedCreateWithoutBookInput> | BookRegistrationCreateWithoutBookInput[] | BookRegistrationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutBookInput | BookRegistrationCreateOrConnectWithoutBookInput[]
    createMany?: BookRegistrationCreateManyBookInputEnvelope
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
  }

  export type SubjectUpdateOneRequiredWithoutBooksNestedInput = {
    create?: XOR<SubjectCreateWithoutBooksInput, SubjectUncheckedCreateWithoutBooksInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutBooksInput
    upsert?: SubjectUpsertWithoutBooksInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutBooksInput, SubjectUpdateWithoutBooksInput>, SubjectUncheckedUpdateWithoutBooksInput>
  }

  export type BookRegistrationUpdateManyWithoutBookNestedInput = {
    create?: XOR<BookRegistrationCreateWithoutBookInput, BookRegistrationUncheckedCreateWithoutBookInput> | BookRegistrationCreateWithoutBookInput[] | BookRegistrationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutBookInput | BookRegistrationCreateOrConnectWithoutBookInput[]
    upsert?: BookRegistrationUpsertWithWhereUniqueWithoutBookInput | BookRegistrationUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: BookRegistrationCreateManyBookInputEnvelope
    set?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    disconnect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    delete?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    update?: BookRegistrationUpdateWithWhereUniqueWithoutBookInput | BookRegistrationUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: BookRegistrationUpdateManyWithWhereWithoutBookInput | BookRegistrationUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
  }

  export type AcademicYearUpdateOneRequiredWithoutBookNestedInput = {
    create?: XOR<AcademicYearCreateWithoutBookInput, AcademicYearUncheckedCreateWithoutBookInput>
    connectOrCreate?: AcademicYearCreateOrConnectWithoutBookInput
    upsert?: AcademicYearUpsertWithoutBookInput
    connect?: AcademicYearWhereUniqueInput
    update?: XOR<XOR<AcademicYearUpdateToOneWithWhereWithoutBookInput, AcademicYearUpdateWithoutBookInput>, AcademicYearUncheckedUpdateWithoutBookInput>
  }

  export type BookRegistrationUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<BookRegistrationCreateWithoutBookInput, BookRegistrationUncheckedCreateWithoutBookInput> | BookRegistrationCreateWithoutBookInput[] | BookRegistrationUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookRegistrationCreateOrConnectWithoutBookInput | BookRegistrationCreateOrConnectWithoutBookInput[]
    upsert?: BookRegistrationUpsertWithWhereUniqueWithoutBookInput | BookRegistrationUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: BookRegistrationCreateManyBookInputEnvelope
    set?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    disconnect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    delete?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    connect?: BookRegistrationWhereUniqueInput | BookRegistrationWhereUniqueInput[]
    update?: BookRegistrationUpdateWithWhereUniqueWithoutBookInput | BookRegistrationUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: BookRegistrationUpdateManyWithWhereWithoutBookInput | BookRegistrationUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<StudentCreateWithoutRegistrationsInput, StudentUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutRegistrationsInput
    connect?: StudentWhereUniqueInput
  }

  export type BookCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<BookCreateWithoutRegistrationsInput, BookUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: BookCreateOrConnectWithoutRegistrationsInput
    connect?: BookWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutRegistrationsInput = {
    create?: XOR<SubjectCreateWithoutRegistrationsInput, SubjectUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutRegistrationsInput
    connect?: SubjectWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<StudentCreateWithoutRegistrationsInput, StudentUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutRegistrationsInput
    upsert?: StudentUpsertWithoutRegistrationsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutRegistrationsInput, StudentUpdateWithoutRegistrationsInput>, StudentUncheckedUpdateWithoutRegistrationsInput>
  }

  export type BookUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<BookCreateWithoutRegistrationsInput, BookUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: BookCreateOrConnectWithoutRegistrationsInput
    upsert?: BookUpsertWithoutRegistrationsInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutRegistrationsInput, BookUpdateWithoutRegistrationsInput>, BookUncheckedUpdateWithoutRegistrationsInput>
  }

  export type SubjectUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: XOR<SubjectCreateWithoutRegistrationsInput, SubjectUncheckedCreateWithoutRegistrationsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutRegistrationsInput
    upsert?: SubjectUpsertWithoutRegistrationsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutRegistrationsInput, SubjectUpdateWithoutRegistrationsInput>, SubjectUncheckedUpdateWithoutRegistrationsInput>
  }

  export type SubjectCreateNestedOneWithoutSubjectClassesInput = {
    create?: XOR<SubjectCreateWithoutSubjectClassesInput, SubjectUncheckedCreateWithoutSubjectClassesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutSubjectClassesInput
    connect?: SubjectWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutSubjectClassesInput = {
    create?: XOR<ClassCreateWithoutSubjectClassesInput, ClassUncheckedCreateWithoutSubjectClassesInput>
    connectOrCreate?: ClassCreateOrConnectWithoutSubjectClassesInput
    connect?: ClassWhereUniqueInput
  }

  export type SubjectUpdateOneRequiredWithoutSubjectClassesNestedInput = {
    create?: XOR<SubjectCreateWithoutSubjectClassesInput, SubjectUncheckedCreateWithoutSubjectClassesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutSubjectClassesInput
    upsert?: SubjectUpsertWithoutSubjectClassesInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutSubjectClassesInput, SubjectUpdateWithoutSubjectClassesInput>, SubjectUncheckedUpdateWithoutSubjectClassesInput>
  }

  export type ClassUpdateOneRequiredWithoutSubjectClassesNestedInput = {
    create?: XOR<ClassCreateWithoutSubjectClassesInput, ClassUncheckedCreateWithoutSubjectClassesInput>
    connectOrCreate?: ClassCreateOrConnectWithoutSubjectClassesInput
    upsert?: ClassUpsertWithoutSubjectClassesInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutSubjectClassesInput, ClassUpdateWithoutSubjectClassesInput>, ClassUncheckedUpdateWithoutSubjectClassesInput>
  }

  export type BookCreateNestedManyWithoutAcademicYearInput = {
    create?: XOR<BookCreateWithoutAcademicYearInput, BookUncheckedCreateWithoutAcademicYearInput> | BookCreateWithoutAcademicYearInput[] | BookUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: BookCreateOrConnectWithoutAcademicYearInput | BookCreateOrConnectWithoutAcademicYearInput[]
    createMany?: BookCreateManyAcademicYearInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BookUncheckedCreateNestedManyWithoutAcademicYearInput = {
    create?: XOR<BookCreateWithoutAcademicYearInput, BookUncheckedCreateWithoutAcademicYearInput> | BookCreateWithoutAcademicYearInput[] | BookUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: BookCreateOrConnectWithoutAcademicYearInput | BookCreateOrConnectWithoutAcademicYearInput[]
    createMany?: BookCreateManyAcademicYearInputEnvelope
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type BookUpdateManyWithoutAcademicYearNestedInput = {
    create?: XOR<BookCreateWithoutAcademicYearInput, BookUncheckedCreateWithoutAcademicYearInput> | BookCreateWithoutAcademicYearInput[] | BookUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: BookCreateOrConnectWithoutAcademicYearInput | BookCreateOrConnectWithoutAcademicYearInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutAcademicYearInput | BookUpsertWithWhereUniqueWithoutAcademicYearInput[]
    createMany?: BookCreateManyAcademicYearInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutAcademicYearInput | BookUpdateWithWhereUniqueWithoutAcademicYearInput[]
    updateMany?: BookUpdateManyWithWhereWithoutAcademicYearInput | BookUpdateManyWithWhereWithoutAcademicYearInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type BookUncheckedUpdateManyWithoutAcademicYearNestedInput = {
    create?: XOR<BookCreateWithoutAcademicYearInput, BookUncheckedCreateWithoutAcademicYearInput> | BookCreateWithoutAcademicYearInput[] | BookUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: BookCreateOrConnectWithoutAcademicYearInput | BookCreateOrConnectWithoutAcademicYearInput[]
    upsert?: BookUpsertWithWhereUniqueWithoutAcademicYearInput | BookUpsertWithWhereUniqueWithoutAcademicYearInput[]
    createMany?: BookCreateManyAcademicYearInputEnvelope
    set?: BookWhereUniqueInput | BookWhereUniqueInput[]
    disconnect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    delete?: BookWhereUniqueInput | BookWhereUniqueInput[]
    connect?: BookWhereUniqueInput | BookWhereUniqueInput[]
    update?: BookUpdateWithWhereUniqueWithoutAcademicYearInput | BookUpdateWithWhereUniqueWithoutAcademicYearInput[]
    updateMany?: BookUpdateManyWithWhereWithoutAcademicYearInput | BookUpdateManyWithWhereWithoutAcademicYearInput[]
    deleteMany?: BookScalarWhereInput | BookScalarWhereInput[]
  }

  export type SubjectCreateNestedManyWithoutSubjectGroupInput = {
    create?: XOR<SubjectCreateWithoutSubjectGroupInput, SubjectUncheckedCreateWithoutSubjectGroupInput> | SubjectCreateWithoutSubjectGroupInput[] | SubjectUncheckedCreateWithoutSubjectGroupInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutSubjectGroupInput | SubjectCreateOrConnectWithoutSubjectGroupInput[]
    createMany?: SubjectCreateManySubjectGroupInputEnvelope
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type TeacherCreateNestedOneWithoutSubjectGroupInput = {
    create?: XOR<TeacherCreateWithoutSubjectGroupInput, TeacherUncheckedCreateWithoutSubjectGroupInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectGroupInput
    connect?: TeacherWhereUniqueInput
  }

  export type SubjectUncheckedCreateNestedManyWithoutSubjectGroupInput = {
    create?: XOR<SubjectCreateWithoutSubjectGroupInput, SubjectUncheckedCreateWithoutSubjectGroupInput> | SubjectCreateWithoutSubjectGroupInput[] | SubjectUncheckedCreateWithoutSubjectGroupInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutSubjectGroupInput | SubjectCreateOrConnectWithoutSubjectGroupInput[]
    createMany?: SubjectCreateManySubjectGroupInputEnvelope
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type SubjectUpdateManyWithoutSubjectGroupNestedInput = {
    create?: XOR<SubjectCreateWithoutSubjectGroupInput, SubjectUncheckedCreateWithoutSubjectGroupInput> | SubjectCreateWithoutSubjectGroupInput[] | SubjectUncheckedCreateWithoutSubjectGroupInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutSubjectGroupInput | SubjectCreateOrConnectWithoutSubjectGroupInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutSubjectGroupInput | SubjectUpsertWithWhereUniqueWithoutSubjectGroupInput[]
    createMany?: SubjectCreateManySubjectGroupInputEnvelope
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutSubjectGroupInput | SubjectUpdateWithWhereUniqueWithoutSubjectGroupInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutSubjectGroupInput | SubjectUpdateManyWithWhereWithoutSubjectGroupInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type TeacherUpdateOneRequiredWithoutSubjectGroupNestedInput = {
    create?: XOR<TeacherCreateWithoutSubjectGroupInput, TeacherUncheckedCreateWithoutSubjectGroupInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectGroupInput
    upsert?: TeacherUpsertWithoutSubjectGroupInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutSubjectGroupInput, TeacherUpdateWithoutSubjectGroupInput>, TeacherUncheckedUpdateWithoutSubjectGroupInput>
  }

  export type SubjectUncheckedUpdateManyWithoutSubjectGroupNestedInput = {
    create?: XOR<SubjectCreateWithoutSubjectGroupInput, SubjectUncheckedCreateWithoutSubjectGroupInput> | SubjectCreateWithoutSubjectGroupInput[] | SubjectUncheckedCreateWithoutSubjectGroupInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutSubjectGroupInput | SubjectCreateOrConnectWithoutSubjectGroupInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutSubjectGroupInput | SubjectUpsertWithWhereUniqueWithoutSubjectGroupInput[]
    createMany?: SubjectCreateManySubjectGroupInputEnvelope
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutSubjectGroupInput | SubjectUpdateWithWhereUniqueWithoutSubjectGroupInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutSubjectGroupInput | SubjectUpdateManyWithWhereWithoutSubjectGroupInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ClassCreateWithoutAdvisorsInput = {
    grade: string
    name: string
    students?: StudentCreateNestedManyWithoutClassInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutAdvisorsInput = {
    id?: number
    grade: string
    name: string
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutAdvisorsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutAdvisorsInput, ClassUncheckedCreateWithoutAdvisorsInput>
  }

  export type TeachingAssignmentCreateWithoutTeacherInput = {
    subject: SubjectCreateNestedOneWithoutTeachingAssignmentsInput
    class: ClassCreateNestedOneWithoutTeachingAssignmentsInput
  }

  export type TeachingAssignmentUncheckedCreateWithoutTeacherInput = {
    id?: number
    subject_id: number
    class_id: number
  }

  export type TeachingAssignmentCreateOrConnectWithoutTeacherInput = {
    where: TeachingAssignmentWhereUniqueInput
    create: XOR<TeachingAssignmentCreateWithoutTeacherInput, TeachingAssignmentUncheckedCreateWithoutTeacherInput>
  }

  export type TeachingAssignmentCreateManyTeacherInputEnvelope = {
    data: TeachingAssignmentCreateManyTeacherInput | TeachingAssignmentCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type SubjectGroupCreateWithoutTeacherInput = {
    name: string
    Subject?: SubjectCreateNestedManyWithoutSubjectGroupInput
  }

  export type SubjectGroupUncheckedCreateWithoutTeacherInput = {
    id?: number
    name: string
    Subject?: SubjectUncheckedCreateNestedManyWithoutSubjectGroupInput
  }

  export type SubjectGroupCreateOrConnectWithoutTeacherInput = {
    where: SubjectGroupWhereUniqueInput
    create: XOR<SubjectGroupCreateWithoutTeacherInput, SubjectGroupUncheckedCreateWithoutTeacherInput>
  }

  export type SubjectGroupCreateManyTeacherInputEnvelope = {
    data: SubjectGroupCreateManyTeacherInput | SubjectGroupCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithWhereUniqueWithoutAdvisorsInput = {
    where: ClassWhereUniqueInput
    update: XOR<ClassUpdateWithoutAdvisorsInput, ClassUncheckedUpdateWithoutAdvisorsInput>
    create: XOR<ClassCreateWithoutAdvisorsInput, ClassUncheckedCreateWithoutAdvisorsInput>
  }

  export type ClassUpdateWithWhereUniqueWithoutAdvisorsInput = {
    where: ClassWhereUniqueInput
    data: XOR<ClassUpdateWithoutAdvisorsInput, ClassUncheckedUpdateWithoutAdvisorsInput>
  }

  export type ClassUpdateManyWithWhereWithoutAdvisorsInput = {
    where: ClassScalarWhereInput
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutAdvisorsInput>
  }

  export type ClassScalarWhereInput = {
    AND?: ClassScalarWhereInput | ClassScalarWhereInput[]
    OR?: ClassScalarWhereInput[]
    NOT?: ClassScalarWhereInput | ClassScalarWhereInput[]
    id?: IntFilter<"Class"> | number
    grade?: StringFilter<"Class"> | string
    name?: StringFilter<"Class"> | string
  }

  export type TeachingAssignmentUpsertWithWhereUniqueWithoutTeacherInput = {
    where: TeachingAssignmentWhereUniqueInput
    update: XOR<TeachingAssignmentUpdateWithoutTeacherInput, TeachingAssignmentUncheckedUpdateWithoutTeacherInput>
    create: XOR<TeachingAssignmentCreateWithoutTeacherInput, TeachingAssignmentUncheckedCreateWithoutTeacherInput>
  }

  export type TeachingAssignmentUpdateWithWhereUniqueWithoutTeacherInput = {
    where: TeachingAssignmentWhereUniqueInput
    data: XOR<TeachingAssignmentUpdateWithoutTeacherInput, TeachingAssignmentUncheckedUpdateWithoutTeacherInput>
  }

  export type TeachingAssignmentUpdateManyWithWhereWithoutTeacherInput = {
    where: TeachingAssignmentScalarWhereInput
    data: XOR<TeachingAssignmentUpdateManyMutationInput, TeachingAssignmentUncheckedUpdateManyWithoutTeacherInput>
  }

  export type TeachingAssignmentScalarWhereInput = {
    AND?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
    OR?: TeachingAssignmentScalarWhereInput[]
    NOT?: TeachingAssignmentScalarWhereInput | TeachingAssignmentScalarWhereInput[]
    id?: IntFilter<"TeachingAssignment"> | number
    teacher_id?: IntFilter<"TeachingAssignment"> | number
    subject_id?: IntFilter<"TeachingAssignment"> | number
    class_id?: IntFilter<"TeachingAssignment"> | number
  }

  export type SubjectGroupUpsertWithWhereUniqueWithoutTeacherInput = {
    where: SubjectGroupWhereUniqueInput
    update: XOR<SubjectGroupUpdateWithoutTeacherInput, SubjectGroupUncheckedUpdateWithoutTeacherInput>
    create: XOR<SubjectGroupCreateWithoutTeacherInput, SubjectGroupUncheckedCreateWithoutTeacherInput>
  }

  export type SubjectGroupUpdateWithWhereUniqueWithoutTeacherInput = {
    where: SubjectGroupWhereUniqueInput
    data: XOR<SubjectGroupUpdateWithoutTeacherInput, SubjectGroupUncheckedUpdateWithoutTeacherInput>
  }

  export type SubjectGroupUpdateManyWithWhereWithoutTeacherInput = {
    where: SubjectGroupScalarWhereInput
    data: XOR<SubjectGroupUpdateManyMutationInput, SubjectGroupUncheckedUpdateManyWithoutTeacherInput>
  }

  export type SubjectGroupScalarWhereInput = {
    AND?: SubjectGroupScalarWhereInput | SubjectGroupScalarWhereInput[]
    OR?: SubjectGroupScalarWhereInput[]
    NOT?: SubjectGroupScalarWhereInput | SubjectGroupScalarWhereInput[]
    id?: IntFilter<"SubjectGroup"> | number
    name?: StringFilter<"SubjectGroup"> | string
    header_id?: IntFilter<"SubjectGroup"> | number
  }

  export type TeacherCreateWithoutAdvisingClassesInput = {
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutTeacherInput
    SubjectGroup?: SubjectGroupCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutAdvisingClassesInput = {
    id?: number
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutTeacherInput
    SubjectGroup?: SubjectGroupUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutAdvisingClassesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutAdvisingClassesInput, TeacherUncheckedCreateWithoutAdvisingClassesInput>
  }

  export type StudentCreateWithoutClassInput = {
    name: string
    stu_code: string
    password: string
    create_at?: Date | string
    update_at?: Date | string
    registrations?: BookRegistrationCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutClassInput = {
    id?: number
    name: string
    stu_code: string
    password: string
    create_at?: Date | string
    update_at?: Date | string
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutClassInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput>
  }

  export type StudentCreateManyClassInputEnvelope = {
    data: StudentCreateManyClassInput | StudentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type SubjectClassCreateWithoutClassInput = {
    subject: SubjectCreateNestedOneWithoutSubjectClassesInput
  }

  export type SubjectClassUncheckedCreateWithoutClassInput = {
    id?: number
    subject_id: number
  }

  export type SubjectClassCreateOrConnectWithoutClassInput = {
    where: SubjectClassWhereUniqueInput
    create: XOR<SubjectClassCreateWithoutClassInput, SubjectClassUncheckedCreateWithoutClassInput>
  }

  export type SubjectClassCreateManyClassInputEnvelope = {
    data: SubjectClassCreateManyClassInput | SubjectClassCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type TeachingAssignmentCreateWithoutClassInput = {
    teacher: TeacherCreateNestedOneWithoutTeachingAssignmentsInput
    subject: SubjectCreateNestedOneWithoutTeachingAssignmentsInput
  }

  export type TeachingAssignmentUncheckedCreateWithoutClassInput = {
    id?: number
    teacher_id: number
    subject_id: number
  }

  export type TeachingAssignmentCreateOrConnectWithoutClassInput = {
    where: TeachingAssignmentWhereUniqueInput
    create: XOR<TeachingAssignmentCreateWithoutClassInput, TeachingAssignmentUncheckedCreateWithoutClassInput>
  }

  export type TeachingAssignmentCreateManyClassInputEnvelope = {
    data: TeachingAssignmentCreateManyClassInput | TeachingAssignmentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type TeacherUpsertWithWhereUniqueWithoutAdvisingClassesInput = {
    where: TeacherWhereUniqueInput
    update: XOR<TeacherUpdateWithoutAdvisingClassesInput, TeacherUncheckedUpdateWithoutAdvisingClassesInput>
    create: XOR<TeacherCreateWithoutAdvisingClassesInput, TeacherUncheckedCreateWithoutAdvisingClassesInput>
  }

  export type TeacherUpdateWithWhereUniqueWithoutAdvisingClassesInput = {
    where: TeacherWhereUniqueInput
    data: XOR<TeacherUpdateWithoutAdvisingClassesInput, TeacherUncheckedUpdateWithoutAdvisingClassesInput>
  }

  export type TeacherUpdateManyWithWhereWithoutAdvisingClassesInput = {
    where: TeacherScalarWhereInput
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyWithoutAdvisingClassesInput>
  }

  export type TeacherScalarWhereInput = {
    AND?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
    OR?: TeacherScalarWhereInput[]
    NOT?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
    id?: IntFilter<"Teacher"> | number
    name?: StringFilter<"Teacher"> | string
    username?: StringFilter<"Teacher"> | string
    password?: StringFilter<"Teacher"> | string
    role?: StringFilter<"Teacher"> | string
    create_at?: DateTimeFilter<"Teacher"> | Date | string
    update_at?: DateTimeFilter<"Teacher"> | Date | string
  }

  export type StudentUpsertWithWhereUniqueWithoutClassInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutClassInput, StudentUncheckedUpdateWithoutClassInput>
    create: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutClassInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutClassInput, StudentUncheckedUpdateWithoutClassInput>
  }

  export type StudentUpdateManyWithWhereWithoutClassInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutClassInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    id?: IntFilter<"Student"> | number
    name?: StringFilter<"Student"> | string
    stu_code?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    class_id?: IntFilter<"Student"> | number
    create_at?: DateTimeFilter<"Student"> | Date | string
    update_at?: DateTimeFilter<"Student"> | Date | string
  }

  export type SubjectClassUpsertWithWhereUniqueWithoutClassInput = {
    where: SubjectClassWhereUniqueInput
    update: XOR<SubjectClassUpdateWithoutClassInput, SubjectClassUncheckedUpdateWithoutClassInput>
    create: XOR<SubjectClassCreateWithoutClassInput, SubjectClassUncheckedCreateWithoutClassInput>
  }

  export type SubjectClassUpdateWithWhereUniqueWithoutClassInput = {
    where: SubjectClassWhereUniqueInput
    data: XOR<SubjectClassUpdateWithoutClassInput, SubjectClassUncheckedUpdateWithoutClassInput>
  }

  export type SubjectClassUpdateManyWithWhereWithoutClassInput = {
    where: SubjectClassScalarWhereInput
    data: XOR<SubjectClassUpdateManyMutationInput, SubjectClassUncheckedUpdateManyWithoutClassInput>
  }

  export type SubjectClassScalarWhereInput = {
    AND?: SubjectClassScalarWhereInput | SubjectClassScalarWhereInput[]
    OR?: SubjectClassScalarWhereInput[]
    NOT?: SubjectClassScalarWhereInput | SubjectClassScalarWhereInput[]
    id?: IntFilter<"SubjectClass"> | number
    subject_id?: IntFilter<"SubjectClass"> | number
    class_id?: IntFilter<"SubjectClass"> | number
  }

  export type TeachingAssignmentUpsertWithWhereUniqueWithoutClassInput = {
    where: TeachingAssignmentWhereUniqueInput
    update: XOR<TeachingAssignmentUpdateWithoutClassInput, TeachingAssignmentUncheckedUpdateWithoutClassInput>
    create: XOR<TeachingAssignmentCreateWithoutClassInput, TeachingAssignmentUncheckedCreateWithoutClassInput>
  }

  export type TeachingAssignmentUpdateWithWhereUniqueWithoutClassInput = {
    where: TeachingAssignmentWhereUniqueInput
    data: XOR<TeachingAssignmentUpdateWithoutClassInput, TeachingAssignmentUncheckedUpdateWithoutClassInput>
  }

  export type TeachingAssignmentUpdateManyWithWhereWithoutClassInput = {
    where: TeachingAssignmentScalarWhereInput
    data: XOR<TeachingAssignmentUpdateManyMutationInput, TeachingAssignmentUncheckedUpdateManyWithoutClassInput>
  }

  export type BookCreateWithoutSubjectInput = {
    barcode: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    registrations?: BookRegistrationCreateNestedManyWithoutBookInput
    AcademicYear: AcademicYearCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutSubjectInput = {
    id?: number
    barcode: string
    name: string
    description?: string | null
    academic_year_id: number
    create_at?: Date | string
    update_at?: Date | string
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutSubjectInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutSubjectInput, BookUncheckedCreateWithoutSubjectInput>
  }

  export type BookCreateManySubjectInputEnvelope = {
    data: BookCreateManySubjectInput | BookCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type SubjectClassCreateWithoutSubjectInput = {
    class: ClassCreateNestedOneWithoutSubjectClassesInput
  }

  export type SubjectClassUncheckedCreateWithoutSubjectInput = {
    id?: number
    class_id: number
  }

  export type SubjectClassCreateOrConnectWithoutSubjectInput = {
    where: SubjectClassWhereUniqueInput
    create: XOR<SubjectClassCreateWithoutSubjectInput, SubjectClassUncheckedCreateWithoutSubjectInput>
  }

  export type SubjectClassCreateManySubjectInputEnvelope = {
    data: SubjectClassCreateManySubjectInput | SubjectClassCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type BookRegistrationCreateWithoutSubjectInput = {
    register_code?: string | null
    registered_at?: Date | string
    student: StudentCreateNestedOneWithoutRegistrationsInput
    book: BookCreateNestedOneWithoutRegistrationsInput
  }

  export type BookRegistrationUncheckedCreateWithoutSubjectInput = {
    id?: number
    student_id: number
    book_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type BookRegistrationCreateOrConnectWithoutSubjectInput = {
    where: BookRegistrationWhereUniqueInput
    create: XOR<BookRegistrationCreateWithoutSubjectInput, BookRegistrationUncheckedCreateWithoutSubjectInput>
  }

  export type BookRegistrationCreateManySubjectInputEnvelope = {
    data: BookRegistrationCreateManySubjectInput | BookRegistrationCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type TeachingAssignmentCreateWithoutSubjectInput = {
    teacher: TeacherCreateNestedOneWithoutTeachingAssignmentsInput
    class: ClassCreateNestedOneWithoutTeachingAssignmentsInput
  }

  export type TeachingAssignmentUncheckedCreateWithoutSubjectInput = {
    id?: number
    teacher_id: number
    class_id: number
  }

  export type TeachingAssignmentCreateOrConnectWithoutSubjectInput = {
    where: TeachingAssignmentWhereUniqueInput
    create: XOR<TeachingAssignmentCreateWithoutSubjectInput, TeachingAssignmentUncheckedCreateWithoutSubjectInput>
  }

  export type TeachingAssignmentCreateManySubjectInputEnvelope = {
    data: TeachingAssignmentCreateManySubjectInput | TeachingAssignmentCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type SubjectGroupCreateWithoutSubjectInput = {
    name: string
    Teacher: TeacherCreateNestedOneWithoutSubjectGroupInput
  }

  export type SubjectGroupUncheckedCreateWithoutSubjectInput = {
    id?: number
    name: string
    header_id: number
  }

  export type SubjectGroupCreateOrConnectWithoutSubjectInput = {
    where: SubjectGroupWhereUniqueInput
    create: XOR<SubjectGroupCreateWithoutSubjectInput, SubjectGroupUncheckedCreateWithoutSubjectInput>
  }

  export type BookUpsertWithWhereUniqueWithoutSubjectInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutSubjectInput, BookUncheckedUpdateWithoutSubjectInput>
    create: XOR<BookCreateWithoutSubjectInput, BookUncheckedCreateWithoutSubjectInput>
  }

  export type BookUpdateWithWhereUniqueWithoutSubjectInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutSubjectInput, BookUncheckedUpdateWithoutSubjectInput>
  }

  export type BookUpdateManyWithWhereWithoutSubjectInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutSubjectInput>
  }

  export type BookScalarWhereInput = {
    AND?: BookScalarWhereInput | BookScalarWhereInput[]
    OR?: BookScalarWhereInput[]
    NOT?: BookScalarWhereInput | BookScalarWhereInput[]
    id?: IntFilter<"Book"> | number
    barcode?: StringFilter<"Book"> | string
    name?: StringFilter<"Book"> | string
    description?: StringNullableFilter<"Book"> | string | null
    subject_id?: IntFilter<"Book"> | number
    academic_year_id?: IntFilter<"Book"> | number
    create_at?: DateTimeFilter<"Book"> | Date | string
    update_at?: DateTimeFilter<"Book"> | Date | string
  }

  export type SubjectClassUpsertWithWhereUniqueWithoutSubjectInput = {
    where: SubjectClassWhereUniqueInput
    update: XOR<SubjectClassUpdateWithoutSubjectInput, SubjectClassUncheckedUpdateWithoutSubjectInput>
    create: XOR<SubjectClassCreateWithoutSubjectInput, SubjectClassUncheckedCreateWithoutSubjectInput>
  }

  export type SubjectClassUpdateWithWhereUniqueWithoutSubjectInput = {
    where: SubjectClassWhereUniqueInput
    data: XOR<SubjectClassUpdateWithoutSubjectInput, SubjectClassUncheckedUpdateWithoutSubjectInput>
  }

  export type SubjectClassUpdateManyWithWhereWithoutSubjectInput = {
    where: SubjectClassScalarWhereInput
    data: XOR<SubjectClassUpdateManyMutationInput, SubjectClassUncheckedUpdateManyWithoutSubjectInput>
  }

  export type BookRegistrationUpsertWithWhereUniqueWithoutSubjectInput = {
    where: BookRegistrationWhereUniqueInput
    update: XOR<BookRegistrationUpdateWithoutSubjectInput, BookRegistrationUncheckedUpdateWithoutSubjectInput>
    create: XOR<BookRegistrationCreateWithoutSubjectInput, BookRegistrationUncheckedCreateWithoutSubjectInput>
  }

  export type BookRegistrationUpdateWithWhereUniqueWithoutSubjectInput = {
    where: BookRegistrationWhereUniqueInput
    data: XOR<BookRegistrationUpdateWithoutSubjectInput, BookRegistrationUncheckedUpdateWithoutSubjectInput>
  }

  export type BookRegistrationUpdateManyWithWhereWithoutSubjectInput = {
    where: BookRegistrationScalarWhereInput
    data: XOR<BookRegistrationUpdateManyMutationInput, BookRegistrationUncheckedUpdateManyWithoutSubjectInput>
  }

  export type BookRegistrationScalarWhereInput = {
    AND?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
    OR?: BookRegistrationScalarWhereInput[]
    NOT?: BookRegistrationScalarWhereInput | BookRegistrationScalarWhereInput[]
    id?: IntFilter<"BookRegistration"> | number
    student_id?: IntFilter<"BookRegistration"> | number
    book_id?: IntFilter<"BookRegistration"> | number
    subject_id?: IntFilter<"BookRegistration"> | number
    register_code?: StringNullableFilter<"BookRegistration"> | string | null
    registered_at?: DateTimeFilter<"BookRegistration"> | Date | string
  }

  export type TeachingAssignmentUpsertWithWhereUniqueWithoutSubjectInput = {
    where: TeachingAssignmentWhereUniqueInput
    update: XOR<TeachingAssignmentUpdateWithoutSubjectInput, TeachingAssignmentUncheckedUpdateWithoutSubjectInput>
    create: XOR<TeachingAssignmentCreateWithoutSubjectInput, TeachingAssignmentUncheckedCreateWithoutSubjectInput>
  }

  export type TeachingAssignmentUpdateWithWhereUniqueWithoutSubjectInput = {
    where: TeachingAssignmentWhereUniqueInput
    data: XOR<TeachingAssignmentUpdateWithoutSubjectInput, TeachingAssignmentUncheckedUpdateWithoutSubjectInput>
  }

  export type TeachingAssignmentUpdateManyWithWhereWithoutSubjectInput = {
    where: TeachingAssignmentScalarWhereInput
    data: XOR<TeachingAssignmentUpdateManyMutationInput, TeachingAssignmentUncheckedUpdateManyWithoutSubjectInput>
  }

  export type SubjectGroupUpsertWithoutSubjectInput = {
    update: XOR<SubjectGroupUpdateWithoutSubjectInput, SubjectGroupUncheckedUpdateWithoutSubjectInput>
    create: XOR<SubjectGroupCreateWithoutSubjectInput, SubjectGroupUncheckedCreateWithoutSubjectInput>
    where?: SubjectGroupWhereInput
  }

  export type SubjectGroupUpdateToOneWithWhereWithoutSubjectInput = {
    where?: SubjectGroupWhereInput
    data: XOR<SubjectGroupUpdateWithoutSubjectInput, SubjectGroupUncheckedUpdateWithoutSubjectInput>
  }

  export type SubjectGroupUpdateWithoutSubjectInput = {
    name?: StringFieldUpdateOperationsInput | string
    Teacher?: TeacherUpdateOneRequiredWithoutSubjectGroupNestedInput
  }

  export type SubjectGroupUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    header_id?: IntFieldUpdateOperationsInput | number
  }

  export type TeacherCreateWithoutTeachingAssignmentsInput = {
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    advisingClasses?: ClassCreateNestedManyWithoutAdvisorsInput
    SubjectGroup?: SubjectGroupCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutTeachingAssignmentsInput = {
    id?: number
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    advisingClasses?: ClassUncheckedCreateNestedManyWithoutAdvisorsInput
    SubjectGroup?: SubjectGroupUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutTeachingAssignmentsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutTeachingAssignmentsInput, TeacherUncheckedCreateWithoutTeachingAssignmentsInput>
  }

  export type SubjectCreateWithoutTeachingAssignmentsInput = {
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    books?: BookCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationCreateNestedManyWithoutSubjectInput
    SubjectGroup?: SubjectGroupCreateNestedOneWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutTeachingAssignmentsInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject_group_id?: number | null
    books?: BookUncheckedCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutTeachingAssignmentsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutTeachingAssignmentsInput, SubjectUncheckedCreateWithoutTeachingAssignmentsInput>
  }

  export type ClassCreateWithoutTeachingAssignmentsInput = {
    grade: string
    name: string
    advisors?: TeacherCreateNestedManyWithoutAdvisingClassesInput
    students?: StudentCreateNestedManyWithoutClassInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutTeachingAssignmentsInput = {
    id?: number
    grade: string
    name: string
    advisors?: TeacherUncheckedCreateNestedManyWithoutAdvisingClassesInput
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutTeachingAssignmentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutTeachingAssignmentsInput, ClassUncheckedCreateWithoutTeachingAssignmentsInput>
  }

  export type TeacherUpsertWithoutTeachingAssignmentsInput = {
    update: XOR<TeacherUpdateWithoutTeachingAssignmentsInput, TeacherUncheckedUpdateWithoutTeachingAssignmentsInput>
    create: XOR<TeacherCreateWithoutTeachingAssignmentsInput, TeacherUncheckedCreateWithoutTeachingAssignmentsInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutTeachingAssignmentsInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutTeachingAssignmentsInput, TeacherUncheckedUpdateWithoutTeachingAssignmentsInput>
  }

  export type TeacherUpdateWithoutTeachingAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    advisingClasses?: ClassUpdateManyWithoutAdvisorsNestedInput
    SubjectGroup?: SubjectGroupUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutTeachingAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    advisingClasses?: ClassUncheckedUpdateManyWithoutAdvisorsNestedInput
    SubjectGroup?: SubjectGroupUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type SubjectUpsertWithoutTeachingAssignmentsInput = {
    update: XOR<SubjectUpdateWithoutTeachingAssignmentsInput, SubjectUncheckedUpdateWithoutTeachingAssignmentsInput>
    create: XOR<SubjectCreateWithoutTeachingAssignmentsInput, SubjectUncheckedCreateWithoutTeachingAssignmentsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutTeachingAssignmentsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutTeachingAssignmentsInput, SubjectUncheckedUpdateWithoutTeachingAssignmentsInput>
  }

  export type SubjectUpdateWithoutTeachingAssignmentsInput = {
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUpdateManyWithoutSubjectNestedInput
    SubjectGroup?: SubjectGroupUpdateOneWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutTeachingAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    books?: BookUncheckedUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ClassUpsertWithoutTeachingAssignmentsInput = {
    update: XOR<ClassUpdateWithoutTeachingAssignmentsInput, ClassUncheckedUpdateWithoutTeachingAssignmentsInput>
    create: XOR<ClassCreateWithoutTeachingAssignmentsInput, ClassUncheckedCreateWithoutTeachingAssignmentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutTeachingAssignmentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutTeachingAssignmentsInput, ClassUncheckedUpdateWithoutTeachingAssignmentsInput>
  }

  export type ClassUpdateWithoutTeachingAssignmentsInput = {
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUpdateManyWithoutAdvisingClassesNestedInput
    students?: StudentUpdateManyWithoutClassNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutTeachingAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUncheckedUpdateManyWithoutAdvisingClassesNestedInput
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateWithoutStudentsInput = {
    grade: string
    name: string
    advisors?: TeacherCreateNestedManyWithoutAdvisingClassesInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutStudentsInput = {
    id?: number
    grade: string
    name: string
    advisors?: TeacherUncheckedCreateNestedManyWithoutAdvisingClassesInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutStudentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
  }

  export type BookRegistrationCreateWithoutStudentInput = {
    register_code?: string | null
    registered_at?: Date | string
    book: BookCreateNestedOneWithoutRegistrationsInput
    subject: SubjectCreateNestedOneWithoutRegistrationsInput
  }

  export type BookRegistrationUncheckedCreateWithoutStudentInput = {
    id?: number
    book_id: number
    subject_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type BookRegistrationCreateOrConnectWithoutStudentInput = {
    where: BookRegistrationWhereUniqueInput
    create: XOR<BookRegistrationCreateWithoutStudentInput, BookRegistrationUncheckedCreateWithoutStudentInput>
  }

  export type BookRegistrationCreateManyStudentInputEnvelope = {
    data: BookRegistrationCreateManyStudentInput | BookRegistrationCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithoutStudentsInput = {
    update: XOR<ClassUpdateWithoutStudentsInput, ClassUncheckedUpdateWithoutStudentsInput>
    create: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutStudentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutStudentsInput, ClassUncheckedUpdateWithoutStudentsInput>
  }

  export type ClassUpdateWithoutStudentsInput = {
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUpdateManyWithoutAdvisingClassesNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutStudentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUncheckedUpdateManyWithoutAdvisingClassesNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type BookRegistrationUpsertWithWhereUniqueWithoutStudentInput = {
    where: BookRegistrationWhereUniqueInput
    update: XOR<BookRegistrationUpdateWithoutStudentInput, BookRegistrationUncheckedUpdateWithoutStudentInput>
    create: XOR<BookRegistrationCreateWithoutStudentInput, BookRegistrationUncheckedCreateWithoutStudentInput>
  }

  export type BookRegistrationUpdateWithWhereUniqueWithoutStudentInput = {
    where: BookRegistrationWhereUniqueInput
    data: XOR<BookRegistrationUpdateWithoutStudentInput, BookRegistrationUncheckedUpdateWithoutStudentInput>
  }

  export type BookRegistrationUpdateManyWithWhereWithoutStudentInput = {
    where: BookRegistrationScalarWhereInput
    data: XOR<BookRegistrationUpdateManyMutationInput, BookRegistrationUncheckedUpdateManyWithoutStudentInput>
  }

  export type SubjectCreateWithoutBooksInput = {
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subjectClasses?: SubjectClassCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutSubjectInput
    SubjectGroup?: SubjectGroupCreateNestedOneWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutBooksInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject_group_id?: number | null
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutBooksInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutBooksInput, SubjectUncheckedCreateWithoutBooksInput>
  }

  export type BookRegistrationCreateWithoutBookInput = {
    register_code?: string | null
    registered_at?: Date | string
    student: StudentCreateNestedOneWithoutRegistrationsInput
    subject: SubjectCreateNestedOneWithoutRegistrationsInput
  }

  export type BookRegistrationUncheckedCreateWithoutBookInput = {
    id?: number
    student_id: number
    subject_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type BookRegistrationCreateOrConnectWithoutBookInput = {
    where: BookRegistrationWhereUniqueInput
    create: XOR<BookRegistrationCreateWithoutBookInput, BookRegistrationUncheckedCreateWithoutBookInput>
  }

  export type BookRegistrationCreateManyBookInputEnvelope = {
    data: BookRegistrationCreateManyBookInput | BookRegistrationCreateManyBookInput[]
    skipDuplicates?: boolean
  }

  export type AcademicYearCreateWithoutBookInput = {
    year: string
    is_now?: boolean
    create_at?: Date | string
    update_at?: Date | string
  }

  export type AcademicYearUncheckedCreateWithoutBookInput = {
    id?: number
    year: string
    is_now?: boolean
    create_at?: Date | string
    update_at?: Date | string
  }

  export type AcademicYearCreateOrConnectWithoutBookInput = {
    where: AcademicYearWhereUniqueInput
    create: XOR<AcademicYearCreateWithoutBookInput, AcademicYearUncheckedCreateWithoutBookInput>
  }

  export type SubjectUpsertWithoutBooksInput = {
    update: XOR<SubjectUpdateWithoutBooksInput, SubjectUncheckedUpdateWithoutBooksInput>
    create: XOR<SubjectCreateWithoutBooksInput, SubjectUncheckedCreateWithoutBooksInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutBooksInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutBooksInput, SubjectUncheckedUpdateWithoutBooksInput>
  }

  export type SubjectUpdateWithoutBooksInput = {
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectClasses?: SubjectClassUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutSubjectNestedInput
    SubjectGroup?: SubjectGroupUpdateOneWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUncheckedUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type BookRegistrationUpsertWithWhereUniqueWithoutBookInput = {
    where: BookRegistrationWhereUniqueInput
    update: XOR<BookRegistrationUpdateWithoutBookInput, BookRegistrationUncheckedUpdateWithoutBookInput>
    create: XOR<BookRegistrationCreateWithoutBookInput, BookRegistrationUncheckedCreateWithoutBookInput>
  }

  export type BookRegistrationUpdateWithWhereUniqueWithoutBookInput = {
    where: BookRegistrationWhereUniqueInput
    data: XOR<BookRegistrationUpdateWithoutBookInput, BookRegistrationUncheckedUpdateWithoutBookInput>
  }

  export type BookRegistrationUpdateManyWithWhereWithoutBookInput = {
    where: BookRegistrationScalarWhereInput
    data: XOR<BookRegistrationUpdateManyMutationInput, BookRegistrationUncheckedUpdateManyWithoutBookInput>
  }

  export type AcademicYearUpsertWithoutBookInput = {
    update: XOR<AcademicYearUpdateWithoutBookInput, AcademicYearUncheckedUpdateWithoutBookInput>
    create: XOR<AcademicYearCreateWithoutBookInput, AcademicYearUncheckedCreateWithoutBookInput>
    where?: AcademicYearWhereInput
  }

  export type AcademicYearUpdateToOneWithWhereWithoutBookInput = {
    where?: AcademicYearWhereInput
    data: XOR<AcademicYearUpdateWithoutBookInput, AcademicYearUncheckedUpdateWithoutBookInput>
  }

  export type AcademicYearUpdateWithoutBookInput = {
    year?: StringFieldUpdateOperationsInput | string
    is_now?: BoolFieldUpdateOperationsInput | boolean
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicYearUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: StringFieldUpdateOperationsInput | string
    is_now?: BoolFieldUpdateOperationsInput | boolean
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateWithoutRegistrationsInput = {
    name: string
    stu_code: string
    password: string
    create_at?: Date | string
    update_at?: Date | string
    class: ClassCreateNestedOneWithoutStudentsInput
  }

  export type StudentUncheckedCreateWithoutRegistrationsInput = {
    id?: number
    name: string
    stu_code: string
    password: string
    class_id: number
    create_at?: Date | string
    update_at?: Date | string
  }

  export type StudentCreateOrConnectWithoutRegistrationsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutRegistrationsInput, StudentUncheckedCreateWithoutRegistrationsInput>
  }

  export type BookCreateWithoutRegistrationsInput = {
    barcode: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject: SubjectCreateNestedOneWithoutBooksInput
    AcademicYear: AcademicYearCreateNestedOneWithoutBookInput
  }

  export type BookUncheckedCreateWithoutRegistrationsInput = {
    id?: number
    barcode: string
    name: string
    description?: string | null
    subject_id: number
    academic_year_id: number
    create_at?: Date | string
    update_at?: Date | string
  }

  export type BookCreateOrConnectWithoutRegistrationsInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutRegistrationsInput, BookUncheckedCreateWithoutRegistrationsInput>
  }

  export type SubjectCreateWithoutRegistrationsInput = {
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    books?: BookCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutSubjectInput
    SubjectGroup?: SubjectGroupCreateNestedOneWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutRegistrationsInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject_group_id?: number | null
    books?: BookUncheckedCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutRegistrationsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutRegistrationsInput, SubjectUncheckedCreateWithoutRegistrationsInput>
  }

  export type StudentUpsertWithoutRegistrationsInput = {
    update: XOR<StudentUpdateWithoutRegistrationsInput, StudentUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<StudentCreateWithoutRegistrationsInput, StudentUncheckedCreateWithoutRegistrationsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutRegistrationsInput, StudentUncheckedUpdateWithoutRegistrationsInput>
  }

  export type StudentUpdateWithoutRegistrationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutStudentsNestedInput
  }

  export type StudentUncheckedUpdateWithoutRegistrationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    class_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookUpsertWithoutRegistrationsInput = {
    update: XOR<BookUpdateWithoutRegistrationsInput, BookUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<BookCreateWithoutRegistrationsInput, BookUncheckedCreateWithoutRegistrationsInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutRegistrationsInput, BookUncheckedUpdateWithoutRegistrationsInput>
  }

  export type BookUpdateWithoutRegistrationsInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutBooksNestedInput
    AcademicYear?: AcademicYearUpdateOneRequiredWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutRegistrationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subject_id?: IntFieldUpdateOperationsInput | number
    academic_year_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUpsertWithoutRegistrationsInput = {
    update: XOR<SubjectUpdateWithoutRegistrationsInput, SubjectUncheckedUpdateWithoutRegistrationsInput>
    create: XOR<SubjectCreateWithoutRegistrationsInput, SubjectUncheckedCreateWithoutRegistrationsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutRegistrationsInput, SubjectUncheckedUpdateWithoutRegistrationsInput>
  }

  export type SubjectUpdateWithoutRegistrationsInput = {
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutSubjectNestedInput
    SubjectGroup?: SubjectGroupUpdateOneWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutRegistrationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    books?: BookUncheckedUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateWithoutSubjectClassesInput = {
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    books?: BookCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutSubjectInput
    SubjectGroup?: SubjectGroupCreateNestedOneWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutSubjectClassesInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject_group_id?: number | null
    books?: BookUncheckedCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutSubjectClassesInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutSubjectClassesInput, SubjectUncheckedCreateWithoutSubjectClassesInput>
  }

  export type ClassCreateWithoutSubjectClassesInput = {
    grade: string
    name: string
    advisors?: TeacherCreateNestedManyWithoutAdvisingClassesInput
    students?: StudentCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutSubjectClassesInput = {
    id?: number
    grade: string
    name: string
    advisors?: TeacherUncheckedCreateNestedManyWithoutAdvisingClassesInput
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutSubjectClassesInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutSubjectClassesInput, ClassUncheckedCreateWithoutSubjectClassesInput>
  }

  export type SubjectUpsertWithoutSubjectClassesInput = {
    update: XOR<SubjectUpdateWithoutSubjectClassesInput, SubjectUncheckedUpdateWithoutSubjectClassesInput>
    create: XOR<SubjectCreateWithoutSubjectClassesInput, SubjectUncheckedCreateWithoutSubjectClassesInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutSubjectClassesInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutSubjectClassesInput, SubjectUncheckedUpdateWithoutSubjectClassesInput>
  }

  export type SubjectUpdateWithoutSubjectClassesInput = {
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutSubjectNestedInput
    SubjectGroup?: SubjectGroupUpdateOneWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutSubjectClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject_group_id?: NullableIntFieldUpdateOperationsInput | number | null
    books?: BookUncheckedUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUncheckedUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ClassUpsertWithoutSubjectClassesInput = {
    update: XOR<ClassUpdateWithoutSubjectClassesInput, ClassUncheckedUpdateWithoutSubjectClassesInput>
    create: XOR<ClassCreateWithoutSubjectClassesInput, ClassUncheckedCreateWithoutSubjectClassesInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutSubjectClassesInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutSubjectClassesInput, ClassUncheckedUpdateWithoutSubjectClassesInput>
  }

  export type ClassUpdateWithoutSubjectClassesInput = {
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUpdateManyWithoutAdvisingClassesNestedInput
    students?: StudentUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutSubjectClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    advisors?: TeacherUncheckedUpdateManyWithoutAdvisingClassesNestedInput
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type BookCreateWithoutAcademicYearInput = {
    barcode: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    subject: SubjectCreateNestedOneWithoutBooksInput
    registrations?: BookRegistrationCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateWithoutAcademicYearInput = {
    id?: number
    barcode: string
    name: string
    description?: string | null
    subject_id: number
    create_at?: Date | string
    update_at?: Date | string
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookCreateOrConnectWithoutAcademicYearInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutAcademicYearInput, BookUncheckedCreateWithoutAcademicYearInput>
  }

  export type BookCreateManyAcademicYearInputEnvelope = {
    data: BookCreateManyAcademicYearInput | BookCreateManyAcademicYearInput[]
    skipDuplicates?: boolean
  }

  export type BookUpsertWithWhereUniqueWithoutAcademicYearInput = {
    where: BookWhereUniqueInput
    update: XOR<BookUpdateWithoutAcademicYearInput, BookUncheckedUpdateWithoutAcademicYearInput>
    create: XOR<BookCreateWithoutAcademicYearInput, BookUncheckedCreateWithoutAcademicYearInput>
  }

  export type BookUpdateWithWhereUniqueWithoutAcademicYearInput = {
    where: BookWhereUniqueInput
    data: XOR<BookUpdateWithoutAcademicYearInput, BookUncheckedUpdateWithoutAcademicYearInput>
  }

  export type BookUpdateManyWithWhereWithoutAcademicYearInput = {
    where: BookScalarWhereInput
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyWithoutAcademicYearInput>
  }

  export type SubjectCreateWithoutSubjectGroupInput = {
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    books?: BookCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutSubjectGroupInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
    books?: BookUncheckedCreateNestedManyWithoutSubjectInput
    subjectClasses?: SubjectClassUncheckedCreateNestedManyWithoutSubjectInput
    registrations?: BookRegistrationUncheckedCreateNestedManyWithoutSubjectInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutSubjectGroupInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutSubjectGroupInput, SubjectUncheckedCreateWithoutSubjectGroupInput>
  }

  export type SubjectCreateManySubjectGroupInputEnvelope = {
    data: SubjectCreateManySubjectGroupInput | SubjectCreateManySubjectGroupInput[]
    skipDuplicates?: boolean
  }

  export type TeacherCreateWithoutSubjectGroupInput = {
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    advisingClasses?: ClassCreateNestedManyWithoutAdvisorsInput
    teachingAssignments?: TeachingAssignmentCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutSubjectGroupInput = {
    id?: number
    name: string
    username: string
    password: string
    role?: string
    create_at?: Date | string
    update_at?: Date | string
    advisingClasses?: ClassUncheckedCreateNestedManyWithoutAdvisorsInput
    teachingAssignments?: TeachingAssignmentUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutSubjectGroupInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutSubjectGroupInput, TeacherUncheckedCreateWithoutSubjectGroupInput>
  }

  export type SubjectUpsertWithWhereUniqueWithoutSubjectGroupInput = {
    where: SubjectWhereUniqueInput
    update: XOR<SubjectUpdateWithoutSubjectGroupInput, SubjectUncheckedUpdateWithoutSubjectGroupInput>
    create: XOR<SubjectCreateWithoutSubjectGroupInput, SubjectUncheckedCreateWithoutSubjectGroupInput>
  }

  export type SubjectUpdateWithWhereUniqueWithoutSubjectGroupInput = {
    where: SubjectWhereUniqueInput
    data: XOR<SubjectUpdateWithoutSubjectGroupInput, SubjectUncheckedUpdateWithoutSubjectGroupInput>
  }

  export type SubjectUpdateManyWithWhereWithoutSubjectGroupInput = {
    where: SubjectScalarWhereInput
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyWithoutSubjectGroupInput>
  }

  export type SubjectScalarWhereInput = {
    AND?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    OR?: SubjectScalarWhereInput[]
    NOT?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    id?: IntFilter<"Subject"> | number
    code?: StringFilter<"Subject"> | string
    grade?: StringFilter<"Subject"> | string
    name?: StringFilter<"Subject"> | string
    description?: StringNullableFilter<"Subject"> | string | null
    create_at?: DateTimeFilter<"Subject"> | Date | string
    update_at?: DateTimeFilter<"Subject"> | Date | string
    subject_group_id?: IntNullableFilter<"Subject"> | number | null
  }

  export type TeacherUpsertWithoutSubjectGroupInput = {
    update: XOR<TeacherUpdateWithoutSubjectGroupInput, TeacherUncheckedUpdateWithoutSubjectGroupInput>
    create: XOR<TeacherCreateWithoutSubjectGroupInput, TeacherUncheckedCreateWithoutSubjectGroupInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutSubjectGroupInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutSubjectGroupInput, TeacherUncheckedUpdateWithoutSubjectGroupInput>
  }

  export type TeacherUpdateWithoutSubjectGroupInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    advisingClasses?: ClassUpdateManyWithoutAdvisorsNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutSubjectGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    advisingClasses?: ClassUncheckedUpdateManyWithoutAdvisorsNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeachingAssignmentCreateManyTeacherInput = {
    id?: number
    subject_id: number
    class_id: number
  }

  export type SubjectGroupCreateManyTeacherInput = {
    id?: number
    name: string
  }

  export type ClassUpdateWithoutAdvisorsInput = {
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentUpdateManyWithoutClassNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutAdvisorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutClassNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateManyWithoutAdvisorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TeachingAssignmentUpdateWithoutTeacherInput = {
    subject?: SubjectUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
    class?: ClassUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
  }

  export type TeachingAssignmentUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type TeachingAssignmentUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectGroupUpdateWithoutTeacherInput = {
    name?: StringFieldUpdateOperationsInput | string
    Subject?: SubjectUpdateManyWithoutSubjectGroupNestedInput
  }

  export type SubjectGroupUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    Subject?: SubjectUncheckedUpdateManyWithoutSubjectGroupNestedInput
  }

  export type SubjectGroupUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StudentCreateManyClassInput = {
    id?: number
    name: string
    stu_code: string
    password: string
    create_at?: Date | string
    update_at?: Date | string
  }

  export type SubjectClassCreateManyClassInput = {
    id?: number
    subject_id: number
  }

  export type TeachingAssignmentCreateManyClassInput = {
    id?: number
    teacher_id: number
    subject_id: number
  }

  export type TeacherUpdateWithoutAdvisingClassesInput = {
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutTeacherNestedInput
    SubjectGroup?: SubjectGroupUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutAdvisingClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutTeacherNestedInput
    SubjectGroup?: SubjectGroupUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateManyWithoutAdvisingClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUpdateWithoutClassInput = {
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: BookRegistrationUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: BookRegistrationUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    stu_code?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectClassUpdateWithoutClassInput = {
    subject?: SubjectUpdateOneRequiredWithoutSubjectClassesNestedInput
  }

  export type SubjectClassUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectClassUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
  }

  export type TeachingAssignmentUpdateWithoutClassInput = {
    teacher?: TeacherUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
  }

  export type TeachingAssignmentUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacher_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
  }

  export type TeachingAssignmentUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacher_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookCreateManySubjectInput = {
    id?: number
    barcode: string
    name: string
    description?: string | null
    academic_year_id: number
    create_at?: Date | string
    update_at?: Date | string
  }

  export type SubjectClassCreateManySubjectInput = {
    id?: number
    class_id: number
  }

  export type BookRegistrationCreateManySubjectInput = {
    id?: number
    student_id: number
    book_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type TeachingAssignmentCreateManySubjectInput = {
    id?: number
    teacher_id: number
    class_id: number
  }

  export type BookUpdateWithoutSubjectInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: BookRegistrationUpdateManyWithoutBookNestedInput
    AcademicYear?: AcademicYearUpdateOneRequiredWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    academic_year_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: BookRegistrationUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    academic_year_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectClassUpdateWithoutSubjectInput = {
    class?: ClassUpdateOneRequiredWithoutSubjectClassesNestedInput
  }

  export type SubjectClassUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectClassUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookRegistrationUpdateWithoutSubjectInput = {
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutRegistrationsNestedInput
    book?: BookUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type BookRegistrationUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookRegistrationUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeachingAssignmentUpdateWithoutSubjectInput = {
    teacher?: TeacherUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
    class?: ClassUpdateOneRequiredWithoutTeachingAssignmentsNestedInput
  }

  export type TeachingAssignmentUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacher_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type TeachingAssignmentUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacher_id?: IntFieldUpdateOperationsInput | number
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type BookRegistrationCreateManyStudentInput = {
    id?: number
    book_id: number
    subject_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type BookRegistrationUpdateWithoutStudentInput = {
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
    book?: BookUpdateOneRequiredWithoutRegistrationsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type BookRegistrationUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookRegistrationUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    book_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookRegistrationCreateManyBookInput = {
    id?: number
    student_id: number
    subject_id: number
    register_code?: string | null
    registered_at?: Date | string
  }

  export type BookRegistrationUpdateWithoutBookInput = {
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutRegistrationsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutRegistrationsNestedInput
  }

  export type BookRegistrationUncheckedUpdateWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookRegistrationUncheckedUpdateManyWithoutBookInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    subject_id?: IntFieldUpdateOperationsInput | number
    register_code?: NullableStringFieldUpdateOperationsInput | string | null
    registered_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookCreateManyAcademicYearInput = {
    id?: number
    barcode: string
    name: string
    description?: string | null
    subject_id: number
    create_at?: Date | string
    update_at?: Date | string
  }

  export type BookUpdateWithoutAcademicYearInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutBooksNestedInput
    registrations?: BookRegistrationUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateWithoutAcademicYearInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subject_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    registrations?: BookRegistrationUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateManyWithoutAcademicYearInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    subject_id?: IntFieldUpdateOperationsInput | number
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectCreateManySubjectGroupInput = {
    id?: number
    code: string
    grade: string
    name: string
    description?: string | null
    create_at?: Date | string
    update_at?: Date | string
  }

  export type SubjectUpdateWithoutSubjectGroupInput = {
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutSubjectGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookUncheckedUpdateManyWithoutSubjectNestedInput
    subjectClasses?: SubjectClassUncheckedUpdateManyWithoutSubjectNestedInput
    registrations?: BookRegistrationUncheckedUpdateManyWithoutSubjectNestedInput
    teachingAssignments?: TeachingAssignmentUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateManyWithoutSubjectGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    grade?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    create_at?: DateTimeFieldUpdateOperationsInput | Date | string
    update_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}