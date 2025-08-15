import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createOrUpdateProfile = mutation({
  args: {
    userId: v.id("users"),
    slug: v.string(),
    defaultAmount: v.optional(v.string()),
    qrCodeSettings: v.optional(v.object({
      backgroundColor: v.string(),
      foregroundColor: v.string(),
    })),
    theme: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if slug is taken by another user
    const existingSlug = await ctx.db
      .query("paymentProfiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (existingSlug && existingSlug.userId !== args.userId) {
      throw new Error("This profile URL is already taken");
    }

    // Check if user already has a profile
    const existingProfile = await ctx.db
      .query("paymentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existingProfile) {
      // Update existing profile
      await ctx.db.patch(existingProfile._id, {
        slug: args.slug,
        defaultAmount: args.defaultAmount,
        qrCodeSettings: args.qrCodeSettings,
        theme: args.theme,
        updatedAt: Date.now(),
      });
      return await ctx.db.get(existingProfile._id);
    } else {
      // Create new profile
      const profileId = await ctx.db.insert("paymentProfiles", {
        userId: args.userId,
        slug: args.slug,
        isActive: true,
        defaultAmount: args.defaultAmount,
        qrCodeSettings: args.qrCodeSettings,
        theme: args.theme,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return await ctx.db.get(profileId);
    }
  },
});

export const getProfileBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("paymentProfiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!profile || !profile.isActive) return null;

    const user = await ctx.db.get(profile.userId);
    
    return {
      ...profile,
      user,
    };
  },
});

export const getUserProfile = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("paymentProfiles")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const checkSlugAvailability = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("paymentProfiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    return !existing;
  },
});

export const toggleProfileStatus = mutation({
  args: {
    profileId: v.id("paymentProfiles"),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId);
    if (!profile) throw new Error("Profile not found");

    await ctx.db.patch(args.profileId, {
      isActive: !profile.isActive,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.profileId);
  },
});