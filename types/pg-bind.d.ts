declare module 'pg-bind' {
  declare function bind(sql: string, binds: any): any

  export = bind
}