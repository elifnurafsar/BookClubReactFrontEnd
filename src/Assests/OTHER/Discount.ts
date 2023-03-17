export class Discount {
    type: string = "" 
    discount: number = 0 
  
    constructor(initializer?: any) {
      if (!initializer) return 
      if (initializer.type) this.type = initializer.type 
      if (initializer.discount) this.discount = initializer.discount 
    }
}