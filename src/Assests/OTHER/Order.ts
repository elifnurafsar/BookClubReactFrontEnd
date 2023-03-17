export class Order {
    id?: string = ""
    isbn: string = ""
    count?: number = 0
    username: string = ""
    address: string = ""
    phone: string = ""
    areacode: number = 0
    checkval: boolean = false
  
    constructor(initializer?: any) {
      if (!initializer) return
      if (initializer.id) this.id = initializer.id
      if (initializer.username) this.username = initializer.username
      if (initializer.isbn) this.isbn = initializer.isbn
      if (initializer.count) this.isbn = initializer.count
      if (initializer.address) this.address = initializer.address
      if (initializer.phone) this.phone = initializer.phone
      if (initializer.areacode) this.areacode = initializer.areacode
      if (initializer.checkval) this.checkval = initializer.checkval
    }
}