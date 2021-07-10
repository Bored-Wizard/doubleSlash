import React, {useState, useEffect} from 'react';
import { updateState } from "../../redux/component1/actions";
import { useSelector, useDispatch} from 'react-redux';
import { BiChevronRightCircle } from "react-icons/bi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const GameL3 = () => {

    const compState = useSelector(state => state.component1reducer);
    const dispatch = useDispatch();
    const updateReduxState = (object) => {
        dispatch(updateState({...object}))
    }

    const [zones, setzones] = useState([]);
    const [amount, setamount] = useState(0.1);
    const [begin, setbegin] = useState(false);

    const generateZones = () => {
        let marks = [];
        while(marks.length < 12){
            let coordinate = Math.floor(Math.random() * 1000) % 35;
            if(!marks.includes(coordinate)){
                marks.push(coordinate);
            }
        }
        let bufferZones = [];
        for(var i = 0; i < 35; i++){
            if(marks.includes(i)){
                bufferZones.push(
                    <div className="mark">
                    </div>
                )
            }else{
                bufferZones.push(
                    <div>
                    </div>
                )
            }
        }
        setzones(bufferZones);
    }

    useEffect(() => {
        if(compState.game3position !== "left-full opacity-0" && begin){
            generateZones();
        }else{
            setzones([])
        }
    }, [compState.game3position, begin])

    return (
        <div className={`GameL3 ${compState.game3position}`}>
            <div className="flex h-screen w-screen pt-3 pb-3">
                <div className="w-1/3 h-full flex items-center flex-col">
                    <h5 className="mt-4 text-3xl font-bold text-center">
                        Level 3 of Crypto Hunt
                    </h5>
                    <span className="mt-32 text-xl text-center opacity-40">
                        place a amount to start the game
                    </span>
                    <div className="flex flex-row mt-10">
                        <label className="smBtn" onClick={() => {setamount(0.1)}}>
                            <span>0.1</span>
                        </label>
                        <label className="smBtn" onClick={() => {setamount(0.2)}}>
                            <span>0.2</span>
                        </label>
                        <label className="smBtn" onClick={() => {setamount(0.3)}}>
                            <span>0.3</span>
                        </label>
                        <label className="smBtn" onClick={() => {setamount(0.4)}}>
                            <span>0.4</span>
                        </label>
                    </div>
                    <div className="flex flex-row mt-3 mb-3 items-center">
                        <div onClick={() => {
                            let m = amount;
                            m = m - 0.1;
                            if(m >= 0){
                                setamount(parseFloat(m.toFixed(5)))
                            }
                        }} >
                            <AiOutlineMinus size={40} />
                        </div>
                        <label className=' border-2 border-white rounded-md h-16 w-60 p-2 '>
                            <input type="number" className=" border-0 w-full h-full bg-transparent text-3xl" 
                            value={amount}
                            onChange={e => {
                                console.log(typeof(e.target.value))
                                if(e.target.value >= 0){
                                    setamount(e.target.value);
                                }
                            }} />
                        </label>
                        <div onClick={() => {
                            let m = amount;
                            m = m + 0.1;
                            if(m >= 0){
                                setamount(parseFloat(m.toFixed(5)))
                            }
                        }} >
                            <AiOutlinePlus size={40} />
                        </div>
                    </div>
                    <div className="btn" onClick={() => setbegin(true)}>
                        <span className=" text-white font-bold text-xl">Begin Hunt</span>
                    </div>
                </div>
                <div className="h-full map flex justify-center items-center p-10">
                    <div className="grid grid-cols-6 grid-rows-6 gap-2 h-4/5 w-4/5">
                        {zones.map(item => item)}
                    </div>
                </div>
                <div className=" w-20 h-full flex justify-center items-center">
                    <BiChevronRightCircle size={60} color={"grey"} onClick={()  => {setbegin(false);setamount(0.1) ;updateReduxState({game2position: "left-full opacity-0"}); }} />
                </div>
            </div>
        </div>
    )
}

export default GameL3
