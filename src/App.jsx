
import { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Outlet } from 'react-router-dom';
import './styles/styles.css'
import { Route, Routes } from "react-router-dom";
import Index from "./pages/landing/Index";
import NewsList from './pages/noticies/NewsList';
import NoticiaDetalle from './pages/NoticiaDetalle';
import Collaborator from './pages/colaborador/Collaborator';
import Gestor from './pages/gestor/Gestor';
import Tramites from './pages/tramites/Tramites';
import Indicadores from './pages/Indicadores';
import Context from './redux/Context';
import NavBarVertical from './components/NavBarVertical';
import Finder from './pages/gestor/Finder';
import NewDetails from './pages/noticies/NewDetails'
import AddNews from './pages/noticies/AddNews';
import Home from './pages/home/Home';
import Calendar from './pages/calendar/Calendar';
import Files from './pages/gestor/Files';
import PerfilGral from './pages/perfiles/PerfilGral';
import Indicator from './pages/indicador/Indicator';
import IndicatorDetails from './pages/indicador/IndicatorDetails';
import Manager from './pages/gestor/Manager';
import DailyCheckRegister from './components/DailyCheckRegister';
import AttendanceLogs from './pages/logs/AttendanceLogs';

/*const LayoutWithNavBar = ({ }) => (
    <NavBarVertical>
        <Outlet />
    </NavBarVertical>
);*/

function App() {
    const initialTokenState = localStorage.getItem('userToken') === 'true';
    const [userToken, setUserToken] = useState(initialTokenState);


    const authContext = useMemo(() => {
        return {
            signIn: () => {
                setUserToken(true);
                localStorage.setItem('userToken', 'true');
            },
            signUp: () => {
                setUserToken(true);
                localStorage.setItem('userToken', 'true');
            },
            signOut: () => {
                setUserToken(false);
                localStorage.removeItem('userToken');
            },
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('userToken', userToken.toString());
    }, [userToken]);

    return (
        <Context.Provider value={authContext}>
            <Provider store={store}>
                <PersistGate
                        loading={
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                height: '100vh', width: '100%', background: '#f0f0f0',
                                fontSize: '18px', color: '#333'
                            }}>
                                Cargando...
                            </div>
                        }
                        persistor={persistor}
                    >
                    {!userToken ?
                        <Routes>
                            <Route path="/" index element={<Index />} />
                            <Route path="*" index element={<Index />} />
                        </Routes> :
                        <NavBarVertical>
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/noticia/:id" element={<NoticiaDetalle />} />
                                <Route path="/docs" element={<Tramites />} />
                                <Route path="/gestor-contenidos/*" element={<Gestor />} />
                                <Route path="/indicator" element={<Indicator />} />
                                <Route path="/indicatorDetails" element={<IndicatorDetails />} />
                                <Route path="/collaborator" element={<Collaborator />} />
                                <Route path="/colaboradores" element={<Collaborator />} />
                                <Route path="/PerfilGral/:id/:nombreImagen" element={<PerfilGral />} />
                                <Route path="/files" element={<Files />} />
                                <Route path="/files_" element={<Manager />} />
                                <Route path="/newslist" element={<NewsList />} />
                                <Route path="/newDetails" element={<NewDetails page={'newslist'} />} />
                                <Route path="/addnews" element={<AddNews page={'newslist'} />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/*" element={<Home />} />
                                <Route path="/logs" element={<AttendanceLogs />} />
                                
                            </Routes>
                        </NavBarVertical>
                    }
                </PersistGate>
            </Provider>
        </Context.Provider>
    );
}

export default App;
