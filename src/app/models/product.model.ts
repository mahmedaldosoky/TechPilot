// product.model.ts

export class Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rateCount:number;
  rate:number;

  constructor(
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rateCount:number,
    rate:number,
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.rate = rate;
    this.rateCount = rateCount;
  }
}
