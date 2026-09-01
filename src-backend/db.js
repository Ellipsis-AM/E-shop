const fs      = require('fs')                                                                               ;
const path    = require('path')                                                                             ;
const sqlite3 = require('sqlite3').verbose()                                                                ;
const bcrypt  = require('bcryptjs')                                                                         ;

const dataDir = path.join(__dirname, '..', 'data')                                                          ;
const dbFile  = path.join(dataDir, 'store.db')                                                              ;

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })                                                              ;
}

const db = new sqlite3.Database(dbFile)                                                                     ;

const run = (sql, params = [])          =>
    new Promise((resolve, reject)       => {
        db.run(sql, params,function (err) {
            if (err) return reject(err)                                                                     ;
            resolve(this)                                                                                   ;
        })                                                                                                  ;
    })                                                                                                      ;

const get = (sql, params = [])          =>
    new Promise((resolve, reject)       => {
        db.get(sql, params, (err, row)  => {
            if (err) return reject(err)                                                                     ;
            resolve(row)                                                                                    ;
        })                                                                                                  ;
    })                                                                                                      ;

const all = (sql, params = [])          =>
    new Promise((resolve, reject)       => {
        db.all(sql, params, (err, rows) => {
            if (err) return reject(err)                                                                     ;
            resolve(rows)                                                                                   ;
        })                                                                                                  ;
    })                                                                                                      ;

async function createDefaultAdmin() {
    const adminExists = await get('SELECT id FROM users WHERE email = ?',
        ['admin@example.com'])                                                                              ;

    if (!adminExists) {
        const passwordHash = await bcrypt.hash('admin123', 10)                                              ;

        await run(
        'INSERT INTO users (name, phone, address, email, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
        ['Admin','','', 'admin@example.com', passwordHash, 'admin']
        )                                                                                                   ;
    }
}

async function createUser(name, phone, address, email, passwordHash, role = 'customer') {
    const result = await run(
        'INSERT INTO users (name, phone, address, email, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
        [name, phone, address, email, passwordHash, role]
    )                                                                                                       ;

    return {
        id: result.lastID   ,
        name                ,
        phone               ,
        address             ,
        email               ,
        role
    }                                                                                                       ;
}

async function createProduct(name, price, stock, categoryId) {
    const result = await run(
        'INSERT INTO products (name, price, stock, category_id) VALUES (?, ?, ?, ?)',
        [name, price, stock, categoryId]
    )                                                                                                       ;
    
    return {
        id: result.lastID   ,
        name                ,
        price               ,
        stock               ,
        category_id: categoryId
    }                                                                                                       ;
}

async function deleteProduct(id) {
    await run('DELETE FROM order_items WHERE product_id = ?', [id])                                         ;
    await run('DELETE FROM products WHERE id = ?'           , [id])                                         ;
}

