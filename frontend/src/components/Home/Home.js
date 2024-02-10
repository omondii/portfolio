import '../Layout/Layout.scss';
import AnimatedLetters from '../animatedLetters';
import './Home.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['r', 'i', 'a', 'n']
    const jobArray = ['w', 'e', 'b', ' ', 'd', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.']

    useEffect(() => {
        return setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    return (
        <div className="container home-page">
            <div className="text-zone">
                <h1>
                <span className={letterClass}>H</span>
                <span className={`${letterClass} _12`}>i</span>
                <br />
                <span className={`${letterClass} _13`}>I</span>
                <span className={`${letterClass} _14`}>'m</span>
                <img src={'#'} alt=" Omondi Brian" />
                <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
                <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22} />
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