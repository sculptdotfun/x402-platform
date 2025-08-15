import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const recordTransaction = mutation({
  args: {
    fromAddress: v.string(),
    toAddress: v.string(),
    toUserId: v.optional(v.id("users")),
    amount: v.string(),
    network: v.string(),
    transactionHash: v.string(),
    contentId: v.optional(v.id("paywallContent")),
    paymentProfileId: v.optional(v.id("paymentProfiles")),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const transactionId = await ctx.db.insert("transactions", {
      ...args,
      status: "completed",
      createdAt: Date.now(),
    });

    // Track analytics event
    await ctx.db.insert("analyticsEvents", {
      eventType: "transaction_completed",
      userId: args.toUserId,
      contentId: args.contentId,
      paymentProfileId: args.paymentProfileId,
      metadata: {
        amount: args.amount,
        network: args.network,
        fromAddress: args.fromAddress,
      },
      createdAt: Date.now(),
    });

    return await ctx.db.get(transactionId);
  },
});

export const getUserTransactions = query({
  args: {
    walletAddress: v.string(),
    type: v.optional(v.union(v.literal("sent"), v.literal("received"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query;
    
    if (args.type === "sent") {
      query = ctx.db
        .query("transactions")
        .withIndex("by_from", (q) => q.eq("fromAddress", args.walletAddress));
    } else if (args.type === "received") {
      query = ctx.db
        .query("transactions")
        .withIndex("by_to", (q) => q.eq("toAddress", args.walletAddress));
    } else {
      // Get both sent and received - we'll need to combine them
      const sent = await ctx.db
        .query("transactions")
        .withIndex("by_from", (q) => q.eq("fromAddress", args.walletAddress))
        .collect();
      
      const received = await ctx.db
        .query("transactions")
        .withIndex("by_to", (q) => q.eq("toAddress", args.walletAddress))
        .collect();
      
      const all = [...sent, ...received].sort((a, b) => b.createdAt - a.createdAt);
      
      return args.limit ? all.slice(0, args.limit) : all;
    }

    const transactions = args.limit 
      ? await query.order("desc").take(args.limit)
      : await query.order("desc").collect();

    return transactions;
  },
});

export const getContentTransactions = query({
  args: {
    contentId: v.id("paywallContent"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("transactions")
      .withIndex("by_content", (q) => q.eq("contentId", args.contentId))
      .order("desc");

    const transactions = args.limit 
      ? await query.take(args.limit)
      : await query.collect();

    return transactions;
  },
});

export const getProfileTransactions = query({
  args: {
    paymentProfileId: v.id("paymentProfiles"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const query = ctx.db
      .query("transactions")
      .withIndex("by_profile", (q) => q.eq("paymentProfileId", args.paymentProfileId))
      .order("desc");

    const transactions = args.limit 
      ? await query.take(args.limit)
      : await query.collect();

    return transactions;
  },
});

export const getTransactionStats = query({
  args: {
    userId: v.optional(v.id("users")),
    contentId: v.optional(v.id("paywallContent")),
    paymentProfileId: v.optional(v.id("paymentProfiles")),
  },
  handler: async (ctx, args) => {
    let transactions;
    
    if (args.contentId) {
      transactions = await ctx.db
        .query("transactions")
        .withIndex("by_content", (q) => q.eq("contentId", args.contentId))
        .collect();
    } else if (args.paymentProfileId) {
      transactions = await ctx.db
        .query("transactions")
        .withIndex("by_profile", (q) => q.eq("paymentProfileId", args.paymentProfileId))
        .collect();
    } else if (args.userId) {
      const user = await ctx.db.get(args.userId);
      if (!user) return null;
      
      transactions = await ctx.db
        .query("transactions")
        .withIndex("by_to", (q) => q.eq("toAddress", user.walletAddress))
        .collect();
    } else {
      return null;
    }

    const totalAmount = transactions.reduce((sum, tx) => {
      const amount = parseFloat(tx.amount.replace('$', ''));
      return sum + amount;
    }, 0);

    return {
      totalTransactions: transactions.length,
      totalAmount: `$${totalAmount.toFixed(2)}`,
      transactions,
    };
  },
});