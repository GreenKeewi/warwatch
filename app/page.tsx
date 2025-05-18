export default function Home() {
  return (
    <div className="m-4">
      <div className="tabs tabs-border">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="India And Pakistan Conflict"
        />
        <div className="tab-content border-base-300 bg-base-100 rounded-xl p-10">
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Ukraine And Russia Conflict"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 rounded-xl p-10">
          Tab content 2
        </div>
      </div>
    </div>
  );
}
