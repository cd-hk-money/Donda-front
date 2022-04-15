declare module "lodash" {
  interface ILodash {
    sortBy(colection:Array<any>, fieldName: string): Array<any>
    orderBy(colection:Array<any>, fieldName: Array<any>, opt: Array<any>): Array<any>
  }

  const _: ILodash

  export = _;
}