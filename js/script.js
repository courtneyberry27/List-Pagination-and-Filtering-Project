/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const studentList = document.querySelectorAll('.student-list')[0]; //entire list of students given in HTML
const studentsInfo = studentList.children; //directly accesses the information of each student, so it can display them seperately and break them up into chunks
const studentsPerPage = 10; //Maximum number of students displayed on one page
const numberOfStudents = studentsInfo.length; //total number of students in list
const numberOfPages = Math.ceil(numberOfStudents / studentsPerPage); //calculates the number of pages needed to fit the whole list
const page = document.querySelector('.page'); //links the page class to the application
const searchResults = [];

/*Function Name: showPage - displays list of names in chunks of a given size to the page
 * @list [object] - this is the list that is given to the function to display
 *@page [number] - this is the page number that is being displayed
 *@returns [object] - no return statement needed as it displayes to the screen
 */
function showPage(list, page) {
    const startIndex = ((page * studentsPerPage) - studentsPerPage); //calculates the index number that the corresponding page will start with
    const endIndex = (page * studentsPerPage) - 1; //calculates the ending index for the page

    for (let i = 0; i < list.length; i++) { //loops through all list indexes
        if (i >= startIndex && i < endIndex) { //checks that it is within the range of the indexes.  The ending index should not be included as that woudl display one mroe to the page than needed
            list[i].style.display = ''; //displays names within range
        } else {
            list[i].style.display = 'none'; //hides all other names
        }
    }
}

/*** Function Name: appendPageLinks - creates the page buttons at the botton of the page and makes them access their respective names within the list
 *@list [object] - this is the data that is passed in through the HTML, which is a list of given length 
 ***/
function appendPageLinks(list) {

    const paginationDiv = document.createElement('div'); //links the div element to function
    paginationDiv.className = 'pagination' //assigns class name 
    page.appendChild(paginationDiv); //links page to div child element
    const paginationUl = document.createElement('ul');
    paginationUl.className = 'pagination'; //creates ul element
    paginationDiv.appendChild(paginationUl); //links ul to div

    document.querySelector('.pagination').appendChild(paginationUl);

    for (let i = 1; i <= numberOfPages; i += 1) { //creates the correct number of page buttons 
        const li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', '#'); //sets href to # for anchor tag
        paginationUl.appendChild(li); //links ul to li
        li.className = 'pagination';
        a.textContent = i; //makes page number start at 1 and go to whatever the total number of pages is
        li.appendChild(a); //links a to li
        if (i === 1) { //sets first anchor tag to active
            a.className = 'active';
        }
        //page Button Event Handler
        a.addEventListener('click', (e) => {
            const allAnchorTags = document.querySelectorAll('a'); //selects all anchor tags

            for (let j = 0; j < allAnchorTags.length; j += 1) { //removes the active class name from all of the anchor tags
                allAnchorTags[j].classList.remove('active'); //removes active from all anchors
            }
            showPage(studentsInfo, i); //calls showPage for information corresponding to the page number
            e.target.className = 'active'; // sets the button selected to active

        });
    }
}

/*** Function Name: search - creates search bar and button, and returns either the matching results or a message to the screen displaying no results
 *@returns - returns all names containing the string entered in the search bar or a message saying no results
 ***/
function search() {
    const searchDiv = document.querySelector('.page-header');  //ties the search area to the header of the page and its css and html
    const noResultDiv = document.createElement('div');  //creates div for displaying no results
    noResultDiv.className = '.no-results'; //creates class name no-results
    page.appendChild(noResultDiv);  //links no results div to the page contents
    const input = document.createElement('input'); //creates searchbar input
    const searchButton = document.createElement('button'); //creates search button
    input.placeholder = "Search for students here";  //placeholder for input bar, so it goes away when user starts typing
    searchButton.textContent = "Search"; //text of search button
    searchDiv.appendChild(input);  //links searchbar to the input element creates, so they work together
    searchDiv.appendChild(searchButton);  //links searchbar and search button, so they work together

    //SEARCH BUTTON EVENT HANDLER
    searchButton.addEventListener('click', (e) => {
        const searchFilter = input.value.toLowerCase(); //makes search all lowercase
        searchResults.length = 0; //sets initial results to zero

        for (let i = 0; i < studentsInfo.length; i += 1) {  //loops through all names and displays those that match
            if (studentsInfo[i].innerHTML.indexOf(searchFilter) > -1) {  //if matches, displays
                studentsInfo[i].style.display = '';
            } else { //if doesn't match, displays nothing
                studentsInfo[i].style.display = 'none';
                searchResults.push(i);
            }
        }

        if (searchResults.length === studentsInfo.length) {  //if nothing at all matches, displays no results
            noResultDiv.innerHTML = '<h1> No Results... </h1>' //creates no results element
        } else {  //if results, just display results, not no results message
            noResultDiv.innerHTML = '';
        }
    })
}


//Function Calls
appendPageLinks(studentsInfo);
showPage(studentsInfo, 1);
search();
