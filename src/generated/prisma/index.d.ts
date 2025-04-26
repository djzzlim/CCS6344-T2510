
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
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Officer
 * 
 */
export type Officer = $Result.DefaultSelection<Prisma.$OfficerPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Transfer
 * 
 */
export type Transfer = $Result.DefaultSelection<Prisma.$TransferPayload>
/**
 * Model Utilities
 * 
 */
export type Utilities = $Result.DefaultSelection<Prisma.$UtilitiesPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model AUDIT_LOGS
 * 
 */
export type AUDIT_LOGS = $Result.DefaultSelection<Prisma.$AUDIT_LOGSPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
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
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
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
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.officer`: Exposes CRUD operations for the **Officer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Officers
    * const officers = await prisma.officer.findMany()
    * ```
    */
  get officer(): Prisma.OfficerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transfer`: Exposes CRUD operations for the **Transfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transfers
    * const transfers = await prisma.transfer.findMany()
    * ```
    */
  get transfer(): Prisma.TransferDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.utilities`: Exposes CRUD operations for the **Utilities** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Utilities
    * const utilities = await prisma.utilities.findMany()
    * ```
    */
  get utilities(): Prisma.UtilitiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aUDIT_LOGS`: Exposes CRUD operations for the **AUDIT_LOGS** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AUDIT_LOGS
    * const aUDIT_LOGS = await prisma.aUDIT_LOGS.findMany()
    * ```
    */
  get aUDIT_LOGS(): Prisma.AUDIT_LOGSDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
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
    Customer: 'Customer',
    Officer: 'Officer',
    Admin: 'Admin',
    Account: 'Account',
    Transfer: 'Transfer',
    Utilities: 'Utilities',
    Payment: 'Payment',
    AUDIT_LOGS: 'AUDIT_LOGS'
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
      modelProps: "customer" | "officer" | "admin" | "account" | "transfer" | "utilities" | "payment" | "aUDIT_LOGS"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Officer: {
        payload: Prisma.$OfficerPayload<ExtArgs>
        fields: Prisma.OfficerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfficerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfficerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          findFirst: {
            args: Prisma.OfficerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfficerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          findMany: {
            args: Prisma.OfficerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>[]
          }
          create: {
            args: Prisma.OfficerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          createMany: {
            args: Prisma.OfficerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OfficerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          update: {
            args: Prisma.OfficerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          deleteMany: {
            args: Prisma.OfficerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfficerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OfficerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfficerPayload>
          }
          aggregate: {
            args: Prisma.OfficerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfficer>
          }
          groupBy: {
            args: Prisma.OfficerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfficerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfficerCountArgs<ExtArgs>
            result: $Utils.Optional<OfficerCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Transfer: {
        payload: Prisma.$TransferPayload<ExtArgs>
        fields: Prisma.TransferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          findFirst: {
            args: Prisma.TransferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          findMany: {
            args: Prisma.TransferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>[]
          }
          create: {
            args: Prisma.TransferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          createMany: {
            args: Prisma.TransferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TransferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          update: {
            args: Prisma.TransferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          deleteMany: {
            args: Prisma.TransferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferPayload>
          }
          aggregate: {
            args: Prisma.TransferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransfer>
          }
          groupBy: {
            args: Prisma.TransferGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransferGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransferCountArgs<ExtArgs>
            result: $Utils.Optional<TransferCountAggregateOutputType> | number
          }
        }
      }
      Utilities: {
        payload: Prisma.$UtilitiesPayload<ExtArgs>
        fields: Prisma.UtilitiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UtilitiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UtilitiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload>
          }
          findFirst: {
            args: Prisma.UtilitiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UtilitiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload>
          }
          findMany: {
            args: Prisma.UtilitiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload>[]
          }
          create: {
            args: Prisma.UtilitiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload>
          }
          createMany: {
            args: Prisma.UtilitiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UtilitiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload>
          }
          update: {
            args: Prisma.UtilitiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload>
          }
          deleteMany: {
            args: Prisma.UtilitiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UtilitiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UtilitiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilitiesPayload>
          }
          aggregate: {
            args: Prisma.UtilitiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUtilities>
          }
          groupBy: {
            args: Prisma.UtilitiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<UtilitiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.UtilitiesCountArgs<ExtArgs>
            result: $Utils.Optional<UtilitiesCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      AUDIT_LOGS: {
        payload: Prisma.$AUDIT_LOGSPayload<ExtArgs>
        fields: Prisma.AUDIT_LOGSFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AUDIT_LOGSFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AUDIT_LOGSFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload>
          }
          findFirst: {
            args: Prisma.AUDIT_LOGSFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AUDIT_LOGSFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload>
          }
          findMany: {
            args: Prisma.AUDIT_LOGSFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload>[]
          }
          create: {
            args: Prisma.AUDIT_LOGSCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload>
          }
          createMany: {
            args: Prisma.AUDIT_LOGSCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AUDIT_LOGSDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload>
          }
          update: {
            args: Prisma.AUDIT_LOGSUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload>
          }
          deleteMany: {
            args: Prisma.AUDIT_LOGSDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AUDIT_LOGSUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AUDIT_LOGSUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AUDIT_LOGSPayload>
          }
          aggregate: {
            args: Prisma.AUDIT_LOGSAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAUDIT_LOGS>
          }
          groupBy: {
            args: Prisma.AUDIT_LOGSGroupByArgs<ExtArgs>
            result: $Utils.Optional<AUDIT_LOGSGroupByOutputType>[]
          }
          count: {
            args: Prisma.AUDIT_LOGSCountArgs<ExtArgs>
            result: $Utils.Optional<AUDIT_LOGSCountAggregateOutputType> | number
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
    customer?: CustomerOmit
    officer?: OfficerOmit
    admin?: AdminOmit
    account?: AccountOmit
    transfer?: TransferOmit
    utilities?: UtilitiesOmit
    payment?: PaymentOmit
    aUDIT_LOGS?: AUDIT_LOGSOmit
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
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    accounts: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | CustomerCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    payments: number
    transfersFrom: number
    transfersTo: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | AccountCountOutputTypeCountPaymentsArgs
    transfersFrom?: boolean | AccountCountOutputTypeCountTransfersFromArgs
    transfersTo?: boolean | AccountCountOutputTypeCountTransfersToArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTransfersFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTransfersToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
  }


  /**
   * Count Type UtilitiesCountOutputType
   */

  export type UtilitiesCountOutputType = {
    payments: number
  }

  export type UtilitiesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | UtilitiesCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * UtilitiesCountOutputType without action
   */
  export type UtilitiesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilitiesCountOutputType
     */
    select?: UtilitiesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UtilitiesCountOutputType without action
   */
  export type UtilitiesCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    CustomerID: string | null
    FirstName: string | null
    LastName: string | null
    Email: string | null
    ContactNumber: string | null
    DateOfBirth: Date | null
    AddressLine1: string | null
    AddressLine2: string | null
    City: string | null
    State: string | null
    ZipCode: string | null
    PasswordHash: string | null
  }

  export type CustomerMaxAggregateOutputType = {
    CustomerID: string | null
    FirstName: string | null
    LastName: string | null
    Email: string | null
    ContactNumber: string | null
    DateOfBirth: Date | null
    AddressLine1: string | null
    AddressLine2: string | null
    City: string | null
    State: string | null
    ZipCode: string | null
    PasswordHash: string | null
  }

  export type CustomerCountAggregateOutputType = {
    CustomerID: number
    FirstName: number
    LastName: number
    Email: number
    ContactNumber: number
    DateOfBirth: number
    AddressLine1: number
    AddressLine2: number
    City: number
    State: number
    ZipCode: number
    PasswordHash: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    CustomerID?: true
    FirstName?: true
    LastName?: true
    Email?: true
    ContactNumber?: true
    DateOfBirth?: true
    AddressLine1?: true
    AddressLine2?: true
    City?: true
    State?: true
    ZipCode?: true
    PasswordHash?: true
  }

  export type CustomerMaxAggregateInputType = {
    CustomerID?: true
    FirstName?: true
    LastName?: true
    Email?: true
    ContactNumber?: true
    DateOfBirth?: true
    AddressLine1?: true
    AddressLine2?: true
    City?: true
    State?: true
    ZipCode?: true
    PasswordHash?: true
  }

  export type CustomerCountAggregateInputType = {
    CustomerID?: true
    FirstName?: true
    LastName?: true
    Email?: true
    ContactNumber?: true
    DateOfBirth?: true
    AddressLine1?: true
    AddressLine2?: true
    City?: true
    State?: true
    ZipCode?: true
    PasswordHash?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    CustomerID: string
    FirstName: string | null
    LastName: string | null
    Email: string | null
    ContactNumber: string | null
    DateOfBirth: Date | null
    AddressLine1: string | null
    AddressLine2: string | null
    City: string | null
    State: string | null
    ZipCode: string | null
    PasswordHash: string | null
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    CustomerID?: boolean
    FirstName?: boolean
    LastName?: boolean
    Email?: boolean
    ContactNumber?: boolean
    DateOfBirth?: boolean
    AddressLine1?: boolean
    AddressLine2?: boolean
    City?: boolean
    State?: boolean
    ZipCode?: boolean
    PasswordHash?: boolean
    accounts?: boolean | Customer$accountsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>



  export type CustomerSelectScalar = {
    CustomerID?: boolean
    FirstName?: boolean
    LastName?: boolean
    Email?: boolean
    ContactNumber?: boolean
    DateOfBirth?: boolean
    AddressLine1?: boolean
    AddressLine2?: boolean
    City?: boolean
    State?: boolean
    ZipCode?: boolean
    PasswordHash?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"CustomerID" | "FirstName" | "LastName" | "Email" | "ContactNumber" | "DateOfBirth" | "AddressLine1" | "AddressLine2" | "City" | "State" | "ZipCode" | "PasswordHash", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | Customer$accountsArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      CustomerID: string
      FirstName: string | null
      LastName: string | null
      Email: string | null
      ContactNumber: string | null
      DateOfBirth: Date | null
      AddressLine1: string | null
      AddressLine2: string | null
      City: string | null
      State: string | null
      ZipCode: string | null
      PasswordHash: string | null
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `CustomerID`
     * const customerWithCustomerIDOnly = await prisma.customer.findMany({ select: { CustomerID: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
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
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends Customer$accountsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly CustomerID: FieldRef<"Customer", 'String'>
    readonly FirstName: FieldRef<"Customer", 'String'>
    readonly LastName: FieldRef<"Customer", 'String'>
    readonly Email: FieldRef<"Customer", 'String'>
    readonly ContactNumber: FieldRef<"Customer", 'String'>
    readonly DateOfBirth: FieldRef<"Customer", 'DateTime'>
    readonly AddressLine1: FieldRef<"Customer", 'String'>
    readonly AddressLine2: FieldRef<"Customer", 'String'>
    readonly City: FieldRef<"Customer", 'String'>
    readonly State: FieldRef<"Customer", 'String'>
    readonly ZipCode: FieldRef<"Customer", 'String'>
    readonly PasswordHash: FieldRef<"Customer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data?: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.accounts
   */
  export type Customer$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Officer
   */

  export type AggregateOfficer = {
    _count: OfficerCountAggregateOutputType | null
    _min: OfficerMinAggregateOutputType | null
    _max: OfficerMaxAggregateOutputType | null
  }

  export type OfficerMinAggregateOutputType = {
    OfficerID: string | null
    Username: string | null
    LastName: string | null
    FirstName: string | null
    PasswordHash: string | null
  }

  export type OfficerMaxAggregateOutputType = {
    OfficerID: string | null
    Username: string | null
    LastName: string | null
    FirstName: string | null
    PasswordHash: string | null
  }

  export type OfficerCountAggregateOutputType = {
    OfficerID: number
    Username: number
    LastName: number
    FirstName: number
    PasswordHash: number
    _all: number
  }


  export type OfficerMinAggregateInputType = {
    OfficerID?: true
    Username?: true
    LastName?: true
    FirstName?: true
    PasswordHash?: true
  }

  export type OfficerMaxAggregateInputType = {
    OfficerID?: true
    Username?: true
    LastName?: true
    FirstName?: true
    PasswordHash?: true
  }

  export type OfficerCountAggregateInputType = {
    OfficerID?: true
    Username?: true
    LastName?: true
    FirstName?: true
    PasswordHash?: true
    _all?: true
  }

  export type OfficerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Officer to aggregate.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Officers
    **/
    _count?: true | OfficerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfficerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfficerMaxAggregateInputType
  }

  export type GetOfficerAggregateType<T extends OfficerAggregateArgs> = {
        [P in keyof T & keyof AggregateOfficer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfficer[P]>
      : GetScalarType<T[P], AggregateOfficer[P]>
  }




  export type OfficerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfficerWhereInput
    orderBy?: OfficerOrderByWithAggregationInput | OfficerOrderByWithAggregationInput[]
    by: OfficerScalarFieldEnum[] | OfficerScalarFieldEnum
    having?: OfficerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfficerCountAggregateInputType | true
    _min?: OfficerMinAggregateInputType
    _max?: OfficerMaxAggregateInputType
  }

  export type OfficerGroupByOutputType = {
    OfficerID: string
    Username: string | null
    LastName: string | null
    FirstName: string | null
    PasswordHash: string | null
    _count: OfficerCountAggregateOutputType | null
    _min: OfficerMinAggregateOutputType | null
    _max: OfficerMaxAggregateOutputType | null
  }

  type GetOfficerGroupByPayload<T extends OfficerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfficerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfficerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfficerGroupByOutputType[P]>
            : GetScalarType<T[P], OfficerGroupByOutputType[P]>
        }
      >
    >


  export type OfficerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    OfficerID?: boolean
    Username?: boolean
    LastName?: boolean
    FirstName?: boolean
    PasswordHash?: boolean
  }, ExtArgs["result"]["officer"]>



  export type OfficerSelectScalar = {
    OfficerID?: boolean
    Username?: boolean
    LastName?: boolean
    FirstName?: boolean
    PasswordHash?: boolean
  }

  export type OfficerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"OfficerID" | "Username" | "LastName" | "FirstName" | "PasswordHash", ExtArgs["result"]["officer"]>

  export type $OfficerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Officer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      OfficerID: string
      Username: string | null
      LastName: string | null
      FirstName: string | null
      PasswordHash: string | null
    }, ExtArgs["result"]["officer"]>
    composites: {}
  }

  type OfficerGetPayload<S extends boolean | null | undefined | OfficerDefaultArgs> = $Result.GetResult<Prisma.$OfficerPayload, S>

  type OfficerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfficerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfficerCountAggregateInputType | true
    }

  export interface OfficerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Officer'], meta: { name: 'Officer' } }
    /**
     * Find zero or one Officer that matches the filter.
     * @param {OfficerFindUniqueArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfficerFindUniqueArgs>(args: SelectSubset<T, OfficerFindUniqueArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Officer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfficerFindUniqueOrThrowArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfficerFindUniqueOrThrowArgs>(args: SelectSubset<T, OfficerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Officer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerFindFirstArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfficerFindFirstArgs>(args?: SelectSubset<T, OfficerFindFirstArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Officer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerFindFirstOrThrowArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfficerFindFirstOrThrowArgs>(args?: SelectSubset<T, OfficerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Officers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Officers
     * const officers = await prisma.officer.findMany()
     * 
     * // Get first 10 Officers
     * const officers = await prisma.officer.findMany({ take: 10 })
     * 
     * // Only select the `OfficerID`
     * const officerWithOfficerIDOnly = await prisma.officer.findMany({ select: { OfficerID: true } })
     * 
     */
    findMany<T extends OfficerFindManyArgs>(args?: SelectSubset<T, OfficerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Officer.
     * @param {OfficerCreateArgs} args - Arguments to create a Officer.
     * @example
     * // Create one Officer
     * const Officer = await prisma.officer.create({
     *   data: {
     *     // ... data to create a Officer
     *   }
     * })
     * 
     */
    create<T extends OfficerCreateArgs>(args: SelectSubset<T, OfficerCreateArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Officers.
     * @param {OfficerCreateManyArgs} args - Arguments to create many Officers.
     * @example
     * // Create many Officers
     * const officer = await prisma.officer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfficerCreateManyArgs>(args?: SelectSubset<T, OfficerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Officer.
     * @param {OfficerDeleteArgs} args - Arguments to delete one Officer.
     * @example
     * // Delete one Officer
     * const Officer = await prisma.officer.delete({
     *   where: {
     *     // ... filter to delete one Officer
     *   }
     * })
     * 
     */
    delete<T extends OfficerDeleteArgs>(args: SelectSubset<T, OfficerDeleteArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Officer.
     * @param {OfficerUpdateArgs} args - Arguments to update one Officer.
     * @example
     * // Update one Officer
     * const officer = await prisma.officer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfficerUpdateArgs>(args: SelectSubset<T, OfficerUpdateArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Officers.
     * @param {OfficerDeleteManyArgs} args - Arguments to filter Officers to delete.
     * @example
     * // Delete a few Officers
     * const { count } = await prisma.officer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfficerDeleteManyArgs>(args?: SelectSubset<T, OfficerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Officers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Officers
     * const officer = await prisma.officer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfficerUpdateManyArgs>(args: SelectSubset<T, OfficerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Officer.
     * @param {OfficerUpsertArgs} args - Arguments to update or create a Officer.
     * @example
     * // Update or create a Officer
     * const officer = await prisma.officer.upsert({
     *   create: {
     *     // ... data to create a Officer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Officer we want to update
     *   }
     * })
     */
    upsert<T extends OfficerUpsertArgs>(args: SelectSubset<T, OfficerUpsertArgs<ExtArgs>>): Prisma__OfficerClient<$Result.GetResult<Prisma.$OfficerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Officers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerCountArgs} args - Arguments to filter Officers to count.
     * @example
     * // Count the number of Officers
     * const count = await prisma.officer.count({
     *   where: {
     *     // ... the filter for the Officers we want to count
     *   }
     * })
    **/
    count<T extends OfficerCountArgs>(
      args?: Subset<T, OfficerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfficerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Officer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OfficerAggregateArgs>(args: Subset<T, OfficerAggregateArgs>): Prisma.PrismaPromise<GetOfficerAggregateType<T>>

    /**
     * Group by Officer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerGroupByArgs} args - Group by arguments.
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
      T extends OfficerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfficerGroupByArgs['orderBy'] }
        : { orderBy?: OfficerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OfficerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfficerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Officer model
   */
  readonly fields: OfficerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Officer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfficerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Officer model
   */
  interface OfficerFieldRefs {
    readonly OfficerID: FieldRef<"Officer", 'String'>
    readonly Username: FieldRef<"Officer", 'String'>
    readonly LastName: FieldRef<"Officer", 'String'>
    readonly FirstName: FieldRef<"Officer", 'String'>
    readonly PasswordHash: FieldRef<"Officer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Officer findUnique
   */
  export type OfficerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer findUniqueOrThrow
   */
  export type OfficerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer findFirst
   */
  export type OfficerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Officers.
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Officers.
     */
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * Officer findFirstOrThrow
   */
  export type OfficerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Filter, which Officer to fetch.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Officers.
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Officers.
     */
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * Officer findMany
   */
  export type OfficerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Filter, which Officers to fetch.
     */
    where?: OfficerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Officers to fetch.
     */
    orderBy?: OfficerOrderByWithRelationInput | OfficerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Officers.
     */
    cursor?: OfficerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Officers.
     */
    skip?: number
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * Officer create
   */
  export type OfficerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * The data needed to create a Officer.
     */
    data?: XOR<OfficerCreateInput, OfficerUncheckedCreateInput>
  }

  /**
   * Officer createMany
   */
  export type OfficerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Officers.
     */
    data: OfficerCreateManyInput | OfficerCreateManyInput[]
  }

  /**
   * Officer update
   */
  export type OfficerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * The data needed to update a Officer.
     */
    data: XOR<OfficerUpdateInput, OfficerUncheckedUpdateInput>
    /**
     * Choose, which Officer to update.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer updateMany
   */
  export type OfficerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Officers.
     */
    data: XOR<OfficerUpdateManyMutationInput, OfficerUncheckedUpdateManyInput>
    /**
     * Filter which Officers to update
     */
    where?: OfficerWhereInput
    /**
     * Limit how many Officers to update.
     */
    limit?: number
  }

  /**
   * Officer upsert
   */
  export type OfficerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * The filter to search for the Officer to update in case it exists.
     */
    where: OfficerWhereUniqueInput
    /**
     * In case the Officer found by the `where` argument doesn't exist, create a new Officer with this data.
     */
    create: XOR<OfficerCreateInput, OfficerUncheckedCreateInput>
    /**
     * In case the Officer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfficerUpdateInput, OfficerUncheckedUpdateInput>
  }

  /**
   * Officer delete
   */
  export type OfficerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
    /**
     * Filter which Officer to delete.
     */
    where: OfficerWhereUniqueInput
  }

  /**
   * Officer deleteMany
   */
  export type OfficerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Officers to delete
     */
    where?: OfficerWhereInput
    /**
     * Limit how many Officers to delete.
     */
    limit?: number
  }

  /**
   * Officer without action
   */
  export type OfficerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Officer
     */
    select?: OfficerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Officer
     */
    omit?: OfficerOmit<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    AdminID: string | null
    Username: string | null
    FirstName: string | null
    LastName: string | null
    PasswordHash: string | null
  }

  export type AdminMaxAggregateOutputType = {
    AdminID: string | null
    Username: string | null
    FirstName: string | null
    LastName: string | null
    PasswordHash: string | null
  }

  export type AdminCountAggregateOutputType = {
    AdminID: number
    Username: number
    FirstName: number
    LastName: number
    PasswordHash: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    AdminID?: true
    Username?: true
    FirstName?: true
    LastName?: true
    PasswordHash?: true
  }

  export type AdminMaxAggregateInputType = {
    AdminID?: true
    Username?: true
    FirstName?: true
    LastName?: true
    PasswordHash?: true
  }

  export type AdminCountAggregateInputType = {
    AdminID?: true
    Username?: true
    FirstName?: true
    LastName?: true
    PasswordHash?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    AdminID: string
    Username: string | null
    FirstName: string | null
    LastName: string | null
    PasswordHash: string | null
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AdminID?: boolean
    Username?: boolean
    FirstName?: boolean
    LastName?: boolean
    PasswordHash?: boolean
  }, ExtArgs["result"]["admin"]>



  export type AdminSelectScalar = {
    AdminID?: boolean
    Username?: boolean
    FirstName?: boolean
    LastName?: boolean
    PasswordHash?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"AdminID" | "Username" | "FirstName" | "LastName" | "PasswordHash", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      AdminID: string
      Username: string | null
      FirstName: string | null
      LastName: string | null
      PasswordHash: string | null
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `AdminID`
     * const adminWithAdminIDOnly = await prisma.admin.findMany({ select: { AdminID: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly AdminID: FieldRef<"Admin", 'String'>
    readonly Username: FieldRef<"Admin", 'String'>
    readonly FirstName: FieldRef<"Admin", 'String'>
    readonly LastName: FieldRef<"Admin", 'String'>
    readonly PasswordHash: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data?: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    Balance: Decimal | null
    MonthlyFee: Decimal | null
    DailyATMLimit: Decimal | null
    DailyPurchaseLimit: Decimal | null
  }

  export type AccountSumAggregateOutputType = {
    Balance: Decimal | null
    MonthlyFee: Decimal | null
    DailyATMLimit: Decimal | null
    DailyPurchaseLimit: Decimal | null
  }

  export type AccountMinAggregateOutputType = {
    AccountID: string | null
    CustomerID: string | null
    Status: string | null
    Balance: Decimal | null
    AccountType: string | null
    MonthlyFee: Decimal | null
    DailyATMLimit: Decimal | null
    DailyPurchaseLimit: Decimal | null
    OverdraftProtection: boolean | null
  }

  export type AccountMaxAggregateOutputType = {
    AccountID: string | null
    CustomerID: string | null
    Status: string | null
    Balance: Decimal | null
    AccountType: string | null
    MonthlyFee: Decimal | null
    DailyATMLimit: Decimal | null
    DailyPurchaseLimit: Decimal | null
    OverdraftProtection: boolean | null
  }

  export type AccountCountAggregateOutputType = {
    AccountID: number
    CustomerID: number
    Status: number
    Balance: number
    AccountType: number
    MonthlyFee: number
    DailyATMLimit: number
    DailyPurchaseLimit: number
    OverdraftProtection: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    Balance?: true
    MonthlyFee?: true
    DailyATMLimit?: true
    DailyPurchaseLimit?: true
  }

  export type AccountSumAggregateInputType = {
    Balance?: true
    MonthlyFee?: true
    DailyATMLimit?: true
    DailyPurchaseLimit?: true
  }

  export type AccountMinAggregateInputType = {
    AccountID?: true
    CustomerID?: true
    Status?: true
    Balance?: true
    AccountType?: true
    MonthlyFee?: true
    DailyATMLimit?: true
    DailyPurchaseLimit?: true
    OverdraftProtection?: true
  }

  export type AccountMaxAggregateInputType = {
    AccountID?: true
    CustomerID?: true
    Status?: true
    Balance?: true
    AccountType?: true
    MonthlyFee?: true
    DailyATMLimit?: true
    DailyPurchaseLimit?: true
    OverdraftProtection?: true
  }

  export type AccountCountAggregateInputType = {
    AccountID?: true
    CustomerID?: true
    Status?: true
    Balance?: true
    AccountType?: true
    MonthlyFee?: true
    DailyATMLimit?: true
    DailyPurchaseLimit?: true
    OverdraftProtection?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    AccountID: string
    CustomerID: string | null
    Status: string | null
    Balance: Decimal | null
    AccountType: string | null
    MonthlyFee: Decimal | null
    DailyATMLimit: Decimal | null
    DailyPurchaseLimit: Decimal | null
    OverdraftProtection: boolean | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AccountID?: boolean
    CustomerID?: boolean
    Status?: boolean
    Balance?: boolean
    AccountType?: boolean
    MonthlyFee?: boolean
    DailyATMLimit?: boolean
    DailyPurchaseLimit?: boolean
    OverdraftProtection?: boolean
    customer?: boolean | Account$customerArgs<ExtArgs>
    payments?: boolean | Account$paymentsArgs<ExtArgs>
    transfersFrom?: boolean | Account$transfersFromArgs<ExtArgs>
    transfersTo?: boolean | Account$transfersToArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>



  export type AccountSelectScalar = {
    AccountID?: boolean
    CustomerID?: boolean
    Status?: boolean
    Balance?: boolean
    AccountType?: boolean
    MonthlyFee?: boolean
    DailyATMLimit?: boolean
    DailyPurchaseLimit?: boolean
    OverdraftProtection?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"AccountID" | "CustomerID" | "Status" | "Balance" | "AccountType" | "MonthlyFee" | "DailyATMLimit" | "DailyPurchaseLimit" | "OverdraftProtection", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | Account$customerArgs<ExtArgs>
    payments?: boolean | Account$paymentsArgs<ExtArgs>
    transfersFrom?: boolean | Account$transfersFromArgs<ExtArgs>
    transfersTo?: boolean | Account$transfersToArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs> | null
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      transfersFrom: Prisma.$TransferPayload<ExtArgs>[]
      transfersTo: Prisma.$TransferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      AccountID: string
      CustomerID: string | null
      Status: string | null
      Balance: Prisma.Decimal | null
      AccountType: string | null
      MonthlyFee: Prisma.Decimal | null
      DailyATMLimit: Prisma.Decimal | null
      DailyPurchaseLimit: Prisma.Decimal | null
      OverdraftProtection: boolean | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `AccountID`
     * const accountWithAccountIDOnly = await prisma.account.findMany({ select: { AccountID: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends Account$customerArgs<ExtArgs> = {}>(args?: Subset<T, Account$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payments<T extends Account$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Account$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersFrom<T extends Account$transfersFromArgs<ExtArgs> = {}>(args?: Subset<T, Account$transfersFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersTo<T extends Account$transfersToArgs<ExtArgs> = {}>(args?: Subset<T, Account$transfersToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly AccountID: FieldRef<"Account", 'String'>
    readonly CustomerID: FieldRef<"Account", 'String'>
    readonly Status: FieldRef<"Account", 'String'>
    readonly Balance: FieldRef<"Account", 'Decimal'>
    readonly AccountType: FieldRef<"Account", 'String'>
    readonly MonthlyFee: FieldRef<"Account", 'Decimal'>
    readonly DailyATMLimit: FieldRef<"Account", 'Decimal'>
    readonly DailyPurchaseLimit: FieldRef<"Account", 'Decimal'>
    readonly OverdraftProtection: FieldRef<"Account", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data?: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.customer
   */
  export type Account$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * Account.payments
   */
  export type Account$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Account.transfersFrom
   */
  export type Account$transfersFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    cursor?: TransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Account.transfersTo
   */
  export type Account$transfersToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    cursor?: TransferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Transfer
   */

  export type AggregateTransfer = {
    _count: TransferCountAggregateOutputType | null
    _avg: TransferAvgAggregateOutputType | null
    _sum: TransferSumAggregateOutputType | null
    _min: TransferMinAggregateOutputType | null
    _max: TransferMaxAggregateOutputType | null
  }

  export type TransferAvgAggregateOutputType = {
    Amount: Decimal | null
  }

  export type TransferSumAggregateOutputType = {
    Amount: Decimal | null
  }

  export type TransferMinAggregateOutputType = {
    TransferID: string | null
    ToAccountID: string | null
    FromAccountID: string | null
    Amount: Decimal | null
    Description: string | null
    CreatedAt: Date | null
    UpdatedAt: Date | null
    Status: string | null
    TransferType: string | null
  }

  export type TransferMaxAggregateOutputType = {
    TransferID: string | null
    ToAccountID: string | null
    FromAccountID: string | null
    Amount: Decimal | null
    Description: string | null
    CreatedAt: Date | null
    UpdatedAt: Date | null
    Status: string | null
    TransferType: string | null
  }

  export type TransferCountAggregateOutputType = {
    TransferID: number
    ToAccountID: number
    FromAccountID: number
    Amount: number
    Description: number
    CreatedAt: number
    UpdatedAt: number
    Status: number
    TransferType: number
    _all: number
  }


  export type TransferAvgAggregateInputType = {
    Amount?: true
  }

  export type TransferSumAggregateInputType = {
    Amount?: true
  }

  export type TransferMinAggregateInputType = {
    TransferID?: true
    ToAccountID?: true
    FromAccountID?: true
    Amount?: true
    Description?: true
    CreatedAt?: true
    UpdatedAt?: true
    Status?: true
    TransferType?: true
  }

  export type TransferMaxAggregateInputType = {
    TransferID?: true
    ToAccountID?: true
    FromAccountID?: true
    Amount?: true
    Description?: true
    CreatedAt?: true
    UpdatedAt?: true
    Status?: true
    TransferType?: true
  }

  export type TransferCountAggregateInputType = {
    TransferID?: true
    ToAccountID?: true
    FromAccountID?: true
    Amount?: true
    Description?: true
    CreatedAt?: true
    UpdatedAt?: true
    Status?: true
    TransferType?: true
    _all?: true
  }

  export type TransferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transfer to aggregate.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transfers
    **/
    _count?: true | TransferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransferMaxAggregateInputType
  }

  export type GetTransferAggregateType<T extends TransferAggregateArgs> = {
        [P in keyof T & keyof AggregateTransfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransfer[P]>
      : GetScalarType<T[P], AggregateTransfer[P]>
  }




  export type TransferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferWhereInput
    orderBy?: TransferOrderByWithAggregationInput | TransferOrderByWithAggregationInput[]
    by: TransferScalarFieldEnum[] | TransferScalarFieldEnum
    having?: TransferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransferCountAggregateInputType | true
    _avg?: TransferAvgAggregateInputType
    _sum?: TransferSumAggregateInputType
    _min?: TransferMinAggregateInputType
    _max?: TransferMaxAggregateInputType
  }

  export type TransferGroupByOutputType = {
    TransferID: string
    ToAccountID: string | null
    FromAccountID: string | null
    Amount: Decimal | null
    Description: string | null
    CreatedAt: Date | null
    UpdatedAt: Date | null
    Status: string | null
    TransferType: string | null
    _count: TransferCountAggregateOutputType | null
    _avg: TransferAvgAggregateOutputType | null
    _sum: TransferSumAggregateOutputType | null
    _min: TransferMinAggregateOutputType | null
    _max: TransferMaxAggregateOutputType | null
  }

  type GetTransferGroupByPayload<T extends TransferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransferGroupByOutputType[P]>
            : GetScalarType<T[P], TransferGroupByOutputType[P]>
        }
      >
    >


  export type TransferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    TransferID?: boolean
    ToAccountID?: boolean
    FromAccountID?: boolean
    Amount?: boolean
    Description?: boolean
    CreatedAt?: boolean
    UpdatedAt?: boolean
    Status?: boolean
    TransferType?: boolean
    fromAccount?: boolean | Transfer$fromAccountArgs<ExtArgs>
    toAccount?: boolean | Transfer$toAccountArgs<ExtArgs>
  }, ExtArgs["result"]["transfer"]>



  export type TransferSelectScalar = {
    TransferID?: boolean
    ToAccountID?: boolean
    FromAccountID?: boolean
    Amount?: boolean
    Description?: boolean
    CreatedAt?: boolean
    UpdatedAt?: boolean
    Status?: boolean
    TransferType?: boolean
  }

  export type TransferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"TransferID" | "ToAccountID" | "FromAccountID" | "Amount" | "Description" | "CreatedAt" | "UpdatedAt" | "Status" | "TransferType", ExtArgs["result"]["transfer"]>
  export type TransferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromAccount?: boolean | Transfer$fromAccountArgs<ExtArgs>
    toAccount?: boolean | Transfer$toAccountArgs<ExtArgs>
  }

  export type $TransferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transfer"
    objects: {
      fromAccount: Prisma.$AccountPayload<ExtArgs> | null
      toAccount: Prisma.$AccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      TransferID: string
      ToAccountID: string | null
      FromAccountID: string | null
      Amount: Prisma.Decimal | null
      Description: string | null
      CreatedAt: Date | null
      UpdatedAt: Date | null
      Status: string | null
      TransferType: string | null
    }, ExtArgs["result"]["transfer"]>
    composites: {}
  }

  type TransferGetPayload<S extends boolean | null | undefined | TransferDefaultArgs> = $Result.GetResult<Prisma.$TransferPayload, S>

  type TransferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransferCountAggregateInputType | true
    }

  export interface TransferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transfer'], meta: { name: 'Transfer' } }
    /**
     * Find zero or one Transfer that matches the filter.
     * @param {TransferFindUniqueArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransferFindUniqueArgs>(args: SelectSubset<T, TransferFindUniqueArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transfer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransferFindUniqueOrThrowArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransferFindUniqueOrThrowArgs>(args: SelectSubset<T, TransferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindFirstArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransferFindFirstArgs>(args?: SelectSubset<T, TransferFindFirstArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindFirstOrThrowArgs} args - Arguments to find a Transfer
     * @example
     * // Get one Transfer
     * const transfer = await prisma.transfer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransferFindFirstOrThrowArgs>(args?: SelectSubset<T, TransferFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transfers
     * const transfers = await prisma.transfer.findMany()
     * 
     * // Get first 10 Transfers
     * const transfers = await prisma.transfer.findMany({ take: 10 })
     * 
     * // Only select the `TransferID`
     * const transferWithTransferIDOnly = await prisma.transfer.findMany({ select: { TransferID: true } })
     * 
     */
    findMany<T extends TransferFindManyArgs>(args?: SelectSubset<T, TransferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transfer.
     * @param {TransferCreateArgs} args - Arguments to create a Transfer.
     * @example
     * // Create one Transfer
     * const Transfer = await prisma.transfer.create({
     *   data: {
     *     // ... data to create a Transfer
     *   }
     * })
     * 
     */
    create<T extends TransferCreateArgs>(args: SelectSubset<T, TransferCreateArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transfers.
     * @param {TransferCreateManyArgs} args - Arguments to create many Transfers.
     * @example
     * // Create many Transfers
     * const transfer = await prisma.transfer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransferCreateManyArgs>(args?: SelectSubset<T, TransferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Transfer.
     * @param {TransferDeleteArgs} args - Arguments to delete one Transfer.
     * @example
     * // Delete one Transfer
     * const Transfer = await prisma.transfer.delete({
     *   where: {
     *     // ... filter to delete one Transfer
     *   }
     * })
     * 
     */
    delete<T extends TransferDeleteArgs>(args: SelectSubset<T, TransferDeleteArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transfer.
     * @param {TransferUpdateArgs} args - Arguments to update one Transfer.
     * @example
     * // Update one Transfer
     * const transfer = await prisma.transfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransferUpdateArgs>(args: SelectSubset<T, TransferUpdateArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transfers.
     * @param {TransferDeleteManyArgs} args - Arguments to filter Transfers to delete.
     * @example
     * // Delete a few Transfers
     * const { count } = await prisma.transfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransferDeleteManyArgs>(args?: SelectSubset<T, TransferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transfers
     * const transfer = await prisma.transfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransferUpdateManyArgs>(args: SelectSubset<T, TransferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transfer.
     * @param {TransferUpsertArgs} args - Arguments to update or create a Transfer.
     * @example
     * // Update or create a Transfer
     * const transfer = await prisma.transfer.upsert({
     *   create: {
     *     // ... data to create a Transfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transfer we want to update
     *   }
     * })
     */
    upsert<T extends TransferUpsertArgs>(args: SelectSubset<T, TransferUpsertArgs<ExtArgs>>): Prisma__TransferClient<$Result.GetResult<Prisma.$TransferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferCountArgs} args - Arguments to filter Transfers to count.
     * @example
     * // Count the number of Transfers
     * const count = await prisma.transfer.count({
     *   where: {
     *     // ... the filter for the Transfers we want to count
     *   }
     * })
    **/
    count<T extends TransferCountArgs>(
      args?: Subset<T, TransferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransferAggregateArgs>(args: Subset<T, TransferAggregateArgs>): Prisma.PrismaPromise<GetTransferAggregateType<T>>

    /**
     * Group by Transfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferGroupByArgs} args - Group by arguments.
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
      T extends TransferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransferGroupByArgs['orderBy'] }
        : { orderBy?: TransferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transfer model
   */
  readonly fields: TransferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromAccount<T extends Transfer$fromAccountArgs<ExtArgs> = {}>(args?: Subset<T, Transfer$fromAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    toAccount<T extends Transfer$toAccountArgs<ExtArgs> = {}>(args?: Subset<T, Transfer$toAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Transfer model
   */
  interface TransferFieldRefs {
    readonly TransferID: FieldRef<"Transfer", 'String'>
    readonly ToAccountID: FieldRef<"Transfer", 'String'>
    readonly FromAccountID: FieldRef<"Transfer", 'String'>
    readonly Amount: FieldRef<"Transfer", 'Decimal'>
    readonly Description: FieldRef<"Transfer", 'String'>
    readonly CreatedAt: FieldRef<"Transfer", 'DateTime'>
    readonly UpdatedAt: FieldRef<"Transfer", 'DateTime'>
    readonly Status: FieldRef<"Transfer", 'String'>
    readonly TransferType: FieldRef<"Transfer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Transfer findUnique
   */
  export type TransferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer findUniqueOrThrow
   */
  export type TransferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer findFirst
   */
  export type TransferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transfers.
     */
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer findFirstOrThrow
   */
  export type TransferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfer to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transfers.
     */
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer findMany
   */
  export type TransferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter, which Transfers to fetch.
     */
    where?: TransferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transfers to fetch.
     */
    orderBy?: TransferOrderByWithRelationInput | TransferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transfers.
     */
    cursor?: TransferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transfers.
     */
    skip?: number
    distinct?: TransferScalarFieldEnum | TransferScalarFieldEnum[]
  }

  /**
   * Transfer create
   */
  export type TransferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * The data needed to create a Transfer.
     */
    data?: XOR<TransferCreateInput, TransferUncheckedCreateInput>
  }

  /**
   * Transfer createMany
   */
  export type TransferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transfers.
     */
    data: TransferCreateManyInput | TransferCreateManyInput[]
  }

  /**
   * Transfer update
   */
  export type TransferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * The data needed to update a Transfer.
     */
    data: XOR<TransferUpdateInput, TransferUncheckedUpdateInput>
    /**
     * Choose, which Transfer to update.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer updateMany
   */
  export type TransferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transfers.
     */
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyInput>
    /**
     * Filter which Transfers to update
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to update.
     */
    limit?: number
  }

  /**
   * Transfer upsert
   */
  export type TransferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * The filter to search for the Transfer to update in case it exists.
     */
    where: TransferWhereUniqueInput
    /**
     * In case the Transfer found by the `where` argument doesn't exist, create a new Transfer with this data.
     */
    create: XOR<TransferCreateInput, TransferUncheckedCreateInput>
    /**
     * In case the Transfer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransferUpdateInput, TransferUncheckedUpdateInput>
  }

  /**
   * Transfer delete
   */
  export type TransferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
    /**
     * Filter which Transfer to delete.
     */
    where: TransferWhereUniqueInput
  }

  /**
   * Transfer deleteMany
   */
  export type TransferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transfers to delete
     */
    where?: TransferWhereInput
    /**
     * Limit how many Transfers to delete.
     */
    limit?: number
  }

  /**
   * Transfer.fromAccount
   */
  export type Transfer$fromAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Transfer.toAccount
   */
  export type Transfer$toAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Transfer without action
   */
  export type TransferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transfer
     */
    select?: TransferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transfer
     */
    omit?: TransferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferInclude<ExtArgs> | null
  }


  /**
   * Model Utilities
   */

  export type AggregateUtilities = {
    _count: UtilitiesCountAggregateOutputType | null
    _min: UtilitiesMinAggregateOutputType | null
    _max: UtilitiesMaxAggregateOutputType | null
  }

  export type UtilitiesMinAggregateOutputType = {
    UtilityID: string | null
    AccountName: string | null
    AccountNumber: string | null
  }

  export type UtilitiesMaxAggregateOutputType = {
    UtilityID: string | null
    AccountName: string | null
    AccountNumber: string | null
  }

  export type UtilitiesCountAggregateOutputType = {
    UtilityID: number
    AccountName: number
    AccountNumber: number
    _all: number
  }


  export type UtilitiesMinAggregateInputType = {
    UtilityID?: true
    AccountName?: true
    AccountNumber?: true
  }

  export type UtilitiesMaxAggregateInputType = {
    UtilityID?: true
    AccountName?: true
    AccountNumber?: true
  }

  export type UtilitiesCountAggregateInputType = {
    UtilityID?: true
    AccountName?: true
    AccountNumber?: true
    _all?: true
  }

  export type UtilitiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Utilities to aggregate.
     */
    where?: UtilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilities to fetch.
     */
    orderBy?: UtilitiesOrderByWithRelationInput | UtilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UtilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Utilities
    **/
    _count?: true | UtilitiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UtilitiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UtilitiesMaxAggregateInputType
  }

  export type GetUtilitiesAggregateType<T extends UtilitiesAggregateArgs> = {
        [P in keyof T & keyof AggregateUtilities]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUtilities[P]>
      : GetScalarType<T[P], AggregateUtilities[P]>
  }




  export type UtilitiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UtilitiesWhereInput
    orderBy?: UtilitiesOrderByWithAggregationInput | UtilitiesOrderByWithAggregationInput[]
    by: UtilitiesScalarFieldEnum[] | UtilitiesScalarFieldEnum
    having?: UtilitiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UtilitiesCountAggregateInputType | true
    _min?: UtilitiesMinAggregateInputType
    _max?: UtilitiesMaxAggregateInputType
  }

  export type UtilitiesGroupByOutputType = {
    UtilityID: string
    AccountName: string | null
    AccountNumber: string | null
    _count: UtilitiesCountAggregateOutputType | null
    _min: UtilitiesMinAggregateOutputType | null
    _max: UtilitiesMaxAggregateOutputType | null
  }

  type GetUtilitiesGroupByPayload<T extends UtilitiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UtilitiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UtilitiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UtilitiesGroupByOutputType[P]>
            : GetScalarType<T[P], UtilitiesGroupByOutputType[P]>
        }
      >
    >


  export type UtilitiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    UtilityID?: boolean
    AccountName?: boolean
    AccountNumber?: boolean
    payments?: boolean | Utilities$paymentsArgs<ExtArgs>
    _count?: boolean | UtilitiesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilities"]>



  export type UtilitiesSelectScalar = {
    UtilityID?: boolean
    AccountName?: boolean
    AccountNumber?: boolean
  }

  export type UtilitiesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"UtilityID" | "AccountName" | "AccountNumber", ExtArgs["result"]["utilities"]>
  export type UtilitiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | Utilities$paymentsArgs<ExtArgs>
    _count?: boolean | UtilitiesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UtilitiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Utilities"
    objects: {
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      UtilityID: string
      AccountName: string | null
      AccountNumber: string | null
    }, ExtArgs["result"]["utilities"]>
    composites: {}
  }

  type UtilitiesGetPayload<S extends boolean | null | undefined | UtilitiesDefaultArgs> = $Result.GetResult<Prisma.$UtilitiesPayload, S>

  type UtilitiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UtilitiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UtilitiesCountAggregateInputType | true
    }

  export interface UtilitiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Utilities'], meta: { name: 'Utilities' } }
    /**
     * Find zero or one Utilities that matches the filter.
     * @param {UtilitiesFindUniqueArgs} args - Arguments to find a Utilities
     * @example
     * // Get one Utilities
     * const utilities = await prisma.utilities.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UtilitiesFindUniqueArgs>(args: SelectSubset<T, UtilitiesFindUniqueArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Utilities that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UtilitiesFindUniqueOrThrowArgs} args - Arguments to find a Utilities
     * @example
     * // Get one Utilities
     * const utilities = await prisma.utilities.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UtilitiesFindUniqueOrThrowArgs>(args: SelectSubset<T, UtilitiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilitiesFindFirstArgs} args - Arguments to find a Utilities
     * @example
     * // Get one Utilities
     * const utilities = await prisma.utilities.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UtilitiesFindFirstArgs>(args?: SelectSubset<T, UtilitiesFindFirstArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilities that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilitiesFindFirstOrThrowArgs} args - Arguments to find a Utilities
     * @example
     * // Get one Utilities
     * const utilities = await prisma.utilities.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UtilitiesFindFirstOrThrowArgs>(args?: SelectSubset<T, UtilitiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Utilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilitiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Utilities
     * const utilities = await prisma.utilities.findMany()
     * 
     * // Get first 10 Utilities
     * const utilities = await prisma.utilities.findMany({ take: 10 })
     * 
     * // Only select the `UtilityID`
     * const utilitiesWithUtilityIDOnly = await prisma.utilities.findMany({ select: { UtilityID: true } })
     * 
     */
    findMany<T extends UtilitiesFindManyArgs>(args?: SelectSubset<T, UtilitiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Utilities.
     * @param {UtilitiesCreateArgs} args - Arguments to create a Utilities.
     * @example
     * // Create one Utilities
     * const Utilities = await prisma.utilities.create({
     *   data: {
     *     // ... data to create a Utilities
     *   }
     * })
     * 
     */
    create<T extends UtilitiesCreateArgs>(args: SelectSubset<T, UtilitiesCreateArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Utilities.
     * @param {UtilitiesCreateManyArgs} args - Arguments to create many Utilities.
     * @example
     * // Create many Utilities
     * const utilities = await prisma.utilities.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UtilitiesCreateManyArgs>(args?: SelectSubset<T, UtilitiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Utilities.
     * @param {UtilitiesDeleteArgs} args - Arguments to delete one Utilities.
     * @example
     * // Delete one Utilities
     * const Utilities = await prisma.utilities.delete({
     *   where: {
     *     // ... filter to delete one Utilities
     *   }
     * })
     * 
     */
    delete<T extends UtilitiesDeleteArgs>(args: SelectSubset<T, UtilitiesDeleteArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Utilities.
     * @param {UtilitiesUpdateArgs} args - Arguments to update one Utilities.
     * @example
     * // Update one Utilities
     * const utilities = await prisma.utilities.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UtilitiesUpdateArgs>(args: SelectSubset<T, UtilitiesUpdateArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Utilities.
     * @param {UtilitiesDeleteManyArgs} args - Arguments to filter Utilities to delete.
     * @example
     * // Delete a few Utilities
     * const { count } = await prisma.utilities.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UtilitiesDeleteManyArgs>(args?: SelectSubset<T, UtilitiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Utilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilitiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Utilities
     * const utilities = await prisma.utilities.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UtilitiesUpdateManyArgs>(args: SelectSubset<T, UtilitiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Utilities.
     * @param {UtilitiesUpsertArgs} args - Arguments to update or create a Utilities.
     * @example
     * // Update or create a Utilities
     * const utilities = await prisma.utilities.upsert({
     *   create: {
     *     // ... data to create a Utilities
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Utilities we want to update
     *   }
     * })
     */
    upsert<T extends UtilitiesUpsertArgs>(args: SelectSubset<T, UtilitiesUpsertArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Utilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilitiesCountArgs} args - Arguments to filter Utilities to count.
     * @example
     * // Count the number of Utilities
     * const count = await prisma.utilities.count({
     *   where: {
     *     // ... the filter for the Utilities we want to count
     *   }
     * })
    **/
    count<T extends UtilitiesCountArgs>(
      args?: Subset<T, UtilitiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UtilitiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Utilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilitiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UtilitiesAggregateArgs>(args: Subset<T, UtilitiesAggregateArgs>): Prisma.PrismaPromise<GetUtilitiesAggregateType<T>>

    /**
     * Group by Utilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilitiesGroupByArgs} args - Group by arguments.
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
      T extends UtilitiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UtilitiesGroupByArgs['orderBy'] }
        : { orderBy?: UtilitiesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UtilitiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUtilitiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Utilities model
   */
  readonly fields: UtilitiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Utilities.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UtilitiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payments<T extends Utilities$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Utilities$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Utilities model
   */
  interface UtilitiesFieldRefs {
    readonly UtilityID: FieldRef<"Utilities", 'String'>
    readonly AccountName: FieldRef<"Utilities", 'String'>
    readonly AccountNumber: FieldRef<"Utilities", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Utilities findUnique
   */
  export type UtilitiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Utilities to fetch.
     */
    where: UtilitiesWhereUniqueInput
  }

  /**
   * Utilities findUniqueOrThrow
   */
  export type UtilitiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Utilities to fetch.
     */
    where: UtilitiesWhereUniqueInput
  }

  /**
   * Utilities findFirst
   */
  export type UtilitiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Utilities to fetch.
     */
    where?: UtilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilities to fetch.
     */
    orderBy?: UtilitiesOrderByWithRelationInput | UtilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Utilities.
     */
    cursor?: UtilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Utilities.
     */
    distinct?: UtilitiesScalarFieldEnum | UtilitiesScalarFieldEnum[]
  }

  /**
   * Utilities findFirstOrThrow
   */
  export type UtilitiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Utilities to fetch.
     */
    where?: UtilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilities to fetch.
     */
    orderBy?: UtilitiesOrderByWithRelationInput | UtilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Utilities.
     */
    cursor?: UtilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Utilities.
     */
    distinct?: UtilitiesScalarFieldEnum | UtilitiesScalarFieldEnum[]
  }

  /**
   * Utilities findMany
   */
  export type UtilitiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * Filter, which Utilities to fetch.
     */
    where?: UtilitiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilities to fetch.
     */
    orderBy?: UtilitiesOrderByWithRelationInput | UtilitiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Utilities.
     */
    cursor?: UtilitiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilities.
     */
    skip?: number
    distinct?: UtilitiesScalarFieldEnum | UtilitiesScalarFieldEnum[]
  }

  /**
   * Utilities create
   */
  export type UtilitiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * The data needed to create a Utilities.
     */
    data?: XOR<UtilitiesCreateInput, UtilitiesUncheckedCreateInput>
  }

  /**
   * Utilities createMany
   */
  export type UtilitiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Utilities.
     */
    data: UtilitiesCreateManyInput | UtilitiesCreateManyInput[]
  }

  /**
   * Utilities update
   */
  export type UtilitiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * The data needed to update a Utilities.
     */
    data: XOR<UtilitiesUpdateInput, UtilitiesUncheckedUpdateInput>
    /**
     * Choose, which Utilities to update.
     */
    where: UtilitiesWhereUniqueInput
  }

  /**
   * Utilities updateMany
   */
  export type UtilitiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Utilities.
     */
    data: XOR<UtilitiesUpdateManyMutationInput, UtilitiesUncheckedUpdateManyInput>
    /**
     * Filter which Utilities to update
     */
    where?: UtilitiesWhereInput
    /**
     * Limit how many Utilities to update.
     */
    limit?: number
  }

  /**
   * Utilities upsert
   */
  export type UtilitiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * The filter to search for the Utilities to update in case it exists.
     */
    where: UtilitiesWhereUniqueInput
    /**
     * In case the Utilities found by the `where` argument doesn't exist, create a new Utilities with this data.
     */
    create: XOR<UtilitiesCreateInput, UtilitiesUncheckedCreateInput>
    /**
     * In case the Utilities was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UtilitiesUpdateInput, UtilitiesUncheckedUpdateInput>
  }

  /**
   * Utilities delete
   */
  export type UtilitiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    /**
     * Filter which Utilities to delete.
     */
    where: UtilitiesWhereUniqueInput
  }

  /**
   * Utilities deleteMany
   */
  export type UtilitiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Utilities to delete
     */
    where?: UtilitiesWhereInput
    /**
     * Limit how many Utilities to delete.
     */
    limit?: number
  }

  /**
   * Utilities.payments
   */
  export type Utilities$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Utilities without action
   */
  export type UtilitiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    Amount: Decimal | null
  }

  export type PaymentSumAggregateOutputType = {
    Amount: Decimal | null
  }

  export type PaymentMinAggregateOutputType = {
    PaymentID: string | null
    AccountID: string | null
    UtilityID: string | null
    Amount: Decimal | null
    Timestamp: Date | null
    Description: string | null
  }

  export type PaymentMaxAggregateOutputType = {
    PaymentID: string | null
    AccountID: string | null
    UtilityID: string | null
    Amount: Decimal | null
    Timestamp: Date | null
    Description: string | null
  }

  export type PaymentCountAggregateOutputType = {
    PaymentID: number
    AccountID: number
    UtilityID: number
    Amount: number
    Timestamp: number
    Description: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    Amount?: true
  }

  export type PaymentSumAggregateInputType = {
    Amount?: true
  }

  export type PaymentMinAggregateInputType = {
    PaymentID?: true
    AccountID?: true
    UtilityID?: true
    Amount?: true
    Timestamp?: true
    Description?: true
  }

  export type PaymentMaxAggregateInputType = {
    PaymentID?: true
    AccountID?: true
    UtilityID?: true
    Amount?: true
    Timestamp?: true
    Description?: true
  }

  export type PaymentCountAggregateInputType = {
    PaymentID?: true
    AccountID?: true
    UtilityID?: true
    Amount?: true
    Timestamp?: true
    Description?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    PaymentID: string
    AccountID: string | null
    UtilityID: string | null
    Amount: Decimal | null
    Timestamp: Date | null
    Description: string | null
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    PaymentID?: boolean
    AccountID?: boolean
    UtilityID?: boolean
    Amount?: boolean
    Timestamp?: boolean
    Description?: boolean
    account?: boolean | Payment$accountArgs<ExtArgs>
    utility?: boolean | Payment$utilityArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>



  export type PaymentSelectScalar = {
    PaymentID?: boolean
    AccountID?: boolean
    UtilityID?: boolean
    Amount?: boolean
    Timestamp?: boolean
    Description?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"PaymentID" | "AccountID" | "UtilityID" | "Amount" | "Timestamp" | "Description", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | Payment$accountArgs<ExtArgs>
    utility?: boolean | Payment$utilityArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs> | null
      utility: Prisma.$UtilitiesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      PaymentID: string
      AccountID: string | null
      UtilityID: string | null
      Amount: Prisma.Decimal | null
      Timestamp: Date | null
      Description: string | null
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `PaymentID`
     * const paymentWithPaymentIDOnly = await prisma.payment.findMany({ select: { PaymentID: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
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
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends Payment$accountArgs<ExtArgs> = {}>(args?: Subset<T, Payment$accountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    utility<T extends Payment$utilityArgs<ExtArgs> = {}>(args?: Subset<T, Payment$utilityArgs<ExtArgs>>): Prisma__UtilitiesClient<$Result.GetResult<Prisma.$UtilitiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly PaymentID: FieldRef<"Payment", 'String'>
    readonly AccountID: FieldRef<"Payment", 'String'>
    readonly UtilityID: FieldRef<"Payment", 'String'>
    readonly Amount: FieldRef<"Payment", 'Decimal'>
    readonly Timestamp: FieldRef<"Payment", 'DateTime'>
    readonly Description: FieldRef<"Payment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data?: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.account
   */
  export type Payment$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Payment.utility
   */
  export type Payment$utilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilities
     */
    select?: UtilitiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilities
     */
    omit?: UtilitiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilitiesInclude<ExtArgs> | null
    where?: UtilitiesWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model AUDIT_LOGS
   */

  export type AggregateAUDIT_LOGS = {
    _count: AUDIT_LOGSCountAggregateOutputType | null
    _min: AUDIT_LOGSMinAggregateOutputType | null
    _max: AUDIT_LOGSMaxAggregateOutputType | null
  }

  export type AUDIT_LOGSMinAggregateOutputType = {
    id: string | null
    timestamp: Date | null
    actor_type: string | null
    actor_id: string | null
    action: string | null
    target_id: string | null
    status: string | null
  }

  export type AUDIT_LOGSMaxAggregateOutputType = {
    id: string | null
    timestamp: Date | null
    actor_type: string | null
    actor_id: string | null
    action: string | null
    target_id: string | null
    status: string | null
  }

  export type AUDIT_LOGSCountAggregateOutputType = {
    id: number
    timestamp: number
    actor_type: number
    actor_id: number
    action: number
    target_id: number
    status: number
    _all: number
  }


  export type AUDIT_LOGSMinAggregateInputType = {
    id?: true
    timestamp?: true
    actor_type?: true
    actor_id?: true
    action?: true
    target_id?: true
    status?: true
  }

  export type AUDIT_LOGSMaxAggregateInputType = {
    id?: true
    timestamp?: true
    actor_type?: true
    actor_id?: true
    action?: true
    target_id?: true
    status?: true
  }

  export type AUDIT_LOGSCountAggregateInputType = {
    id?: true
    timestamp?: true
    actor_type?: true
    actor_id?: true
    action?: true
    target_id?: true
    status?: true
    _all?: true
  }

  export type AUDIT_LOGSAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AUDIT_LOGS to aggregate.
     */
    where?: AUDIT_LOGSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AUDIT_LOGS to fetch.
     */
    orderBy?: AUDIT_LOGSOrderByWithRelationInput | AUDIT_LOGSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AUDIT_LOGSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AUDIT_LOGS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AUDIT_LOGS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AUDIT_LOGS
    **/
    _count?: true | AUDIT_LOGSCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AUDIT_LOGSMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AUDIT_LOGSMaxAggregateInputType
  }

  export type GetAUDIT_LOGSAggregateType<T extends AUDIT_LOGSAggregateArgs> = {
        [P in keyof T & keyof AggregateAUDIT_LOGS]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAUDIT_LOGS[P]>
      : GetScalarType<T[P], AggregateAUDIT_LOGS[P]>
  }




  export type AUDIT_LOGSGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AUDIT_LOGSWhereInput
    orderBy?: AUDIT_LOGSOrderByWithAggregationInput | AUDIT_LOGSOrderByWithAggregationInput[]
    by: AUDIT_LOGSScalarFieldEnum[] | AUDIT_LOGSScalarFieldEnum
    having?: AUDIT_LOGSScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AUDIT_LOGSCountAggregateInputType | true
    _min?: AUDIT_LOGSMinAggregateInputType
    _max?: AUDIT_LOGSMaxAggregateInputType
  }

  export type AUDIT_LOGSGroupByOutputType = {
    id: string
    timestamp: Date | null
    actor_type: string | null
    actor_id: string | null
    action: string | null
    target_id: string | null
    status: string | null
    _count: AUDIT_LOGSCountAggregateOutputType | null
    _min: AUDIT_LOGSMinAggregateOutputType | null
    _max: AUDIT_LOGSMaxAggregateOutputType | null
  }

  type GetAUDIT_LOGSGroupByPayload<T extends AUDIT_LOGSGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AUDIT_LOGSGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AUDIT_LOGSGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AUDIT_LOGSGroupByOutputType[P]>
            : GetScalarType<T[P], AUDIT_LOGSGroupByOutputType[P]>
        }
      >
    >


  export type AUDIT_LOGSSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    actor_type?: boolean
    actor_id?: boolean
    action?: boolean
    target_id?: boolean
    status?: boolean
  }, ExtArgs["result"]["aUDIT_LOGS"]>



  export type AUDIT_LOGSSelectScalar = {
    id?: boolean
    timestamp?: boolean
    actor_type?: boolean
    actor_id?: boolean
    action?: boolean
    target_id?: boolean
    status?: boolean
  }

  export type AUDIT_LOGSOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timestamp" | "actor_type" | "actor_id" | "action" | "target_id" | "status", ExtArgs["result"]["aUDIT_LOGS"]>

  export type $AUDIT_LOGSPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AUDIT_LOGS"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      timestamp: Date | null
      actor_type: string | null
      actor_id: string | null
      action: string | null
      target_id: string | null
      status: string | null
    }, ExtArgs["result"]["aUDIT_LOGS"]>
    composites: {}
  }

  type AUDIT_LOGSGetPayload<S extends boolean | null | undefined | AUDIT_LOGSDefaultArgs> = $Result.GetResult<Prisma.$AUDIT_LOGSPayload, S>

  type AUDIT_LOGSCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AUDIT_LOGSFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AUDIT_LOGSCountAggregateInputType | true
    }

  export interface AUDIT_LOGSDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AUDIT_LOGS'], meta: { name: 'AUDIT_LOGS' } }
    /**
     * Find zero or one AUDIT_LOGS that matches the filter.
     * @param {AUDIT_LOGSFindUniqueArgs} args - Arguments to find a AUDIT_LOGS
     * @example
     * // Get one AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AUDIT_LOGSFindUniqueArgs>(args: SelectSubset<T, AUDIT_LOGSFindUniqueArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AUDIT_LOGS that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AUDIT_LOGSFindUniqueOrThrowArgs} args - Arguments to find a AUDIT_LOGS
     * @example
     * // Get one AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AUDIT_LOGSFindUniqueOrThrowArgs>(args: SelectSubset<T, AUDIT_LOGSFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AUDIT_LOGS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AUDIT_LOGSFindFirstArgs} args - Arguments to find a AUDIT_LOGS
     * @example
     * // Get one AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AUDIT_LOGSFindFirstArgs>(args?: SelectSubset<T, AUDIT_LOGSFindFirstArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AUDIT_LOGS that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AUDIT_LOGSFindFirstOrThrowArgs} args - Arguments to find a AUDIT_LOGS
     * @example
     * // Get one AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AUDIT_LOGSFindFirstOrThrowArgs>(args?: SelectSubset<T, AUDIT_LOGSFindFirstOrThrowArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AUDIT_LOGS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AUDIT_LOGSFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.findMany()
     * 
     * // Get first 10 AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aUDIT_LOGSWithIdOnly = await prisma.aUDIT_LOGS.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AUDIT_LOGSFindManyArgs>(args?: SelectSubset<T, AUDIT_LOGSFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AUDIT_LOGS.
     * @param {AUDIT_LOGSCreateArgs} args - Arguments to create a AUDIT_LOGS.
     * @example
     * // Create one AUDIT_LOGS
     * const AUDIT_LOGS = await prisma.aUDIT_LOGS.create({
     *   data: {
     *     // ... data to create a AUDIT_LOGS
     *   }
     * })
     * 
     */
    create<T extends AUDIT_LOGSCreateArgs>(args: SelectSubset<T, AUDIT_LOGSCreateArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AUDIT_LOGS.
     * @param {AUDIT_LOGSCreateManyArgs} args - Arguments to create many AUDIT_LOGS.
     * @example
     * // Create many AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AUDIT_LOGSCreateManyArgs>(args?: SelectSubset<T, AUDIT_LOGSCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AUDIT_LOGS.
     * @param {AUDIT_LOGSDeleteArgs} args - Arguments to delete one AUDIT_LOGS.
     * @example
     * // Delete one AUDIT_LOGS
     * const AUDIT_LOGS = await prisma.aUDIT_LOGS.delete({
     *   where: {
     *     // ... filter to delete one AUDIT_LOGS
     *   }
     * })
     * 
     */
    delete<T extends AUDIT_LOGSDeleteArgs>(args: SelectSubset<T, AUDIT_LOGSDeleteArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AUDIT_LOGS.
     * @param {AUDIT_LOGSUpdateArgs} args - Arguments to update one AUDIT_LOGS.
     * @example
     * // Update one AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AUDIT_LOGSUpdateArgs>(args: SelectSubset<T, AUDIT_LOGSUpdateArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AUDIT_LOGS.
     * @param {AUDIT_LOGSDeleteManyArgs} args - Arguments to filter AUDIT_LOGS to delete.
     * @example
     * // Delete a few AUDIT_LOGS
     * const { count } = await prisma.aUDIT_LOGS.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AUDIT_LOGSDeleteManyArgs>(args?: SelectSubset<T, AUDIT_LOGSDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AUDIT_LOGS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AUDIT_LOGSUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AUDIT_LOGSUpdateManyArgs>(args: SelectSubset<T, AUDIT_LOGSUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AUDIT_LOGS.
     * @param {AUDIT_LOGSUpsertArgs} args - Arguments to update or create a AUDIT_LOGS.
     * @example
     * // Update or create a AUDIT_LOGS
     * const aUDIT_LOGS = await prisma.aUDIT_LOGS.upsert({
     *   create: {
     *     // ... data to create a AUDIT_LOGS
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AUDIT_LOGS we want to update
     *   }
     * })
     */
    upsert<T extends AUDIT_LOGSUpsertArgs>(args: SelectSubset<T, AUDIT_LOGSUpsertArgs<ExtArgs>>): Prisma__AUDIT_LOGSClient<$Result.GetResult<Prisma.$AUDIT_LOGSPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AUDIT_LOGS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AUDIT_LOGSCountArgs} args - Arguments to filter AUDIT_LOGS to count.
     * @example
     * // Count the number of AUDIT_LOGS
     * const count = await prisma.aUDIT_LOGS.count({
     *   where: {
     *     // ... the filter for the AUDIT_LOGS we want to count
     *   }
     * })
    **/
    count<T extends AUDIT_LOGSCountArgs>(
      args?: Subset<T, AUDIT_LOGSCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AUDIT_LOGSCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AUDIT_LOGS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AUDIT_LOGSAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AUDIT_LOGSAggregateArgs>(args: Subset<T, AUDIT_LOGSAggregateArgs>): Prisma.PrismaPromise<GetAUDIT_LOGSAggregateType<T>>

    /**
     * Group by AUDIT_LOGS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AUDIT_LOGSGroupByArgs} args - Group by arguments.
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
      T extends AUDIT_LOGSGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AUDIT_LOGSGroupByArgs['orderBy'] }
        : { orderBy?: AUDIT_LOGSGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AUDIT_LOGSGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAUDIT_LOGSGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AUDIT_LOGS model
   */
  readonly fields: AUDIT_LOGSFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AUDIT_LOGS.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AUDIT_LOGSClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AUDIT_LOGS model
   */
  interface AUDIT_LOGSFieldRefs {
    readonly id: FieldRef<"AUDIT_LOGS", 'String'>
    readonly timestamp: FieldRef<"AUDIT_LOGS", 'DateTime'>
    readonly actor_type: FieldRef<"AUDIT_LOGS", 'String'>
    readonly actor_id: FieldRef<"AUDIT_LOGS", 'String'>
    readonly action: FieldRef<"AUDIT_LOGS", 'String'>
    readonly target_id: FieldRef<"AUDIT_LOGS", 'String'>
    readonly status: FieldRef<"AUDIT_LOGS", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AUDIT_LOGS findUnique
   */
  export type AUDIT_LOGSFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * Filter, which AUDIT_LOGS to fetch.
     */
    where: AUDIT_LOGSWhereUniqueInput
  }

  /**
   * AUDIT_LOGS findUniqueOrThrow
   */
  export type AUDIT_LOGSFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * Filter, which AUDIT_LOGS to fetch.
     */
    where: AUDIT_LOGSWhereUniqueInput
  }

  /**
   * AUDIT_LOGS findFirst
   */
  export type AUDIT_LOGSFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * Filter, which AUDIT_LOGS to fetch.
     */
    where?: AUDIT_LOGSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AUDIT_LOGS to fetch.
     */
    orderBy?: AUDIT_LOGSOrderByWithRelationInput | AUDIT_LOGSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AUDIT_LOGS.
     */
    cursor?: AUDIT_LOGSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AUDIT_LOGS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AUDIT_LOGS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AUDIT_LOGS.
     */
    distinct?: AUDIT_LOGSScalarFieldEnum | AUDIT_LOGSScalarFieldEnum[]
  }

  /**
   * AUDIT_LOGS findFirstOrThrow
   */
  export type AUDIT_LOGSFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * Filter, which AUDIT_LOGS to fetch.
     */
    where?: AUDIT_LOGSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AUDIT_LOGS to fetch.
     */
    orderBy?: AUDIT_LOGSOrderByWithRelationInput | AUDIT_LOGSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AUDIT_LOGS.
     */
    cursor?: AUDIT_LOGSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AUDIT_LOGS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AUDIT_LOGS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AUDIT_LOGS.
     */
    distinct?: AUDIT_LOGSScalarFieldEnum | AUDIT_LOGSScalarFieldEnum[]
  }

  /**
   * AUDIT_LOGS findMany
   */
  export type AUDIT_LOGSFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * Filter, which AUDIT_LOGS to fetch.
     */
    where?: AUDIT_LOGSWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AUDIT_LOGS to fetch.
     */
    orderBy?: AUDIT_LOGSOrderByWithRelationInput | AUDIT_LOGSOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AUDIT_LOGS.
     */
    cursor?: AUDIT_LOGSWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AUDIT_LOGS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AUDIT_LOGS.
     */
    skip?: number
    distinct?: AUDIT_LOGSScalarFieldEnum | AUDIT_LOGSScalarFieldEnum[]
  }

  /**
   * AUDIT_LOGS create
   */
  export type AUDIT_LOGSCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * The data needed to create a AUDIT_LOGS.
     */
    data?: XOR<AUDIT_LOGSCreateInput, AUDIT_LOGSUncheckedCreateInput>
  }

  /**
   * AUDIT_LOGS createMany
   */
  export type AUDIT_LOGSCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AUDIT_LOGS.
     */
    data: AUDIT_LOGSCreateManyInput | AUDIT_LOGSCreateManyInput[]
  }

  /**
   * AUDIT_LOGS update
   */
  export type AUDIT_LOGSUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * The data needed to update a AUDIT_LOGS.
     */
    data: XOR<AUDIT_LOGSUpdateInput, AUDIT_LOGSUncheckedUpdateInput>
    /**
     * Choose, which AUDIT_LOGS to update.
     */
    where: AUDIT_LOGSWhereUniqueInput
  }

  /**
   * AUDIT_LOGS updateMany
   */
  export type AUDIT_LOGSUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AUDIT_LOGS.
     */
    data: XOR<AUDIT_LOGSUpdateManyMutationInput, AUDIT_LOGSUncheckedUpdateManyInput>
    /**
     * Filter which AUDIT_LOGS to update
     */
    where?: AUDIT_LOGSWhereInput
    /**
     * Limit how many AUDIT_LOGS to update.
     */
    limit?: number
  }

  /**
   * AUDIT_LOGS upsert
   */
  export type AUDIT_LOGSUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * The filter to search for the AUDIT_LOGS to update in case it exists.
     */
    where: AUDIT_LOGSWhereUniqueInput
    /**
     * In case the AUDIT_LOGS found by the `where` argument doesn't exist, create a new AUDIT_LOGS with this data.
     */
    create: XOR<AUDIT_LOGSCreateInput, AUDIT_LOGSUncheckedCreateInput>
    /**
     * In case the AUDIT_LOGS was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AUDIT_LOGSUpdateInput, AUDIT_LOGSUncheckedUpdateInput>
  }

  /**
   * AUDIT_LOGS delete
   */
  export type AUDIT_LOGSDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
    /**
     * Filter which AUDIT_LOGS to delete.
     */
    where: AUDIT_LOGSWhereUniqueInput
  }

  /**
   * AUDIT_LOGS deleteMany
   */
  export type AUDIT_LOGSDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AUDIT_LOGS to delete
     */
    where?: AUDIT_LOGSWhereInput
    /**
     * Limit how many AUDIT_LOGS to delete.
     */
    limit?: number
  }

  /**
   * AUDIT_LOGS without action
   */
  export type AUDIT_LOGSDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AUDIT_LOGS
     */
    select?: AUDIT_LOGSSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AUDIT_LOGS
     */
    omit?: AUDIT_LOGSOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    CustomerID: 'CustomerID',
    FirstName: 'FirstName',
    LastName: 'LastName',
    Email: 'Email',
    ContactNumber: 'ContactNumber',
    DateOfBirth: 'DateOfBirth',
    AddressLine1: 'AddressLine1',
    AddressLine2: 'AddressLine2',
    City: 'City',
    State: 'State',
    ZipCode: 'ZipCode',
    PasswordHash: 'PasswordHash'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const OfficerScalarFieldEnum: {
    OfficerID: 'OfficerID',
    Username: 'Username',
    LastName: 'LastName',
    FirstName: 'FirstName',
    PasswordHash: 'PasswordHash'
  };

  export type OfficerScalarFieldEnum = (typeof OfficerScalarFieldEnum)[keyof typeof OfficerScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    AdminID: 'AdminID',
    Username: 'Username',
    FirstName: 'FirstName',
    LastName: 'LastName',
    PasswordHash: 'PasswordHash'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    AccountID: 'AccountID',
    CustomerID: 'CustomerID',
    Status: 'Status',
    Balance: 'Balance',
    AccountType: 'AccountType',
    MonthlyFee: 'MonthlyFee',
    DailyATMLimit: 'DailyATMLimit',
    DailyPurchaseLimit: 'DailyPurchaseLimit',
    OverdraftProtection: 'OverdraftProtection'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const TransferScalarFieldEnum: {
    TransferID: 'TransferID',
    ToAccountID: 'ToAccountID',
    FromAccountID: 'FromAccountID',
    Amount: 'Amount',
    Description: 'Description',
    CreatedAt: 'CreatedAt',
    UpdatedAt: 'UpdatedAt',
    Status: 'Status',
    TransferType: 'TransferType'
  };

  export type TransferScalarFieldEnum = (typeof TransferScalarFieldEnum)[keyof typeof TransferScalarFieldEnum]


  export const UtilitiesScalarFieldEnum: {
    UtilityID: 'UtilityID',
    AccountName: 'AccountName',
    AccountNumber: 'AccountNumber'
  };

  export type UtilitiesScalarFieldEnum = (typeof UtilitiesScalarFieldEnum)[keyof typeof UtilitiesScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    PaymentID: 'PaymentID',
    AccountID: 'AccountID',
    UtilityID: 'UtilityID',
    Amount: 'Amount',
    Timestamp: 'Timestamp',
    Description: 'Description'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const AUDIT_LOGSScalarFieldEnum: {
    id: 'id',
    timestamp: 'timestamp',
    actor_type: 'actor_type',
    actor_id: 'actor_id',
    action: 'action',
    target_id: 'target_id',
    status: 'status'
  };

  export type AUDIT_LOGSScalarFieldEnum = (typeof AUDIT_LOGSScalarFieldEnum)[keyof typeof AUDIT_LOGSScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    CustomerID?: StringFilter<"Customer"> | string
    FirstName?: StringNullableFilter<"Customer"> | string | null
    LastName?: StringNullableFilter<"Customer"> | string | null
    Email?: StringNullableFilter<"Customer"> | string | null
    ContactNumber?: StringNullableFilter<"Customer"> | string | null
    DateOfBirth?: DateTimeNullableFilter<"Customer"> | Date | string | null
    AddressLine1?: StringNullableFilter<"Customer"> | string | null
    AddressLine2?: StringNullableFilter<"Customer"> | string | null
    City?: StringNullableFilter<"Customer"> | string | null
    State?: StringNullableFilter<"Customer"> | string | null
    ZipCode?: StringNullableFilter<"Customer"> | string | null
    PasswordHash?: StringNullableFilter<"Customer"> | string | null
    accounts?: AccountListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    CustomerID?: SortOrder
    FirstName?: SortOrderInput | SortOrder
    LastName?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    ContactNumber?: SortOrderInput | SortOrder
    DateOfBirth?: SortOrderInput | SortOrder
    AddressLine1?: SortOrderInput | SortOrder
    AddressLine2?: SortOrderInput | SortOrder
    City?: SortOrderInput | SortOrder
    State?: SortOrderInput | SortOrder
    ZipCode?: SortOrderInput | SortOrder
    PasswordHash?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    CustomerID?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    FirstName?: StringNullableFilter<"Customer"> | string | null
    LastName?: StringNullableFilter<"Customer"> | string | null
    Email?: StringNullableFilter<"Customer"> | string | null
    ContactNumber?: StringNullableFilter<"Customer"> | string | null
    DateOfBirth?: DateTimeNullableFilter<"Customer"> | Date | string | null
    AddressLine1?: StringNullableFilter<"Customer"> | string | null
    AddressLine2?: StringNullableFilter<"Customer"> | string | null
    City?: StringNullableFilter<"Customer"> | string | null
    State?: StringNullableFilter<"Customer"> | string | null
    ZipCode?: StringNullableFilter<"Customer"> | string | null
    PasswordHash?: StringNullableFilter<"Customer"> | string | null
    accounts?: AccountListRelationFilter
  }, "CustomerID">

  export type CustomerOrderByWithAggregationInput = {
    CustomerID?: SortOrder
    FirstName?: SortOrderInput | SortOrder
    LastName?: SortOrderInput | SortOrder
    Email?: SortOrderInput | SortOrder
    ContactNumber?: SortOrderInput | SortOrder
    DateOfBirth?: SortOrderInput | SortOrder
    AddressLine1?: SortOrderInput | SortOrder
    AddressLine2?: SortOrderInput | SortOrder
    City?: SortOrderInput | SortOrder
    State?: SortOrderInput | SortOrder
    ZipCode?: SortOrderInput | SortOrder
    PasswordHash?: SortOrderInput | SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    CustomerID?: StringWithAggregatesFilter<"Customer"> | string
    FirstName?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    LastName?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    Email?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    ContactNumber?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    DateOfBirth?: DateTimeNullableWithAggregatesFilter<"Customer"> | Date | string | null
    AddressLine1?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    AddressLine2?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    City?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    State?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    ZipCode?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    PasswordHash?: StringNullableWithAggregatesFilter<"Customer"> | string | null
  }

  export type OfficerWhereInput = {
    AND?: OfficerWhereInput | OfficerWhereInput[]
    OR?: OfficerWhereInput[]
    NOT?: OfficerWhereInput | OfficerWhereInput[]
    OfficerID?: StringFilter<"Officer"> | string
    Username?: StringNullableFilter<"Officer"> | string | null
    LastName?: StringNullableFilter<"Officer"> | string | null
    FirstName?: StringNullableFilter<"Officer"> | string | null
    PasswordHash?: StringNullableFilter<"Officer"> | string | null
  }

  export type OfficerOrderByWithRelationInput = {
    OfficerID?: SortOrder
    Username?: SortOrderInput | SortOrder
    LastName?: SortOrderInput | SortOrder
    FirstName?: SortOrderInput | SortOrder
    PasswordHash?: SortOrderInput | SortOrder
  }

  export type OfficerWhereUniqueInput = Prisma.AtLeast<{
    OfficerID?: string
    Username?: string
    AND?: OfficerWhereInput | OfficerWhereInput[]
    OR?: OfficerWhereInput[]
    NOT?: OfficerWhereInput | OfficerWhereInput[]
    LastName?: StringNullableFilter<"Officer"> | string | null
    FirstName?: StringNullableFilter<"Officer"> | string | null
    PasswordHash?: StringNullableFilter<"Officer"> | string | null
  }, "OfficerID" | "Username">

  export type OfficerOrderByWithAggregationInput = {
    OfficerID?: SortOrder
    Username?: SortOrderInput | SortOrder
    LastName?: SortOrderInput | SortOrder
    FirstName?: SortOrderInput | SortOrder
    PasswordHash?: SortOrderInput | SortOrder
    _count?: OfficerCountOrderByAggregateInput
    _max?: OfficerMaxOrderByAggregateInput
    _min?: OfficerMinOrderByAggregateInput
  }

  export type OfficerScalarWhereWithAggregatesInput = {
    AND?: OfficerScalarWhereWithAggregatesInput | OfficerScalarWhereWithAggregatesInput[]
    OR?: OfficerScalarWhereWithAggregatesInput[]
    NOT?: OfficerScalarWhereWithAggregatesInput | OfficerScalarWhereWithAggregatesInput[]
    OfficerID?: StringWithAggregatesFilter<"Officer"> | string
    Username?: StringNullableWithAggregatesFilter<"Officer"> | string | null
    LastName?: StringNullableWithAggregatesFilter<"Officer"> | string | null
    FirstName?: StringNullableWithAggregatesFilter<"Officer"> | string | null
    PasswordHash?: StringNullableWithAggregatesFilter<"Officer"> | string | null
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    AdminID?: StringFilter<"Admin"> | string
    Username?: StringNullableFilter<"Admin"> | string | null
    FirstName?: StringNullableFilter<"Admin"> | string | null
    LastName?: StringNullableFilter<"Admin"> | string | null
    PasswordHash?: StringNullableFilter<"Admin"> | string | null
  }

  export type AdminOrderByWithRelationInput = {
    AdminID?: SortOrder
    Username?: SortOrderInput | SortOrder
    FirstName?: SortOrderInput | SortOrder
    LastName?: SortOrderInput | SortOrder
    PasswordHash?: SortOrderInput | SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    AdminID?: string
    Username?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    FirstName?: StringNullableFilter<"Admin"> | string | null
    LastName?: StringNullableFilter<"Admin"> | string | null
    PasswordHash?: StringNullableFilter<"Admin"> | string | null
  }, "AdminID" | "Username">

  export type AdminOrderByWithAggregationInput = {
    AdminID?: SortOrder
    Username?: SortOrderInput | SortOrder
    FirstName?: SortOrderInput | SortOrder
    LastName?: SortOrderInput | SortOrder
    PasswordHash?: SortOrderInput | SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    AdminID?: StringWithAggregatesFilter<"Admin"> | string
    Username?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    FirstName?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    LastName?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    PasswordHash?: StringNullableWithAggregatesFilter<"Admin"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    AccountID?: StringFilter<"Account"> | string
    CustomerID?: StringNullableFilter<"Account"> | string | null
    Status?: StringNullableFilter<"Account"> | string | null
    Balance?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    AccountType?: StringNullableFilter<"Account"> | string | null
    MonthlyFee?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: BoolNullableFilter<"Account"> | boolean | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    payments?: PaymentListRelationFilter
    transfersFrom?: TransferListRelationFilter
    transfersTo?: TransferListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    AccountID?: SortOrder
    CustomerID?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    Balance?: SortOrderInput | SortOrder
    AccountType?: SortOrderInput | SortOrder
    MonthlyFee?: SortOrderInput | SortOrder
    DailyATMLimit?: SortOrderInput | SortOrder
    DailyPurchaseLimit?: SortOrderInput | SortOrder
    OverdraftProtection?: SortOrderInput | SortOrder
    customer?: CustomerOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
    transfersFrom?: TransferOrderByRelationAggregateInput
    transfersTo?: TransferOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    AccountID?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    CustomerID?: StringNullableFilter<"Account"> | string | null
    Status?: StringNullableFilter<"Account"> | string | null
    Balance?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    AccountType?: StringNullableFilter<"Account"> | string | null
    MonthlyFee?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: BoolNullableFilter<"Account"> | boolean | null
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
    payments?: PaymentListRelationFilter
    transfersFrom?: TransferListRelationFilter
    transfersTo?: TransferListRelationFilter
  }, "AccountID">

  export type AccountOrderByWithAggregationInput = {
    AccountID?: SortOrder
    CustomerID?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    Balance?: SortOrderInput | SortOrder
    AccountType?: SortOrderInput | SortOrder
    MonthlyFee?: SortOrderInput | SortOrder
    DailyATMLimit?: SortOrderInput | SortOrder
    DailyPurchaseLimit?: SortOrderInput | SortOrder
    OverdraftProtection?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    AccountID?: StringWithAggregatesFilter<"Account"> | string
    CustomerID?: StringNullableWithAggregatesFilter<"Account"> | string | null
    Status?: StringNullableWithAggregatesFilter<"Account"> | string | null
    Balance?: DecimalNullableWithAggregatesFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    AccountType?: StringNullableWithAggregatesFilter<"Account"> | string | null
    MonthlyFee?: DecimalNullableWithAggregatesFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: DecimalNullableWithAggregatesFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: DecimalNullableWithAggregatesFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: BoolNullableWithAggregatesFilter<"Account"> | boolean | null
  }

  export type TransferWhereInput = {
    AND?: TransferWhereInput | TransferWhereInput[]
    OR?: TransferWhereInput[]
    NOT?: TransferWhereInput | TransferWhereInput[]
    TransferID?: StringFilter<"Transfer"> | string
    ToAccountID?: StringNullableFilter<"Transfer"> | string | null
    FromAccountID?: StringNullableFilter<"Transfer"> | string | null
    Amount?: DecimalNullableFilter<"Transfer"> | Decimal | DecimalJsLike | number | string | null
    Description?: StringNullableFilter<"Transfer"> | string | null
    CreatedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    UpdatedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    Status?: StringNullableFilter<"Transfer"> | string | null
    TransferType?: StringNullableFilter<"Transfer"> | string | null
    fromAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    toAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }

  export type TransferOrderByWithRelationInput = {
    TransferID?: SortOrder
    ToAccountID?: SortOrderInput | SortOrder
    FromAccountID?: SortOrderInput | SortOrder
    Amount?: SortOrderInput | SortOrder
    Description?: SortOrderInput | SortOrder
    CreatedAt?: SortOrderInput | SortOrder
    UpdatedAt?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    TransferType?: SortOrderInput | SortOrder
    fromAccount?: AccountOrderByWithRelationInput
    toAccount?: AccountOrderByWithRelationInput
  }

  export type TransferWhereUniqueInput = Prisma.AtLeast<{
    TransferID?: string
    AND?: TransferWhereInput | TransferWhereInput[]
    OR?: TransferWhereInput[]
    NOT?: TransferWhereInput | TransferWhereInput[]
    ToAccountID?: StringNullableFilter<"Transfer"> | string | null
    FromAccountID?: StringNullableFilter<"Transfer"> | string | null
    Amount?: DecimalNullableFilter<"Transfer"> | Decimal | DecimalJsLike | number | string | null
    Description?: StringNullableFilter<"Transfer"> | string | null
    CreatedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    UpdatedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    Status?: StringNullableFilter<"Transfer"> | string | null
    TransferType?: StringNullableFilter<"Transfer"> | string | null
    fromAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    toAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }, "TransferID">

  export type TransferOrderByWithAggregationInput = {
    TransferID?: SortOrder
    ToAccountID?: SortOrderInput | SortOrder
    FromAccountID?: SortOrderInput | SortOrder
    Amount?: SortOrderInput | SortOrder
    Description?: SortOrderInput | SortOrder
    CreatedAt?: SortOrderInput | SortOrder
    UpdatedAt?: SortOrderInput | SortOrder
    Status?: SortOrderInput | SortOrder
    TransferType?: SortOrderInput | SortOrder
    _count?: TransferCountOrderByAggregateInput
    _avg?: TransferAvgOrderByAggregateInput
    _max?: TransferMaxOrderByAggregateInput
    _min?: TransferMinOrderByAggregateInput
    _sum?: TransferSumOrderByAggregateInput
  }

  export type TransferScalarWhereWithAggregatesInput = {
    AND?: TransferScalarWhereWithAggregatesInput | TransferScalarWhereWithAggregatesInput[]
    OR?: TransferScalarWhereWithAggregatesInput[]
    NOT?: TransferScalarWhereWithAggregatesInput | TransferScalarWhereWithAggregatesInput[]
    TransferID?: StringWithAggregatesFilter<"Transfer"> | string
    ToAccountID?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    FromAccountID?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    Amount?: DecimalNullableWithAggregatesFilter<"Transfer"> | Decimal | DecimalJsLike | number | string | null
    Description?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    CreatedAt?: DateTimeNullableWithAggregatesFilter<"Transfer"> | Date | string | null
    UpdatedAt?: DateTimeNullableWithAggregatesFilter<"Transfer"> | Date | string | null
    Status?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
    TransferType?: StringNullableWithAggregatesFilter<"Transfer"> | string | null
  }

  export type UtilitiesWhereInput = {
    AND?: UtilitiesWhereInput | UtilitiesWhereInput[]
    OR?: UtilitiesWhereInput[]
    NOT?: UtilitiesWhereInput | UtilitiesWhereInput[]
    UtilityID?: StringFilter<"Utilities"> | string
    AccountName?: StringNullableFilter<"Utilities"> | string | null
    AccountNumber?: StringNullableFilter<"Utilities"> | string | null
    payments?: PaymentListRelationFilter
  }

  export type UtilitiesOrderByWithRelationInput = {
    UtilityID?: SortOrder
    AccountName?: SortOrderInput | SortOrder
    AccountNumber?: SortOrderInput | SortOrder
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type UtilitiesWhereUniqueInput = Prisma.AtLeast<{
    UtilityID?: string
    AND?: UtilitiesWhereInput | UtilitiesWhereInput[]
    OR?: UtilitiesWhereInput[]
    NOT?: UtilitiesWhereInput | UtilitiesWhereInput[]
    AccountName?: StringNullableFilter<"Utilities"> | string | null
    AccountNumber?: StringNullableFilter<"Utilities"> | string | null
    payments?: PaymentListRelationFilter
  }, "UtilityID">

  export type UtilitiesOrderByWithAggregationInput = {
    UtilityID?: SortOrder
    AccountName?: SortOrderInput | SortOrder
    AccountNumber?: SortOrderInput | SortOrder
    _count?: UtilitiesCountOrderByAggregateInput
    _max?: UtilitiesMaxOrderByAggregateInput
    _min?: UtilitiesMinOrderByAggregateInput
  }

  export type UtilitiesScalarWhereWithAggregatesInput = {
    AND?: UtilitiesScalarWhereWithAggregatesInput | UtilitiesScalarWhereWithAggregatesInput[]
    OR?: UtilitiesScalarWhereWithAggregatesInput[]
    NOT?: UtilitiesScalarWhereWithAggregatesInput | UtilitiesScalarWhereWithAggregatesInput[]
    UtilityID?: StringWithAggregatesFilter<"Utilities"> | string
    AccountName?: StringNullableWithAggregatesFilter<"Utilities"> | string | null
    AccountNumber?: StringNullableWithAggregatesFilter<"Utilities"> | string | null
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    PaymentID?: StringFilter<"Payment"> | string
    AccountID?: StringNullableFilter<"Payment"> | string | null
    UtilityID?: StringNullableFilter<"Payment"> | string | null
    Amount?: DecimalNullableFilter<"Payment"> | Decimal | DecimalJsLike | number | string | null
    Timestamp?: DateTimeNullableFilter<"Payment"> | Date | string | null
    Description?: StringNullableFilter<"Payment"> | string | null
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    utility?: XOR<UtilitiesNullableScalarRelationFilter, UtilitiesWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    PaymentID?: SortOrder
    AccountID?: SortOrderInput | SortOrder
    UtilityID?: SortOrderInput | SortOrder
    Amount?: SortOrderInput | SortOrder
    Timestamp?: SortOrderInput | SortOrder
    Description?: SortOrderInput | SortOrder
    account?: AccountOrderByWithRelationInput
    utility?: UtilitiesOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    PaymentID?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    AccountID?: StringNullableFilter<"Payment"> | string | null
    UtilityID?: StringNullableFilter<"Payment"> | string | null
    Amount?: DecimalNullableFilter<"Payment"> | Decimal | DecimalJsLike | number | string | null
    Timestamp?: DateTimeNullableFilter<"Payment"> | Date | string | null
    Description?: StringNullableFilter<"Payment"> | string | null
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    utility?: XOR<UtilitiesNullableScalarRelationFilter, UtilitiesWhereInput> | null
  }, "PaymentID">

  export type PaymentOrderByWithAggregationInput = {
    PaymentID?: SortOrder
    AccountID?: SortOrderInput | SortOrder
    UtilityID?: SortOrderInput | SortOrder
    Amount?: SortOrderInput | SortOrder
    Timestamp?: SortOrderInput | SortOrder
    Description?: SortOrderInput | SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    PaymentID?: StringWithAggregatesFilter<"Payment"> | string
    AccountID?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    UtilityID?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    Amount?: DecimalNullableWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string | null
    Timestamp?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    Description?: StringNullableWithAggregatesFilter<"Payment"> | string | null
  }

  export type AUDIT_LOGSWhereInput = {
    AND?: AUDIT_LOGSWhereInput | AUDIT_LOGSWhereInput[]
    OR?: AUDIT_LOGSWhereInput[]
    NOT?: AUDIT_LOGSWhereInput | AUDIT_LOGSWhereInput[]
    id?: StringFilter<"AUDIT_LOGS"> | string
    timestamp?: DateTimeNullableFilter<"AUDIT_LOGS"> | Date | string | null
    actor_type?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    actor_id?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    action?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    target_id?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    status?: StringNullableFilter<"AUDIT_LOGS"> | string | null
  }

  export type AUDIT_LOGSOrderByWithRelationInput = {
    id?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    actor_type?: SortOrderInput | SortOrder
    actor_id?: SortOrderInput | SortOrder
    action?: SortOrderInput | SortOrder
    target_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
  }

  export type AUDIT_LOGSWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AUDIT_LOGSWhereInput | AUDIT_LOGSWhereInput[]
    OR?: AUDIT_LOGSWhereInput[]
    NOT?: AUDIT_LOGSWhereInput | AUDIT_LOGSWhereInput[]
    timestamp?: DateTimeNullableFilter<"AUDIT_LOGS"> | Date | string | null
    actor_type?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    actor_id?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    action?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    target_id?: StringNullableFilter<"AUDIT_LOGS"> | string | null
    status?: StringNullableFilter<"AUDIT_LOGS"> | string | null
  }, "id">

  export type AUDIT_LOGSOrderByWithAggregationInput = {
    id?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    actor_type?: SortOrderInput | SortOrder
    actor_id?: SortOrderInput | SortOrder
    action?: SortOrderInput | SortOrder
    target_id?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    _count?: AUDIT_LOGSCountOrderByAggregateInput
    _max?: AUDIT_LOGSMaxOrderByAggregateInput
    _min?: AUDIT_LOGSMinOrderByAggregateInput
  }

  export type AUDIT_LOGSScalarWhereWithAggregatesInput = {
    AND?: AUDIT_LOGSScalarWhereWithAggregatesInput | AUDIT_LOGSScalarWhereWithAggregatesInput[]
    OR?: AUDIT_LOGSScalarWhereWithAggregatesInput[]
    NOT?: AUDIT_LOGSScalarWhereWithAggregatesInput | AUDIT_LOGSScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AUDIT_LOGS"> | string
    timestamp?: DateTimeNullableWithAggregatesFilter<"AUDIT_LOGS"> | Date | string | null
    actor_type?: StringNullableWithAggregatesFilter<"AUDIT_LOGS"> | string | null
    actor_id?: StringNullableWithAggregatesFilter<"AUDIT_LOGS"> | string | null
    action?: StringNullableWithAggregatesFilter<"AUDIT_LOGS"> | string | null
    target_id?: StringNullableWithAggregatesFilter<"AUDIT_LOGS"> | string | null
    status?: StringNullableWithAggregatesFilter<"AUDIT_LOGS"> | string | null
  }

  export type CustomerCreateInput = {
    CustomerID?: string
    FirstName?: string | null
    LastName?: string | null
    Email?: string | null
    ContactNumber?: string | null
    DateOfBirth?: Date | string | null
    AddressLine1?: string | null
    AddressLine2?: string | null
    City?: string | null
    State?: string | null
    ZipCode?: string | null
    PasswordHash?: string | null
    accounts?: AccountCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    CustomerID?: string
    FirstName?: string | null
    LastName?: string | null
    Email?: string | null
    ContactNumber?: string | null
    DateOfBirth?: Date | string | null
    AddressLine1?: string | null
    AddressLine2?: string | null
    City?: string | null
    State?: string | null
    ZipCode?: string | null
    PasswordHash?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    CustomerID?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    AddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    AddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    City?: NullableStringFieldUpdateOperationsInput | string | null
    State?: NullableStringFieldUpdateOperationsInput | string | null
    ZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    CustomerID?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    AddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    AddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    City?: NullableStringFieldUpdateOperationsInput | string | null
    State?: NullableStringFieldUpdateOperationsInput | string | null
    ZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    CustomerID?: string
    FirstName?: string | null
    LastName?: string | null
    Email?: string | null
    ContactNumber?: string | null
    DateOfBirth?: Date | string | null
    AddressLine1?: string | null
    AddressLine2?: string | null
    City?: string | null
    State?: string | null
    ZipCode?: string | null
    PasswordHash?: string | null
  }

  export type CustomerUpdateManyMutationInput = {
    CustomerID?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    AddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    AddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    City?: NullableStringFieldUpdateOperationsInput | string | null
    State?: NullableStringFieldUpdateOperationsInput | string | null
    ZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerUncheckedUpdateManyInput = {
    CustomerID?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    AddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    AddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    City?: NullableStringFieldUpdateOperationsInput | string | null
    State?: NullableStringFieldUpdateOperationsInput | string | null
    ZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OfficerCreateInput = {
    OfficerID?: string
    Username?: string | null
    LastName?: string | null
    FirstName?: string | null
    PasswordHash?: string | null
  }

  export type OfficerUncheckedCreateInput = {
    OfficerID?: string
    Username?: string | null
    LastName?: string | null
    FirstName?: string | null
    PasswordHash?: string | null
  }

  export type OfficerUpdateInput = {
    OfficerID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OfficerUncheckedUpdateInput = {
    OfficerID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OfficerCreateManyInput = {
    OfficerID?: string
    Username?: string | null
    LastName?: string | null
    FirstName?: string | null
    PasswordHash?: string | null
  }

  export type OfficerUpdateManyMutationInput = {
    OfficerID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OfficerUncheckedUpdateManyInput = {
    OfficerID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminCreateInput = {
    AdminID?: string
    Username?: string | null
    FirstName?: string | null
    LastName?: string | null
    PasswordHash?: string | null
  }

  export type AdminUncheckedCreateInput = {
    AdminID?: string
    Username?: string | null
    FirstName?: string | null
    LastName?: string | null
    PasswordHash?: string | null
  }

  export type AdminUpdateInput = {
    AdminID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminUncheckedUpdateInput = {
    AdminID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminCreateManyInput = {
    AdminID?: string
    Username?: string | null
    FirstName?: string | null
    LastName?: string | null
    PasswordHash?: string | null
  }

  export type AdminUpdateManyMutationInput = {
    AdminID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminUncheckedUpdateManyInput = {
    AdminID?: StringFieldUpdateOperationsInput | string
    Username?: NullableStringFieldUpdateOperationsInput | string | null
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    AccountID?: string
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    customer?: CustomerCreateNestedOneWithoutAccountsInput
    payments?: PaymentCreateNestedManyWithoutAccountInput
    transfersFrom?: TransferCreateNestedManyWithoutFromAccountInput
    transfersTo?: TransferCreateNestedManyWithoutToAccountInput
  }

  export type AccountUncheckedCreateInput = {
    AccountID?: string
    CustomerID?: string | null
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    payments?: PaymentUncheckedCreateNestedManyWithoutAccountInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromAccountInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type AccountUpdateInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    customer?: CustomerUpdateOneWithoutAccountsNestedInput
    payments?: PaymentUpdateManyWithoutAccountNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromAccountNestedInput
    transfersTo?: TransferUpdateManyWithoutToAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    CustomerID?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    payments?: PaymentUncheckedUpdateManyWithoutAccountNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromAccountNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type AccountCreateManyInput = {
    AccountID?: string
    CustomerID?: string | null
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
  }

  export type AccountUpdateManyMutationInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type AccountUncheckedUpdateManyInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    CustomerID?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type TransferCreateInput = {
    TransferID?: string
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
    fromAccount?: AccountCreateNestedOneWithoutTransfersFromInput
    toAccount?: AccountCreateNestedOneWithoutTransfersToInput
  }

  export type TransferUncheckedCreateInput = {
    TransferID?: string
    ToAccountID?: string | null
    FromAccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
  }

  export type TransferUpdateInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
    fromAccount?: AccountUpdateOneWithoutTransfersFromNestedInput
    toAccount?: AccountUpdateOneWithoutTransfersToNestedInput
  }

  export type TransferUncheckedUpdateInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    ToAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    FromAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransferCreateManyInput = {
    TransferID?: string
    ToAccountID?: string | null
    FromAccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
  }

  export type TransferUpdateManyMutationInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransferUncheckedUpdateManyInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    ToAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    FromAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UtilitiesCreateInput = {
    UtilityID?: string
    AccountName?: string | null
    AccountNumber?: string | null
    payments?: PaymentCreateNestedManyWithoutUtilityInput
  }

  export type UtilitiesUncheckedCreateInput = {
    UtilityID?: string
    AccountName?: string | null
    AccountNumber?: string | null
    payments?: PaymentUncheckedCreateNestedManyWithoutUtilityInput
  }

  export type UtilitiesUpdateInput = {
    UtilityID?: StringFieldUpdateOperationsInput | string
    AccountName?: NullableStringFieldUpdateOperationsInput | string | null
    AccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    payments?: PaymentUpdateManyWithoutUtilityNestedInput
  }

  export type UtilitiesUncheckedUpdateInput = {
    UtilityID?: StringFieldUpdateOperationsInput | string
    AccountName?: NullableStringFieldUpdateOperationsInput | string | null
    AccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
    payments?: PaymentUncheckedUpdateManyWithoutUtilityNestedInput
  }

  export type UtilitiesCreateManyInput = {
    UtilityID?: string
    AccountName?: string | null
    AccountNumber?: string | null
  }

  export type UtilitiesUpdateManyMutationInput = {
    UtilityID?: StringFieldUpdateOperationsInput | string
    AccountName?: NullableStringFieldUpdateOperationsInput | string | null
    AccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UtilitiesUncheckedUpdateManyInput = {
    UtilityID?: StringFieldUpdateOperationsInput | string
    AccountName?: NullableStringFieldUpdateOperationsInput | string | null
    AccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentCreateInput = {
    PaymentID?: string
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
    account?: AccountCreateNestedOneWithoutPaymentsInput
    utility?: UtilitiesCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    PaymentID?: string
    AccountID?: string | null
    UtilityID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
  }

  export type PaymentUpdateInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    account?: AccountUpdateOneWithoutPaymentsNestedInput
    utility?: UtilitiesUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    AccountID?: NullableStringFieldUpdateOperationsInput | string | null
    UtilityID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentCreateManyInput = {
    PaymentID?: string
    AccountID?: string | null
    UtilityID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
  }

  export type PaymentUpdateManyMutationInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUncheckedUpdateManyInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    AccountID?: NullableStringFieldUpdateOperationsInput | string | null
    UtilityID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AUDIT_LOGSCreateInput = {
    id?: string
    timestamp?: Date | string | null
    actor_type?: string | null
    actor_id?: string | null
    action?: string | null
    target_id?: string | null
    status?: string | null
  }

  export type AUDIT_LOGSUncheckedCreateInput = {
    id?: string
    timestamp?: Date | string | null
    actor_type?: string | null
    actor_id?: string | null
    action?: string | null
    target_id?: string | null
    status?: string | null
  }

  export type AUDIT_LOGSUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actor_type?: NullableStringFieldUpdateOperationsInput | string | null
    actor_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AUDIT_LOGSUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actor_type?: NullableStringFieldUpdateOperationsInput | string | null
    actor_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AUDIT_LOGSCreateManyInput = {
    id?: string
    timestamp?: Date | string | null
    actor_type?: string | null
    actor_id?: string | null
    action?: string | null
    target_id?: string | null
    status?: string | null
  }

  export type AUDIT_LOGSUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actor_type?: NullableStringFieldUpdateOperationsInput | string | null
    actor_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AUDIT_LOGSUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actor_type?: NullableStringFieldUpdateOperationsInput | string | null
    actor_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    target_id?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    CustomerID?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    Email?: SortOrder
    ContactNumber?: SortOrder
    DateOfBirth?: SortOrder
    AddressLine1?: SortOrder
    AddressLine2?: SortOrder
    City?: SortOrder
    State?: SortOrder
    ZipCode?: SortOrder
    PasswordHash?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    CustomerID?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    Email?: SortOrder
    ContactNumber?: SortOrder
    DateOfBirth?: SortOrder
    AddressLine1?: SortOrder
    AddressLine2?: SortOrder
    City?: SortOrder
    State?: SortOrder
    ZipCode?: SortOrder
    PasswordHash?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    CustomerID?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    Email?: SortOrder
    ContactNumber?: SortOrder
    DateOfBirth?: SortOrder
    AddressLine1?: SortOrder
    AddressLine2?: SortOrder
    City?: SortOrder
    State?: SortOrder
    ZipCode?: SortOrder
    PasswordHash?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OfficerCountOrderByAggregateInput = {
    OfficerID?: SortOrder
    Username?: SortOrder
    LastName?: SortOrder
    FirstName?: SortOrder
    PasswordHash?: SortOrder
  }

  export type OfficerMaxOrderByAggregateInput = {
    OfficerID?: SortOrder
    Username?: SortOrder
    LastName?: SortOrder
    FirstName?: SortOrder
    PasswordHash?: SortOrder
  }

  export type OfficerMinOrderByAggregateInput = {
    OfficerID?: SortOrder
    Username?: SortOrder
    LastName?: SortOrder
    FirstName?: SortOrder
    PasswordHash?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    AdminID?: SortOrder
    Username?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    PasswordHash?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    AdminID?: SortOrder
    Username?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    PasswordHash?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    AdminID?: SortOrder
    Username?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    PasswordHash?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type TransferListRelationFilter = {
    every?: TransferWhereInput
    some?: TransferWhereInput
    none?: TransferWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    AccountID?: SortOrder
    CustomerID?: SortOrder
    Status?: SortOrder
    Balance?: SortOrder
    AccountType?: SortOrder
    MonthlyFee?: SortOrder
    DailyATMLimit?: SortOrder
    DailyPurchaseLimit?: SortOrder
    OverdraftProtection?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    Balance?: SortOrder
    MonthlyFee?: SortOrder
    DailyATMLimit?: SortOrder
    DailyPurchaseLimit?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    AccountID?: SortOrder
    CustomerID?: SortOrder
    Status?: SortOrder
    Balance?: SortOrder
    AccountType?: SortOrder
    MonthlyFee?: SortOrder
    DailyATMLimit?: SortOrder
    DailyPurchaseLimit?: SortOrder
    OverdraftProtection?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    AccountID?: SortOrder
    CustomerID?: SortOrder
    Status?: SortOrder
    Balance?: SortOrder
    AccountType?: SortOrder
    MonthlyFee?: SortOrder
    DailyATMLimit?: SortOrder
    DailyPurchaseLimit?: SortOrder
    OverdraftProtection?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    Balance?: SortOrder
    MonthlyFee?: SortOrder
    DailyATMLimit?: SortOrder
    DailyPurchaseLimit?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type AccountNullableScalarRelationFilter = {
    is?: AccountWhereInput | null
    isNot?: AccountWhereInput | null
  }

  export type TransferCountOrderByAggregateInput = {
    TransferID?: SortOrder
    ToAccountID?: SortOrder
    FromAccountID?: SortOrder
    Amount?: SortOrder
    Description?: SortOrder
    CreatedAt?: SortOrder
    UpdatedAt?: SortOrder
    Status?: SortOrder
    TransferType?: SortOrder
  }

  export type TransferAvgOrderByAggregateInput = {
    Amount?: SortOrder
  }

  export type TransferMaxOrderByAggregateInput = {
    TransferID?: SortOrder
    ToAccountID?: SortOrder
    FromAccountID?: SortOrder
    Amount?: SortOrder
    Description?: SortOrder
    CreatedAt?: SortOrder
    UpdatedAt?: SortOrder
    Status?: SortOrder
    TransferType?: SortOrder
  }

  export type TransferMinOrderByAggregateInput = {
    TransferID?: SortOrder
    ToAccountID?: SortOrder
    FromAccountID?: SortOrder
    Amount?: SortOrder
    Description?: SortOrder
    CreatedAt?: SortOrder
    UpdatedAt?: SortOrder
    Status?: SortOrder
    TransferType?: SortOrder
  }

  export type TransferSumOrderByAggregateInput = {
    Amount?: SortOrder
  }

  export type UtilitiesCountOrderByAggregateInput = {
    UtilityID?: SortOrder
    AccountName?: SortOrder
    AccountNumber?: SortOrder
  }

  export type UtilitiesMaxOrderByAggregateInput = {
    UtilityID?: SortOrder
    AccountName?: SortOrder
    AccountNumber?: SortOrder
  }

  export type UtilitiesMinOrderByAggregateInput = {
    UtilityID?: SortOrder
    AccountName?: SortOrder
    AccountNumber?: SortOrder
  }

  export type UtilitiesNullableScalarRelationFilter = {
    is?: UtilitiesWhereInput | null
    isNot?: UtilitiesWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    PaymentID?: SortOrder
    AccountID?: SortOrder
    UtilityID?: SortOrder
    Amount?: SortOrder
    Timestamp?: SortOrder
    Description?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    Amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    PaymentID?: SortOrder
    AccountID?: SortOrder
    UtilityID?: SortOrder
    Amount?: SortOrder
    Timestamp?: SortOrder
    Description?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    PaymentID?: SortOrder
    AccountID?: SortOrder
    UtilityID?: SortOrder
    Amount?: SortOrder
    Timestamp?: SortOrder
    Description?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    Amount?: SortOrder
  }

  export type AUDIT_LOGSCountOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    actor_type?: SortOrder
    actor_id?: SortOrder
    action?: SortOrder
    target_id?: SortOrder
    status?: SortOrder
  }

  export type AUDIT_LOGSMaxOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    actor_type?: SortOrder
    actor_id?: SortOrder
    action?: SortOrder
    target_id?: SortOrder
    status?: SortOrder
  }

  export type AUDIT_LOGSMinOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    actor_type?: SortOrder
    actor_id?: SortOrder
    action?: SortOrder
    target_id?: SortOrder
    status?: SortOrder
  }

  export type AccountCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AccountCreateWithoutCustomerInput, AccountUncheckedCreateWithoutCustomerInput> | AccountCreateWithoutCustomerInput[] | AccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutCustomerInput | AccountCreateOrConnectWithoutCustomerInput[]
    createMany?: AccountCreateManyCustomerInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<AccountCreateWithoutCustomerInput, AccountUncheckedCreateWithoutCustomerInput> | AccountCreateWithoutCustomerInput[] | AccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutCustomerInput | AccountCreateOrConnectWithoutCustomerInput[]
    createMany?: AccountCreateManyCustomerInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AccountCreateWithoutCustomerInput, AccountUncheckedCreateWithoutCustomerInput> | AccountCreateWithoutCustomerInput[] | AccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutCustomerInput | AccountCreateOrConnectWithoutCustomerInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutCustomerInput | AccountUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AccountCreateManyCustomerInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutCustomerInput | AccountUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutCustomerInput | AccountUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<AccountCreateWithoutCustomerInput, AccountUncheckedCreateWithoutCustomerInput> | AccountCreateWithoutCustomerInput[] | AccountUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutCustomerInput | AccountCreateOrConnectWithoutCustomerInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutCustomerInput | AccountUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: AccountCreateManyCustomerInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutCustomerInput | AccountUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutCustomerInput | AccountUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutAccountsInput = {
    create?: XOR<CustomerCreateWithoutAccountsInput, CustomerUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAccountsInput
    connect?: CustomerWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutAccountInput = {
    create?: XOR<PaymentCreateWithoutAccountInput, PaymentUncheckedCreateWithoutAccountInput> | PaymentCreateWithoutAccountInput[] | PaymentUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAccountInput | PaymentCreateOrConnectWithoutAccountInput[]
    createMany?: PaymentCreateManyAccountInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type TransferCreateNestedManyWithoutFromAccountInput = {
    create?: XOR<TransferCreateWithoutFromAccountInput, TransferUncheckedCreateWithoutFromAccountInput> | TransferCreateWithoutFromAccountInput[] | TransferUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromAccountInput | TransferCreateOrConnectWithoutFromAccountInput[]
    createMany?: TransferCreateManyFromAccountInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TransferCreateNestedManyWithoutToAccountInput = {
    create?: XOR<TransferCreateWithoutToAccountInput, TransferUncheckedCreateWithoutToAccountInput> | TransferCreateWithoutToAccountInput[] | TransferUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToAccountInput | TransferCreateOrConnectWithoutToAccountInput[]
    createMany?: TransferCreateManyToAccountInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<PaymentCreateWithoutAccountInput, PaymentUncheckedCreateWithoutAccountInput> | PaymentCreateWithoutAccountInput[] | PaymentUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAccountInput | PaymentCreateOrConnectWithoutAccountInput[]
    createMany?: PaymentCreateManyAccountInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type TransferUncheckedCreateNestedManyWithoutFromAccountInput = {
    create?: XOR<TransferCreateWithoutFromAccountInput, TransferUncheckedCreateWithoutFromAccountInput> | TransferCreateWithoutFromAccountInput[] | TransferUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromAccountInput | TransferCreateOrConnectWithoutFromAccountInput[]
    createMany?: TransferCreateManyFromAccountInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type TransferUncheckedCreateNestedManyWithoutToAccountInput = {
    create?: XOR<TransferCreateWithoutToAccountInput, TransferUncheckedCreateWithoutToAccountInput> | TransferCreateWithoutToAccountInput[] | TransferUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToAccountInput | TransferCreateOrConnectWithoutToAccountInput[]
    createMany?: TransferCreateManyToAccountInputEnvelope
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type CustomerUpdateOneWithoutAccountsNestedInput = {
    create?: XOR<CustomerCreateWithoutAccountsInput, CustomerUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutAccountsInput
    upsert?: CustomerUpsertWithoutAccountsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutAccountsInput, CustomerUpdateWithoutAccountsInput>, CustomerUncheckedUpdateWithoutAccountsInput>
  }

  export type PaymentUpdateManyWithoutAccountNestedInput = {
    create?: XOR<PaymentCreateWithoutAccountInput, PaymentUncheckedCreateWithoutAccountInput> | PaymentCreateWithoutAccountInput[] | PaymentUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAccountInput | PaymentCreateOrConnectWithoutAccountInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutAccountInput | PaymentUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: PaymentCreateManyAccountInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutAccountInput | PaymentUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutAccountInput | PaymentUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TransferUpdateManyWithoutFromAccountNestedInput = {
    create?: XOR<TransferCreateWithoutFromAccountInput, TransferUncheckedCreateWithoutFromAccountInput> | TransferCreateWithoutFromAccountInput[] | TransferUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromAccountInput | TransferCreateOrConnectWithoutFromAccountInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutFromAccountInput | TransferUpsertWithWhereUniqueWithoutFromAccountInput[]
    createMany?: TransferCreateManyFromAccountInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutFromAccountInput | TransferUpdateWithWhereUniqueWithoutFromAccountInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutFromAccountInput | TransferUpdateManyWithWhereWithoutFromAccountInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TransferUpdateManyWithoutToAccountNestedInput = {
    create?: XOR<TransferCreateWithoutToAccountInput, TransferUncheckedCreateWithoutToAccountInput> | TransferCreateWithoutToAccountInput[] | TransferUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToAccountInput | TransferCreateOrConnectWithoutToAccountInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutToAccountInput | TransferUpsertWithWhereUniqueWithoutToAccountInput[]
    createMany?: TransferCreateManyToAccountInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutToAccountInput | TransferUpdateWithWhereUniqueWithoutToAccountInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutToAccountInput | TransferUpdateManyWithWhereWithoutToAccountInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<PaymentCreateWithoutAccountInput, PaymentUncheckedCreateWithoutAccountInput> | PaymentCreateWithoutAccountInput[] | PaymentUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutAccountInput | PaymentCreateOrConnectWithoutAccountInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutAccountInput | PaymentUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: PaymentCreateManyAccountInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutAccountInput | PaymentUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutAccountInput | PaymentUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TransferUncheckedUpdateManyWithoutFromAccountNestedInput = {
    create?: XOR<TransferCreateWithoutFromAccountInput, TransferUncheckedCreateWithoutFromAccountInput> | TransferCreateWithoutFromAccountInput[] | TransferUncheckedCreateWithoutFromAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutFromAccountInput | TransferCreateOrConnectWithoutFromAccountInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutFromAccountInput | TransferUpsertWithWhereUniqueWithoutFromAccountInput[]
    createMany?: TransferCreateManyFromAccountInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutFromAccountInput | TransferUpdateWithWhereUniqueWithoutFromAccountInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutFromAccountInput | TransferUpdateManyWithWhereWithoutFromAccountInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type TransferUncheckedUpdateManyWithoutToAccountNestedInput = {
    create?: XOR<TransferCreateWithoutToAccountInput, TransferUncheckedCreateWithoutToAccountInput> | TransferCreateWithoutToAccountInput[] | TransferUncheckedCreateWithoutToAccountInput[]
    connectOrCreate?: TransferCreateOrConnectWithoutToAccountInput | TransferCreateOrConnectWithoutToAccountInput[]
    upsert?: TransferUpsertWithWhereUniqueWithoutToAccountInput | TransferUpsertWithWhereUniqueWithoutToAccountInput[]
    createMany?: TransferCreateManyToAccountInputEnvelope
    set?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    disconnect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    delete?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    connect?: TransferWhereUniqueInput | TransferWhereUniqueInput[]
    update?: TransferUpdateWithWhereUniqueWithoutToAccountInput | TransferUpdateWithWhereUniqueWithoutToAccountInput[]
    updateMany?: TransferUpdateManyWithWhereWithoutToAccountInput | TransferUpdateManyWithWhereWithoutToAccountInput[]
    deleteMany?: TransferScalarWhereInput | TransferScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutTransfersFromInput = {
    create?: XOR<AccountCreateWithoutTransfersFromInput, AccountUncheckedCreateWithoutTransfersFromInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransfersFromInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutTransfersToInput = {
    create?: XOR<AccountCreateWithoutTransfersToInput, AccountUncheckedCreateWithoutTransfersToInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransfersToInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountUpdateOneWithoutTransfersFromNestedInput = {
    create?: XOR<AccountCreateWithoutTransfersFromInput, AccountUncheckedCreateWithoutTransfersFromInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransfersFromInput
    upsert?: AccountUpsertWithoutTransfersFromInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTransfersFromInput, AccountUpdateWithoutTransfersFromInput>, AccountUncheckedUpdateWithoutTransfersFromInput>
  }

  export type AccountUpdateOneWithoutTransfersToNestedInput = {
    create?: XOR<AccountCreateWithoutTransfersToInput, AccountUncheckedCreateWithoutTransfersToInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransfersToInput
    upsert?: AccountUpsertWithoutTransfersToInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTransfersToInput, AccountUpdateWithoutTransfersToInput>, AccountUncheckedUpdateWithoutTransfersToInput>
  }

  export type PaymentCreateNestedManyWithoutUtilityInput = {
    create?: XOR<PaymentCreateWithoutUtilityInput, PaymentUncheckedCreateWithoutUtilityInput> | PaymentCreateWithoutUtilityInput[] | PaymentUncheckedCreateWithoutUtilityInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUtilityInput | PaymentCreateOrConnectWithoutUtilityInput[]
    createMany?: PaymentCreateManyUtilityInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUtilityInput = {
    create?: XOR<PaymentCreateWithoutUtilityInput, PaymentUncheckedCreateWithoutUtilityInput> | PaymentCreateWithoutUtilityInput[] | PaymentUncheckedCreateWithoutUtilityInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUtilityInput | PaymentCreateOrConnectWithoutUtilityInput[]
    createMany?: PaymentCreateManyUtilityInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUpdateManyWithoutUtilityNestedInput = {
    create?: XOR<PaymentCreateWithoutUtilityInput, PaymentUncheckedCreateWithoutUtilityInput> | PaymentCreateWithoutUtilityInput[] | PaymentUncheckedCreateWithoutUtilityInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUtilityInput | PaymentCreateOrConnectWithoutUtilityInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUtilityInput | PaymentUpsertWithWhereUniqueWithoutUtilityInput[]
    createMany?: PaymentCreateManyUtilityInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUtilityInput | PaymentUpdateWithWhereUniqueWithoutUtilityInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUtilityInput | PaymentUpdateManyWithWhereWithoutUtilityInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUtilityNestedInput = {
    create?: XOR<PaymentCreateWithoutUtilityInput, PaymentUncheckedCreateWithoutUtilityInput> | PaymentCreateWithoutUtilityInput[] | PaymentUncheckedCreateWithoutUtilityInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUtilityInput | PaymentCreateOrConnectWithoutUtilityInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUtilityInput | PaymentUpsertWithWhereUniqueWithoutUtilityInput[]
    createMany?: PaymentCreateManyUtilityInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUtilityInput | PaymentUpdateWithWhereUniqueWithoutUtilityInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUtilityInput | PaymentUpdateManyWithWhereWithoutUtilityInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<AccountCreateWithoutPaymentsInput, AccountUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutPaymentsInput
    connect?: AccountWhereUniqueInput
  }

  export type UtilitiesCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UtilitiesCreateWithoutPaymentsInput, UtilitiesUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UtilitiesCreateOrConnectWithoutPaymentsInput
    connect?: UtilitiesWhereUniqueInput
  }

  export type AccountUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<AccountCreateWithoutPaymentsInput, AccountUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutPaymentsInput
    upsert?: AccountUpsertWithoutPaymentsInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutPaymentsInput, AccountUpdateWithoutPaymentsInput>, AccountUncheckedUpdateWithoutPaymentsInput>
  }

  export type UtilitiesUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<UtilitiesCreateWithoutPaymentsInput, UtilitiesUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UtilitiesCreateOrConnectWithoutPaymentsInput
    upsert?: UtilitiesUpsertWithoutPaymentsInput
    disconnect?: UtilitiesWhereInput | boolean
    delete?: UtilitiesWhereInput | boolean
    connect?: UtilitiesWhereUniqueInput
    update?: XOR<XOR<UtilitiesUpdateToOneWithWhereWithoutPaymentsInput, UtilitiesUpdateWithoutPaymentsInput>, UtilitiesUncheckedUpdateWithoutPaymentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type AccountCreateWithoutCustomerInput = {
    AccountID?: string
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    payments?: PaymentCreateNestedManyWithoutAccountInput
    transfersFrom?: TransferCreateNestedManyWithoutFromAccountInput
    transfersTo?: TransferCreateNestedManyWithoutToAccountInput
  }

  export type AccountUncheckedCreateWithoutCustomerInput = {
    AccountID?: string
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    payments?: PaymentUncheckedCreateNestedManyWithoutAccountInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromAccountInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type AccountCreateOrConnectWithoutCustomerInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutCustomerInput, AccountUncheckedCreateWithoutCustomerInput>
  }

  export type AccountCreateManyCustomerInputEnvelope = {
    data: AccountCreateManyCustomerInput | AccountCreateManyCustomerInput[]
  }

  export type AccountUpsertWithWhereUniqueWithoutCustomerInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutCustomerInput, AccountUncheckedUpdateWithoutCustomerInput>
    create: XOR<AccountCreateWithoutCustomerInput, AccountUncheckedCreateWithoutCustomerInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutCustomerInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutCustomerInput, AccountUncheckedUpdateWithoutCustomerInput>
  }

  export type AccountUpdateManyWithWhereWithoutCustomerInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutCustomerInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    AccountID?: StringFilter<"Account"> | string
    CustomerID?: StringNullableFilter<"Account"> | string | null
    Status?: StringNullableFilter<"Account"> | string | null
    Balance?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    AccountType?: StringNullableFilter<"Account"> | string | null
    MonthlyFee?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: DecimalNullableFilter<"Account"> | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: BoolNullableFilter<"Account"> | boolean | null
  }

  export type CustomerCreateWithoutAccountsInput = {
    CustomerID?: string
    FirstName?: string | null
    LastName?: string | null
    Email?: string | null
    ContactNumber?: string | null
    DateOfBirth?: Date | string | null
    AddressLine1?: string | null
    AddressLine2?: string | null
    City?: string | null
    State?: string | null
    ZipCode?: string | null
    PasswordHash?: string | null
  }

  export type CustomerUncheckedCreateWithoutAccountsInput = {
    CustomerID?: string
    FirstName?: string | null
    LastName?: string | null
    Email?: string | null
    ContactNumber?: string | null
    DateOfBirth?: Date | string | null
    AddressLine1?: string | null
    AddressLine2?: string | null
    City?: string | null
    State?: string | null
    ZipCode?: string | null
    PasswordHash?: string | null
  }

  export type CustomerCreateOrConnectWithoutAccountsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutAccountsInput, CustomerUncheckedCreateWithoutAccountsInput>
  }

  export type PaymentCreateWithoutAccountInput = {
    PaymentID?: string
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
    utility?: UtilitiesCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutAccountInput = {
    PaymentID?: string
    UtilityID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
  }

  export type PaymentCreateOrConnectWithoutAccountInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutAccountInput, PaymentUncheckedCreateWithoutAccountInput>
  }

  export type PaymentCreateManyAccountInputEnvelope = {
    data: PaymentCreateManyAccountInput | PaymentCreateManyAccountInput[]
  }

  export type TransferCreateWithoutFromAccountInput = {
    TransferID?: string
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
    toAccount?: AccountCreateNestedOneWithoutTransfersToInput
  }

  export type TransferUncheckedCreateWithoutFromAccountInput = {
    TransferID?: string
    ToAccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
  }

  export type TransferCreateOrConnectWithoutFromAccountInput = {
    where: TransferWhereUniqueInput
    create: XOR<TransferCreateWithoutFromAccountInput, TransferUncheckedCreateWithoutFromAccountInput>
  }

  export type TransferCreateManyFromAccountInputEnvelope = {
    data: TransferCreateManyFromAccountInput | TransferCreateManyFromAccountInput[]
  }

  export type TransferCreateWithoutToAccountInput = {
    TransferID?: string
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
    fromAccount?: AccountCreateNestedOneWithoutTransfersFromInput
  }

  export type TransferUncheckedCreateWithoutToAccountInput = {
    TransferID?: string
    FromAccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
  }

  export type TransferCreateOrConnectWithoutToAccountInput = {
    where: TransferWhereUniqueInput
    create: XOR<TransferCreateWithoutToAccountInput, TransferUncheckedCreateWithoutToAccountInput>
  }

  export type TransferCreateManyToAccountInputEnvelope = {
    data: TransferCreateManyToAccountInput | TransferCreateManyToAccountInput[]
  }

  export type CustomerUpsertWithoutAccountsInput = {
    update: XOR<CustomerUpdateWithoutAccountsInput, CustomerUncheckedUpdateWithoutAccountsInput>
    create: XOR<CustomerCreateWithoutAccountsInput, CustomerUncheckedCreateWithoutAccountsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutAccountsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutAccountsInput, CustomerUncheckedUpdateWithoutAccountsInput>
  }

  export type CustomerUpdateWithoutAccountsInput = {
    CustomerID?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    AddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    AddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    City?: NullableStringFieldUpdateOperationsInput | string | null
    State?: NullableStringFieldUpdateOperationsInput | string | null
    ZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerUncheckedUpdateWithoutAccountsInput = {
    CustomerID?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    Email?: NullableStringFieldUpdateOperationsInput | string | null
    ContactNumber?: NullableStringFieldUpdateOperationsInput | string | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    AddressLine1?: NullableStringFieldUpdateOperationsInput | string | null
    AddressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    City?: NullableStringFieldUpdateOperationsInput | string | null
    State?: NullableStringFieldUpdateOperationsInput | string | null
    ZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    PasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUpsertWithWhereUniqueWithoutAccountInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutAccountInput, PaymentUncheckedUpdateWithoutAccountInput>
    create: XOR<PaymentCreateWithoutAccountInput, PaymentUncheckedCreateWithoutAccountInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutAccountInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutAccountInput, PaymentUncheckedUpdateWithoutAccountInput>
  }

  export type PaymentUpdateManyWithWhereWithoutAccountInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutAccountInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    PaymentID?: StringFilter<"Payment"> | string
    AccountID?: StringNullableFilter<"Payment"> | string | null
    UtilityID?: StringNullableFilter<"Payment"> | string | null
    Amount?: DecimalNullableFilter<"Payment"> | Decimal | DecimalJsLike | number | string | null
    Timestamp?: DateTimeNullableFilter<"Payment"> | Date | string | null
    Description?: StringNullableFilter<"Payment"> | string | null
  }

  export type TransferUpsertWithWhereUniqueWithoutFromAccountInput = {
    where: TransferWhereUniqueInput
    update: XOR<TransferUpdateWithoutFromAccountInput, TransferUncheckedUpdateWithoutFromAccountInput>
    create: XOR<TransferCreateWithoutFromAccountInput, TransferUncheckedCreateWithoutFromAccountInput>
  }

  export type TransferUpdateWithWhereUniqueWithoutFromAccountInput = {
    where: TransferWhereUniqueInput
    data: XOR<TransferUpdateWithoutFromAccountInput, TransferUncheckedUpdateWithoutFromAccountInput>
  }

  export type TransferUpdateManyWithWhereWithoutFromAccountInput = {
    where: TransferScalarWhereInput
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyWithoutFromAccountInput>
  }

  export type TransferScalarWhereInput = {
    AND?: TransferScalarWhereInput | TransferScalarWhereInput[]
    OR?: TransferScalarWhereInput[]
    NOT?: TransferScalarWhereInput | TransferScalarWhereInput[]
    TransferID?: StringFilter<"Transfer"> | string
    ToAccountID?: StringNullableFilter<"Transfer"> | string | null
    FromAccountID?: StringNullableFilter<"Transfer"> | string | null
    Amount?: DecimalNullableFilter<"Transfer"> | Decimal | DecimalJsLike | number | string | null
    Description?: StringNullableFilter<"Transfer"> | string | null
    CreatedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    UpdatedAt?: DateTimeNullableFilter<"Transfer"> | Date | string | null
    Status?: StringNullableFilter<"Transfer"> | string | null
    TransferType?: StringNullableFilter<"Transfer"> | string | null
  }

  export type TransferUpsertWithWhereUniqueWithoutToAccountInput = {
    where: TransferWhereUniqueInput
    update: XOR<TransferUpdateWithoutToAccountInput, TransferUncheckedUpdateWithoutToAccountInput>
    create: XOR<TransferCreateWithoutToAccountInput, TransferUncheckedCreateWithoutToAccountInput>
  }

  export type TransferUpdateWithWhereUniqueWithoutToAccountInput = {
    where: TransferWhereUniqueInput
    data: XOR<TransferUpdateWithoutToAccountInput, TransferUncheckedUpdateWithoutToAccountInput>
  }

  export type TransferUpdateManyWithWhereWithoutToAccountInput = {
    where: TransferScalarWhereInput
    data: XOR<TransferUpdateManyMutationInput, TransferUncheckedUpdateManyWithoutToAccountInput>
  }

  export type AccountCreateWithoutTransfersFromInput = {
    AccountID?: string
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    customer?: CustomerCreateNestedOneWithoutAccountsInput
    payments?: PaymentCreateNestedManyWithoutAccountInput
    transfersTo?: TransferCreateNestedManyWithoutToAccountInput
  }

  export type AccountUncheckedCreateWithoutTransfersFromInput = {
    AccountID?: string
    CustomerID?: string | null
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    payments?: PaymentUncheckedCreateNestedManyWithoutAccountInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type AccountCreateOrConnectWithoutTransfersFromInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTransfersFromInput, AccountUncheckedCreateWithoutTransfersFromInput>
  }

  export type AccountCreateWithoutTransfersToInput = {
    AccountID?: string
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    customer?: CustomerCreateNestedOneWithoutAccountsInput
    payments?: PaymentCreateNestedManyWithoutAccountInput
    transfersFrom?: TransferCreateNestedManyWithoutFromAccountInput
  }

  export type AccountUncheckedCreateWithoutTransfersToInput = {
    AccountID?: string
    CustomerID?: string | null
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    payments?: PaymentUncheckedCreateNestedManyWithoutAccountInput
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromAccountInput
  }

  export type AccountCreateOrConnectWithoutTransfersToInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTransfersToInput, AccountUncheckedCreateWithoutTransfersToInput>
  }

  export type AccountUpsertWithoutTransfersFromInput = {
    update: XOR<AccountUpdateWithoutTransfersFromInput, AccountUncheckedUpdateWithoutTransfersFromInput>
    create: XOR<AccountCreateWithoutTransfersFromInput, AccountUncheckedCreateWithoutTransfersFromInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTransfersFromInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTransfersFromInput, AccountUncheckedUpdateWithoutTransfersFromInput>
  }

  export type AccountUpdateWithoutTransfersFromInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    customer?: CustomerUpdateOneWithoutAccountsNestedInput
    payments?: PaymentUpdateManyWithoutAccountNestedInput
    transfersTo?: TransferUpdateManyWithoutToAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutTransfersFromInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    CustomerID?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    payments?: PaymentUncheckedUpdateManyWithoutAccountNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type AccountUpsertWithoutTransfersToInput = {
    update: XOR<AccountUpdateWithoutTransfersToInput, AccountUncheckedUpdateWithoutTransfersToInput>
    create: XOR<AccountCreateWithoutTransfersToInput, AccountUncheckedCreateWithoutTransfersToInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTransfersToInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTransfersToInput, AccountUncheckedUpdateWithoutTransfersToInput>
  }

  export type AccountUpdateWithoutTransfersToInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    customer?: CustomerUpdateOneWithoutAccountsNestedInput
    payments?: PaymentUpdateManyWithoutAccountNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutTransfersToInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    CustomerID?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    payments?: PaymentUncheckedUpdateManyWithoutAccountNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromAccountNestedInput
  }

  export type PaymentCreateWithoutUtilityInput = {
    PaymentID?: string
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
    account?: AccountCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutUtilityInput = {
    PaymentID?: string
    AccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
  }

  export type PaymentCreateOrConnectWithoutUtilityInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUtilityInput, PaymentUncheckedCreateWithoutUtilityInput>
  }

  export type PaymentCreateManyUtilityInputEnvelope = {
    data: PaymentCreateManyUtilityInput | PaymentCreateManyUtilityInput[]
  }

  export type PaymentUpsertWithWhereUniqueWithoutUtilityInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUtilityInput, PaymentUncheckedUpdateWithoutUtilityInput>
    create: XOR<PaymentCreateWithoutUtilityInput, PaymentUncheckedCreateWithoutUtilityInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUtilityInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUtilityInput, PaymentUncheckedUpdateWithoutUtilityInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUtilityInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUtilityInput>
  }

  export type AccountCreateWithoutPaymentsInput = {
    AccountID?: string
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    customer?: CustomerCreateNestedOneWithoutAccountsInput
    transfersFrom?: TransferCreateNestedManyWithoutFromAccountInput
    transfersTo?: TransferCreateNestedManyWithoutToAccountInput
  }

  export type AccountUncheckedCreateWithoutPaymentsInput = {
    AccountID?: string
    CustomerID?: string | null
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
    transfersFrom?: TransferUncheckedCreateNestedManyWithoutFromAccountInput
    transfersTo?: TransferUncheckedCreateNestedManyWithoutToAccountInput
  }

  export type AccountCreateOrConnectWithoutPaymentsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutPaymentsInput, AccountUncheckedCreateWithoutPaymentsInput>
  }

  export type UtilitiesCreateWithoutPaymentsInput = {
    UtilityID?: string
    AccountName?: string | null
    AccountNumber?: string | null
  }

  export type UtilitiesUncheckedCreateWithoutPaymentsInput = {
    UtilityID?: string
    AccountName?: string | null
    AccountNumber?: string | null
  }

  export type UtilitiesCreateOrConnectWithoutPaymentsInput = {
    where: UtilitiesWhereUniqueInput
    create: XOR<UtilitiesCreateWithoutPaymentsInput, UtilitiesUncheckedCreateWithoutPaymentsInput>
  }

  export type AccountUpsertWithoutPaymentsInput = {
    update: XOR<AccountUpdateWithoutPaymentsInput, AccountUncheckedUpdateWithoutPaymentsInput>
    create: XOR<AccountCreateWithoutPaymentsInput, AccountUncheckedCreateWithoutPaymentsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutPaymentsInput, AccountUncheckedUpdateWithoutPaymentsInput>
  }

  export type AccountUpdateWithoutPaymentsInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    customer?: CustomerUpdateOneWithoutAccountsNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromAccountNestedInput
    transfersTo?: TransferUpdateManyWithoutToAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutPaymentsInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    CustomerID?: NullableStringFieldUpdateOperationsInput | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromAccountNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type UtilitiesUpsertWithoutPaymentsInput = {
    update: XOR<UtilitiesUpdateWithoutPaymentsInput, UtilitiesUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UtilitiesCreateWithoutPaymentsInput, UtilitiesUncheckedCreateWithoutPaymentsInput>
    where?: UtilitiesWhereInput
  }

  export type UtilitiesUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UtilitiesWhereInput
    data: XOR<UtilitiesUpdateWithoutPaymentsInput, UtilitiesUncheckedUpdateWithoutPaymentsInput>
  }

  export type UtilitiesUpdateWithoutPaymentsInput = {
    UtilityID?: StringFieldUpdateOperationsInput | string
    AccountName?: NullableStringFieldUpdateOperationsInput | string | null
    AccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UtilitiesUncheckedUpdateWithoutPaymentsInput = {
    UtilityID?: StringFieldUpdateOperationsInput | string
    AccountName?: NullableStringFieldUpdateOperationsInput | string | null
    AccountNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyCustomerInput = {
    AccountID?: string
    Status?: string | null
    Balance?: Decimal | DecimalJsLike | number | string | null
    AccountType?: string | null
    MonthlyFee?: Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: boolean | null
  }

  export type AccountUpdateWithoutCustomerInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    payments?: PaymentUpdateManyWithoutAccountNestedInput
    transfersFrom?: TransferUpdateManyWithoutFromAccountNestedInput
    transfersTo?: TransferUpdateManyWithoutToAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutCustomerInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
    payments?: PaymentUncheckedUpdateManyWithoutAccountNestedInput
    transfersFrom?: TransferUncheckedUpdateManyWithoutFromAccountNestedInput
    transfersTo?: TransferUncheckedUpdateManyWithoutToAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutCustomerInput = {
    AccountID?: StringFieldUpdateOperationsInput | string
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    Balance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    AccountType?: NullableStringFieldUpdateOperationsInput | string | null
    MonthlyFee?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyATMLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    DailyPurchaseLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    OverdraftProtection?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type PaymentCreateManyAccountInput = {
    PaymentID?: string
    UtilityID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
  }

  export type TransferCreateManyFromAccountInput = {
    TransferID?: string
    ToAccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
  }

  export type TransferCreateManyToAccountInput = {
    TransferID?: string
    FromAccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Description?: string | null
    CreatedAt?: Date | string | null
    UpdatedAt?: Date | string | null
    Status?: string | null
    TransferType?: string | null
  }

  export type PaymentUpdateWithoutAccountInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    utility?: UtilitiesUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutAccountInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    UtilityID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUncheckedUpdateManyWithoutAccountInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    UtilityID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransferUpdateWithoutFromAccountInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
    toAccount?: AccountUpdateOneWithoutTransfersToNestedInput
  }

  export type TransferUncheckedUpdateWithoutFromAccountInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    ToAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransferUncheckedUpdateManyWithoutFromAccountInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    ToAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransferUpdateWithoutToAccountInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
    fromAccount?: AccountUpdateOneWithoutTransfersFromNestedInput
  }

  export type TransferUncheckedUpdateWithoutToAccountInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    FromAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransferUncheckedUpdateManyWithoutToAccountInput = {
    TransferID?: StringFieldUpdateOperationsInput | string
    FromAccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    CreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    UpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Status?: NullableStringFieldUpdateOperationsInput | string | null
    TransferType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentCreateManyUtilityInput = {
    PaymentID?: string
    AccountID?: string | null
    Amount?: Decimal | DecimalJsLike | number | string | null
    Timestamp?: Date | string | null
    Description?: string | null
  }

  export type PaymentUpdateWithoutUtilityInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
    account?: AccountUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUtilityInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    AccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUncheckedUpdateManyWithoutUtilityInput = {
    PaymentID?: StringFieldUpdateOperationsInput | string
    AccountID?: NullableStringFieldUpdateOperationsInput | string | null
    Amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Description?: NullableStringFieldUpdateOperationsInput | string | null
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