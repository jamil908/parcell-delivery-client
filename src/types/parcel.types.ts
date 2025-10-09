
export type TParcelStatus = 'pending' | 'picked' | 'in-transit' | 'delivered' | 'cancelled';

export interface IParcel {
  _id: string;
  trackingId?: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  weight: number;
  status: TParcelStatus;
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ICreateParcelPayload {
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  weight: number;
  status?: TParcelStatus;
  assignedTo?: string;
}


export interface IUpdateParcelPayload {
  receiverName?: string;
  receiverAddress?: string;
  receiverPhone?: string;
  weight?: number;
  status?: TParcelStatus;
  assignedTo?: string;
}

export interface IParcelFilters {
  status?: TParcelStatus | 'all';
  search?: string;
  senderId?: string;
  receiverId?: string;
  page?: number;
  limit?: number;
}

