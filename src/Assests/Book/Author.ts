export class Author {
    id: string = "" 
    name: string = "" 
    website: string = "" 
    biography: string = "" 
  
    constructor(initializer?: any) {
      if (!initializer) return 
      if (initializer.id) this.id = initializer.id 
      if (initializer.name) this.name = initializer.name 
      if (initializer.website) this.website = initializer.website 
      if (initializer.biography) this.biography = initializer.biography 
    }
}