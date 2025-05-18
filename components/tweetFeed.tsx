"use client";
import { useEffect, useState } from "react";
import { Tweet } from "react-tweet";

export default function TweetFeed() {
  const [tweetIds, setTweetIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await fetch("/api/fetchTweets");
        const data = await res.json();
        setTweetIds(data.tweetIds);
      } catch (error) {
        console.error("Failed to fetch tweets:", error);
      }
    };

    fetchTweets();

    const interval = setInterval(fetchTweets, 60000); // 1 min

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {tweetIds.map((id) => (
        <Tweet key={id} id={id} />
      ))}
    </div>
  );
}
