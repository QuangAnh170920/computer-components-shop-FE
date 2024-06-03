export interface Message {
    id: string;
    text: string;
    createdDate: string;
    participantId:string;
}

export type Thread = Message[];
