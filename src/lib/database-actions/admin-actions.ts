"use server";

import { AdminModel, CreateAdminRequest } from "../../db/models/Admin";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// JWT secret - in production, this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set. Please add it to your .env.local file.");
}
const JWT_EXPIRES_IN = "2d";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  admin?: {
    id: string;
    username: string;
    email?: string;
  };
  error?: string;
}

/**
 * Login admin user
 */
export async function loginAdmin(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const admin = await AdminModel.verifyCredentials(credentials.username, credentials.password);

    if (!admin) {
      return { success: false, error: "Invalid username or password" };
    }

    // Update last login time
    await AdminModel.updateLastLogin(admin._id!);

    // Create JWT token
    const token = jwt.sign(
      {
        adminId: admin._id!.toString(),
        username: admin.username,
      },
      JWT_SECRET as string,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return {
      success: true,
      admin: {
        id: admin._id!.toString(),
        username: admin.username,
        email: admin.email,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

/**
 * Logout admin user
 */
export async function logoutAdmin(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin-token");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false };
  }
}

/**
 * Verify admin authentication
 */
export async function verifyAdminAuth(): Promise<{
  success: boolean;
  admin?: {
    id: string;
    username: string;
    email?: string;
  };
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) {
      return { success: false };
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET as string) as { adminId: string; username: string };

    // Get admin from database
    const admin = await AdminModel.findById(decoded.adminId);

    if (!admin || !admin.isActive) {
      return { success: false };
    }

    return {
      success: true,
      admin: {
        id: admin._id!.toString(),
        username: admin.username,
        email: admin.email,
      },
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return { success: false };
  }
}

/**
 * Create admin user (for initial setup)
 */
export async function createAdmin(data: CreateAdminRequest): Promise<{
  success: boolean;
  admin?: {
    id: string;
    username: string;
    email?: string;
  };
  error?: string;
}> {
  try {
    const admin = await AdminModel.create(data);

    return {
      success: true,
      admin: {
        id: admin._id!.toString(),
        username: admin.username,
        email: admin.email,
      },
    };
  } catch (error) {
    console.error("Create admin error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create admin",
    };
  }
}
