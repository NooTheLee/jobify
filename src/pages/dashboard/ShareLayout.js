import { Outlet } from 'react-router-dom'
import { Navbar, BigSidebar, Alert } from '../../component';
import { useAppContext } from '../../context/appContext';
import './ShareLayout.css';

const ShareLayout = () => {
    const { showSidebar } = useAppContext();
    return <div> <div className='main-content'>
        <BigSidebar showSidebar={showSidebar} />
        <main className={showSidebar ? 'dashboard' : 'dashboard active'}>
            <div>
                <Navbar />
                <Alert />
                <div className="dashboard-page">
                    <Outlet />
                </div>
            </div>
        </main>
    </div>
    </div>
}

export default ShareLayout;