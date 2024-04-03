let products = [];

async function fetchProducts() {
  try {
    const response = await fetch('https://tasty-terra-pizza-server-phi.vercel.app//products');
    const data = await response.json();
    products = data;
    console.log('Fetched products:', products);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Call fetchProducts to get the products asynchronously
fetchProducts()
  .catch(error => {
    // Handle errors if any
    console.error('Error:', error);
  });

// Export the products array
export default products;
