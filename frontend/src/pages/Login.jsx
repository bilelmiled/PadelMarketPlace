import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false); // État pour éviter les doubles clics

  // États Connexion
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPadLogin, setShowPadLogin] = useState(false);

  // États Inscription
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(loginEmail, loginPassword);
    if (res.success) {
      navigate("/");
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Les mots de passe ne correspondent pas !");
    }
    
    setLoading(true);
    // CORRECTION : On passe un objet { username, email, password }
    const res = await register({ username, email, password });
    
    if (res.success) {
      alert("Inscription réussie !");
      navigate("/");
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 pt-10">
        
        {/* SECTION GAUCHE : LOGIN */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold border-b pb-4 text-gray-800">Se connecter</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 uppercase text-gray-600">Identifiant ou e-mail *</label>
              <input 
                type="email" 
                required 
                onChange={(e) => setLoginEmail(e.target.value)}
                className="border border-gray-300 p-3 outline-none focus:border-[#009688] bg-[#eff4ff]" 
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 uppercase text-gray-600">Mot de passe *</label>
              <div className="relative">
                <input 
                  type={showPadLogin ? "text" : "password"} 
                  required 
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#009688] bg-[#f9f9f9]" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPadLogin(!showPadLogin)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-black"
                >
                  {showPadLogin ? "🔒" : "👁️"}
                </button>
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-[#009688] text-white py-4 font-bold uppercase hover:bg-black transition-colors disabled:bg-gray-400"
            >
              {loading ? "Connexion..." : "Me connecter"}
            </button>
          </form>
        </div>

        {/* SECTION DROITE : REGISTER */}
        <div className="md:border-l md:pl-20 space-y-8">
          <h2 className="text-3xl font-semibold border-b pb-4 text-gray-800">S'enregistrer</h2>
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 uppercase text-gray-600">Nom d'utilisateur *</label>
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 p-3 outline-none focus:border-[#009688]" 
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 uppercase text-gray-600">Adresse e-mail *</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-3 outline-none focus:border-[#009688]" 
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 uppercase text-gray-600">Mot de passe *</label>
              <div className="relative">
                <input 
                  type={showPwd ? "text" : "password"} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#009688] bg-[#f9f9f9]" 
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3 text-gray-400 hover:text-black">
                  {showPwd ? "🔒" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold mb-2 uppercase text-gray-600">Confirmer le mot de passe *</label>
              <div className="relative">
                <input 
                  type={showConfirmPwd ? "text" : "password"} 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 p-3 outline-none focus:border-[#009688] bg-[#f9f9f9]" 
                />
                <button type="button" onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="absolute right-3 top-3 text-gray-400 hover:text-black">
                  {showConfirmPwd ? "🔒" : "👁️"}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#009688] text-white px-12 py-4 font-bold uppercase hover:bg-black transition-colors mt-4 disabled:bg-gray-400"
            >
              {loading ? "Création..." : "S'inscrire"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;