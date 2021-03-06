import Burger from "./components/BurgerMenu";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CardsHome from "./components/CardsHome.js";
import "./stylesheets/main.scss";
import Posts from "./pages/PostsPage.js";
import Post from "./pages/PostPage.js";
import Contact from "./pages/ContactPage.js";
import MembersPage from "./pages/MembersPage.js";
import MemberPage from "./pages/MemberPage.js";
import xWing from "./assets/x-wing.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import History from "./components/History";

function App() {
  return (
    <>
      <Router>
        <img
          className="x-wing xwing-instance"
          src={xWing}
          style={{ maxHeight: "100px" }}
          alt="Vaisseau X-wing"
        />
        <Navbar />
        <Burger />
        <Routes>
          <Route path="/" exact element={<CardsHome />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/infos-utiles" exact element={<Posts />} />
          <Route path="/infos-utiles/:slug" exact element={<Post />} />
          <Route path="/liste-des-membres" exact element={<MembersPage />} />
          <Route path="/member/:id" exact element={<MemberPage />} />
          <Route path="/histoire" exact element={<History />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
