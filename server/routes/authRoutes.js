const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, logoutUser } = require('../controllers/authController');
const productService = require('../services/productService');

const products = [
    {
      id: "01",
      title: "Chicken Burger",
      price: 350.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072362/product_01_oka3id.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072363/product_01.1_em56qm.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072362/product_01.3_hsu9vq.jpg",
      category: "Burger",
  
      desc: "Indulge in the succulent delight of our Chicken Burger, crafted with tender chicken patties, fresh veggies, and a secret blend of savory sauces. A taste that will leave you craving for more.",
    },
  
    {
      id: "02",
      title: "Vegetarian Pizza",
      price: 450.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072363/product_2.1_hpsumi.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072363/product_2.2_js7xbq.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072364/product_2.3_spk424.jpg",
      category: "Pizza",
  
      desc: "Experience the harmony of flavors with our Vegetarian Pizza. Loaded with a colorful assortment of garden-fresh vegetables and a perfect blend of cheeses, it's a veggie lover's dream come true.",
    },
  
    {
      id: "03",
      title: "Double Cheese Margherita",
      price: 500.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072364/product_3.1_cb7xvp.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_3.2_zga70x.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_3.3_huhzme.jpg",
      category: "Pizza",
  
      desc: "Indulge in the classic elegance of our Double Cheese Margherita Pizza. With a generous serving of premium cheeses and the simplicity of fresh tomatoes and basil, it's a timeless favorite.",
    },
  
    {
      id: "04",
      title: "Maxican Green Wave",
      price: 500.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_4.1_u5pvnw.jpg",
      image02:"https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_4.2_hpgvn5.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072378/product_4.3_mdafak.png",
      category: "Pizza",
  
      desc: "Embark on a flavor journey with our Maxican Green Wave Pizza. Bursting with vibrant Mexican-inspired toppings, it's a fiesta for your taste buds that you won't forget.",
    },
  
    {
      id: "05",
      title: "Cheese Burger",
      price: 250.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_04_oj58vm.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_08_kw8k68.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072378/product_09_png9mg.jpg",
      category: "Burger",
  
      desc: "Savor the classic goodness of our Cheese Burger. Juicy beef patties, melted cheese, and a medley of toppings create a perfect symphony of flavors. A timeless choice for burger enthusiasts.",
    },
  
    {
      id: "06",
      title: "Royal Cheese Burger",
      price: 350.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072362/product_01_oka3id.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072363/product_01.1_em56qm.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072362/product_01.3_hsu9vq.jpg",
      category: "Burger",
  
      desc: "Elevate your burger experience with our Royal Cheese Burger. A regal combination of premium ingredients, this burger promises a taste that reigns supreme. Fit for burger royalty!",
    },
  
    {
      id: "07",
      title: "Seafood Pizza",
      price: 500.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072363/product_2.2_js7xbq.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072363/product_2.1_hpsumi.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072364/product_2.3_spk424.jpg",
      category: "Pizza",
  
      desc: "Dive into the ocean of flavors with our Seafood Pizza. A delectable medley of fresh seafood atop a perfect crust, this pizza is a seafood lover's paradise.",
    },
  
    {
      id: "08",
      title: "Thin Cheese Pizza",
      price: 500.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_3.2_zga70x.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072364/product_3.1_cb7xvp.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_3.3_huhzme.jpg",
      category: "Pizza",
  
      desc: "Experience pizza perfection with our Thin Cheese Pizza. A crispy, thin crust topped with a lavish layer of premium cheeses, delivering a delightful and satisfying pizza experience.",
    },
  
    {
      id: "09",
      title: "Pizza With Mushroom",
      price: 400.0,
      image01:"https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_4.2_hpgvn5.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_4.1_u5pvnw.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072378/product_4.3_mdafak.png",
      category: "Pizza",
  
      desc: "Indulge in the earthy flavors of our Pizza with Mushroom. A savory blend of mushrooms and premium cheese atop a perfect crust, creating a pizza that's a celebration of taste.",
    },
  
    {
      id: "10",
      title: "Classic Hamburger",
      price: 250.0,
      image01: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_08_kw8k68.jpg",
      image02: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072377/product_04_oj58vm.jpg",
      image03: "https://res.cloudinary.com/dchypzzsj/image/upload/v1712072378/product_09_png9mg.jpg",
      category: "Burger",
      desc: "Relish the classic taste with our Classic Hamburger. Succulent beef patties, fresh lettuce, and a medley of toppings create a perfect symphony of flavors. A timeless choice for burger enthusiasts.",
    },
  ];
//middleware
router.use(cors(
    {
        origin: 'https://tasty-terra-pizza-vert.vercel.app/',
        credentials: true
    }
));

router.get("/", test)
router.post("/register", registerUser)
router.post("/login", loginUser )
router.post('/logout', logoutUser);
router.get('/profile', getProfile);
productService.insertProducts(products);



module.exports = router;