import React from 'react';
//import Checkbox from './Checkbox';
function TodoItem(props) {
    const allFilter={
        display: 'flex'
    }
    var activeFilter;
    var completedFilter;
    if(props.checked === true){
        activeFilter={display: 'none'}
        completedFilter={display: 'flex'}
    }
    else{
        activeFilter={display: 'flex'}
        completedFilter={display: 'none'}
    }



    return(
        <li className = {"todo-app__item"} 
            style={
                (props.filter==='all') ? 
                    allFilter : (props.filter==='active') ? 
                        activeFilter:completedFilter
            }
        >
            <div className = "todo-app__checkbox">
                <input type ='checkbox'  
                        id = {String(props.itemIndex)} 
                        onChange={() => props.clickCheckbox(props.itemIndex,props.checked)} 
                        checked = {props.checked}/>
                <label htmlFor = {String(props.itemIndex)}/>
                
            </div> 
            <h1 className = {props.checked ? 'todo-app__item-detail todo-app__item-done': 'todo-app__item-detail'}> 
                {props.text}
            </h1>
            <img src = './img/x.png' className = 'todo-app__item-x' onClick={()=>props.handleRemoveItem(props.itemIndex)}/>
        </li>
    );
}


export default TodoItem;
