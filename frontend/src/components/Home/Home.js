import '../Layout/Layout.scss';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>Hi, <br /> I'm
                <img src={'#'} alt="Software Dev" />
                Brian
                <br />
                Web Developer
               </h1>
               <h2>Backend Developer </h2>
               <Link to="/contact" className='flat-button'>CONTACT ME</Link>
            </div>
        </div>
    )
}

export default Home;