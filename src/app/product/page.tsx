

async function getProducts(): Promise<any[]> {
    const res = await fetch("https://dummyjson.com/products", {
        // caching strategy (important)
        next: { revalidate: 60 } // ISR: revalidate every 60 sec
    })

    // Handle HTTP errors
    if (!res.ok) {
        throw new Error("Failed to fetch products")
    }

    const data = await res.json()

    // Defensive programming
    if (!data?.products || !Array.isArray(data.products)) {
        throw new Error("Invalid API response")
    }

    return data.products
}

export default async function ProductsPage() {
    const products = await getProducts()

    // Empty state handling
    if (products.length === 0) {
        return <p>No products available</p>
    }

    return (
        <div>
            <h1>Products</h1>
            {/* <ProductsTable products={products} /> */}
        </div>
    )
}
