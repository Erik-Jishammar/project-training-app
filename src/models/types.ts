export interface Exercise {
  _id?: string;
  övning: string;
  set: number;
  reps: number;
  vikt: number;
  kommentar?: string;
}

export interface Session {
  _id?: string;
  split: string;
  date: string;
  exercises: Exercise[];
}


