import '../index.css';
import SearchBar from '@/components/search';
import { Link, Outlet } from 'react-router-dom';


export default function MainView() {
    return (
        <div className="grid grid-template">
            <div className='brand padding'>
                <h3>Celin</h3>
            </div>
            <section className='search flex align-center padding'>
                <div className="flex align-center">
                    <SearchBar placeHolder='type a name or part to find all matches' search={() => { }} />
                </div>
            </section>
            <nav className='nav column flex padding'>
                <Link to={'/'}>Home</Link>
                <Link to={'/users'}>Users</Link>
            </nav>
            <section className="display flex align-center padding">
                <div className="flex align-center">
                    <Outlet />
                </div>
            </section>

            <section className='footer'> footer </section>
        </div>
    )
}
