export const CONTACT_PHONE = '9690421423';
export const OWNER_NAME = 'Mukesh Rawat';
export const OWNER_EMAIL = 'mukes19rawat96@gmail.com';

export const SEED_USERS = [
  {
    id: 'u1',
    name: OWNER_NAME,
    email: OWNER_EMAIL,
    password: 'Admin@123',
    role: 'super_admin',
    status: 'active',
    phone: CONTACT_PHONE,
    department: 'Operations',
    lastLogin: '2026-08-15T08:12:00',
    createdAt: '2024-01-10',
  },
  {
    id: 'u2',
    name: 'Priya Shah',
    email: 'priya@demo.com',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
    phone: CONTACT_PHONE,
    department: 'People',
    lastLogin: '2026-08-14T16:40:00',
    createdAt: '2024-03-04',
  },
  {
    id: 'u3',
    name: 'Jordan Lee',
    email: 'jordan@demo.com',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
    phone: CONTACT_PHONE,
    department: 'Sales',
    lastLogin: '2026-08-15T09:05:00',
    createdAt: '2024-04-18',
  },
  {
    id: 'u4',
    name: 'Sam Rivera',
    email: 'sam@demo.com',
    password: 'Viewer@123',
    role: 'viewer',
    status: 'active',
    phone: CONTACT_PHONE,
    department: 'Catalog',
    lastLogin: '2026-08-13T11:22:00',
    createdAt: '2024-06-02',
  },
  {
    id: 'u5',
    name: 'Taylor Chen',
    email: 'taylor@demo.com',
    password: 'Viewer@123',
    role: 'viewer',
    status: 'active',
    phone: CONTACT_PHONE,
    department: 'Fulfillment',
    lastLogin: '2026-08-15T07:48:00',
    createdAt: '2025-01-20',
  },
  {
    id: 'u8',
    name: 'Morgan Ellis',
    email: 'viewer@demo.com',
    password: 'Viewer@123',
    role: 'viewer',
    status: 'active',
    phone: CONTACT_PHONE,
    department: 'Finance',
    lastLogin: '2026-08-12T18:30:00',
    createdAt: '2025-09-09',
  },
];

export const SEED_CUSTOMERS = [
  { id: 'c1', name: 'Hannah Cole', email: 'hannah.cole@northwind.io', phone: CONTACT_PHONE, company: 'Northwind Labs', city: 'New York', country: 'USA', status: 'active', totalOrders: 12, totalSpent: 4280, joinedAt: '2024-05-12', lastOrderAt: '2026-08-10' },
  { id: 'c2', name: 'Luis Romero', email: 'luis@brightpath.co', phone: CONTACT_PHONE, company: 'Brightpath', city: 'Los Angeles', country: 'USA', status: 'active', totalOrders: 8, totalSpent: 1960, joinedAt: '2024-08-03', lastOrderAt: '2026-08-08' },
  { id: 'c3', name: 'Amina Farouk', email: 'amina@kairo.studio', phone: CONTACT_PHONE, company: 'Kairo Studio', city: 'London', country: 'UK', status: 'active', totalOrders: 15, totalSpent: 6120, joinedAt: '2024-02-21', lastOrderAt: '2026-08-14' },
  { id: 'c4', name: 'Noah Kim', email: 'noah.kim@orbitmail.com', phone: CONTACT_PHONE, company: 'Orbit Mail', city: 'Seoul', country: 'South Korea', status: 'inactive', totalOrders: 3, totalSpent: 540, joinedAt: '2025-01-16', lastOrderAt: '2025-11-02' },
  { id: 'c5', name: 'Elena Rossi', email: 'elena@vesper.eu', phone: CONTACT_PHONE, company: 'Vesper', city: 'Rome', country: 'Italy', status: 'active', totalOrders: 9, totalSpent: 2740, joinedAt: '2024-11-08', lastOrderAt: '2026-07-29' },
  { id: 'c6', name: 'Omar Haddad', email: 'omar@sablestudio.com', phone: CONTACT_PHONE, company: 'Sable Studio', city: 'Dubai', country: 'UAE', status: 'active', totalOrders: 6, totalSpent: 1890, joinedAt: '2025-03-22', lastOrderAt: '2026-08-03' },
  { id: 'c7', name: 'Mia Johansson', email: 'mia@fjord.co', phone: CONTACT_PHONE, company: 'Fjord Co', city: 'Stockholm', country: 'Sweden', status: 'pending', totalOrders: 1, totalSpent: 120, joinedAt: '2026-07-18', lastOrderAt: '2026-07-18' },
  { id: 'c8', name: 'Diego Alvarez', email: 'diego@andes.group', phone: CONTACT_PHONE, company: 'Andes Group', city: 'Buenos Aires', country: 'Argentina', status: 'active', totalOrders: 11, totalSpent: 3510, joinedAt: '2024-09-30', lastOrderAt: '2026-08-11' },
];

