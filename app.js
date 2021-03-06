"use strict";
console.log("Welcome to Star Notes - Made by Ajay")



//declarations
const saveBtn = document.getElementById("saveBtn")
let modalIsImportant = false
const star = document.getElementById("modal-star")


let important = false
let notesObj = [];
// console.log(notesObj)
showNotes();
// if user adds a note , add it to the local storage
const addBtn = document.getElementById("addBtn");

// click on add btn
addBtn.addEventListener('click', function(e){ 
        
        let addText = document.getElementById("addTxt");
        let addTitle = document.getElementById("addTitle");
        let notes = localStorage.getItem("notes");
        if(notes == null){
            notesObj = []
        }else{
            notesObj = JSON.parse(notes)
        }
        if(addText.value.length>0){
        notesObj.push([addTitle.value , addText.value, important]);
        localStorage.setItem("notes", JSON.stringify(notesObj))
        addText.value = "";
        addTitle.value = "";
        
        
        // console.log(notesObj);
        showNotes();
        }
        important = false;
        document.getElementById("important-icon").setAttribute("src", "icons/starGrey.png");
        // console.log(notesObj)
    })
    

    
function showNotes(){
            let notes = localStorage.getItem("notes")

            
            if(notes == null){
                notesObj = []
            }else{
                notesObj = JSON.parse(notes)
            }
            let html = "";
            notesObj.forEach(function([title,text,important],index){
                
                html += `
                <div class= "${(important)? "border-3 border-danger" : " "} card mx-2 my-2 noteCard " style = "width: 18rem;}">
                <div class="${index} card-body ">
                  <h5 id = "title${index}" class="card-title">${(title==""? "Note "+index +1 : title)}</h5>
                  <p id = "text${index}" class="card-text">${text}</p>
                  <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary" >Delete Note</button>
                  <button id = "${index}" onclick = "editNote(this.id)" class="btn btn-primary type = "button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit Note</button>
                </div>
                </div>
                        `
                
                document.getElementById("notes").innerHTML = html
            });
            let notesElm = document.getElementById("notes");
            if(notesObj.length != 0){
                notesElm.innerHTML = html
            }else{
                notesElm.innerHTML = `Nothing to show here , use "Add Note" section to add notes`
            }
            
        }
    
    
    // function to delete a note
    

function deleteNote(index){
    let notes = localStorage.getItem("notes")
    // console.log("I am deleting",index);
    
    if(notes == null){
        notesObj = []
    }else{
        notesObj = JSON.parse(notes)
    }
    // show toast

    const deleteToast = document.getElementById("liveToast")
    let toast  = new bootstrap.Toast(deleteToast)
    toast.show()
    // update toast timer
    let toastMessage = document.getElementById("toastMessage")
    for (let i=3 ;i>=0;i--){
        setTimeout(function(){
        toastMessage.innerHTML = `Deleting Note in ${3-i} Seconds`            
        },i*1000)
    }

    // hide toast after 3 seconds
    function hideFn(){ toast.hide()}
    let hide = setTimeout(hideFn,3000)

    // listen for undo button click
    let undoBtn = document.getElementById("undoBtn")
    undoBtn.addEventListener("click",function(){
        clearTimeout(theTimeout)
        clearTimeout(hide)
    })

    // perform deletion
    function deleteM(){
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes()}
    
    const theTimeout = setTimeout(deleteM, 3000);

}

// adding search functionality

const searcH = document.getElementById('search-txt');

searcH.addEventListener("input", function(){
    const searchTxt = searcH.value.toLowerCase()
    const noteCards = document.getElementsByClassName("noteCard")

    Array.from(noteCards).forEach(function(element){

        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase()
        let cardTitle = element.getElementsByTagName("h5")[0].innerHTML.toLowerCase()
        if(cardTxt.includes(searchTxt)||cardTitle.includes(searchTxt)){
            element.style.display = "block"
        }else{
            element.style.display = "none"
        }
    })

    // console.log("Input event fired",searchTxt)
})



/*
further features

additonal features added by me on 20 april,2022 -
1.Add Custom title to noteCard **
--> done with added functionality to search for note titles

2. Mark a note as important **
--> done , click on star Icon to mark a note as important , 

3. Add edit note option**
--> done - edit note button added and is fully functional


Features yet to add ->
4. separate notes by user
5. sync with server and host
*/

// edit Note fucntionality

function editNote([index]){
    // send the index to modal 
    saveBtn.setAttribute("index",index)
    
    // send title and text to modal 
    let cardTitle = document.getElementById(`title${index}`).innerHTML;
    let cardText = document.getElementById(`text${index}`).innerHTML;
    
    document.getElementById(`editTitle`).value = cardTitle;
    document.getElementById('editText').value = cardText;

    // send important to modal
      // get isImportant from local stroage
    let notes = localStorage.getItem('notes')
    let notesObj = JSON.parse(notes)

    modalIsImportant = notesObj[index][2]
    
    // send value to star
    

    showModalStar();
}
function showModalStar(){
    if(modalIsImportant){
        star.setAttribute("src","icons/starOrange.png")
    }else {
        star.setAttribute("src","icons/starGrey.png")
    }
}
    
// isImportant 

function switchImportant(){
    if(important){
        important = false
        document.getElementById("important-icon").setAttribute("src", "icons/starGrey.png")
    }else {
        document.getElementById("important-icon").setAttribute("src", "icons/starOrange.png")
        important = true
}
}

// repo recreated


function saveBtnClicked(index){
    

    // get edit text,title,star value and send to the righteous card
    let editedTitle  = document.getElementById(`editTitle`).value
    let editedText = document.getElementById('editText').value
    
    
    if(modalIsImportant){
        notesObj[index][2] = modalIsImportant
    }else notesObj[index][2] = false;
    
    // put value in local storage
    notesObj[index]=[editedTitle,editedText,modalIsImportant]
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes();

}

function starSwitch(){
    if(modalIsImportant){
        modalIsImportant = false;
    }else modalIsImportant = true;

    showModalStar()
}