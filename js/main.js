//Listen for form submission
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
    //Get form values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;


var bookmark ={
    name: siteName,
    url: siteUrl
}



//console.log(bookmark);
/*
//local storage test
localStorage.setItem('test', 'Hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));*/

//Test if bookmarks is null
if(localStorage.getItem('bookmarks')=== null){
    //Init array
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else{
    //Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //Reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

     //Re-fetch bookmarks
     fetchBookmarks();
     
    //Prevent form from submitting
    e.preventDefault(); 
}

//Delet Bookmarks
function deleteBookmark(url){
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //loop through bookmarks
    for(var i =0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }
    //Reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();

}

function fetchBookmarks(){
    //Get Bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build Output
    bookmarksResults.innerHTML = '';
    for(let i = 0; i< bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
                                        '<h3>' +name+ 
                                        '<a class="btn btn-default" target= "_blank" href= "'+url+'">Visit</a>' +
                                        '<a  onclick= "deleteBookmark(\''+url+'\')" class="btn btn-danger" href= "#">Delete</a>' +
                                        '</h3>'+
                                        '</div>'; 
    }
}