export const SEED_CUSTOMER_ACTIVITY = [
  { id: 'ca1', customerId: 'c1', type: 'order', description: 'Placed order #ORD-1042', createdAt: '2026-08-10T14:20:00' },
  { id: 'ca2', customerId: 'c1', type: 'profile', description: 'Updated billing address', createdAt: '2026-08-02T09:12:00' },
  { id: 'ca3', customerId: 'c1', type: 'support', description: 'Opened ticket about delayed shipment', createdAt: '2026-07-21T16:40:00' },
  { id: 'ca4', customerId: 'c3', type: 'order', description: 'Placed order #ORD-1051', createdAt: '2026-08-14T11:05:00' },
  { id: 'ca5', customerId: 'c3', type: 'review', description: 'Left a 5-star product review', createdAt: '2026-08-01T18:22:00' },
  { id: 'ca6', customerId: 'c2', type: 'order', description: 'Placed order #ORD-1038', createdAt: '2026-08-08T10:44:00' },
  { id: 'ca7', customerId: 'c8', type: 'order', description: 'Placed order #ORD-1048', createdAt: '2026-08-11T13:18:00' },
  { id: 'ca8', customerId: 'c5', type: 'login', description: 'Signed in from a new device', createdAt: '2026-07-29T08:01:00' },
];

export const SEED_CATEGORIES = [
  { id: 'cat1', name: 'Electronics', slug: 'electronics', description: 'Devices and accessories', productCount: 5 },
  { id: 'cat2', name: 'Apparel', slug: 'apparel', description: 'Clothing and wearables', productCount: 3 },
  { id: 'cat3', name: 'Home', slug: 'home', description: 'Home and office goods', productCount: 3 },
  { id: 'cat4', name: 'Health', slug: 'health', description: 'Wellness products', productCount: 2 },
  { id: 'cat5', name: 'Accessories', slug: 'accessories', description: 'Everyday extras', productCount: 3 },
];

