export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number; 
  }
  
  export interface CartItem {
    product: Product;
    numInCart: number; 
  }

  export class productCategory {
    constructor(
      public product_id: number,
      public product_name: string,
      public product_desc: string,
      public product_price: number,
      public product_image: string,
      public category_id: number,
      public product_quantity : number
    ) {}
  }