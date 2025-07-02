# Project Overview

A modular and responsive dashboard featuring real-time data for cryptocurrency prices, stock values, and currency conversion. Built with React, TypeScript, Redux, TailwindCSS, and secure WebSocket 

## Features

### CryptoTable
- Live cryptocurrency pricing powered by WebSocket and CoinGecko API
- Advanced table features: search, pagination, filtering, sorting
- Dark/light theme toggle
- Responsive layout for desktop and mobile
- Fallback polling mechanism for connectivity issues

### Currency Converter
- Real-time conversion rates via ExchangeRate API
- Conversion between over 150+ currencies
- Intuitive UI for quick comparisons
- Conversion history with timestamped logs

### Stock Table
- Stock price tracking with real-time refresh
- Company name, symbol, price, change %, and market cap
- Sorting and searching functionality
- Modular state management using Redux slices

## 🧰 Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Redux Toolkit
- **APIs**: CoinGecko, ExchangeRate, finnhub (for stocks)

# Modular Design
- Reusable components with scoped logic
- Feature-based folder separation
- Centralized config & hooks for scalability

# Author 
Bhagya Sri Ramkumar