export const SEED_PRODUCTS = [
  { id: 'pr1', name: 'Aero Wireless Headphones', sku: 'EL-AWH-01', categoryId: 'cat1', price: 189, compareAtPrice: 229, stock: 42, status: 'active', description: 'Noise-cancelling over-ear headphones with 30-hour battery.', createdAt: '2025-01-12' },
  { id: 'pr2', name: 'Pulse Smartwatch', sku: 'EL-PSW-02', categoryId: 'cat1', price: 249, stock: 18, status: 'active', description: 'Fitness tracking watch with GPS and heart-rate monitor.', createdAt: '2025-02-03' },
  { id: 'pr3', name: 'Nimbus Laptop Stand', sku: 'HM-NLS-03', categoryId: 'cat3', price: 64, stock: 76, status: 'active', description: 'Aluminum stand with cable management.', createdAt: '2025-02-20' },
  { id: 'pr4', name: 'Canvas Field Jacket', sku: 'AP-CFJ-04', categoryId: 'cat2', price: 128, stock: 9, status: 'active', description: 'Water-resistant jacket for travel and commute.', createdAt: '2025-03-08' },
  { id: 'pr5', name: 'Orbit Desk Lamp', sku: 'HM-ODL-05', categoryId: 'cat3', price: 79, stock: 0, status: 'out_of_stock', description: 'Adjustable LED lamp with USB-C charging.', createdAt: '2025-03-22' },
  { id: 'pr6', name: 'Terra Water Bottle', sku: 'AC-TWB-06', categoryId: 'cat5', price: 32, stock: 140, status: 'active', description: 'Insulated stainless steel bottle, 750ml.', createdAt: '2025-04-01' },
  { id: 'pr7', name: 'Lumen Portable Speaker', sku: 'EL-LPS-07', categoryId: 'cat1', price: 99, compareAtPrice: 129, stock: 31, status: 'active', description: 'Compact Bluetooth speaker with 12-hour playtime.', createdAt: '2025-04-18' },
  { id: 'pr8', name: 'Studio Merino Tee', sku: 'AP-SMT-08', categoryId: 'cat2', price: 48, stock: 54, status: 'active', description: 'Lightweight merino wool t-shirt.', createdAt: '2025-05-06' },
  { id: 'pr9', name: 'Calm Night Serum', sku: 'HL-CNS-09', categoryId: 'cat4', price: 36, stock: 67, status: 'active', description: 'Evening recovery serum for dry skin.', createdAt: '2025-05-19' },
  { id: 'pr10', name: 'Focus Daily Capsules', sku: 'HL-FDC-10', categoryId: 'cat4', price: 28, stock: 88, status: 'active', description: 'Caffeine-free focus supplement, 30-day supply.', createdAt: '2025-06-02' },
  { id: 'pr11', name: 'Harbor Tote Bag', sku: 'AC-HTB-11', categoryId: 'cat5', price: 54, stock: 23, status: 'active', description: 'Structured canvas tote with laptop sleeve.', createdAt: '2025-06-21' },
  { id: 'pr12', name: 'Ridge Trail Sneakers', sku: 'AP-RTS-12', categoryId: 'cat2', price: 142, stock: 14, status: 'active', description: 'Everyday sneakers with extra cushioning.', createdAt: '2025-07-09' },
  { id: 'pr13', name: 'Pixel USB Hub', sku: 'EL-PUH-13', categoryId: 'cat1', price: 45, stock: 0, status: 'out_of_stock', description: '7-in-1 USB-C hub for laptops.', createdAt: '2025-07-28' },
  { id: 'pr14', name: 'Cedar Desk Organizer', sku: 'HM-CDO-14', categoryId: 'cat3', price: 38, stock: 41, status: 'active', description: 'Solid wood tray for desk accessories.', createdAt: '2025-08-14' },
  { id: 'pr15', name: 'North Card Holder', sku: 'AC-NCH-15', categoryId: 'cat5', price: 24, stock: 95, status: 'draft', description: 'Slim leather card holder.', createdAt: '2025-09-01' },
  { id: 'pr16', name: 'Flux Mechanical Keyboard', sku: 'EL-FMK-16', categoryId: 'cat1', price: 169, stock: 27, status: 'active', description: 'Hot-swappable keyboard with RGB lighting.', createdAt: '2025-09-20' },
];

