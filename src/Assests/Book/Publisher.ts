export class Publisher {
    id: string = "" 
    name: string = "" 
    website: string = "" 
    phone: string = "" 
    address: string = "" 
  
    constructor(initializer?: any) {
      if (!initializer) return 
      if (initializer.id) this.id = initializer.id 
      if (initializer.name) this.name = initializer.name 
      if (initializer.website) this.website = initializer.website 
      if (initializer.phone) this.phone = initializer.phone 
      if (initializer.address) this.address = initializer.address 
    }
}