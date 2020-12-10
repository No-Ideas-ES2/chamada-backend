declare module 'pg-bind' {
  export type ReplaceObject = {
    [key: string]: any
  }

  export type BindInfo = {
    text: string,
    values: any[]
  }

  export interface BindQuery {
    (queryString: string, replaceObject: ReplaceObject): BindInfo
    insert(queryString: string, replaceObject: ReplaceObject[]): BindInfo
  }

  const bind: BindQuery

  export default bind
}