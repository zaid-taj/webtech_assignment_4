// using the document.getElementByID() helps finding the JS that textarea with the specific ID for both the editor and the live preview
let editor = document.getElementById("markdown_input");

// this finds the div empty tag where our slide will appear 
let preview = document.getElementById("live_preview");

// accessing the buttons and the counters
let prev_button = document.getElementById("prev");
let counter = document.getElementById("slide_counter");
let next_button = document.getElementById("next");

// declare the current slide value. Later we have to add the buttons to move between the slides without changing the currslide value.
let currslide = 0;

function update(){
    
    // reading the text from the editor
    let markdown = editor.value;

    // as our application contains many slides separated by the --- in the markdown script so split the slides first
    let slides =  markdown.split("---");
    let selectedslide = slides[currslide]; // made an array of the slides


    // // for splitting the text into separate lines from the specific slide and this results in an array so we can check that what line begins with what markdown symbol ie #, ## etc
    // let lines = selectedslide.split("\n");

    // // declare a var to collect the converted HTML
    // let html = "";
    // // loop through every line written in the markdown script
    // for(let line of lines){
    //     console.log(line);
    //     // now check conditions for every line whether it starts from #, or ## etc
    //     if(line.startsWith("# ")){
    //         // slice the line to remove the # and the unnecessary spaces
    //         let heading = line.slice(2);
    //         // now add the HTML converted heading to the var html
    //         html = html + "<h1>" + heading + "</h1>";
            
    //     }
    //     else if(line.startsWith("## ")){
    //         let heading = line.slice(3);
    //         html = html + "<h2>"+ heading +"</h2>";
    //     }
    //     else{
    //         html = html + "<p>" + line + "</p>";
    //     }
    // }

    // we dont have to use this loop bcz marked.parse automatically converts the markdown script to HTML
    let html = marked.parse(selectedslide);

    // to display the content inside the live_preview, we write in the textarea
    // displaying the HTML tags as the plain text
    // preview.textContent = html;

    // at this time, the live_preview still displays the HTML tags so we have to correct them. so we can use the innerHTML to display the converted HTMl into actual heading and paras.
    preview.innerHTML = html

    // updating the slide counter whenever the slide changes
    // currslide + 1 because array indexing starts from 0
    counter.textContent = (currslide + 1) + " / " + slides.length;


    // disabling the previous button when we are on the first slide
    prev_button.disabled = currslide === 0;

    // disabling the next button when we are on the last slide
    next_button.disabled = currslide === slides.length - 1;

}

// to listen to the event or detect typing and whenever we type inside the editor, the message appears in the browser console.
editor.addEventListener("input", function(){

    // calling the update function whenever the user types
    update();

});


// to listen for the click event on the previous button
prev_button.addEventListener("click", function(){

    // if we are not on the first slide, move to the previous slide
    if(currslide > 0){

        // decreasing the current slide index by 1
        currslide--;

        // updating the live preview after changing the slide
        update();
    }

});


// to listen for the click event on the next button
next_button.addEventListener("click", function(){

    // reading the markdown to find the total number of slides
    let markdown = editor.value;

    // splitting the markdown into separate slides
    let slides = markdown.split("---");

    // if we are not on the last slide, move to the next slide
    if(currslide < slides.length - 1){

        // increasing the current slide index by 1
        currslide++;

        // updating the live preview after changing the slide
        update();
    }

});

// listening for the keyboard keys
document.addEventListener("keydown", function(event) {

    // if the user presses the right arrow key
    if (event.key === "ArrowRight") {

        let slides = editor.value.split("---");

        // move to the next slide if it exists
        if (currslide < slides.length - 1) {
            currslide++;
            update();
        }
    }

    // if the user presses the left arrow key
    else if (event.key === "ArrowLeft") {

        // move to the previous slide if it exists
        if (currslide > 0) {
            currslide--;
            update();
        }
    }

});

// accessing the full screen button
let fullscreen_button = document.getElementById("fullscreen_button");

// listening for the click event on the full screen button
fullscreen_button.addEventListener("click", function(){
    // checking if the presentation is already in the full screen mode
    if(!document.fullscreenElement){
        // to add the presentation mode full screen adn adding the navigations buttons
        document.getElementById("presentation").requestFullscreen();
    }
    // if it is in the full screen mode, exit the full screen mode
    else{
        document.exitFullscreen();
    }
});


// accessing the save button
let save_button = document.getElementById("save_button");

// saving the markdown when the save button is clicked
save_button.addEventListener("click", function() {

    // getting the text from the editor
    let markdown = editor.value;

    // saving the markdown in the browser
    localStorage.setItem("slides", markdown);

    alert("Slides saved successfully!");

});

// loading the saved markdown when the page opens
let savedSlides = localStorage.getItem("slides");

if (savedSlides !== null) {

    // putting the saved markdown back into the editor
    editor.value = savedSlides;

    // updating the preview
    update();

}


// listening for the F11 key
document.addEventListener("keydown", function(event) {

    // checking if the F11 key is pressed
    if (event.key === "F11") {

        // prevent the browser's default fullscreen action
        event.preventDefault();

        // checking if fullscreen is already enabled
        if (document.fullscreenElement) {

            // exit fullscreen
            document.exitFullscreen();

        } else {

            // enter fullscreen presentation
            document.getElementById("presentation").requestFullscreen();

        }
    }

});


// listening for Ctrl + S
document.addEventListener("keydown", function(event) {

    // checking if Ctrl + S is pressed
    if (event.ctrlKey && event.key.toLowerCase() === "s") {

        // prevent the browser's default save action
        event.preventDefault();

        // save the markdown in localStorage
        localStorage.setItem("slides", editor.value);

        alert("Slides saved successfully!");
    }

});