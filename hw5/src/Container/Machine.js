import React from 'react';
function Machine(){
    function handleClick(){

    }
    return(
        <div className = 'calculator-app__machine'>
            <div className = 'calculator-app__machine_screen'>
                <h1>哈囉</h1>
            </div>
            <div className = 'calculator-app__machine_body'>
                <div className = 'calculator-app__machine_number'>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>0</button>
                </div>
                <div className = 'calculator-app__machine_operator'>
                    <button>+</button>
                    <button>-</button>
                    <button>x</button>
                    <button>/</button>
                </div>
            </div>    
        </div>
    );
}
export default Machine;