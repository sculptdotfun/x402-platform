import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrCreateUser = mutation({
  args: {
    walletAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .first();

    if (existing) {
      return existing;
    }

    const userId = await ctx.db.insert("users", {
      walletAddress: args.walletAddress,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});

export const getUserByWallet = query({
  args: {
    walletAddress: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_wallet", (q) => q.eq("walletAddress", args.walletAddress))
      .first();
  },
});

export const getUserByUsername = query({
  args: {
    username: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    username: v.optional(v.string()),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    socialLinks: v.optional(v.object({
      twitter: v.optional(v.string()),
      github: v.optional(v.string()),
      website: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    // Check if username is taken
    if (updates.username) {
      const existing = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", updates.username))
        .first();
      
      if (existing && existing._id !== userId) {
        throw new Error("Username already taken");
      }
    }

    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(userId);
  },
});