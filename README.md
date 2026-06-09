# E-Commerce Backend Assignment

A secure and scalable E-Commerce Backend built using Node.js, Express.js, and MongoDB.

---

# Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Role Based Access Control (RBAC)
- Permission Based Authorization
- Multer (Image Upload)
- Jest
- Supertest

---

# Features

## Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role Management
- Permission Management

---

## User Management

- Register User
- Login User
- Assign Role To User
- View Users

---

## Role Management

- Create Role
- Update Role
- Delete Role
- Get Roles
- Assign Permissions To Role

---

## Category Management

- Create Category
- Update Category
- Delete Category
- Get Categories

---

## Product Management

- Create Product
- Update Product
- Delete Product
- Get Products
- Product Search
- Product Filtering

---

## Shopping Cart

- Add To Cart
- Update Quantity
- Remove Item
- View Cart

---

## Order Management

- Place Order
- View Orders
- View Order Details
- Update Order Status

---

## Dashboard

- Total Users
- Total Products
- Total Orders
- Total Revenue

---

## Testing

- Unit Testing
- Integration Testing

---

# Project Structure

src

├── controllers
│
├── services
│
├── models
│
├── routes
│
├── middlewares
│
├── utils
│
├── config
│
└── app.js

tests

├── auth
├── role
├── product
├── order
├── permission
└── category

server.js

````

---

# Architecture Explanation

This project follows a Layered Architecture approach.

```text
Client
   │
   ▼
Routes
   │
   ▼
Middleware
(Authentication & Permissions)
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Model
   │
   ▼
MongoDB
````

---

## Layer Responsibilities

### Routes

Responsible for defining API endpoints.

Example:

```text
POST /api/products
GET /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

---

### Middleware

Responsible for:

- Authentication
- Authorization
- Permission Validation
- Error Handling

---

### Controllers

Responsible for:

- Handling Request
- Handling Response
- Calling Service Layer

---

### Services

Responsible for:

- Business Logic
- Database Operations

---

### Models

Responsible for:

- Database Schema
- Collection Structure

---

# Authentication Flow

```text
Register User
      │
      ▼
Login User
      │
      ▼
Generate JWT Token
      │
      ▼
Protected APIs
```

---

# Role & Permission Flow

```text
User
  │
  ▼
Role
  │
  ▼
Permissions
  │
  ▼
Access Validation
```

Example:

```text
SUPER_ADMIN

CREATE_PRODUCT
UPDATE_PRODUCT
DELETE_PRODUCT
CREATE_CATEGORY
DELETE_CATEGORY
VIEW_DASHBOARD
```

---

# Database Design

## User

```json
{
  "_id": "",
  "name": "",
  "email": "",
  "password": "",
  "role": ""
}
```

---

## Role

```json
{
  "_id": "",
  "name": "ADMIN",
  "permissions": ["CREATE_PRODUCT", "UPDATE_PRODUCT"]
}
```

---

## Category

```json
{
  "_id": "",
  "name": "Electronics",
  "parentCategory": null
}
```

---

## Product

```json
{
  "_id": "",
  "name": "",
  "sku": "",
  "description": "",
  "price": 0,
  "stock": 0,
  "category": "",
  "images": []
}
```

---

## Cart

```json
{
  "user": "",
  "items": []
}
```

---

## Order

```json
{
  "user": "",
  "items": [],
  "totalAmount": 0,
  "status": "PENDING"
}
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/ecommerce

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Create:

```text
.env
```

Add:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/ecommerce

JWT_SECRET=your_secret_key
```

---

## Run Project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# Testing

Run all tests:

```bash
npm test
```

---

# API Documentation

Base URL

```text
http://localhost:5000/api
```

---

# Authentication APIs

## Register User

### Request

```http
POST /api/auth/register
```

### Body

```json
{
  "name": "Prince",
  "email": "prince@gmail.com",
  "password": "Password@123"
}
```

---

## Login User

### Request

```http
POST /api/auth/login
```

### Body

```json
{
  "email": "prince@gmail.com",
  "password": "Password@123"
}
```

---

# Role APIs

## Create Role

```http
POST /api/roles
```

---

## Get Roles

```http
GET /api/roles
```

---

## Update Role

```http
PUT /api/roles/:id
```

---

## Delete Role

```http
DELETE /api/roles/:id
```

---

