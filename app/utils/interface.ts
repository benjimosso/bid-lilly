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
    stripe_Price_id: string;
    sms_sent: boolean;
  }

  export interface Bids {
    id: number;
    amount: number;
    created_at: string;
    full_name: string;
    email: string;
    user_id: string;
    item_id: number;
    phone_number: string;
  }

  export interface Winners {
    id: number;
    created_at: string;
    email: string;
    first_name: string;
    last_name: string;
    item_id: number;
    phone_number: string;
    user_id: string
    items: Item;
  }