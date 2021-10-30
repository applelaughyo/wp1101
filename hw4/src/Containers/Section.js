import React, { useState } from 'react';
import TodoItem from '../Components/TodoItem';
import Footer from './Footer';
function Section() {
    // constructor(props){
    //     super(props);
    //     this.state = {items: [],inputValue:''};
    // }
    const [items,setItem] = useState([]);
    const [checkedArray,setCheckedArray] = useState([]);
    const [inputValue,setInputValue] = useState('');
    const [notDoneItemCnt,setNotDoneItemCnt] = useState(0);
    const [filter,setFilter] = useState('all');
    //輸入文字時
    const handleChange = (e) => {
        if (e.target instanceof HTMLInputElement){
            setInputValue(e.target.value);
        }
    }
    
    //按下Enter時
    const handleKeyPress = (e) => {
        if(e.key === 'Enter' && e.target instanceof HTMLInputElement){
            const newItems = [ ...items, e.target.value];
            const newCheckedArray = [...checkedArray, false];
            setItem(newItems);
            setCheckedArray(newCheckedArray);
            setInputValue('');
            setNotDoneItemCnt(notDoneItemCnt + 1);
        }
    }
    function clickCheckbox(index , checked){
        const newCheckedArray = checkedArray;
        newCheckedArray[index] = !checked;
        setCheckedArray(newCheckedArray);
        if(checked === false)
            setNotDoneItemCnt(notDoneItemCnt - 1);
        else
            setNotDoneItemCnt(notDoneItemCnt + 1);
        // {console.log(checked)}
    }
    function haveItem(){
        if(items.length === 0)
            return false;
        else
            return true;
    }
    function handleRemoveItem(index){
        {console.log("index ",index," checked ",checkedArray[index])}
        if(checkedArray[index] === false)
            setNotDoneItemCnt(notDoneItemCnt - 1);
        //從陣列中移除一個index的成員的純粹函式
        const newItems = items.slice(0,index).concat(items.slice(index+1));
        const newChecked = checkedArray.slice(0,index).concat(checkedArray.slice(index+1));
        //整個陣列重新更新
        setItem(newItems);
        setCheckedArray(newChecked);
    }
    function clickFilter(newFilter){
        setFilter(newFilter);
    }
    const clickCleanBtn = ()=>{
        // keepIndexArray = checkedArray.map(checked =>{checked === false});
        let newItems = [];
        for(let i = 0; i < items.length;i++){
            if(checkedArray[i] === false){
                newItems.push(items[i]);
            }
        }
        const newCheckedArray = checkedArray.filter(checked =>{return checked === false});
        setItem(newItems);
        setCheckedArray(newCheckedArray);
    }


    return(
        <>
            <section className = "todo-app__main">
                <input className="todo-app__input" 
                    id = "todo-input"
                    value={inputValue}
                    placeholder={"What Needs To Be Done?"}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                />
                <ul className = "todo-app__list" id = "todo-list">
                    {
                        items.map((value,index) => {
                            return <TodoItem    key={index} 
                                                text={value} 
                                                itemIndex={index} 
                                                checked = {checkedArray[index]} 
                                                filter = {filter}
                                                clickCheckbox = {clickCheckbox} 
                                                handleRemoveItem ={handleRemoveItem}/>
                        })
                    }
                </ul>
            </section>
            <Footer haveItem = {haveItem} 
                    filter = {filter}
                    notDoneItemCnt = {notDoneItemCnt} 
                    clickFilter={clickFilter} 
                    clickCleanBtn = {clickCleanBtn}/>
        </>
    );   
}


export default Section;
