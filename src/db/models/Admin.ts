import { getDatabase } from "../connection";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

export interface Admin {
  _id?: ObjectId;
  username: string;
  password: string; // This will be hashed
  email?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface CreateAdminRequest {
  username: string;
  password: string;
  email?: string;
}

export class AdminModel {
  private static collectionName = "admins";

  /**
   * Get the database collection
   */
  private static async getCollection() {
    const db = await getDatabase();
    return db.collection<Admin>(this.collectionName);
  }

  /**
   * Create a new admin user
   */
  static async create(data: CreateAdminRequest): Promise<Admin> {
    const collection = await this.getCollection();

    // Check if admin already exists
    const existingAdmin = await collection.findOne({ username: data.username });
    if (existingAdmin) {
      throw new Error("Admin user already exists");
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const admin: Admin = {
      username: data.username,
      password: hashedPassword,
      email: data.email,
      isActive: true,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(admin);
    return { ...admin, _id: result.insertedId };
  }

  /**
   * Find admin by username
   */
  static async findByUsername(username: string): Promise<Admin | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ username, isActive: true });
  }

  /**
   * Find admin by ID
   */
  static async findById(id: string | ObjectId): Promise<Admin | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId, isActive: true });
  }

  /**
   * Verify admin credentials
   */
  static async verifyCredentials(username: string, password: string): Promise<Admin | null> {
    const admin = await this.findByUsername(username);
    if (!admin) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return null;
    }

    return admin;
  }

  /**
   * Update last login time
   */
  static async updateLastLogin(adminId: string | ObjectId): Promise<void> {
    const collection = await this.getCollection();
    const objectId = typeof adminId === "string" ? new ObjectId(adminId) : adminId;

    await collection.updateOne({ _id: objectId }, { $set: { lastLogin: new Date() } });
  }

}
