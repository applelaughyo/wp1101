import React from 'react';
function Footer(props) {
    const T = {borderColor: "transparent"}
    const R = {borderColor: "red"}
    let allBtnStyle;
    let activeBtnStyle;
    let completedBtnStyle;
    switch (props.filter) {
        case 'all':
            allBtnStyle = R;
            activeBtnStyle = T;
            completedBtnStyle = T;
            break;
        case 'active':
            allBtnStyle = T;
            activeBtnStyle = R;
            completedBtnStyle = T;
            break;
        case 'completed':
            allBtnStyle = T;
            activeBtnStyle = T;
            completedBtnStyle = R;
            break;
    }
    return  (
        <footer className ="todo-app__footer" id = "todo-footer" style={{display: props.haveItem() ? 'flex' : 'none' }}>
            <div className ="todo-app__total">
                {`${props.notDoneItemCnt}`} left
            </div>
            <ul className ="todo-app__view-buttons">
                <button id = 'allBtn' onClick={()=>props.clickFilter('all')} style={allBtnStyle}>All</button>
                <button id = 'activeBtn' onClick={()=>props.clickFilter('active')} style={activeBtnStyle}>Active</button>
                <button id = 'completedBtn' 
                        onClick={()=>{props.clickFilter('completed')}} style={completedBtnStyle}>Completed</button>
            </ul>
            <div className = "todo-app__clean">
                <button id ="cleanBtn" onClick = {props.clickCleanBtn}>Clear completed</button>
            </div>
        </footer>
    );
}
export default Footer;