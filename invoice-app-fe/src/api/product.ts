export interface ProductCatalogItem {
    id: string
    name: string
    price: number
    picture: string
}

export const PRODUCT_CATALOG: ProductCatalogItem[] = [
    {
        id: "1",
        name: "Bluetooth speaker",
        price: 210000,
        picture: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "2",
        name: "Headphone",
        price: 50000,
        picture: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "3",
        name: "Laptop Charger",
        price: 200000,
        picture: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "4",
        name: "LCD Monitor",
        price: 500000,
        picture: "https://plus.unsplash.com/premium_photo-1680721575441-18d5a0567269?q=80&w=1104&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];