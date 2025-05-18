import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ tweetIds: tweets.map((t) => t.id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load tweets from DB" });
  }
}
