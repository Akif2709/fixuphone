import { ObjectId } from "mongodb";

/**
 * Serialize MongoDB ObjectId to string for client components
 * This prevents the "Only plain objects can be passed to Client Components" error
 */
export function serializeObjectId<T extends { _id?: ObjectId }>(obj: T): Omit<T, "_id"> & { _id?: string } {
  return {
    ...obj,
    _id: obj._id?.toString(),
  };
}

/**
 * Serialize an array of objects with ObjectId fields
 */
export function serializeObjectIdArray<T extends { _id?: ObjectId }>(arr: T[]): Array<Omit<T, "_id"> & { _id?: string }> {
  return arr.map((item) => serializeObjectId(item));
}