export const SEED_ORDERS = [
  {
    id: 'o1',
    orderNumber: 'ORD-1051',
    customerId: 'c3',
    customerName: 'Amina Farouk',
    items: [{ productId: 'pr1', name: 'Aero Wireless Headphones', quantity: 1, price: 189 }, { productId: 'pr6', name: 'Terra Water Bottle', quantity: 2, price: 32 }],
    total: 253,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Visa •••• 4242',
    shippingAddress: '14 Clerkenwell Rd, London, UK',
    createdAt: '2026-08-14T11:05:00',
    timeline: [
      { id: 'oe1', status: 'pending', note: 'Order placed', createdAt: '2026-08-14T11:05:00' },
      { id: 'oe2', status: 'paid', note: 'Payment captured', createdAt: '2026-08-14T11:06:00' },
      { id: 'oe3', status: 'processing', note: 'Picked by warehouse', createdAt: '2026-08-14T15:40:00' },
    ],
  },
  {
    id: 'o2',
    orderNumber: 'ORD-1050',
    customerId: 'c1',
    customerName: 'Hannah Cole',
    items: [{ productId: 'pr16', name: 'Flux Mechanical Keyboard', quantity: 1, price: 169 }],
    total: 169,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Mastercard •••• 5510',
    shippingAddress: '88 Hudson St, New York, USA',
    createdAt: '2026-08-13T09:22:00',
    timeline: [
      { id: 'oe4', status: 'pending', note: 'Order placed', createdAt: '2026-08-13T09:22:00' },
      { id: 'oe5', status: 'processing', note: 'Packed', createdAt: '2026-08-13T13:10:00' },
      { id: 'oe6', status: 'shipped', note: 'Handed to courier', createdAt: '2026-08-14T08:00:00' },
    ],
  },
  {
    id: 'o3',
    orderNumber: 'ORD-1048',
    customerId: 'c8',
    customerName: 'Diego Alvarez',
    items: [{ productId: 'pr4', name: 'Canvas Field Jacket', quantity: 1, price: 128 }, { productId: 'pr11', name: 'Harbor Tote Bag', quantity: 1, price: 54 }],
    total: 182,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'PayPal',
    shippingAddress: '1200 Av. Corrientes, Buenos Aires',
    createdAt: '2026-08-11T13:18:00',
    timeline: [
      { id: 'oe7', status: 'pending', note: 'Order placed', createdAt: '2026-08-11T13:18:00' },
      { id: 'oe8', status: 'shipped', note: 'In transit', createdAt: '2026-08-12T10:00:00' },
      { id: 'oe9', status: 'delivered', note: 'Delivered to recipient', createdAt: '2026-08-14T17:25:00' },
    ],
  },
  {
    id: 'o4',
    orderNumber: 'ORD-1046',
    customerId: 'c2',
    customerName: 'Luis Romero',
    items: [{ productId: 'pr7', name: 'Lumen Portable Speaker', quantity: 2, price: 99 }],
    total: 198,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Visa •••• 8821',
    shippingAddress: '450 Sunset Blvd, Los Angeles, USA',
    createdAt: '2026-08-10T16:55:00',
    timeline: [{ id: 'oe10', status: 'pending', note: 'Awaiting payment', createdAt: '2026-08-10T16:55:00' }],
  },
  {
    id: 'o5',
    orderNumber: 'ORD-1044',
    customerId: 'c6',
    customerName: 'Omar Haddad',
    items: [{ productId: 'pr2', name: 'Pulse Smartwatch', quantity: 1, price: 249 }],
    total: 249,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Apple Pay',
    shippingAddress: 'Marina Plaza, Dubai, UAE',
    createdAt: '2026-08-09T12:30:00',
    timeline: [
      { id: 'oe11', status: 'pending', note: 'Order placed', createdAt: '2026-08-09T12:30:00' },
      { id: 'oe12', status: 'cancelled', note: 'Customer requested cancel', createdAt: '2026-08-09T18:02:00' },
      { id: 'oe13', status: 'refunded', note: 'Refund issued', createdAt: '2026-08-09T18:20:00' },
    ],
  },
  {
    id: 'o6',
    orderNumber: 'ORD-1042',
    customerId: 'c1',
    customerName: 'Hannah Cole',
    items: [{ productId: 'pr8', name: 'Studio Merino Tee', quantity: 3, price: 48 }],
    total: 144,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Visa •••• 4242',
    shippingAddress: '88 Hudson St, New York, USA',
    createdAt: '2026-08-08T10:12:00',
    timeline: [
      { id: 'oe14', status: 'pending', note: 'Order placed', createdAt: '2026-08-08T10:12:00' },
      { id: 'oe15', status: 'delivered', note: 'Delivered', createdAt: '2026-08-10T14:20:00' },
    ],
  },
  {
    id: 'o7',
    orderNumber: 'ORD-1039',
    customerId: 'c5',
    customerName: 'Elena Rossi',
    items: [{ productId: 'pr9', name: 'Calm Night Serum', quantity: 2, price: 36 }, { productId: 'pr10', name: 'Focus Daily Capsules', quantity: 1, price: 28 }],
    total: 100,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Visa •••• 3011',
    shippingAddress: 'Via Nazionale 22, Rome, Italy',
    createdAt: '2026-08-06T19:40:00',
    timeline: [
      { id: 'oe16', status: 'pending', note: 'Order placed', createdAt: '2026-08-06T19:40:00' },
      { id: 'oe17', status: 'shipped', note: 'Left fulfillment center', createdAt: '2026-08-07T09:15:00' },
    ],
  },
  {
    id: 'o8',
    orderNumber: 'ORD-1036',
    customerId: 'c7',
    customerName: 'Mia Johansson',
    items: [{ productId: 'pr6', name: 'Terra Water Bottle', quantity: 1, price: 32 }, { productId: 'pr14', name: 'Cedar Desk Organizer', quantity: 1, price: 38 }],
    total: 70,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Klarna',
    shippingAddress: 'Sveavägen 44, Stockholm, Sweden',
    createdAt: '2026-08-04T08:05:00',
    timeline: [
      { id: 'oe18', status: 'pending', note: 'Order placed', createdAt: '2026-08-04T08:05:00' },
      { id: 'oe19', status: 'processing', note: 'Quality check', createdAt: '2026-08-04T12:00:00' },
    ],
  },
  {
    id: 'o9',
    orderNumber: 'ORD-1033',
    customerId: 'c4',
    customerName: 'Noah Kim',
    items: [{ productId: 'pr13', name: 'Pixel USB Hub', quantity: 1, price: 45 }],
    total: 45,
    status: 'cancelled',
    paymentStatus: 'failed',
    paymentMethod: 'Visa •••• 9901',
    shippingAddress: 'Gangnam-daero 12, Seoul',
    createdAt: '2026-07-28T21:10:00',
    timeline: [
      { id: 'oe20', status: 'pending', note: 'Order placed', createdAt: '2026-07-28T21:10:00' },
      { id: 'oe21', status: 'failed', note: 'Payment declined', createdAt: '2026-07-28T21:11:00' },
      { id: 'oe22', status: 'cancelled', note: 'Auto-cancelled after failed payment', createdAt: '2026-07-28T21:16:00' },
    ],
  },
  {
    id: 'o10',
    orderNumber: 'ORD-1030',
    customerId: 'c2',
    customerName: 'Luis Romero',
    items: [{ productId: 'pr12', name: 'Ridge Trail Sneakers', quantity: 1, price: 142 }],
    total: 142,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Mastercard •••• 1188',
    shippingAddress: '450 Sunset Blvd, Los Angeles, USA',
    createdAt: '2026-07-20T15:33:00',
    timeline: [
      { id: 'oe23', status: 'pending', note: 'Order placed', createdAt: '2026-07-20T15:33:00' },
      { id: 'oe24', status: 'delivered', note: 'Delivered', createdAt: '2026-07-24T11:08:00' },
    ],
  },
];

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export function createSeedNotifications() {
  return [
    {
      id: 'n1',
      title: 'Congratulation Priya',
      message: 'Won the monthly best seller gold badge',
      type: 'user',
      icon: 'award',
      read: false,
      createdAt: hoursAgo(1),
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 'n2',
      title: 'Jordan Lee',
      message: 'Accepted your connection',
      type: 'user',
      icon: 'connect',
      read: false,
      createdAt: hoursAgo(12),
      initials: 'JL',
      color: '#FF4C51',
    },
    {
      id: 'n3',
      title: 'New message',
      message: 'You have a new message from Amina',
      type: 'system',
      icon: 'message',
      read: true,
      createdAt: hoursAgo(1.2),
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
    },
    {
      id: 'n4',
      title: 'New order',
      message: 'Northwind Labs placed order ₹1,154',
      type: 'order',
      icon: 'order',
      read: false,
      createdAt: hoursAgo(24),
      color: '#28C76F',
    },
    {
      id: 'n5',
      title: 'Low stock alert',
      message: 'Canvas Field Jacket is down to 9 units.',
      type: 'product',
      icon: 'stock',
      read: false,
      createdAt: hoursAgo(8),
      color: '#FF9F43',
    },
    {
      id: 'n6',
      title: 'Casey Brooks',
      message: 'Requested staff access for Support',
      type: 'user',
      icon: 'user',
      read: false,
      createdAt: hoursAgo(18),
      initials: 'CB',
      color: '#00BAD1',
    },
    {
      id: 'n7',
      title: 'Payment received',
      message: 'ORD-1051 from Amina Farouk is paid ₹6,120',
      type: 'order',
      icon: 'payment',
      read: false,
      createdAt: hoursAgo(30),
      color: '#28C76F',
    },
    {
      id: 'n8',
      title: 'Felecia Rower',
      message: 'Sent a chat about reserved stock',
      type: 'system',
      icon: 'chat',
      read: false,
      createdAt: hoursAgo(3),
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      id: 'n9',
      title: 'Security notice',
      message: 'New sign-in from Chrome on Windows.',
      type: 'security',
      icon: 'security',
      read: false,
      createdAt: hoursAgo(40),
      color: '#7367F0',
    },
    {
      id: 'n10',
      title: 'Weekly digest ready',
      message: 'Sales report for this week is available.',
      type: 'system',
      icon: 'report',
      read: true,
      createdAt: hoursAgo(72),
      color: '#64748b',
    },
  ];
}

