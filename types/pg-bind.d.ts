declare module 'pg-bind' {
  export type ReplaceObject = {
    [key: string]: any
  }

  export type BindInfo = {
    text: string,
    values: any[]
  }
  export namespace bind {
    export function insert(queryString: string, replaceObject: ReplaceObject[]): BindInfo
  }
  export function bind(queryString: string, replaceObject: ReplaceObject): BindInfo

}