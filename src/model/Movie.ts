import {Genre} from "./Genre";
import {Actor} from "./Actor";
import {Producer} from "./Producer";

export interface Movie {
  id: Number
  name: String
  description: String
  duration: Number
  genre:Genre
  actors:Actor[]
  createdAt:Date
  producer:Producer
}