export const SEED_ACTIVITIES = [
  { id: 'a1', user: OWNER_NAME, action: 'updated order status', target: 'ORD-1050 → Shipped', createdAt: '2026-08-14T08:00:00' },
  { id: 'a2', user: 'Jordan Lee', action: 'added a product', target: 'Flux Mechanical Keyboard', createdAt: '2026-08-13T15:22:00' },
  { id: 'a3', user: 'Taylor Chen', action: 'fulfilled order', target: 'ORD-1048', createdAt: '2026-08-12T10:00:00' },
  { id: 'a4', user: 'Priya Shah', action: 'invited a user', target: 'Casey Brooks', createdAt: '2026-08-01T11:40:00' },
  { id: 'a5', user: 'Sam Rivera', action: 'adjusted stock', target: 'Pulse Smartwatch (+12)', createdAt: '2026-07-30T14:18:00' },
  { id: 'a6', user: OWNER_NAME, action: 'changed a role', target: 'Staff permissions', createdAt: '2026-07-22T09:55:00' },
  { id: 'a7', user: 'Priya Shah', action: 'invited a user', target: 'Morgan Ellis', createdAt: '2026-08-12T11:20:00' },
  { id: 'a8', user: 'Jordan Lee', action: 'updated order status', target: 'ORD-1046 → Pending', createdAt: '2026-08-10T17:10:00' },
  { id: 'a9', user: 'Taylor Chen', action: 'adjusted stock', target: 'Canvas Field Jacket (−4)', createdAt: '2026-08-09T09:30:00' },
  { id: 'a10', user: OWNER_NAME, action: 'added a product', target: 'North Card Holder', createdAt: '2026-08-07T14:05:00' },
];

