import { hashSync } from 'bcryptjs'
import slugify from 'slugify'
const sampleData = {
  users: [
    {
      name: 'Chung Nguyen',
      email: 'chung.gkh@gmail.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Khanh Nguyen',
      email: 'khanh@gmail.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Han Nguyen',
      email: 'han@gmail.com',
      password: hashSync('123456', 10),
      role: 'user'
    },
    {
      name: 'Hien Nguyen',
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
      category: 'book',
      brand: '',
      price: 46.83,
      images: ['/images/book-sample.webp'],
      sellerId: 'cma2e319p0003t0ht5bghu8y9',
    },
    {
      title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      slug: slugify('Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones'),
      description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results',
      category: 'book',
      brand: '',
      price: 45.99,
      images: ['/images/auto-habits.jpg'],
      sellerId: 'cma2e319p0003t0ht5bghu8y9',
    },
  ]
}

export default sampleData