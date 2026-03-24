import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CategoryBar from "./CategoryBar";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth(); // Simple et propre

  const navigate = useNavigate();
  const [quickEmail, setQuickEmail] = useState("");
  const [quickPassword, setQuickPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  const handleQuickLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(quickEmail, quickPassword);
    if (!res.success) alert(res.error);
    setLoading(false);
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200 mb-8 w-full">
      <div className="bg-black text-white text-center text-xs py-2 w-full">
        Free shipping on orders over 400dt 🎾
      </div>

      <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-4">
          <Link to="/">
            <h1 className="text-5xl font-bold text-padel ">
              Padel Marketplace
            </h1>
          </Link>
          <div className="flex-grow max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Products..."
                className="w-full bg-gray-200 border-none rounded-md py-2 px-4 focus:ring-2 focus:ring-padel outline-none"
              />
              <span className="absolute right-3 top-2.5 opacity-50">🔍</span>
            </div>
          </div>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                {isAdmin && (
                  <button
                    onClick={() => navigate("/publish")}
                    className="bg-padel text-white px-4 py-2 rounded"
                  >
                    Publish Item
                  </button>
                )}
                <div className="relative group"></div>

                <span>
                  Welcome, <strong>{user?.username}</strong>
                </span>
                <div className="relative group">
                  <div className="relative group">
                    <button className=" flex items-center gap-2 font-bold text-white bg-padel px-5 py-2.5 rounded shadow-md hover:bg-black transition-all duration-300 group">
                      <span>MON COMPTE</span>
                      <span className="text-[10px] transition-transform group-hover:rotate-180">
                        ▼
                      </span>
                    </button>

                    {/* Le Menu (caché par défaut, apparaît au hover du parent "group") */}
                    <div className="absolute right-0 top-full w-56 pt-2 hidden group-hover:block z-50">
                      <div className="bg-white shadow-xl border border-gray-100 py-2 rounded-md">
                        <Link
                          to="/dashboard"
                          className="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#00acc1]"
                        >
                          Tableau de bord
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#00acc1]"
                        >
                          Commandes
                        </Link>
                        <Link
                          to="/addresses"
                          className="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#00acc1]"
                        >
                          Adresses
                        </Link>
                        <Link
                          to="/details"
                          className="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#00acc1]"
                        >
                          Détails du compte
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-6 py-3 text-sm text-red-500 hover:bg-red-50 font-bold"
                        >
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-padel text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-all hover:bg-opacity-90"
                >
                  CONNEXION / INSCRIPTION
                </button>
                <div className="absolute right-0 top-full pt-2 w-96 hidden group-hover:block z-50">
                  <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-100 flex flex-col gap-4">
                    <form
                      onSubmit={handleQuickLogin}
                      className="flex flex-col gap-4"
                    >
                      <h3 className="text-lg font-extrabold text-gray-800 uppercase tracking-tight">
                        Me connecter
                      </h3>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Identifiant ou e-mail *
                        </label>
                        <input
                          type="email"
                          required
                          value={quickEmail}
                          onChange={(e) => setQuickEmail(e.target.value)}
                          className="w-full border-2 border-gray-100 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[#00acc1] focus:border-transparent outline-none transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Mot de passe *
                        </label>
                        <input
                          type="password"
                          required
                          value={quickPassword}
                          onChange={(e) => setQuickPassword(e.target.value)}
                          className="w-full border-2 border-gray-100 py-3 px-4 rounded-xl focus:ring-2 focus:ring-[#00acc1] focus:border-transparent outline-none transition-all"
                          placeholder="••••••••"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00acc1] text-white py-3 rounded font-black uppercase tracking-widest hover:bg-black transition-all"
                      >
                        {loading ? "Connexion..." : "Me connecter"}
                      </button>

                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() => navigate("/signup")}
                          className="text-s font-bold text-[#00acc1] hover:underline"
                        >
                          Créer mon compte
                        </button>
                      </div>
                    </form>

                    <Link
                      to="/password-recovery"
                      className="text-xs text-gray-500 hover:text-padel"
                    >
                      Mot de passe perdu ?
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
      <CategoryBar/>
    </nav>
  );
};

export default Navbar;
