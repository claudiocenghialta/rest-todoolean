/*Completare l’esercizio iniziato a lezione sulla todo-list.
Utilizzare l’API di esempio http://157.230.17.132:xxxx/todos
e fare le 4 operazioni Create, Read, Update e Delete.*/


$(document).ready(function() {

    //inizializzo lista con valori preesistenti
    getData();
    //aggiungo nuovo elemento al click
    $('#addNew').click(function() {
        var testo = $('#nuovaVoce').val();
        postData(testo);
        $('#nuovaVoce').val('')
    })
    //aggiungo nuovo elemento quando viene premuto invio su input
    $('#nuovaVoce').keyup(function() {
        if (event.which == 13 || event.keycode == 13) {
            var testo = $('#nuovaVoce').val();
            postData(testo);
            $('#nuovaVoce').val('')
        }
    })



});
//chiamata get e stampa risultati su html
function getData() {
    //svuoto lista precedentemente caricata
    $('.lista').empty()
    //chiamata ajax
    $.ajax({
        url: 'http://157.230.17.132:3005/todos',
        method: 'GET',
        success: function(resp) {
            //handlebars
            var source = $('#entry-template').html();
            var template = Handlebars.compile(source);
            //ciclo i risultati dell'array di risposta e li stampo con handlebars
            for (var i = 0; i < resp.length; i++) {
                var context = {
                    id: resp[i].id,
                    text: resp[i].text
                };
                var html = template(context);
                $('.lista').append(html);
            }
        },
        error: function() {
            alert('errore');
        }
    })
};

//chiamata Post
function postData(testo) {
    $.ajax({
        url: 'http://157.230.17.132:3005/todos',
        method: 'POST',
        data: {
            text: testo,
        },
        success: function(resp) {
            getData();
        },
        error: function() {
            alert('errore');
        }
    })
};
//chiamata put/patch

//chiamta delete
