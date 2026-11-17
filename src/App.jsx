import { Routes, Route, Link, Navigate } from "react-router-dom";

import Banlist from "./pages/Banlist";
import CardDetail from "./pages/CardDetail";
import CardSearcher from "./pages/CardSearcher";
import UpdatesPage from "./pages/UpdatesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import PrivateRoute from "./pages/components/PrivateRoute";

function App() {
    return (
            <Routes>
            
                <Route path="/login" element={ < LoginPage / > } />
                <Route path="/register" element={ < RegisterPage / > } />
            
                <Route
                    path="/*"
                    element={
                            <PrivateRoute>
                                <>
                                <nav className="top-nav">
                                    <Link className="nav-link" to="/banlist">Banlist</Link>
                                    <Link className="nav-link" to="/cards">Card Searcher</Link>
                                    <Link className="nav-link" to="/updates">Updates</Link>
                                </nav>
                    
                                <Routes>
                                    <Route path="/" element={ < Navigate to = "/cards" replace / > } />
                                    <Route path="/banlist" element={ < Banlist / > } />
                                    <Route path="/card/:id" element={ < CardDetail / > } />
                                    <Route path="/cards" element={ < CardSearcher / > } />
                                    <Route path="/updates" element={ < UpdatesPage / > } />
                    
                                </Routes>
                                </>
                            </PrivateRoute>
                            }
                            />
                    </Routes>
            );
        }

export default App;