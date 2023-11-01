// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [toggle, setToggle] = useState("");

  const fetchList = async () => {
    try {
      const listJson = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const res = await listJson.json();

      setList(res.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const isActive = (id) => toggle === id;

  const onClickActive = (id) => {
    if (id === toggle) {
      setToggle("");
    } else {
      setToggle(id);
    }
  };

  return (
    <div className="App">
      {list.map((item) => (
        <div key={item.id}>
          <button
            class={`accordion ${isActive(item.id) ? "active" : ""}`}
            onClick={() => onClickActive(item.id)}
          >
            {item.title}
          </button>
          <div
            class="panel"
            style={{ display: isActive(item.id) ? "block" : "" }}
          >
            <p>{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
