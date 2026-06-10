const sampleFoodItems = [
  {
    name: "Veg Burger",
    price: 80,
    description: "Crispy veggie patty with fresh lettuce and mayo",
    image: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/12/burger-recipe-1.jpg",
    category: "Fast Food",
    available: true,
    createdAt: new Date()
  },
  {
    name: "Cheese Pizza",
    price: 250,
    description: "Classic cheese pizza with mozzarella topping",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lj3_8eh0xYQLDhyh1pYwOF6l00mL7hIfww&s",
    category: "Italian",
    available: true,
    createdAt: new Date()
  },
  {
    name: "Cold Coffee",
    price: 120,
    description: "Chilled coffee blended with ice cream",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCMxTrHKS0Tw2sD-pQ1O-ESVRgu9k4Zk2Jw&s",
    category: "Beverages",
    available: true,
    createdAt: new Date()
  },
  {
    name: "Paneer Roll",
    price: 150,
    description: "Soft roll stuffed with spicy paneer filling",
    image: "https://spicecravings.com/wp-content/uploads/2020/12/Paneer-kathi-Roll-Featured-1.jpg",
    category: "Snacks",
    available: false,
    createdAt: new Date()
  },
  {
    name: "Masala Dosa",
    price: 130,
    description: "South Indian dosa with potato filling and chutneys",
    image: "https://i.ytimg.com/vi/CCab5oh0ZOc/maxresdefault.jpg",
    category: "South Indian",
    available: true,
    createdAt: new Date()
  }
];

module.exports = {data:sampleFoodItems};