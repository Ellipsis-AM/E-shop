const express = require('express')                                                              ;
const cors    = require('cors')                                                                 ;
const bcrypt  = require('bcryptjs')                                                             ;
const db      = require('./db')                                                                 ;
const jwt     = require('jsonwebtoken')                                                         ;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization                                                  ;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })                                      ;
  }

  const token = authHeader.split(' ')[1]                                                        ;

  try {
    const decoded = jwt.verify(token, 'your_secret_key')                                        ;
    req.user = decoded                                                                          ;
    next()                                                                                      ;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })                                     ;
  }
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })                             ;
  }
  next()                                                                                        ;
}

const app     = express()                                                                       ;
const PORT    = process.env.PORT || 4000                                                        ;
app.use(cors())                                                                                 ;
app.use(express.json())                                                                         ;

app.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await db.getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })                                                                                        ;
    }

    res.json({
      id      : user.id     ,
      name    : user.name   ,
      phone   : user.phone  ,
      address : user.address,
      email   : user.email  ,
      role    : user.role
    })                                                                                          ;

  } catch (error) {
    console.error(error)                                                                        ;

    res.status(500).json({
      message: 'Failed to fetch user'
    })                                                                                          ;
  }
})                                                                                              ;


app.get('/api/products', async (req, res) => {
    try {
        const products = await db.getAllProducts()                                              ;
        res.json(products)                                                                      ;
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' })                             ;
    }
})

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await db.getProductById(req.params.id)                                  ;
        if (!product) {
            return res.status(404).json({ error: 'Product not found'})                          ;
        }
        res.json(product)                                                                       ;
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' })                              ;
    }
})                                                                                              ;

app.get('/api/admin/orders', authMiddleware, adminMiddleware, async (req, res) => {
  const orders = await db.getAllOrders()                                                        ;
  res.json(orders)                                                                              ;
})                                                                                              ;

app.get('/api/admin/products', authMiddleware, adminMiddleware, async (req, res) => {
  const products = await db.getAllProducts()                                                    ;
  res.json(products)                                                                            ;
})                                                                                              ;

app.post('/api/orders', async (req, res) => {
    try {
        const {
          customerName    ,
          customerPhone   ,   
          customerAddress , 
          customerEmail   , 
          items           , 
          totalAmount
        } = req.body                                                                            ;

        if (!customerName || !customerPhone || !customerAddress || !customerEmail || !items || items.length === 0 || !totalAmount){
            return res.status(400).json({ error: 'Missing order fields'})                       ;
        }

        const order = await db.createOrder(
          customerName    , 
          customerPhone   , 
          customerAddress , 
          customerEmail   , 
          items           , 
          totalAmount)                                                                          ;
        res.status(201).json(order)                                                             ;
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' })                               ;
    }
})                                                                                              ;

app.post('/api/register', async (req, res) => {
    try {
        const { name, phone, address, email, password } = req.body                              ;

        if (!name || !phone || !address || !email || !password) {
            return res.status(400).json({ error: 'Missing fields' })                            ;
        }

        const existing = await db.getUserByEmail(email)                                         ;
        if (existing) {
            return res.status(400).json({ error: 'User already exists' })                       ;
        }

        const passwordHash = await bcrypt.hash(password, 10)                                    ;

        const user = await db.createUser(name, phone, address, email, passwordHash, 'customer') ;

        res.status(201).json({
            message: 'User created' ,
            user: {
                id      : user.id      ,
                name    : user.name    ,
                phone   : user.phone   ,
                address : user.address ,
                email   : user.email   ,
                role    : user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' })                                  ;
    }
})                                                                                              ;                                                           ;

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body                                                    ;

        const user = await db.getUserByEmail(email)                                             ;
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'})                        ;
        }

        const isMatch = await bcrypt.compare(password, user.password_hash)                      ;
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials'})                        ;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            'your_secret_key'               ,
            { expiresIn: '1h'}
        )                                                                                       ;

        res.json({
            token                           ,
            user: {
                id      : user.id           ,
                name    : user.name         ,
                phone   : user.phone        ,
                address : user.address      ,
                email   : user.email        ,
                role    : user.role
            }
        })                                                                                      ;
    } catch (error) {
        res.status(500).json({error: 'Login failed' })                                          ;
    }
})                                                                                              ;

app.post('/api/admin/products', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, price, stock, categoryId } = req.body                                         ;
    
    if (!name || !price || !stock || !categoryId) {
      return res.status(400).json({ error: 'Missing fields' })                                  ;
    }
    
    const product = await db.createProduct(name, price, stock, categoryId);
    res.status(201).json(product)                                                               ;
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' })                                 ;
  }
})                                                                                              ;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)                                  ;
})                                                                                              ;

app.put('/api/admin/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { stock, price } = req.body                                                           ;
    const productId = req.params.id                                                             ;

    await db.updateProductStockAndPrice(productId, stock, price)                                ;

    res.json({ message: 'Product updated' })                                                    ;
  } catch (error) {
    res.status(500).json({ error: 'Could not update product' })                                 ;
  }
})                                                                                              ;

app.delete('/api/admin/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const productId = req.params.id                                                             ;
    await db.deleteProduct(productId)                                                           ;
    res.json({ message: 'Product deleted' })                                                    ;
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' })                                 ;
  }
})                                                                                              ;