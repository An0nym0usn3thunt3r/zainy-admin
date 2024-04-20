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
];
