import ExploreContainer from "../components/ExploreContainer";
import AddProduct from "../components/AddProduct/AddProduct";
import {
  ManageProduct,
  AddAttributes,
  ManageAttributes,
  OpenAccount,
  ManageAccounts,
  EditAccount,
  EditEntry,
  AddEntry,
  CreateInvoice,
  EditInvoice,
  ManageInvoices,
  ManageEntries
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
    menuItem: "LEDGER",
    icon: "",
    subMenuLinks: [
      {
        link: "/create-entry",
        text: "Add Entry",
        icon: "",
        component: AddEntry,
      },
      {
        link: "/entries",
        text: "Entries",
        icon: "",
        component: ManageEntries,
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
        component: CreateInvoice,
      },
      {
        link: "/manage-invoices",
        text: "Manage Invoices",
        icon: "",
        component: ManageInvoices,
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

export const nonMenuRoutes = [
  {
    link: "/edit-product/:id",
    component: ExploreContainer,
  },
  {
    link: "/edit-attribute/:id",
    component: EditAttribute,
  },
  {
    link: "/edit-account/:id",
    component: EditAccount,
  },
  {
    link: "/edit-entry/:id",
    component: EditEntry,
  },
  {
    link: "/add-entry/",
    component: AddEntry,
  },
  {
    link: "/edit-invoice/:id",
    component: EditInvoice,
  }
];
