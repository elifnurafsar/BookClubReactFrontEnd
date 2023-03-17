export class User {
    username: string = "" 
    password: string = "" 
    enabled: boolean = false 
    authority: string = "USER" 
  
    constructor(initializer?: any) {
      if (!initializer) return 
      if (initializer.username) this.username = initializer.username 
      if (initializer.password) this.password = initializer.password 
      if (initializer.enabled) this.enabled = initializer.enabled 
      if (initializer.authority) this.authority = initializer.authority 
    }
}