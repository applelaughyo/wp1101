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

const itemCnt = 6;
const themeCnt = 2;




function Theme(front_images , back_images , title , GTI ,BTI){
    this.fImg = front_images;
    this.bImg = back_images;
    this.title = title;
    this.GTI = GTI;
    this.BTI = BTI;
}
var spongeBob = new Theme(SB_front_images ,SB_back_images , SB_title , SB_GTI,SB_BTI);
var dog = new Theme(Dog_front_images , Dog_back_images , Dog_title,Dog_GTI,Dog_BTI);





setTheme(spongeBob);
selectTheme(document.getElementsByClassName("themePhoto")[0]);




function setTheme(theme){
    let myTitle = document.getElementsByClassName("myTitle")[0];
    let myTitleP = myTitle.getElementsByTagName("p")[0];
    myTitleP.innerHTML = theme.title;
    
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
function selectTheme(myThemeIcon){
    for(i=0;i<themeCnt;i++){
        if(document.getElementsByClassName("themePhoto")[i] === myThemeIcon){
            document.getElementsByClassName("themePhoto")[i].classList.add("selected");
        }
        else{
            document.getElementsByClassName("themePhoto")[i].classList.remove("selected");
        }
        //document.getElementsByClassName("themePhoto")[i].classList.remove("disabled");
    }
    //myThemeIcon.classList.add("disabled");
}


