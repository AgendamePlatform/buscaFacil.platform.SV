// marketplace.ts
export interface MarketplaceItem {
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
    previousPrice: number;
}
