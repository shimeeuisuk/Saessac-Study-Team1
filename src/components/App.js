import "../css/App.css";
import PostDetail from "./PostDetail";
import PostList from "./PostList";

function App() {
  return (
    <div className="App">
      <div>
        <PostList />
      </div>
      <div>
        <PostDetail />
      </div>
    </div>
  );
}

export default App;
