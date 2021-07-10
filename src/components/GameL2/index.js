import React from 'react';
import './styles.css';
import { updateState } from "../../redux/component1/actions";
import { useSelector, useDispatch} from 'react-redux';

const GameL2 = () => {

    const compState = useSelector(state => state.component1reducer);
    const dispatch = useDispatch();
    const updateReduxState = (object) => {
        dispatch(updateState({...object}))
    }
    return (
        <div className={`GameL2 ${compState.game2position}`}>
            <div className="btn" onClick={() => {updateReduxState({game2position: "left-full opacity-0"})}}>
                <span className="pointer-events-none">L2 Close</span>
            </div>
        </div>
    )
}

export default GameL2