async function initDatabase() {
    await run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT                    ,
        name TEXT NOT NULL
    )`)                                                                                                     ;

    await run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT                    ,
        name TEXT NOT NULL                                      ,
        price REAL NOT NULL                                     ,
        stock INTEGER NOT NULL                                  ,
        image_url TEXT                                          ,
        category_id INTEGER                                     ,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )`)                                                                                                     ;

    await run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT                    ,
        customer_name TEXT NOT NULL                             ,
        customer_phone TEXT NOT NULL                            ,
        customer_address TEXT NOT NULL                          ,
        customer_email TEXT NOT NULL                            ,
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP           ,
        total_amount REAL NOT NULL                              ,
        status TEXT NOT NULL DEFAULT 'pending'
    )`)                                                                                                     ;

    await run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT                    ,
        order_id INTEGER NOT NULL                               ,
        product_id INTEGER NOT NULL                             ,
        quantity INTEGER NOT NULL                               ,
        price REAL NOT NULL                                     ,
        FOREIGN KEY (order_id) REFERENCES orders(id)            ,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`)                                                                                                     ;

    await run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT                    ,
        name TEXT NOT NULL                                      ,
        phone TEXT NOT NULL                                     ,
        address TEXT NOT NULL                                   ,
        email TEXT NOT NULL UNIQUE                              ,
        password_hash TEXT NOT NULL                             ,
        role TEXT NOT NULL DEFAULT 'customer'
    )`)                                                                                                     ;

    await run(`ALTER TABLE users ADD COLUMN phone TEXT NOT NULL DEFAULT ''`).catch(() => {})                ;
    await run(`ALTER TABLE users ADD COLUMN address TEXT NOT NULL DEFAULT ''`).catch(() => {})              ;
    await run(`ALTER TABLE orders ADD COLUMN customer_phone TEXT NOT NULL DEFAULT ''`).catch(() => {})      ;
    await run(`ALTER TABLE orders ADD COLUMN customer_address TEXT NOT NULL DEFAULT ''`).catch(() => {})    ;

    await createDefaultAdmin();

    const countRow = await get(`SELECT COUNT(*) as count FROM products`)                                    ;
    if (!countRow || countRow.count === 0) {
        const categoryNames = ['Jar', 'Food']                                                               ;
        const categoryIds   = {}                                                                            ;
        
        for (const name of categoryNames) {
            const result = await run('INSERT INTO categories (name) VALUES (?)', [name])                    ;
            categoryIds[name] = result.lastID                                                               ;
        } 

        const products = [
            { name: 'Santol' , price: 275, stock: 100, image_url: 'https://example.com/jar.jpg', category: 'Jar' },
            { name: 'Achara' , price: 300, stock: 100, image_url: 'https://example.com/jar.jpg', category: 'Jar' },
        ]                                                                               ;

        for (const product of products) {
            const category_id = categoryIds[product.category];
            await run('INSERT INTO products (name, price, stock, image_url, category_id) VALUES (?, ?, ?, ?, ?)', [
                product.name     ,
                product.price    ,
                product.stock    ,
                product.image_url,
                category_id
            ])                                                                                              ;
        }
    }
}

async function getUserById(id) {
    return get(
        'SELECT * FROM users WHERE id = ?',
        [id]
    )                                                                                                       ;
}

async function getUserByEmail(email) {
  return get(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )                                                                                                         ;
}

async function getAllProducts() {
    return all(`SELECT p.id, p.name, p.price, p.stock, p.image_url, c.name AS category
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id`)                                                    ;
}

async function getProductById(id) {
        return get(`SELECT p.id, p.name, p.price, p.stock, p.image_url, c.name AS category
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
                WHERE p.id = ?`, [id])                                                                      ;
}

async function createOrder(customer_name, customer_phone, customer_address, customer_email, items, totalAmount) {
    if (!items || items.length === 0) {
        throw new Error('Order must include at least one item')                                             ;
    }

    await run('BEGIN TRANSACTION')                                                                          ;
    try {
        const orderResult = await run(
              'INSERT INTO orders (customer_name, customer_phone, customer_address, customer_email, order_date, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [customer_name, customer_phone, customer_address, customer_email, new Date().toISOString(), totalAmount, 'pending']
        )                                                                                                   ;

        const orderId = orderResult.lastID                                                                  ;

        for (const item of items) {
            await run(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            )                                                                                               ;
            await run(
                'UPDATE products SET stock = stock - ? WHERE id = ?',
                [item.quantity, item.product_id]
            )                                                                                               ;
        }
        
        await   run('COMMIT')                                                                               ;
        return  { orderId }                                                                                 ;
    }   catch   (error) {
        await   run('ROLLBACK')                                                                             ;
        throw   error                                                                                       ;
    }
}

async function updateProductStockAndPrice(id, stock, price) {
  return run(
    'UPDATE products SET stock = ?, price = ? WHERE id = ?',
    [stock, price, id]
  )                                                                                                         ;
}

async function getAllOrders() {
  return all(`
    SELECT o.id, o.customer_name, o.customer_phone, o.customer_address,
           o.customer_email, o.total_amount, o.status, o.order_date
    FROM orders o
    ORDER BY o.id DESC
  `)                                                                                                        ;
}

initDatabase().catch(err => {
    console.error('Failed to initialize database:', err)                                                    ;
    process.exit(1)                                                                                         ;
})                                                                                                          ;

module.exports = {
  getAllProducts                ,
  getProductById                ,
  createOrder                   ,
  createUser                    ,
  createProduct                 ,
  deleteProduct                 ,
  getUserById                   ,
  getUserByEmail                ,
  updateProductStockAndPrice    ,
  getAllOrders
};