# User APIs

## Assign Role

```http
PUT /api/users/:id/role
```

### Body

```json
{
  "roleId": "role_id"
}
```

---

# Category APIs

## Create Category

```http
POST /api/categories
```

---

## Get Categories

```http
GET /api/categories
```

---

## Update Category

```http
PUT /api/categories/:id
```

---

## Delete Category

```http
DELETE /api/categories/:id
```

---

# Product APIs

## Create Product

```http
POST /api/products
```

---

## Get Products

```http
GET /api/products
```

---

## Get Product By Id

```http
GET /api/products/:id
```

---

## Update Product

```http
PUT /api/products/:id
```

---

## Delete Product

```http
DELETE /api/products/:id
```

---

# Image Upload API

## Upload Product Images

```http
POST /api/uploads/products
```

### Form Data

```text
images
```

Type:

```text
multipart/form-data
```

---

# Cart APIs

## Add To Cart

```http
POST /api/cart
```

---

## Get Cart

```http
GET /api/cart
```

---

## Update Cart Item

```http
PUT /api/cart/:productId
```

---

## Remove Cart Item

```http
DELETE /api/cart/:productId
```

---

# Order APIs

## Place Order

```http
POST /api/orders
```

---

## Get My Orders

```http
GET /api/orders
```

---

## Get Order Details

```http
GET /api/orders/:id
```

---

## Update Order Status

```http
PUT /api/orders/:id/status
```

---

# End To End Workflow

```text
1 Register User

2 Login

3 Create Role

4 Assign Role To User

5 Create Category

6 Create Product

7 Upload Product Images

8 Add Product To Cart

9 Place Order

10 Update Order Status

11 View Dashboard
```

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role Based Authorization
- Permission Based Access Control
- Request Validation
- Error Handling Middleware

---

# Database Schema Overview

The application uses MongoDB as the primary database and follows a normalized schema design with references between collections.

## User Collection

Stores user account information and assigned role.

```json
{
  "_id": "ObjectId",
  "name": "Owner",
  "email": "owner@gmail.com",
  "password": "hashed_password",
  "role": "ObjectId(Role)"
}
```

Relationship:

```text
User
 └── belongs to one Role
```

---

## Role Collection

Stores role definitions and permissions.

```json
{
  "_id": "ObjectId",
  "name": "SUPER_ADMIN",
  "description": "Syatem owner",
  "permissions": ["CREATE_PRODUCT", "UPDATE_PRODUCT"]
}
```

Relationship:

```text
Role
 └── assigned to multiple Users
```

---

## Category Collection

Stores product categories and supports parent-child hierarchy.

```json
{
  "_id": "ObjectId",
  "name": "Electronics",
  "slug": "electronics",
  "description": "This is cloth category",
  "parentCategory": null,
  "isActive": true
}
```

Relationship:

```text
Category
 └── can have child categories
```

---

## Product Collection

Stores product information.

```json
{
  "_id": "ObjectId",
  "name": "iPhone 15",
  "slug": "iphone15",
  "sku": "IPHONE006",
  "description": "Latest Apple smartphone",
  "price": 999,
  "stock": 50,
  "category": "ObjectId(Category)",
  "images": ["image1.jpg", "image2.jpg"],
  "isActive": true
}
```

Relationship:

```text
Product
 └── belongs to one Category
```

---

## Cart Collection

Stores products added to a user's cart.

```json
{
  "_id": "ObjectId",
  "user": "ObjectId(User)",
  "items": [
    {
      "product": "ObjectId(Product)",
      "quantity": 2
    }
  ]
}
```

Relationship:

```text
User
 └── has one Cart

Cart
 └── contains multiple Products
```

---

## Order Collection

Stores order details.

```json
{
  "_id": "ObjectId",
  "user": "ObjectId(User)",
  "orderId": "10000001",
  "items": [
    {
      "product": "ObjectId(Product)",
      "name": "iPhone 15",
      "quantity": 2,
      "price": 999
    }
  ],
  "totalAmount": 1998,
  "status": "PENDING"
}
```

Relationship:

```text
User
 └── can place multiple Orders

Order
 └── contains multiple Products
```

---

## Entity Relationship Overview

```text
User
 │
 ├── Role
 │
 ├── Cart
 │     └── Products
 │
 └── Orders
       └── Products

Category
 └── Products
```
