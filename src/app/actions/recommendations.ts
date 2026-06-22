"use server";

import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { getRecommendations as getStaticRecommendations } from "@/lib/content";
import { revalidatePath } from "next/cache";

export interface RecommendationPayload {
  name: string;
  role: string;
  organization: string;
  message: string;
  avatar?: string;
}

export interface RecommendationDoc {
  id: string;
  name: string;
  role: string;
  organization: string;
  message: string;
  avatar: string | null;
  approved: boolean;
  createdAt: string;
}

export async function submitRecommendation(payload: RecommendationPayload) {
  const { name, role, organization, message, avatar } = payload;

  if (!name?.trim() || !role?.trim() || !organization?.trim() || !message?.trim()) {
    return { success: false, message: "All fields except avatar are required." };
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    
    await db.collection("recommendations").insertOne({
      name: name.trim(),
      role: role.trim(),
      organization: organization.trim(),
      message: message.trim(),
      avatar: avatar?.trim() || null,
      approved: false,
      createdAt: new Date(),
    });

    return { 
      success: true, 
      message: "Recommendation submitted successfully! It will appear on the site once approved by Heramb." 
    };
  } catch (error) {
    console.error("[recommendations] Submit error:", error);
    return { success: false, message: "Failed to submit. Please try again later." };
  }
}

export async function getApprovedRecommendations(): Promise<RecommendationDoc[]> {
  let dbRecs: RecommendationDoc[] = [];
  try {
    const client = await clientPromise;
    const db = client.db();

    const docs = await db
      .collection("recommendations")
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .toArray();

    dbRecs = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      role: d.role,
      organization: d.organization,
      message: d.message,
      avatar: d.avatar || null,
      approved: true,
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.warn("[recommendations] DB query failed, using static content only:", error);
  }

  const staticRecs = getStaticRecommendations();
  const staticRecsMapped: RecommendationDoc[] = staticRecs.map((r, index) => ({
    id: `static-${index}`,
    name: r.name,
    role: r.role,
    organization: r.organization,
    message: r.message,
    avatar: r.avatar,
    approved: true,
    createdAt: new Date(0).toISOString(),
  }));

  return [...dbRecs, ...staticRecsMapped];
}

export async function getPendingRecommendations(moderatorKey: string) {
  const masterKey = process.env.MODERATOR_KEY || "heramb-admin-1221";
  
  if (moderatorKey !== masterKey) {
    return { success: false, message: "Invalid moderator key.", data: [] };
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const docs = await db
      .collection("recommendations")
      .find({ approved: false })
      .sort({ createdAt: -1 })
      .toArray();

    const data: RecommendationDoc[] = docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      role: d.role,
      organization: d.organization,
      message: d.message,
      avatar: d.avatar || null,
      approved: false,
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : new Date().toISOString(),
    }));

    return { success: true, data };
  } catch (error) {
    console.error("[recommendations] Fetch pending error:", error);
    return { success: false, message: "Database query failed.", data: [] };
  }
}

export async function approveRecommendation(id: string, moderatorKey: string) {
  const masterKey = process.env.MODERATOR_KEY || "heramb-admin-1221";

  if (moderatorKey !== masterKey) {
    return { success: false, message: "Invalid moderator key." };
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("recommendations")
      .updateOne({ _id: new ObjectId(id) }, { $set: { approved: true } });

    if (result.matchedCount === 0) {
      return { success: false, message: "Recommendation not found." };
    }

    revalidatePath("/");
    revalidatePath("/recommendations");

    return { success: true, message: "Recommendation approved and live!" };
  } catch (error) {
    console.error("[recommendations] Approve error:", error);
    return { success: false, message: "Database update failed." };
  }
}

export async function deleteRecommendation(id: string, moderatorKey: string) {
  const masterKey = process.env.MODERATOR_KEY || "heramb-admin-1221";

  if (moderatorKey !== masterKey) {
    return { success: false, message: "Invalid moderator key." };
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("recommendations").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return { success: false, message: "Recommendation not found." };
    }

    revalidatePath("/");
    revalidatePath("/recommendations");

    return { success: true, message: "Recommendation deleted successfully." };
  } catch (error) {
    console.error("[recommendations] Delete error:", error);
    return { success: false, message: "Database deletion failed." };
  }
}
