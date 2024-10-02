import {Genre} from "./Genre";
import {Actor} from "./Actor";

export interface Movie {
  id: Number
  name: String
  description: String
  duration: Number
  genre:Genre
  actors:Actor[]
}
