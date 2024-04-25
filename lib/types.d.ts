type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}
type CategoriesType = {
  _id: string;
  name: string;
}
type BlogType = {
  _id: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  image: string;
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
}

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
}

type OrderItemType = {
  product: ProductType
  color: string;
  size: string;
  quantity: number;
}

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
}

type LimitedOffersType = {
  _id: string;
  image: string;
  link: string;
};

type LimitedOffersCollectionType = {
  _id: string;
  link: string;
  image: string;
}

type SpecialOffersType = {
  _id: string;
  image: string;
  link: string;
};

type SpecialOffersCollectionType = {
  _id: string;
  link: string;
  image: string;
}

type colorCat = {  
  color: string,
  price: number,
}

type sizeCat = {  
  size: string,
  price: number,
}