export const REVENUE_SERIES = [
  { month: 'Feb', revenue: 18400, sales: 142, users: 38, refunds: 920 },
  { month: 'Mar', revenue: 22100, sales: 168, users: 52, refunds: 1100 },
  { month: 'Apr', revenue: 19850, sales: 151, users: 47, refunds: 1280 },
  { month: 'May', revenue: 25640, sales: 190, users: 61, refunds: 980 },
  { month: 'Jun', revenue: 27420, sales: 204, users: 73, refunds: 1410 },
  { month: 'Jul', revenue: 24880, sales: 187, users: 69, refunds: 1160 },
  { month: 'Aug', revenue: 30110, sales: 226, users: 84, refunds: 1320 },
];

export const WEEKLY_OPS = [
  { day: 'Mon', orders: 28, revenue: 4120 },
  { day: 'Tue', orders: 34, revenue: 4980 },
  { day: 'Wed', orders: 31, revenue: 4560 },
  { day: 'Thu', orders: 39, revenue: 5840 },
  { day: 'Fri', orders: 42, revenue: 6210 },
  { day: 'Sat', orders: 29, revenue: 2740 },
  { day: 'Sun', orders: 23, revenue: 1660 },
];

export const PAYMENT_MIX = [
  { name: 'UPI', value: 48 },
  { name: 'Cards', value: 27 },
  { name: 'Net banking', value: 15 },
  { name: 'COD', value: 10 },
];

export const CITY_ORDERS = [
  { name: 'Mumbai', value: 8420 },
  { name: 'Delhi', value: 6180 },
  { name: 'Bengaluru', value: 5340 },
  { name: 'Hyderabad', value: 3120 },
  { name: 'Ahmedabad', value: 2480 },
];

