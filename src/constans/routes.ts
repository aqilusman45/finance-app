import ExploreContainer from "../components/ExploreContainer";

export const routes = [
  {
    menuItem: "Inventory",
    icon: "",
    subMenuLinks: [
      {
        link: "/add-product",
        text: "Add Products",
        icon: "",
        component: ExploreContainer
      },
      {
        link: "/manage-products",
        text: "Manage Products",
        icon: "",
        component: ExploreContainer
      },
      {
        link: "/manage-categories",
        text: "Manage Categories",
        icon: "",
        component: ExploreContainer
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
