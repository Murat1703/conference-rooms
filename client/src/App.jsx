import './App.css'
import { Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ForbiddenPage } from './pages/ForbiddenPage'
import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { HallPage } from './pages/HallPage'
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'
import { apiLogout, apiMe } from "./api/auth.api.js";
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { DashBoardPage } from './pages/DashBoardPage'
import { HallsPage } from './pages/HallsPage'
import { ContactsPage } from './pages/ContactsPage'


function App() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY >= 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(()=>{
      if (isMenuOpen===true) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };

  }, [isMenuOpen])

  const [user, setUser] = useState(null);

  const[loading, setLoading] = useState(true);

  const fetchUser = async () =>{
    try{
        const res = await apiMe();
        // console.log('res, ',res)
        if (res.data.message =="Не вошли в систему") return; else setUser(res.data)
    } catch (err){
        // console.log(err)
        setUser(null)
    } finally{
        setLoading(false)
    }
  }


  useEffect(()=>{
    fetchUser();
  }, [])

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      // даже если сервер упал, локально всё равно разлогиним
    } finally {
      setUser(null);
      navigate("/", { replace: true });
    }
  }

  const location = useLocation();



  return (
    <>
    {((location.pathname !== "/login") && (location.pathname !== "/dashboard"))? 
    <Header isScroll={scrolled} setIsMenuOpen={setIsMenuOpen}/>: null}
    <Routes>      
      <Route path="/halls/:id"  element={<HallPage />}/>
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path="/halls"  element={<HallsPage />}/>
      <Route path="/*"  element={<ForbiddenPage />}/>
      <Route path="/"  element={<HomePage />}/>
          <Route element={<PublicRoute user={user} loading={loading} />}>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
          </Route>
          <Route element={<PrivateRoute user={user} loading={loading}/>}>
            <Route 
              path="/dashboard"
              element={<DashBoardPage user={user} logout={handleLogout} />}
            />
          </Route>

    </Routes>
    {((location.pathname !== "/login") && (location.pathname !== "/dashboard")&& (location.pathname !== "/contacts"))? 

    <Footer /> : null}

    </>
  )
}

export default App
