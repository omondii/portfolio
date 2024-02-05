import './Layout.scss';
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
    return (
        <div className='App'>
            <Sidebar />
            <div className='page'>
                <span className='tags top tags'>&alt;body&gt;</span>

                

                <span className='tags bottom-tags'>
                &alt;body&gt;
                <br />
                <span className='bottom-tag-html'>&;/html&gt;</span>
                </span>
            </div>
        </div>
    )
}

export default Layout;