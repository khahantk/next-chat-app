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
      title: 'The Complete Developer: Master the Full Stack with TypeScript, React, Next.js',
      slug: 'the-complete-developer-master-the-full-stack-with-typescript-react-nextjs',
      description: 'Web / Web Services & APIs, Web / Web Programming, General, Programming Languages / Javascript',
      category: 'category text',
      brand: 'brand text',
      author: 'author text',
      price: 46.83,
      sellerId: 'cm9jmoaca0003t0d6qliny59s'
    }
  ]
}

export default sampleData