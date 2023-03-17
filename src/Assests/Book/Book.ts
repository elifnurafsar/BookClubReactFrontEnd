export class Book {
    isbn: number = 0 
    title: string = '' 
    author: string = '' 
    publisher: string = '' 
    genre: string = '' 
    year: number = 0 
    price: number = 0 
    type: string = "" 
    description = "" 
  
    constructor(initializer?: any) {
      if (!initializer) return 
      if (initializer.isbn) this.isbn = initializer.isbn 
      if (initializer.title) this.title = initializer.title 
      if (initializer.author) this.author = initializer.author 
      if (initializer.publisher) this.publisher = initializer.publisher 
      if (initializer.genre) this.genre = initializer.genre 
      if (initializer.year) this.year = initializer.year 
      if (initializer.price) this.price = initializer.price 
      if (initializer.typeval) this.type = initializer.typeval 
      if (initializer.description) this.description = initializer.description 
    }
  }