export const CRM_SERIES = [
  { month: 'Feb', leads: 86, deals: 24, won: 11, lost: 8 },
  { month: 'Mar', leads: 102, deals: 31, won: 14, lost: 9 },
  { month: 'Apr', leads: 94, deals: 28, won: 12, lost: 10 },
  { month: 'May', leads: 118, deals: 36, won: 18, lost: 11 },
  { month: 'Jun', leads: 131, deals: 41, won: 21, lost: 12 },
  { month: 'Jul', leads: 124, deals: 38, won: 19, lost: 11 },
  { month: 'Aug', leads: 148, deals: 46, won: 24, lost: 13 },
];

export const CRM_PIPELINE = [
  { name: 'New', value: 42, amount: 126000 },
  { name: 'Qualified', value: 28, amount: 188000 },
  { name: 'Proposal', value: 16, amount: 214000 },
  { name: 'Negotiation', value: 9, amount: 162000 },
  { name: 'Won', value: 24, amount: 312000 },
];

export const CRM_SOURCES = [
  { name: 'Website', leads: 38, quality: 64, close: 18 },
  { name: 'Referral', leads: 22, quality: 86, close: 41 },
  { name: 'Call', leads: 18, quality: 72, close: 29 },
  { name: 'Email', leads: 14, quality: 58, close: 16 },
  { name: 'Social', leads: 8, quality: 44, close: 9 },
];

export const CRM_OWNERS = [
  { name: 'Priya', won: 18, value: 246000 },
  { name: 'Jordan', won: 22, value: 312000 },
  { name: 'Sam', won: 14, value: 188000 },
  { name: 'Taylor', won: 11, value: 154000 },
];

export const CRM_ACTIVITY_WEEK = [
  { day: 'Mon', calls: 24, emails: 41, meetings: 6 },
  { day: 'Tue', calls: 31, emails: 38, meetings: 8 },
  { day: 'Wed', calls: 28, emails: 46, meetings: 7 },
  { day: 'Thu', calls: 36, emails: 33, meetings: 9 },
  { day: 'Fri', calls: 22, emails: 29, meetings: 5 },
  { day: 'Sat', calls: 9, emails: 12, meetings: 2 },
];

export const CRM_FOLLOWUPS = [
  { id: 'f1', company: 'Northwind Labs', contact: 'Hannah Cole', stage: 'Negotiation', owner: 'Jordan', due: 'Today', priority: 'high', value: 86000 },
  { id: 'f2', company: 'Kairo Studio', contact: 'Amina Farouk', stage: 'Proposal', owner: 'Priya', due: 'Tomorrow', priority: 'high', value: 54000 },
  { id: 'f3', company: 'Andes Group', contact: 'Diego Alvarez', stage: 'Qualified', owner: 'Sam', due: 'Wed', priority: 'medium', value: 41000 },
  { id: 'f4', company: 'Brightpath', contact: 'Luis Romero', stage: 'New', owner: 'Taylor', due: 'Thu', priority: 'medium', value: 22000 },
  { id: 'f5', company: 'Vesper', contact: 'Elena Rossi', stage: 'Proposal', owner: 'Jordan', due: 'Fri', priority: 'low', value: 33500 },
];

export const ECOMMERCE_SERIES = [
  { month: 'Feb', revenue: 18400, visits: 8420, orders: 142, conversion: 1.7, returns: 8 },
  { month: 'Mar', revenue: 22100, visits: 9180, orders: 168, conversion: 1.8, returns: 9 },
  { month: 'Apr', revenue: 19850, visits: 8740, orders: 151, conversion: 1.7, returns: 11 },
  { month: 'May', revenue: 25640, visits: 10420, orders: 190, conversion: 1.8, returns: 10 },
  { month: 'Jun', revenue: 27420, visits: 11280, orders: 204, conversion: 1.8, returns: 12 },
  { month: 'Jul', revenue: 24880, visits: 10940, orders: 187, conversion: 1.7, returns: 9 },
  { month: 'Aug', revenue: 30110, visits: 12640, orders: 226, conversion: 1.8, returns: 11 },
];

