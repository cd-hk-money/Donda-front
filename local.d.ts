declare module "lodash" {
  interface ILodash {
    sortBy(colection:Array<any>, fieldName: string): Array<any>
    orderBy(colection:Array<any>, fieldName: Array<any>, opt: Array<any>): Array<any>
    find(collection:Array<T>, callback: T ): any
  }

  const _: ILodash

  export = _;
}

declare module "vue-mobile-detection" {
  interface IVueMobileDetection {
    isMobile(): any
  }

  const VueMobileDetection: IVueMobileDetection

  export = VueMobileDetection
}