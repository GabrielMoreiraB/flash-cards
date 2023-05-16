import { get } from "./httpServices";

const BACKAND_URL = 'http://localhost:3001/flashcards'

export async function apiGetAllFlashCards() {
    const allFlashCards = await get(BACKAND_URL);
    return allFlashCards
}

export async function apiGetAllFlashCard(cardId){
    
}