type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}
type CategoriesType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

type BlogType = {
  _id: string;
  title: string;
  description1: string;
  description2: string;
  description3: string;
  image: string;
}

type ProductType2 = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  collections: [CollectionType];
  categories: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  collections: [CollectionType];
  categories: [CollectionType];
  tags: [string];
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  cp1: number;
  cp2: number;
  cp3: number;
  cp4: number;
  cp5: number;
  ci1: [string];
  ci2: [string];
  ci3: [string];
  ci4: [string];
  ci5: [string];
  size1: string;
  size2: string;
  size3: string;
  size4: string;
  size5: string;
  sp1: number;
  sp2: number;
  sp3: number;
  sp4: number;
  sp5: number;
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