const SB_title = "Welcome to SpongeBob Website!!!";
const SB_GTI = "ThemeIcon/SpongeBobGood.jpg";
const SB_BTI = "ThemeIcon/SpongeBobBad.jpg";
const SB_front_images =["SpongeBob/讓我猜猜看.PNG" , 
                        "SpongeBob/好可憐哦.JPG",
                        "SpongeBob/好棒，三點了.JPG",
                        "SpongeBob/大驚喜.PNG",
                        "SpongeBob/不是 我是派大星.JPG",
                        "SpongeBob/派大星好想哭.JPG"]
const SB_back_images = ["SpongeBob/老弟，你是負責搞笑的嗎.jpg",
                        "SpongeBob/因為笨蛋永遠都不知道自己到底有多笨多呆.jpg",
                        "SpongeBob/然後我就可以扁他了對嗎.jpg",
                        "SpongeBob/上課才八分鐘 我們已經學會數數了.PNG", 
                        "SpongeBob/糗了，我不是派大星.jpg",
                        "SpongeBob/派大星也需要愛.JPG"]

const Dog_title = "Welcome to Doge Website!!!";
const Dog_GTI = "ThemeIcon/DogGood.jpg";
const Dog_BTI = "ThemeIcon/DogBad.jpg";
const Dog_front_images = ["Dog/可以色色.png",
                            "Dog/被抓到了.jpg",
                        "Dog/繼續睡.jpg" ,
                    "Dog/關於感情問題.jpg",
                    "Dog/不可以色色.png",
                    "Dog/一個耿直的微笑.jpg"]
const Dog_back_images = ["Dog/不可以色色.png",
                        "Dog/沒錯就是我.jpg",
                    "Dog/睡覺吧夢裡啥都有.jpg",
                    "Dog/我全部建議分手.jpg",
                    "Dog/為甚麼不可以色色.jpg",
                    "Dog/我承受著這個年齡不該有的機智和帥氣.jpg"]

const IAmTrash_title = "Welcome to I Am Trash Website!!!";
const IAmTrash_GTI = "ThemeIcon/IAmTrashGood.png";
const IAmTrash_BTI = "ThemeIcon/IAmTrashBad.png";
const IAmTrash_front_images = ["IAmTrash/我就爛.png",
                                "IAmTrash/別當機掰人.png",
                                "IAmTrash/直到遇見你.png" ,
                                "IAmTrash/給我等一下.png",
                                "IAmTrash/除了給讚.png",
                                "IAmTrash/空.png"]
const IAmTrash_back_images = ["IAmTrash/你也爛.jpg",
                                "IAmTrash/要爛一起爛.png",
                                "IAmTrash/因為你實在太爛了.png",
                                "IAmTrash/你們都很爛.png",
                                "IAmTrash/我不知道該說什麼了.png",
                                "IAmTrash/我就沒梗.png"]




class Theme{
    constructor(name , front_images , back_images , title , GTI ,BTI , itemCnt){
        this.name = name;
        this.fImg = front_images;
        this.bImg = back_images;
        this.title = title;
        this.GTI = GTI;
        this.BTI = BTI;
        this.itemCnt = itemCnt;
    }
}
class ThemeItem {
    constructor(theme){
        this.node = document.createElement("div");
        this.node.classList.add("themeItem");
        let img = document.createElement("img");
        img.src = theme.BTI;
        img.classList.add("themePhoto");
        img.alt = "一張圖片";
        img.id = theme.name;
        this.node.appendChild(img);
    }
    get TINode() {
        return this.node;
    }
}

class Item{
    constructor(theme , index) {
        this.node = document.createElement("div");
        this.node.classList.add("item");
        let img = document.createElement("img");
        img.src = theme.fImg[index];
        img.classList.add("photo");
        img.alt = "一張圖片";
        this.node.appendChild(img);
        let button = document.createElement("button");
        button.innerHTML = "click me !!!";
        button.onclick = function(){
            img.src = theme.bImg[index];
            button.classList.add("disabled");
            resetButton.classList.remove("disabled");
        };
        this.node.appendChild(button);
        let resetButton = document.createElement("button");
        resetButton.innerHTML = "reset";
        resetButton.classList.add("disabled");
        resetButton.onclick = function(){
            img.src = theme.fImg[index];
            button.classList.remove("disabled");
            resetButton.classList.add("disabled");
        };
        this.node.appendChild(resetButton);
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "delete";
        this.node.appendChild(deleteButton);
        deleteButton.onclick = function(){
            cur_Theme.itemCnt--;
            curItemCnt--;
            setAnnotation();
            this.parentNode.parentNode.removeChild(this.parentNode);     
        };
    }
    get ItemNode() {
          return this.node;
    }
}





