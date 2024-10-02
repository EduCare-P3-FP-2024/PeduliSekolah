import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/config";
import { CreateUserInput, User } from "@/utils/types";
import { hashPassword } from "@/utils/bcrypt";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_USER = "users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection(COLLECTION_USER)
    .find({})
    .project({ password: 0 })
    .toArray()) as User[];

  return users;
};

export const createUser = async (user: CreateUserInput) => {
  const modifiedUser: CreateUserInput = {
    ...user,
    password: hashPassword(user.password),
  };

  const db = await getDb();

  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  return result;
};

export const getUserByUsername = async (username: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ username }, { projection: { password: 0 } })) as User;

  return user;
};

export const getUserById = async (id: string) => {
  const objectId = new ObjectId(id);
  const db = await getDb();

  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ _id: objectId }, { projection: { password: 0 } })) as User;
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email }, { projection: { password: 0 } })) as User;

  return user;
};
