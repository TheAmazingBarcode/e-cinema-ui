import {Genre} from "./Genre";

export interface Movie {
  id: Number
  name: String
  description: String
  duration: Number
  genre:Genre
}
