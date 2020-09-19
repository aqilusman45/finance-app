import ExploreContainer from "../components/ExploreContainer";
import AddProduct from "../components/AddProduct/AddProduct";
import {ManageProduct,AddAttributes,AddNewBrandAlert} from './../components/index'
export const routes = [
  {
    menuItem: "Inventory",
    icon: "",
    subMenuLinks: [
      {
        link: "/add-product",
        text: "Add Products",
        icon: "",
        component: AddProduct
      },
      {
        link: "/manage-products",
        text: "Manage Products",
        icon: "",
        component: ManageProduct
      },
      {
        link: "/manage-categories",
        text: "Manage Categories",
        icon: "",
        component: AddNewBrandAlert
      },
      {
        link: "/add-attributes",
        text: "Add Attributes",
        icon: "",
        component: AddAttributes
      },
      {
        link: "/manage-designs",
        text: "Manage Designs",
        icon: "",
        component: ExploreContainer
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
        component: ExploreContainer
      },
      {
        link: "/manage-invoices",
        text: "Manage Invoices",
        icon: "",
        component: ExploreContainer
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
        component: ExploreContainer
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
        component: ExploreContainer
      },
      {
        link: "/manage-accounts",
        text: "Manage Accounts",
        icon: "",
        component: ExploreContainer
      },
    ],
  }
];
