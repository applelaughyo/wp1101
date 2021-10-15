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

const itemCnt = 6;
const themeCnt = 3;




function Theme(front_images , back_images , title , GTI ,BTI){
    this.fImg = front_images;
    this.bImg = back_images;
    this.title = title;
    this.GTI = GTI;
    this.BTI = BTI;
}
var spongeBob = new Theme(SB_front_images ,SB_back_images , SB_title , SB_GTI,SB_BTI);
var dog = new Theme(Dog_front_images , Dog_back_images , Dog_title,Dog_GTI,Dog_BTI);
var iAmTrash = new Theme(IAmTrash_front_images, IAmTrash_back_images , IAmTrash_title,IAmTrash_GTI , IAmTrash_BTI);
var myThemeArray =[spongeBob , dog , iAmTrash];



//main function start
setTheme(myThemeArray[0]);
// main function end









function setTheme(theme){
    themeSelected(theme);
    setTitle(theme);
    setItem(theme);
}

function themeSelected(theme){
    for(i=0;i<themeCnt;i++){
        let myThemeIcon = document.getElementsByClassName("themePhoto")[i];
        if(myThemeArray[i] === theme){
            myThemeIcon.classList.add("selected");
            myThemeIcon.src = theme.GTI;
        }
        else{
            myThemeIcon.classList.remove("selected");
            myThemeIcon.src = myThemeArray[i].BTI;
        }
    }
}
function setTitle(theme){
    let myTitle = document.getElementsByClassName("myTitle")[0];
    let myTitleP = myTitle.getElementsByTagName("p")[0];
    myTitleP.innerHTML = theme.title;
}
function setItem(theme){
    for(i=0;i<itemCnt;i++){
        let myItem = document.getElementsByClassName("item")[i];
        let displayImg = myItem.getElementsByTagName("img")[0];
        let button = myItem.getElementsByTagName("button")[0];
        let resetButton = myItem.getElementsByTagName("button")[1];
        myItem.fImg = theme.fImg[i];
        myItem.bImg = theme.bImg[i];
        displayImg.src = myItem.fImg;
        button.classList.remove("disabled");
        resetButton.classList.add("disabled");
        button.addEventListener(
            'click', 
            function(){
                displayImg.src = myItem.bImg;
                button.classList.add("disabled");
                resetButton.classList.remove("disabled");
            }
        )
        resetButton.addEventListener(
            'click',
            function(){
                displayImg.src = myItem.fImg;
                button.classList.remove("disabled");
                resetButton.classList.add("disabled");
            }
        )
    }
}


