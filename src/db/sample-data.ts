import { hashSync } from 'bcryptjs'
const sampleData = {
  users: [
    {
      name: 'Chung',
      email: 'chung.gkh@gmail.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Khanh',
      email: 'khanh@gmail.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Han',
      email: 'han@gmail.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Hien',
      email: 'hien@gmail.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'admin',
      email: 'admin@gmail.com',
      password: hashSync('123456', 10),
      role: 'admin'
    },
  ],
  products: [
    {
      title: 'Product 1',
      slug: 'product-1',
      description: 'description text',
      category: 'category text',
      brand: 'brand text',
      author: 'author text',
      sellerId: 'cm9jmoaca0003t0d6qliny59s'
    }
  ]
}

export default sampleData