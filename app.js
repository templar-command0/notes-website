console.log("Welcome, this is a notes app")

let notesObj = [];
showNotes();
// if user adds a note , add it to the local storage
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener('click', function(e){ 
        let addText = document.getElementById("addTxt");
        let notes = localStorage.getItem("notes");
        if(notes == null){
            notesObj = []
        }else{
            notesObj = JSON.parse(notes)
        }
        if(addText.value.length>0){
        notesObj.push(addText.value);
        localStorage.setItem("notes", JSON.stringify(notesObj))
        addText.value = "";
        // console.log(notesObj);
        showNotes();
        }
    })

function showNotes(){
    let notes = localStorage.getItem("notes")
    
    if(notes == null){
        notesObj = []
    }else{
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += `
        <div class="card mx-2 my-2 noteCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
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

    notesObj.splice(index,1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes()
}

// adding search functionality

const searcH = document.getElementById('search-txt');

searcH.addEventListener("input", function(){
    const searchTxt = searcH.value.toLowerCase()
    const noteCards = document.getElementsByClassName("noteCard")

    Array.from(noteCards).forEach(function(element){

        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase()
        if(cardTxt.includes(searchTxt)){
            element.style.display = "block"
        }else{
            element.style.display = "none"
        }
    })

    // console.log("Input event fired",searchTxt)
})



/*
further features

1.Add Custom title to noteCard
2. Mark a note as important
3. separate notes by user
4. sync with server and host
5. Add edit note option
*/