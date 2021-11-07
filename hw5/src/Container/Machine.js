import React, { useEffect, useState } from 'react';
function Machine(){
    const [screenValue,setScreenValue] = useState("");
    const [answer , setAswer] = useState("");
    Array.prototype.getLast = function() {
        return this[this.length - 1];
    };
    Array.prototype.isEmpty = function() {
        return this.length === 0;
    };
    
    function priority(c) {
        return c === '+' || c === '-' ? 1 : c === '×' || c === '÷' ? 2 : 0;
    }
    
    function toPostfix(expr) {
        var stack = [];
        var output = [];
        var toStack = '(' ;
        var toOutput = ')';
        expr.forEach(function(c) {
            if(c === toStack) { stack.push(c); }
            else if('+-×÷'.indexOf(c) !== -1) {
                while(!stack.isEmpty() && 
                       priority(stack.getLast()) >= priority(c)) {
                    output.push(stack.pop());
                }
                stack.push(c);
            }
            else if(c === toOutput) {
                while(stack.getLast() !== toStack) {
                    output.push(stack.pop());
                }
                stack.pop();
            }
            else { output.push(c); }
        });
        
        while(!stack.isEmpty()) { output.push(stack.pop()); }
        
        return output;
    }
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
          return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
    Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
    };
  
    function cal(op , num1 , num2){
        let result = 0;
        switch(op) { 
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2; 
                break;
            case '×': 
                result = num1 * num2;
                break;
            case '÷': 
                result = num1 / num2;
                break;
        }
        if (!isFinite(result)) {
            throw "Error";
        } 
        else if(result > Number.MAX_SAFE_INTEGER){
            throw "Overflow";
        }
        else if(result < Number.MIN_SAFE_INTEGER){
            throw "Overflow";
        }
        else{
            // console.log("res:" , result);
            // console.log(Number.MAX_SAFE_INTEGER);
            return Math.round10(result , -8);
        }
    }
    function evaluate(postfixArray) {
        var stack = [];
        postfixArray.forEach(function(c) {
            if('+-×÷'.indexOf(c) !== -1) {
                var num2 = stack.pop();
                var num1 = stack.pop();
                try { // statements to try
                    cal(c,num1,num2); // 函式可以丟出例外
                }
                catch(e){
                    setScreenValue(e + ", Please press AC to continue!");
                }
                stack.push(cal(c, num1, num2));
            } 
            else {
                stack.push(parseFloat(c));
            }
        });
        return stack.pop();
    }
    function processExpr(screenValue){
        console.log("myInput:",screenValue);
        let newExpr = [];
        //console.log(expr);
        let screenValueArr = screenValue.split('')
        if(screenValueArr[0] === '-'){
            screenValueArr.unshift('0');
        }
        screenValueArr.forEach(function(c){
            if(newExpr.length === 0){
                newExpr.push(c);
            }
            else if('+-×÷'.indexOf(c) !== -1){
                newExpr = [...newExpr, c];
            }
            else{
                if('+-×÷'.indexOf(newExpr.getLast()) !== -1){
                    newExpr.push(c);
                }
                else{
                    const newLast = newExpr.getLast() + c;
                    newExpr[newExpr.length - 1] = newLast;
                }
            }
            //console.log(index,":",c,newExpr);
        })
        console.log(toPostfix(newExpr));
        const newAns = evaluate(toPostfix(newExpr)) + "";
        setScreenValue(newAns);
    }

    const handleInput = (e)=>{
        setScreenValue(screenValue + e.target.value);
    }

    const handleEqual = ()=>{
        processExpr(screenValue);
    }
    const handleUndo = ()=>{
        // console.log(typeof screenValue);
        let expr = screenValue.split('');
        let newScreenValue = expr.slice(0,expr.length - 1).join('');
        setScreenValue(newScreenValue);
    }
    const handleAC = () =>{
        setScreenValue('');
    }
    const handleMC = () =>{

    }
    const handleMR = () =>{

    }



    return(
        <div className = 'calculator-app__machine'>
            <div className = 'calculator-app__machine_screen'>
                <font color = 'white' size = '6'>{screenValue}</font>
                <font color = 'white'size = '4'>{answer}</font>
            </div>
            <div className = 'calculator-app__machine_body'>
                <div className = 'calculator-app__machine_number'>
                    <button value = '1' onClick = {handleInput}>1</button>
                    <button value = '2' onClick = {handleInput}>2</button>
                    <button value = '3' onClick = {handleInput}>3</button>
                    <button value = '4' onClick = {handleInput}>4</button>
                    <button value = '5' onClick = {handleInput}>5</button>
                    <button value = '6' onClick = {handleInput}>6</button>
                    <button value = '7' onClick = {handleInput}>7</button>
                    <button value = '8' onClick = {handleInput}>8</button>
                    <button value = '9' onClick = {handleInput}>9</button>
                    <button value = '0' onClick = {handleInput}>0</button>
                    <button value = '.' onClick = {handleInput}>.</button>
                </div>
                <div className = 'calculator-app__machine_operator'>
                    <button value = '+' onClick = {handleInput}>+</button>
                    <button value = '-' onClick = {handleInput}>-</button>
                    <button value = '&times;' onClick = {handleInput}> &times; </button>
                    <button value = '&divide;' onClick = {handleInput}> &divide; </button>
                    <button value = '=' onClick = {handleEqual}>=</button>
                    <button value = '(' onClick = {handleInput}>(</button>
                    <button value = ')' onClick = {handleInput}>)</button>
                    <button style = {{fontSize: 18}} onClick = {handleUndo}>undo</button>
                    <button style = {{fontSize: 18}} onClick = {handleAC}>AC</button>
                    <button style = {{fontSize: 18}} onClick = {handleMC}>MC</button>
                    <button style = {{fontSize: 18}} onClick = {handleMR}>MR</button>
                </div>
            </div>    
        </div>
    );
}
export default Machine;