/*Completare l’esercizio iniziato a lezione sulla todo-list.
Utilizzare l’API di esempio http://157.230.17.132:xxxx/todos
e fare le 4 operazioni Create, Read, Update e Delete.*/


$(document).ready(function(){




    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);

    var context = { title: "My New Post", body: "This is my first post!" };
    var html = template(context);


    $('.container').append(html);


});
