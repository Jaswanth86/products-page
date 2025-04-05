# Shopping Cart App

This is a simple React shopping cart application that allows users to:
- Add products to a cart
- Update quantities
- Track progress towards earning a free gift

## Features

- Display products with quantity selectors and "Add to Cart" buttons
- Shopping cart with ability to update quantities and remove items
- Free gift is automatically added when subtotal reaches $1000
- Progress bar showing progress toward getting the free gift
- Fully responsive design

## How to Run the Project

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation Steps

1. Clone the repository or unzip the project files
```
git clone <repository-url>
```

2. Navigate to the project directory
```
cd shopping-cart-app
```

3. Install dependencies
```
npm install
```
or
```
yarn install
```

4. Start the development server
```
npm start
```
or
```
yarn start
```

5. Open your browser and navigate to http://localhost:3000

## Project Structure

- `src/App.js` - Main component with all the functionality
- `src/App.css` - Styles for the application
- `public/index.html` - HTML template

## Implementation Details

- Uses React's built-in state management (useState, useEffect)
- Maintains separate states for products and cart
- Shows notification when the free gift is added
- Ensures only one free gift can be added and it cannot be removed manually
- The free gift is automatically removed if the cart value goes below the threshold