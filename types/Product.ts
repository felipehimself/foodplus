export interface IProduct {
  type: string;
  name: string;
  price: number;
}

export interface IImage {
  imageUrl: string;
  imageId: string;
}

export interface IProductOption {
  id: number;
  name: string;
}

export interface IProductFull extends IProduct, IImage {
  id: string;
}
