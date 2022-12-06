export interface IProduct {
  id: string;
  productId: string;
  category: string;
  name: string;
  price: number;
  imageUrl: string;
  imageId: string;
}

export interface IImage {
  imageUrl: string;
  imageId: string;
}

export interface ICategory {
  id: number;
  name: string;
}

// export interface IProductFull extends IProduct, IImage {
//   id: string;
// }
