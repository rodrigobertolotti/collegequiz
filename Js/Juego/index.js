$(document).ready(function() {

let itemContainter= document.getElementById("item-container");
let hacerContainer= document.getElementById("hacer-container");

let mouseOffset = {x:0, y:0};
let isMouseDown= false;
let currentToDo= null;

function isCollide(a, b) {
   var aRect = a.getBoundingClientRect();
   var bRect = b.getBoundingClientRect();

   return !(
       ((aRect.top + aRect.height) < (bRect.top)) ||
       (aRect.top > (bRect.top + bRect.height)) ||
       ((aRect.left + aRect.width) < bRect.left) ||
       (aRect.left > (bRect.left + bRect.width))
   );
}

for (let i=0; i<6; i++){
   let snap= document.createElement("div");
   snap.className= "snap";
   snap.id= i;
   document.getElementById("hacer-container").appendChild(snap);
}

function snapToDo(toDo, container){
   let box= container.getBoundingClientRect();
   toDo.style.left= box.x + "px";
   toDo.style.top= box.y + "px";
   toDo.style.position= "absolute";
}


setInterval(() => {
   let snaps= document.getElementsByClassName("snap");
   for (let i=0 ; i< snaps.length; i++){
      snaps[i].className= snaps[i].className.replace("over", " ");
      if(currentToDo!= null && isCollide(currentToDo, snaps[i])){
         snaps[i].className += " over";
         if (!isMouseDown){
            snapToDo(currentToDo, snaps[i]);

         }
      }
   }

}, 100)


function onMouseDown(e, item){
   e.preventDefault();
   isMouseDown=true;
   console.log("bajo mause" + item.style.left + " " + item.style.top);
   currentToDo= item;
   mouseOffset= {x: item.style.left - e.clientX,y: item.style.top - e.clientY};

}

function onMouseUp(e, item){
   e.preventDefault();
   isMouseDown= false;
   item.className="items";
   console.log(item.className);
}

function onMouseMove(e, item){
   e.preventDefault();
   if (isMouseDown){
      item.style.left= e.clientX + mouseOffset.x + "px";
      item.style.top= e.clientY + mouseOffset.y + 50  + "px";
   }
}

   let item= document.getElementById("item");

   item.addEventListener("mousedown", (e) =>{
      onMouseDown(e, item);
   })

   document.body.addEventListener("mousemove", (e) => {
      onMouseMove(e, item);
   })

   item.addEventListener("mouseup", (e) => {
      onMouseUp(e, item);
   })


   })
