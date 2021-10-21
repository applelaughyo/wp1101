var itemIndex = 0;
var itemCnt = 0;
var notDoneItemCnt = 0;
var nowFilter = "all";
class Item{
    constructor(new_todo_list){
        this.item = document.createElement("li");
        this.item.classList.add("todo-app__item");
        this.item.classList.add("todo-app__active");
        let checkbox = document.createElement("div");
        let item_detail = document.createElement("h1");
        let xImg = document.createElement("img");
        checkbox.classList.add("todo-app__checkbox");
        let label =document.createElement("label");
        let input = document.createElement("input");
        input.type = 'checkbox';
        input.id = String(itemIndex);
        label.htmlFor = String(itemIndex);
        itemIndex++;
        itemCnt++;
        notDoneItemCnt++;
        checkbox.appendChild(input);
        checkbox.appendChild(label);
        item_detail.innerHTML = new_todo_list;
        item_detail.classList.add('todo-app__item-detail');
        //item_detail.classList.add('todo-app__item-done');
        xImg.src = "./img/x.png";
        xImg.classList.add("todo-app__item-x");
        this.item.appendChild(checkbox);
        this.item.appendChild(item_detail);
        this.item.appendChild(xImg);
        input.addEventListener('click',function(e){
            let item_detail = e.target.parentNode.parentNode.getElementsByClassName('todo-app__item-detail')[0];
            item_detail.classList.add("todo-app__item-done");
            if(e.target.checked === true){
                e.target.parentNode.parentNode.classList.add("todo-app__completed");
                e.target.parentNode.parentNode.classList.remove("todo-app__active");
                renewFilter(nowFilter);
                e.target.checked = true;
                item_detail.classList.add("todo-app__item-done");
                notDoneItemCnt--;
                setFooter();
            }
            else{
                e.target.parentNode.parentNode.classList.remove("todo-app__completed");
                e.target.parentNode.parentNode.classList.add("todo-app__active");
                renewFilter(nowFilter);
                e.target.checked = false;
                item_detail.classList.remove("todo-app__item-done");
                notDoneItemCnt++;
                setFooter();
            }
        });
        xImg.addEventListener("click", function(e){
            let input = e.target.parentNode.getElementsByClassName("todo-app__checkbox")[0].getElementsByTagName('input')[0];
            if(input.checked === false){
                console.log("hi");
                notDoneItemCnt--;
                itemCnt--;
                setFooter();
            }
            else{
                itemCnt--;
                setFooter();
            }
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        });
    }
    get itemNode() {
        return this.item;
    }
}


//main function start
let input = document.getElementById("todo-input");

input.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
      inputSubmit();
    }
}, false);

let activeBtn = document.getElementById("activeBtn");
let completedBtn = document.getElementById("completedBtn");
let allBtn = document.getElementById("allBtn");
allBtn.style.borderColor = "red";
activeBtn.addEventListener('click', function(){
    nowFilter = "active";
    activeBtn.style.borderColor = "red";
    completedBtn.style.borderColor = "transparent";
    allBtn.style.borderColor = "transparent";
    
    fliter("flex" , "none");
});

completedBtn.addEventListener('click', function(){
    activeBtn.style.borderColor = "transparent";
    completedBtn.style.borderColor = "red";
    allBtn.style.borderColor = "transparent";
    nowFilter = "completed";
    fliter("none" , "flex");
});
allBtn.addEventListener('click', function(){
    activeBtn.style.borderColor = "transparent";
    completedBtn.style.borderColor = "transparent";
    allBtn.style.borderColor = "red";
    nowFilter = "all";
    fliter("flex" , "flex");
})
let cleanBtn = document.getElementById("cleanBtn");
cleanBtn.addEventListener('click',function(){
    let completedArray = document.getElementsByClassName("todo-app__completed");
    for(let i = completedArray.length - 1; i >=0 ;i--){
        console.log(i);
        console.log(completedArray[i]);
        completedArray[i].parentNode.removeChild(completedArray[i]);
    }

    itemCnt = itemCnt - completedArray.length;
});
renewFilter(nowFilter);
// main function end


function inputSubmit(){
    let input = document.getElementById('todo-input');
    let new_todo_list = input.value;
    addNewItem(new_todo_list);
    setFooter();
    input.value = "";
    return false; // Prevent page refresh
}
function addNewItem(new_todo_list){
    let todoList = document.getElementById("todo-list");
    let newItem = new Item(new_todo_list).itemNode;
    todoList.appendChild(newItem);
}
function setFooter(){
    let todoList_footer = document.getElementsByClassName("todo-app__footer")[0];
    if(itemCnt === 0){
        todoList_footer.style.display = "none";
    }
    else{
        todoList_footer.style.display = "flex";
    }
    let total = document.getElementsByClassName("todo-app__total")[0];
    total.innerHTML = `${notDoneItemCnt} left`;
    let cleanBtn = document.getElementsByClassName("todo-app__clean")[0];
    if((itemCnt - notDoneItemCnt) === 0){
        cleanBtn.style.display = "none";
    }
    else{
        cleanBtn.style.display = "flex";
    }

}
function fliter(activeStatus , completedStatus){
    let activeArray = document.getElementsByClassName("todo-app__active");
    let completedArray = document.getElementsByClassName("todo-app__completed");
    for(let i = 0;i < activeArray.length;i++){
        activeArray[i].style.display = activeStatus;
    }
    for(let i = 0;i < completedArray.length;i++){
        completedArray[i].style.display = completedStatus;
    }
}
function renewFilter(nowFilter){
    if(nowFilter === 'all'){
        fliter("flex" , "flex");
    }
    else if(nowFilter === 'active'){
        fliter("flex" , "none");
    }
    else{
        fliter("none" , "flex");
    }
}