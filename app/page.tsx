import TweetFeed from "@/components/tweetFeed";

export default function Home() {
  return (
    <div className="m-4">
      <div className="tabs tabs-border">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="India and Pakistan Conflict"
        />
        <div className="tab-content border-base-300 bg-base-100 rounded-xl p-10">
          <TweetFeed />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Ukraine and Russia Conflict"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 rounded-xl p-10">
          Tab content 2
        </div>
      </div>
    </div>
  );
}
