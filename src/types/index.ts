export type ProductType = {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand:string,
  category: string,
  thumbnail: string,
  images: string[],
  amount?:number
};

export type ApiResponse = {
  products:ProductType[],
  total:number;
  skip:number;
  limit:number;
}

export type StateType = {
  products:ProductType[]
}