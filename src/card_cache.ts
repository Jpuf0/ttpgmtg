import type { Card } from "./types";

const BASE_URL = "https://api.scryfall.com/";

const cardCache = new Map<string,Card>();

export const getCardById = async (id: string): Promise<Card> => {
    console.log(cardCache.has(id));
    if (cardCache.has(id)) { 
        return cardCache.get(id)!;
    } else {
        return fetch(`${BASE_URL}cards/${id}`)
            .then(response => response.json())
            .then(data => {
                cardCache.set(id, data);
                return data;
            })
            .catch((error) => {
                console.error('Scryfall exploded: ', error);
            });
    }
}