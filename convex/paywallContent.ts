import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { generateShortId } from "../lib/utils";

export const createContent = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    contentType: v.union(v.literal("file"), v.literal("link"), v.literal("document")),
    fileUrl: v.optional(v.string()),
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    mimeType: v.optional(v.string()),
    link: v.optional(v.string()),
    documentContent: v.optional(v.string()),
    price: v.string(),
    previewContent: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    maxDownloads: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Generate unique short ID
    let shortId = generateShortId();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await ctx.db
        .query("paywallContent")
        .withIndex("by_shortId", (q) => q.eq("shortId", shortId))
        .first();
      
      if (!existing) break;
      shortId = generateShortId();
      attempts++;
    }

    const contentId = await ctx.db.insert("paywallContent", {
      ...args,
      shortId,
      downloadCount: 0,
      viewCount: 0,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(contentId);
  },
});

export const getContentByShortId = query({
  args: {
    shortId: v.string(),
  },
  handler: async (ctx, args) => {
    const content = await ctx.db
      .query("paywallContent")
      .withIndex("by_shortId", (q) => q.eq("shortId", args.shortId))
      .first();

    if (!content) return null;

    // Increment view count
    await ctx.db.patch(content._id, {
      viewCount: content.viewCount + 1,
    });

    // Get user info
    const user = await ctx.db.get(content.userId);

    return {
      ...content,
      user,
    };
  },
});

export const getUserContent = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("paywallContent")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc");

    const contents = args.limit 
      ? await query.take(args.limit)
      : await query.collect();

    return contents;
  },
});

export const incrementDownloadCount = mutation({
  args: {
    contentId: v.id("paywallContent"),
  },
  handler: async (ctx, args) => {
    const content = await ctx.db.get(args.contentId);
    if (!content) throw new Error("Content not found");

    await ctx.db.patch(args.contentId, {
      downloadCount: content.downloadCount + 1,
    });
  },
});

export const updateContent = mutation({
  args: {
    contentId: v.id("paywallContent"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.string()),
    previewContent: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    maxDownloads: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { contentId, ...updates } = args;
    
    await ctx.db.patch(contentId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(contentId);
  },
});

export const deleteContent = mutation({
  args: {
    contentId: v.id("paywallContent"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.contentId);
  },
});