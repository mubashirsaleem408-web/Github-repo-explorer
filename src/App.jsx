import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UsersPage from "./pages/UserPage";
import RepositoriesPage from "./pages/RepositoriesPage";
import ExplorePage from "./pages/ExplorePage";
import TopicsPage from "./pages/TopicsPage";

function App() {
  return (
    <div className="bg-bg-dark min-h-screen">
      
        <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/repositories" element={<RepositoriesPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/topics" element={<TopicsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;