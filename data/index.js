
import { assets } from '../src/assets/assets';



export  const priceRange = ["0 - 500", "500 - 100", "1000 - 2000", "2000 - 3000"];
export const roomTypes = ["single Bed", "Double Bed", "Luxury Room", "Family Suite"];
export   const sortOptions = [
    "Price Low To High",
    "Price Hight to Low",
    "Newest First",
  ];

export const sidebarLinks = [
        {name: "Dashboard", path:'/owner', icon: assets.dashboardIcon},
        {name: "Add Room", path:'/owner/add-room', icon: assets.addIcon},
        {name: "List Room", path:'/owner/list-room', icon: assets.listIcon},
    ]


