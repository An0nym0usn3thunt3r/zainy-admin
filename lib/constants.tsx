import {
  LayoutDashboard,
  Notebook,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/collections",
    icon: <Shapes />,
    label: "Collections",
  },
  {
    url: "/categories",
    icon: <Shapes />,
    label: "Categories",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/blogs",
    icon: <Notebook />,
    label: "Blogs",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
  {
    url: "/SpecialOffers",
    icon: <UsersRound />,
    label: "Special Offers",
  },
  {
    url: "/LimitedOffers",
    icon: <UsersRound />,
    label: "Limited Offers",
  },
];
