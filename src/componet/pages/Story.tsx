export default function Story() {
  const stories = ["Anu", "Sharasti", "Rahul", "Payal", "John", "Alex"];

  return (
    <>
      {stories.map((name, index) => (
        <div className="story-container" key={index}>
          <div className="story-img-div">
            <img
              src={`https://i.pravatar.cc/150?img=${index + 10}`}
              alt="story"
              className="s-image"
            />
          </div>
          <span>{name}</span>
        </div>
      ))}
    </>
  );
}
