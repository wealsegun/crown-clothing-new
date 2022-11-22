const App = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
    },
    {
      id: 2,
      title: "Jacket",
    },
    {
      id: 3,
      title: "Sneaker",
    },
    {
      id: 4,
      title: "Women",
    },
    {
      id: 5,
      title: "Mens",
    },
  ];
  return (
    <div className="categories-container">
      <div className="category-container">
        {categories.map(({title}) => (
          <>
          {/* <img/> */}
          <div className="category-body-container">
            <h2> {title}</h2>
            <p>Shop Now</p>
          </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default App;
