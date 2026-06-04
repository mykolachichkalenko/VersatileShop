# 🚀 VERSATILE SHOP

**Versatile Shop** is a full-featured marketplace platform with Artificial Intelligence integration, built using **Java Spring WebFlux** and **React**. The project combines modern reactive architecture, real-time communication, semantic search, and AI-powered product generation.

---

# 🛠 Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring WebFlux
- Spring Security
- OAuth2 (Google)
- PostgreSQL
- R2DBC
- Redis
- Apache Kafka
- WebSocket
- pgvector
- Cloudinary
- OpenAI API
- Docker

## Frontend

- React
- TypeScript
- TailwindCSS
- shadcn/ui

---

# ✨ Features

## 👤 Users & Authorization

- Registration and login via Google OAuth2
- User profiles
- User blocking system
- Online / Offline status tracking

---

## 🛒 Marketplace

- Product creation
- Product editing
- Product deletion
- Product card viewing
- Product search
- Add products to favorites
- Recommendation system based on favorite products

---

## 🤖 AI Functionality

- Automatic product creation from a text description
- Product description vectorization using OpenAI Embeddings
- Semantic product search powered by pgvector

---

## 💬 Chat System

- Personal user-to-user conversations
- Real-time text messaging
- Image sharing
- WebSocket-based communication
- Message history pagination
- Typing indicator ("typing...")
- Unread message counter
- Automatic chat list updates
- Read message tracking

---

## ⚡ Performance & Scalability

- Sharded message storage (`messages_%shard`)
- Redis caching
- Fully reactive non-blocking request processing
- Asynchronous WebSocket services

---

## ⭐ Rating System

### Product Reviews

- Product reviews and ratings
- Average product rating calculation

### User Reviews

- User reviews and ratings
- Average user rating calculation

---

## 🚨 Complaints System

### Product Complaints

- Product reporting system
- Complaint history storage

### User Complaints

- User reporting system
- Complaint history storage

---

## 🏗 Architectural Features

- Fully reactive backend built with Spring WebFlux
- Reactive PostgreSQL access via R2DBC
- Event-driven architecture using Apache Kafka
- Real-time communication with WebSocket
- Vector search powered by pgvector
- Containerized deployment using Docker Compose

---

## 🎯 Project Goals

The project demonstrates the implementation of:

- Reactive programming principles
- Scalable marketplace architecture
- Real-time communication systems
- AI-powered product generation
- Vector-based semantic search
- Event-driven architecture
- Modern frontend development with React and TypeScript