export const ECOMMERCE_FUNNEL = [
  { name: 'Store visits', value: 12640 },
  { name: 'Add to cart', value: 3180 },
  { name: 'Checkout', value: 980 },
  { name: 'Paid orders', value: 226 },
];

export const ECOMMERCE_CHANNELS = [
  { month: 'Feb', organic: 58, paid: 44, social: 22, email: 18 },
  { month: 'Mar', organic: 64, paid: 51, social: 28, email: 25 },
  { month: 'Apr', organic: 61, paid: 46, social: 24, email: 20 },
  { month: 'May', organic: 72, paid: 58, social: 31, email: 29 },
  { month: 'Jun', organic: 78, paid: 62, social: 34, email: 30 },
  { month: 'Jul', organic: 71, paid: 57, social: 29, email: 30 },
  { month: 'Aug', organic: 86, paid: 68, social: 38, email: 34 },
];

export const ECOMMERCE_HOURLY = [
  { hour: '6a', orders: 4 },
  { hour: '8a', orders: 11 },
  { hour: '10a', orders: 18 },
  { hour: '12p', orders: 26 },
  { hour: '2p', orders: 22 },
  { hour: '4p', orders: 31 },
  { hour: '6p', orders: 38 },
  { hour: '8p', orders: 29 },
  { hour: '10p', orders: 14 },
];

export const ANALYTICS_SERIES = [
  { month: 'Feb', sessions: 12400, users: 8600, bounce: 42, duration: 2.1, pages: 3.2 },
  { month: 'Mar', sessions: 14120, users: 9740, bounce: 39, duration: 2.3, pages: 3.4 },
  { month: 'Apr', sessions: 13280, users: 9120, bounce: 41, duration: 2.2, pages: 3.1 },
  { month: 'May', sessions: 15840, users: 11020, bounce: 37, duration: 2.6, pages: 3.7 },
  { month: 'Jun', sessions: 17110, users: 11880, bounce: 36, duration: 2.8, pages: 3.9 },
  { month: 'Jul', sessions: 16440, users: 11420, bounce: 38, duration: 2.5, pages: 3.6 },
  { month: 'Aug', sessions: 18960, users: 13240, bounce: 34, duration: 3.1, pages: 4.2 },
];

export const ANALYTICS_SOURCES = [
  { name: 'Organic', value: 42 },
  { name: 'Direct', value: 24 },
  { name: 'Paid', value: 18 },
  { name: 'Social', value: 10 },
  { name: 'Referral', value: 6 },
];

export const ANALYTICS_DEVICES = [
  { name: 'Desktop', sessions: 54, duration: 82, conversion: 64 },
  { name: 'Mobile', sessions: 38, duration: 48, conversion: 41 },
  { name: 'Tablet', sessions: 8, duration: 61, conversion: 52 },
];

export const ANALYTICS_HOURLY = [
  { hour: '12a', sessions: 210 },
  { hour: '3a', sessions: 90 },
  { hour: '6a', sessions: 320 },
  { hour: '9a', sessions: 980 },
  { hour: '12p', sessions: 1420 },
  { hour: '3p', sessions: 1680 },
  { hour: '6p', sessions: 1540 },
  { hour: '9p', sessions: 760 },
];

export const ANALYTICS_REGIONS = [
  { name: 'Maharashtra', sessions: 4820 },
  { name: 'Delhi NCR', sessions: 3140 },
  { name: 'Karnataka', sessions: 2680 },
  { name: 'Tamil Nadu', sessions: 2210 },
  { name: 'Gujarat', sessions: 1840 },
];

export const ANALYTICS_PAGES = [
  { path: '/products', views: 4280, bounce: 28 },
  { path: '/pricing', views: 3120, bounce: 34 },
  { path: '/checkout', views: 2860, bounce: 19 },
  { path: '/help', views: 1940, bounce: 41 },
  { path: '/login', views: 1510, bounce: 22 },
];

export const ANALYTICS_GOALS = [
  { name: 'Add to cart', value: 3180 },
  { name: 'Start checkout', value: 980 },
  { name: 'Create account', value: 640 },
  { name: 'Paid order', value: 226 },
];
