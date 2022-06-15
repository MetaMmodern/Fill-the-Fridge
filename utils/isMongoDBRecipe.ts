import { ObjectId } from "mongodb";

export function isMongoDBRecipe(id: string) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}