var spongeBob = new Theme("SpongeBob",SB_front_images ,SB_back_images , SB_title , SB_GTI,SB_BTI , SB_front_images.length);
var dog = new Theme("Doge",Dog_front_images , Dog_back_images , Dog_title,Dog_GTI, Dog_BTI, Dog_front_images.length);
var iAmTrash = new Theme("I Am Trash",IAmTrash_front_images, IAmTrash_back_images , IAmTrash_title,IAmTrash_GTI , IAmTrash_BTI ,IAmTrash_front_images.length);
var myThemeArray =[spongeBob , dog , iAmTrash];



const themeCnt = 3;
var curItemCnt  = 0;
var cur_Theme = myThemeArray[0];












//main function start
setThemeIconContainer();
for(let i = 0; i < themeCnt;i++){
    let themeIcon = document.getElementsByClassName("themePhoto")[i];
    themeIcon.addEventListener(
        "click",
        function() {
            setContainer(myThemeArray[i]);
            themeSelected(myThemeArray[i]);
        }
    );
}
setEmptyThemeIcon();
setContainer(myThemeArray[0]);
themeSelected(myThemeArray[0]);
// main function end



function setThemeIconContainer(){
    for(let i = 0; i < myThemeArray.length;i++){
        let themeIconContainerNode = document.getElementById("themeIconContainer");
        let themeItemNode = new ThemeItem(myThemeArray[i]).TINode;
        themeIconContainerNode.appendChild(themeItemNode);
    }
}
function setEmptyThemeIcon(){
    let themeIconContainerNode = document.getElementById("themeIconContainer");
    let emptyTheme = document.createElement("div");
    emptyTheme.classList.add("themeItem");
    let img = document.createElement("img");
    img.src = "空主題.png";
    img.classList.add("themePhoto");
    img.alt = "一張圖片";
    img.id = "emptyTheme";
    emptyTheme.appendChild(img);
    themeIconContainerNode.appendChild(emptyTheme);
    img.addEventListener(
        "click",
        function() {
            alert("慘了被發現了:(\n我是一個沒用的空主題\n不要點我，讓我安靜地在這耍笨。")
        }
    );
}

function　setContainer(theme){
    cur_Theme = theme;
    let myTitleNode = document.getElementById("myTitle");
    let p_new = document.createElement("p");
    p_new.innerHTML = `Welcome To ${theme.name} Website !!!`;
    myTitleNode.replaceChild(p_new , myTitleNode.firstChild);
    setItemContainer(theme);
    setAnnotation();
}

function setItemContainer(theme){
    let itemContainerNode = document.getElementById("itemContainer");
    clearNode(itemContainerNode);
    curItemCnt = 0;
    for(let i = 0; i < theme.itemCnt;i++){
        curItemCnt++;
        let itemNode = new Item(theme , i).ItemNode;
        itemContainerNode.appendChild(itemNode);
    }
}
function setAnnotation(){
    let annotationNode = document.getElementById("annotation");
    p_new = document.createElement("p");
    let totalItemCnt = 0;
    for(let i = 0; i < themeCnt;i++){
        totalItemCnt +=myThemeArray[i].itemCnt;
    }
    p_new.innerHTML = `Current theme: ${cur_Theme.name}<br><br>ItemCount:${cur_Theme.itemCnt}<br><br>TotalItemCount:${totalItemCnt}`;
    annotationNode.replaceChild(p_new , annotationNode.firstChild);
}



function themeSelected(theme){
    cur_Theme = theme;
    for(let i = 0; i < themeCnt ;i++){
        let themeIcon = document.getElementsByClassName("themePhoto")[i];
        if(myThemeArray[i] === theme){
            themeIcon.classList.add("selected");
            themeIcon.src = myThemeArray[i].GTI;
        }
        else{
            themeIcon.classList.remove("selected");
            themeIcon.src = myThemeArray[i].BTI;
        }
    }
}


function clearNode(node){
    while(node.hasChildNodes()){
        node.removeChild(node.firstChild);
    }
}





function addItem(){
    //const new_GTI = document.getElementById("inputThemeGoodIcon").value;
    //const new_BTI = document.getElementById("inputThemeBadIcon").value;
    //const newTitle = document.getElementById("inputTitle").value;
    cur_Theme.fImg.push(document.getElementById("inputFI").value);
    cur_Theme.bImg.push(document.getElementById("inputBI").value);
    cur_Theme.itemCnt++;
    curItemCnt++;
    //var newTheme = new Theme(newTheme_front_images ,newTheme_back_images , newTitle , new_GTI,new_BTI);
    let itemContainerNode = document.getElementById("itemContainer");
    let itemNode = new Item(cur_Theme , cur_Theme.fImg.length - 1).ItemNode;
    itemContainerNode.appendChild(itemNode);
    setAnnotation();
    clean();
}
function clean(){
    document.getElementById("inputFI").innerHTML='';
    document.getElementById("inputBI").innerHTML='';
}








