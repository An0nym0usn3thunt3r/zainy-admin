type CategoriesType = {
  _id: string;
  title: string;
  description: string;
  image: [string];
}

type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: [string];
  categories: [CategoriesType];
}

type SubCollectionType = {
  _id: string;
  title: string;
  description: string;
  image: [string];
  categories: [CategoriesType];
  collections: [CollectionType];
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
  price: number;
  discount: number;
  image: [string];
  categories: [CategoriesType];
  collections: [CollectionType];
  subcollections: [CollectionType];
  tags: [string];
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color13: string;
  color14: string;
  color15: string;
  color16: string;
  color17: string;
  color18: string;
  color19: string;
  color20: string;
  cp1: number;
  cp2: number;
  cp3: number;
  cp4: number;
  cp5: number;
  cp6: number;
  cp7: number;
  cp8: number;
  cp9: number;
  cp10: number;
  cp11: number;
  cp12: number;
  cp13: number;
  cp14: number;
  cp15: number;
  cp16: number;
  cp17: number;
  cp18: number;
  cp19: number;
  cp20: number;
  ci1: [string];
  ci2: [string];
  ci3: [string];
  ci4: [string];
  ci5: [string];
  ci6: [string];
  ci7: [string];
  ci8: [string];
  ci9: [string];
  ci10: [string];
  ci11: [string];
  ci12: [string];
  ci13: [string];
  ci14: [string];
  ci15: [string];
  ci16: [string];
  ci17: [string];
  ci18: [string];
  ci19: [string];
  ci20: [string];
  size1: string;
  size2: string;
  size3: string;
  size4: string;
  size5: string;
  size6: string;
  size7: string;
  size8: string;
  size9: string;
  size10: string;
  size11: string;
  size12: string;
  size13: string;
  size14: string;
  size15: string;
  size16: string;
  size17: string;
  size18: string;
  size19: string;
  size20: string;
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