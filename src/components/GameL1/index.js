import React, {useState, useEffect} from 'react';
import './styles.css';
import { updateState } from "../../redux/component1/actions";
import { useSelector, useDispatch} from 'react-redux';
import { BiChevronRightCircle } from "react-icons/bi";

const GameL1 = () => {

    const compState = useSelector(state => state.component1reducer);
    const dispatch = useDispatch();
    const updateReduxState = (object) => {
        dispatch(updateState({...object}))
    }
    return (
        <div className={`GameL1 ${compState.game1position}`}>
            <div className="flex h-screen w-screen pt-3 pb-3">
                <div className="w-1/4 h-full flex justify-center">
                    <h5 className="mt-4 text-3xl font-bold text-center">
                        Level 1 of Crypto Hunt
                    </h5>
                    <div>

                    </div>
                </div>
                <div className="w-2/3 h-full bg-blue-50">

                </div>
                <div className=" w-20 h-full flex justify-center items-center">
                    <BiChevronRightCircle size={60} color={"grey"} onClick={()  => {updateReduxState({game1position: "left-full opacity-0"})}} />
                </div>
            </div>
        </div>
    )
}

export default GameL1
