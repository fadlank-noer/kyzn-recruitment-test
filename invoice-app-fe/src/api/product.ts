export interface ProductCatalogItem {
    id: string
    name: string
    price: number
    stock: number
    picture: string
}

export const PRODUCT_CATALOG: ProductCatalogItem[] = [
    {
        id: "1",
        name: "Bluetooth speaker",
        price: 210000,
        stock: 50,
        picture: "https://unsplash.com/photos/black-jbl-portable-speaker-on-brown-wooden-table-g5Y5kjOwGwQ",
    },
    {
        id: "2",
        name: "Headphone",
        price: 50000,
        stock: 50,
        picture: "https://unsplash.com/photos/a-pair-of-headphones-sitting-on-top-of-each-other-A6hzRnwR3vM",
    },
    {
        id: "3",
        name: "Laptop Charger",
        price: 200000,
        stock: 50,
        picture: "https://unsplash.com/photos/white-apple-charging-adapter-on-white-table-6l5z2EPrnFc",
    },
    {
        id: "4",
        name: "LCD Monitor",
        price: 500000,
        stock: 50,
        picture: "https://unsplash.com/photos/a-computer-monitor-sitting-on-top-of-a-desk-bRJP1hLyA2o",
    },
];