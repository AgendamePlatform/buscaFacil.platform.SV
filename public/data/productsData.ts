// dataProduct.ts
export interface Product {
    id: number;
    title: string;
    department: string;
    publicationDate: string;
    details: string;
    isNew: boolean;
    images: string[];
    category: string;
    transport: string;
    userName: string;
    userImage: string;
    price: number;
    previousPrice?: number; // Opcional, ya que no todos los productos tendrán precio anterior
}

export const products: Product[] = [
    {
        id: 1,
        title: "MacBook Pro 2021",
        department: "San Salvador",
        publicationDate: "14 de Septiembre, 2024",
        details: "MacBook Pro con chip M1, 16GB RAM, 512GB SSD, en excelentes condiciones.",
        isNew: false,
        images: ["https://imageio.forbes.com/specials-images/imageserve/6176a01efc8d0ea845836895/03FE1ED7-197F-4272-9831-990FC45461D4-1-105-c/960x0.jpg?format=jpg&width=960"],
        category: "Electrónica",
        transport: "Entrega personal",
        userName: "Juan Perez",
        userImage: "/path/to/user1.jpg",
        price: 1200,
        previousPrice: 1500,
    },
    {
        id: 2,
        title: "iPhone 13 Pro",
        department: "La Libertad",
        publicationDate: "20 de Septiembre, 2024",
        details: "iPhone 13 Pro, 256GB, color grafito. Usado, pero en excelente estado.",
        isNew: false,
        images: ["data:image/jpeg;base64,/9j/4AAQSk..."],
        category: "Telefonía",
        transport: "Envío por mensajería",
        userName: "Maria Lopez",
        userImage: "/path/to/user2.jpg",
        price: 900,
    },
    {
        id: 3,
        title: "Samsung Galaxy S22",
        department: "San Miguel",
        publicationDate: "10 de Octubre, 2024",
        details: "Samsung Galaxy S22, 128GB, con pantalla AMOLED, nuevo en caja.",
        isNew: true,
        images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IqLlWOsciUXyykZjIY34Ge9_GW9hGabqSg&s"],
        category: "Telefonía",
        transport: "Entrega personal",
        userName: "Carlos Gomez",
        userImage: "/path/to/user3.jpg",
        price: 1000,
        previousPrice: 1100,
    },
    {
        id: 4,
        title: "Bicicleta de Montaña",
        department: "Santa Ana",
        publicationDate: "25 de Agosto, 2024",
        details: "Bicicleta de montaña, marco de aluminio, frenos de disco, 21 velocidades.",
        isNew: true,
        images: ["https://www.sumitate.com.ar/img/articulos/2023/05/bicicleta_montana_merida_ninety_six_rc_9000_thumb1.jpg"],
        category: "Deportes",
        transport: "Recoger en tienda",
        userName: "Pedro Martinez",
        userImage: "/path/to/user4.jpg",
        price: 500,
    },
    {
        id: 5,
        title: "Televisor LG 55\" 4K",
        department: "San Vicente",
        publicationDate: "5 de Julio, 2024",
        details: "Televisor LG de 55 pulgadas con resolución 4K y sistema operativo webOS.",
        isNew: false,
        images: ["data:image/jpeg;base64,/9j/4AAQSk..."],
        category: "Electrónica",
        transport: "Entrega a domicilio",
        userName: "Ana Hernandez",
        userImage: "/path/to/user5.jpg",
        price: 800,
        previousPrice: 950,
    },
    {
        id: 6,
        title: "Cámara Canon EOS R5",
        department: "Ahuachapán",
        publicationDate: "12 de Noviembre, 2024",
        details: "Cámara Canon EOS R5, 45MP, video 8K, incluye lente 24-105mm.",
        isNew: true,
        images: ["data:image/jpeg;base64,/9j/4AAQSk..."],
        category: "Fotografía",
        transport: "Entrega personal",
        userName: "Sofia Reyes",
        userImage: "/path/to/user6.jpg",
        price: 2500,
    },
];
