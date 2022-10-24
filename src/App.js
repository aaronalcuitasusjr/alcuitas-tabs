import { useEffect, useState } from "react";
import "./App.css";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchData = async () => {
    const response = await fetch(url);
    const newData = await response.json();
    setData(newData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading-container">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="title-container">Experience</div>
      <div className="underline"></div>
      <div className="main-container">
        <div className="tab-container">
          {data.map((person, i) => {
            return (
              <button
                key={person.id}
                className={`tab-item ${i === index && "active"}`}
                onClick={() => setIndex(i)}
              >
                {person.company}
              </button>
            );
          })}
        </div>
        <div className="content-container">
          <p className="job-text">{data[index].title}</p>
          <p className="name-text">{data[index].company}</p>

          <p className="duration-text">{data[index].dates}</p>

          {data[index].duties.map((duty, index) => {
            return (
              <div key={index} className="info-container">
                <p className="arrows">{"❯❯"}</p>
                <p className="info-text">{duty}</p>
              </div>
            );
          })}
        </div>
      </div>
      <button className="more-info-btn">MORE INFO</button>
    </div>
  );
}

export default App;
