import { read, exclude } from "./httpServices";



export async function apiGetAllFlashCards() {
    const allFlashCards = await read('/flashcards');
    return allFlashCards
}

export async function apiDeleteFlashCard(cardId){
    await exclude(`/flashcards/${cardId}`);
}