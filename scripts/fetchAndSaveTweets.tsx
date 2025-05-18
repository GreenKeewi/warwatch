import { prisma } from "@/lib/prisma";
import axios from "axios";

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN as string;

const accounts = [
  "narendramodi",
  "CMShehbaz",
  "ANI",
  "PTVNewsOfficial",
  "BBCWorld",
  "CNN",
  "Reuters",
  "TimesNow",
  "AlJazeera",
];

const userIdCache: Record<string, string> = {};

async function getUserId(username: string): Promise<string> {
  if (userIdCache[username]) return userIdCache[username];

  const res = await axios.get(
    `https://api.twitter.com/2/users/by/username/${username}`,
    { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
  );
  const id = res.data.data.id;
  userIdCache[username] = id;
  return id;
}

async function fetchAndSaveTweets() {
  for (const username of accounts) {
    const userId = await getUserId(username);

    const tweetsRes = await axios.get(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );

    const filtered = tweetsRes.data.data.filter(
      (tweet: { text: string }) =>
        tweet.text.toLowerCase().includes("pakistan") ||
        tweet.text.toLowerCase().includes("india")
    );

    for (const tweet of filtered) {
      await prisma.tweet.upsert({
        where: { id: tweet.id },
        update: {},
        create: {
          id: tweet.id,
          text: tweet.text,
          author: username,
          createdAt: new Date(tweet.created_at),
        },
      });
    }
  }
  console.log("Tweets fetched and saved.");
}

// Run immediately or schedule it
fetchAndSaveTweets();
