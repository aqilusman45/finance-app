import ExploreContainer from "../components/ExploreContainer";
import AddProduct from "../components/AddProduct/AddProduct";
import {
  ManageProduct,
  AddAttributes,
  ManageAttributes,
  OpenAccount,
  ManageAccounts
} from "../components/index";
import EditAttribute from "../components/EditAttribute/EditAttribute";

export const routes = [
  {
    menuItem: "Inventory",
    icon: "",
    subMenuLinks: [
      {
        link: "/add-product",
        text: "Add Products",
        icon: "",
        component: AddProduct,
      },
      {
        link: "/manage-products",
        text: "Manage Products",
        icon: "",
        component: ManageProduct,
      },
      {
        link: "/add-attributes",
        text: "Add Attributes",
        icon: "",
        component: AddAttributes,
      },
      {
        link: "/manage-attributes",
        text: "Manage Attributes",
        icon: "",
        component: ManageAttributes,
      },
    ],
  },
  {
    menuItem: "POS",
    icon: "",
    subMenuLinks: [
      {
        link: "/create-invoice",
        text: "Create Invoice",
        icon: "",
        component: ExploreContainer,
      },
      {
        link: "/manage-invoices",
        text: "Manage Invoices",
        icon: "",
        component: ExploreContainer,
      },
    ],
  },
  {
    menuItem: "Sales Report",
    icon: "",
    subMenuLinks: [
      {
        link: "/reports",
        text: "Reports",
        icon: "",
        component: ExploreContainer,
      },
    ],
  },
  {
    menuItem: "Accounts",
    icon: "",
    subMenuLinks: [
      {
        link: "/open-account",
        text: "Open Account",
        icon: "",
        component: OpenAccount,
      },
      {
        link: "/manage-accounts",
        text: "Manage Accounts",
        icon: "",
        component: ManageAccounts,
      },
    ],
  },
];

export const nonMenuRoutes = [{
  link: '/edit-product/:id',
  component: ExploreContainer,
},{
  link: '/edit-attribute/:id',
  component: EditAttribute,
}]