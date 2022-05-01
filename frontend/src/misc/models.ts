export interface movie{
  id: number;
  name: string;
  year: string;
  director: string;
  stars: string;
  writers: string;
  img_url: string;
  review: string;
  ratings: rating
}
export interface rating{
  directing: number;
  acting: number;
  costume_design: number;
  editing: number;
  music: number;
  visual_effects: number;
  screenplay: number;
}


export interface partial_movie{
  id:number;
  name:string;
  year: string;
  img_url: string;
  rating: number;
}
