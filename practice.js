
const Products = [
  { "name": "Paracetamol", "category": "Medicine", "price": 50, "stock": 100 },
  { "name": "Vitamin C", "category": "Supplement", "price": 70, "stock": 50 },
  { "name": "Amoxicillin", "category": "Medicine", "price": 100, "stock": 10 },
  { "name": "Protein Powder", "category": "Supplement", "price": 500, "stock": 5 }
]

// solution 1 
Products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])

// solution 2
Products.aggregate([
  { $match: { stock: { $gt: 10 } } },
  { $group: {_id: "$category",totalStock :{ $sum: "$stock"}}}
])

// solution 3
Products.aggregate([
  {$match: { category:'Medicine', price: {$gte: 50, $lte:100}}}, 
  {$group: {_id : "$price"}}
])