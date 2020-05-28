/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const studentList = document.querySelector('.student-list'); //entire list of students given in HTML
const studentsPerPage = 10; //Maximum number of students displayed on one page
const numberOfStudents = studentList.length; //total number of students in list
const numberOfPages = Math.ceil(numberOfStudents / studentsPerPage); //calculates the number of pages needed to fit the whole list
const studentsInfo = document.querySelectorAll('.student-item'); //directly accesses the information of each student, so it can display them seperately and break them up into chunks

/*Function Name: showPage - displays list of names in chunks of a given size to the page
 * @list [object] - this is the list that is given to the function to display
 *@page [number] - this is the page number that is being displayed
 *@returns [object] - no return statement needed as it displayes to the screen
 */
const showPage = (list, page) => {
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
    const page = document.querySelector('.page'); //links the page class to the function
    const paginationDiv = document.createElement('div'); //links the div element to function
    paginationDiv.className = 'pagination' //assigns class name 
    page.appendChild(paginationDiv); //links page to div child element
    const paginationUl = document.createElement('ul');
    paginationUl.className = 'pagination li a'; //creates ul element
    paginationDiv.appendChild(paginationUl); //links ul to div

    document.querySelector('.pagination').appendChild(paginationUl);

    for (let i = 0; i < numberOfPages; i += 1) { //creates the correct number of page buttons 
        const li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', '#'); //sets href to # for anchor tag
        paginationUl.appendChild(li); //links ul to li
        li.className = 'pagination li a';
        a.innerHTML = i + 1; //makes page number start at 1 and go to whatever the total number of pages is
        li.appendChild(a); //links a to li

        if (i === 1) {
            a.className = 'active'; //makes buttons active
        }
        li.appendChild(a);
        paginationUl.appendChild(li);

        //Button Event Handler
        a.addEventListener('click', (e) => {
            const pageButtonLink = document.querySelectorAll('a');

            for (let j = 0; j < pageButtonLink; j += 1) { //removes the active class name from all of the anchor tags
                pageButtonLink[j].classList.remove('active');
            }
            showPage(studentsInfo, i); //calls showPage for information corresponding to the page number
            e.target.className('active'); // sets the button selected to active
        });
    }
}
//Function Calls
appendPageLinks(studentsInfo);
showPage(studentsInfo, 1);
