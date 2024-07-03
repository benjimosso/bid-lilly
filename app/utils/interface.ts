export interface Item {
    id: number;
    name: string;
    created_at: string;
    endDate: string;
    image: string;
    startingPrice: number;
    description: string;
    currentBid: number;
    emailSent: boolean;
  }

  export interface Bids {
    id: number;
    amount: number;
    created_at: string;
    full_name: string;
    email: string;
    user_id: string;
    item_id: number;
  }