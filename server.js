const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());

const orders = [];

app.get('/health', (req, res) => res.json({ status: "Order Service is running" }));

app.post('/orders', (req, res) => {
  const { customerEmail, items, totalAmount } = req.body;
  const newOrder = {
    orderId: `DRY-${Math.floor(100000 + Math.random() * 900000)}`,
    customerEmail,
    items,
    totalAmount,
    status: "Confirmed",
    createdAt: new Date()
  };
  orders.push(newOrder);
  res.status(201).json({ message: "Order placed successfully!", order: newOrder });
});

app.get('/orders/:email', (req, res) => {
  const userOrders = orders.filter(o => o.customerEmail === req.params.email);
  res.json(userOrders);
});

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
