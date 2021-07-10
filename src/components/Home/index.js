import React from 'react';
import './styles.css';
import { updateState } from "../../redux/component1/actions";
import { useSelector, useDispatch} from 'react-redux';
import GameL1 from '../GameL1';
import GameL2 from '../GameL2';


const Home = () => {

    const compState = useSelector(state => state.component1reducer);
    const dispatch = useDispatch();
    const updateReduxState = (object) => {
        dispatch(updateState({...object}))
    }

    return (
        <div className="Home">
           <section id="hero2">
                <div className="hero-container">
                    <a href="index.html" className="hero-logo" data-aos="zoom-in"><img className="h-72" src="assets/img/hero-logo.png" alt=""  /></a>
                    <h1 data-aos="zoom-in">Welcome To Celo Crypto</h1>
                    <h2 data-aos="fade-up">Crypto Hunt</h2>
                    <div className="flex flex-row">
                        <div className="btn" onClick={() => {updateReduxState({game1position: "left-0 opacity-100"})}}>
                            <span className="pointer-events-none text-white">GameL1</span>
                        </div>
                        <div className="btn" onClick={() => {updateReduxState({game2position: "left-0 opacity-100"})}}>
                            <span className="pointer-events-none text-white">GameL2</span>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="btn" onClick={() => {updateReduxState({game1position: "left-0 opacity-100"})}}>
                            <span className="pointer-events-none text-white">GameL1</span>
                        </div>
                    </div>
                </div>
                <GameL1 />
                <GameL2 />                
            </section>
        </div>
    )
}

export default Home
