import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - shared across both platforms
  users: defineTable({
    walletAddress: v.string(),
    username: v.optional(v.string()),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    socialLinks: v.optional(v.object({
      twitter: v.optional(v.string()),
      github: v.optional(v.string()),
      website: v.optional(v.string()),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_wallet", ["walletAddress"])
    .index("by_username", ["username"]),

  // Payment profiles for x402.me
  paymentProfiles: defineTable({
    userId: v.id("users"),
    slug: v.string(),
    isActive: v.boolean(),
    defaultAmount: v.optional(v.string()),
    qrCodeSettings: v.optional(v.object({
      backgroundColor: v.string(),
      foregroundColor: v.string(),
    })),
    theme: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_slug", ["slug"]),

  // Paywalled content for x402.link
  paywallContent: defineTable({
    userId: v.id("users"),
    shortId: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    contentType: v.union(v.literal("file"), v.literal("link"), v.literal("document")),
    fileUrl: v.optional(v.string()),
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    mimeType: v.optional(v.string()),
    link: v.optional(v.string()),
    documentContent: v.optional(v.string()),
    price: v.string(), // USDC amount
    previewContent: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    maxDownloads: v.optional(v.number()),
    downloadCount: v.number(),
    viewCount: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_shortId", ["shortId"]),

  // Payment transactions - shared
  transactions: defineTable({
    fromAddress: v.string(),
    toAddress: v.string(),
    toUserId: v.optional(v.id("users")),
    amount: v.string(),
    network: v.string(),
    transactionHash: v.string(),
    contentId: v.optional(v.id("paywallContent")),
    paymentProfileId: v.optional(v.id("paymentProfiles")),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_from", ["fromAddress"])
    .index("by_to", ["toAddress"])
    .index("by_content", ["contentId"])
    .index("by_profile", ["paymentProfileId"]),

  // Analytics events
  analyticsEvents: defineTable({
    eventType: v.string(),
    userId: v.optional(v.id("users")),
    contentId: v.optional(v.id("paywallContent")),
    paymentProfileId: v.optional(v.id("paymentProfiles")),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_content", ["contentId"])
    .index("by_profile", ["paymentProfileId"])
    .index("by_type", ["eventType"]),
});