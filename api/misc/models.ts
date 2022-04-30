export interface movie{
    id: number;
    name: string;
    year: string;
    director: string;
    stars: string;
    writers: string;
    imgUrl: string;
    review: string;
    ratings: rating
}
export interface rating{
    directing: number;
    acting: number;
    costumeDesign: number;
    editing: number;
    music: number;
    visualEffects: number;
    screenplay: number;
}