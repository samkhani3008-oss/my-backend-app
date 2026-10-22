// Backend/controllers/storeController.js
const storeDatabase = {
  gaming: [
    { id: 'g1', name: 'Free Fire 100 + 10 Diamonds', price: 250, image: '💎', category: 'gaming', desc: 'Instant Player ID Top-Up' },
    { id: 'g2', name: 'PUBG Mobile 60 UC', price: 200, image: '🪙', category: 'gaming', desc: 'Direct UC Code Delivery' },
    { id: 'g3', name: 'Mobile Legends 100 Diamonds', price: 300, image: '🛡️', category: 'gaming', desc: 'Fast Server Top-Up' },
    { id: 'g4', name: 'Free Fire Weekly Membership', price: 450, image: '🔥', category: 'gaming', desc: 'Super Value Weekly Pack' }
  ],
  gadgets: [
    { id: 'd1', name: 'Wireless Pro TWS Earbuds', price: 2500, image: '🎧', category: 'gadgets', desc: 'Deep Bass & HD Microphone' },
    { id: 'd2', name: '10000mAh Fast Power Bank', price: 3500, image: '🔋', category: 'gadgets', desc: 'Quick Charging Support' },
    { id: 'd3', name: 'Smartwatch Ultra Series 8', price: 4500, image: '⌚', category: 'gadgets', desc: 'Bluetooth Calling & Fitness Tracker' }
  ],
  fashion: [
    { id: 'f1', name: 'Cyberpunk Gaming Hoodie', price: 2200, image: '👕', category: 'fashion', desc: 'Premium Fleece Cotton Material' },
    { id: 'f2', name: 'RGB LED Gaming Backpack', price: 5000, image: '🎒', category: 'fashion', desc: 'Waterproof with USB Port' },
    { id: 'f3', name: 'Stylish Cyber Streetwear Cap', price: 800, image: '🧢', category: 'fashion', desc: 'Adjustable Trendy Cap' }
  ]
};

exports.getAllStores = (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: storeDatabase });
  } catch (error) {
    next(error);
  }
};


exports.addProduct = (req, res, next) => {
  try {
    const { name, category, price, description, image } = req.body;
    
   
    const targetCategory = storeDatabase[category] ? category : 'gaming';

    const newProduct = {
      id: `prod_${Date.now()}`,
      name,
      price: Number(price),
      image: image || '🛒',
      category: targetCategory,
      desc: description || 'New product added by Sohail Admin'
    };

    storeDatabase[targetCategory].push(newProduct);

    res.status(201).json({
      success: true,
      message: 'product is successfully added',
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};