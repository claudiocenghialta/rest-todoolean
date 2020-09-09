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
    $('.lista').on('click', '.delete', function() {
        var elemento = $(this);
        var idElemento = elemento.parent().attr('data-id')
        deleteData(idElemento)
    })
    $('.lista').on('click', '.modify', function() {
        // individuo elemento padre
        var elementoPadre = $(this).parent();
        // prendo il testo della voce e lo inserisco nella input per la modifica
        var testoOld = elementoPadre.find('.testoVoce').html()
        elementoPadre.find('.nuovoTesto').val(testoOld)
        // nascondo testo, modifica e cancella e mostro input, conferma e annulla
        elementoPadre.children().toggleClass('hidden')
    })
    //conferma le modifiche al click su apposito bottone
    $('.lista').on('click', '.conferma', function() {
        confermaModificaVoce($(this));
    })
    // conferma modifiche alla pressione di invio su input
    $('.lista').on('keyup', '.nuovoTesto', function() {
        if (event.which == 13 || event.keycode == 13) {
            confermaModificaVoce($(this));
        }
    })
    //annulla le modifiche al click su apposito bottone
    $('.lista').on('click', '.annulla', function() {
        annullaModifiche($(this))
    })
    // annulla modifiche alla pressione di Esc su input
    $('.lista').on('keyup', '.nuovoTesto', function() {
        if (event.which == 27 || event.keycode == 27) {
            annullaModifiche($(this));
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
function putData(id, testo) {
    $.ajax({
        url: 'http://157.230.17.132:3005/todos/' + id,
        method: 'PUT',
        data: {
            text: testo
        },
        success: function(resp) {
            getData();
        },
        error: function() {
            alert('errore');
        }
    });
};

//chiamta delete
function deleteData(id) {
    $.ajax({
        url: 'http://157.230.17.132:3005/todos/' + id,
        method: 'DELETE',
        success: function(resp) {
            getData();
        },
        error: function() {
            alert('errore');
        }
    });
};

function confermaModificaVoce(elementoPassato) {
    // individuo elemento padre
    var elementoPadre = elementoPassato.parent();
    // ricavo l'id da mandare per la chiamata ajax
    var idElemento = elementoPadre.attr('data-id')
    // ricavo il nuovo testo da mandare per la chiamata ajax
    var testoNew = elementoPadre.find('.nuovoTesto').val()
    // faccio chiamata ajax per modifica passando id e nuovo testo
    putData(idElemento, testoNew)
    // nascondo input, conferma e annulla e mostro testo, modifica e cancella
    elementoPadre.children().toggleClass('hidden')
};

function annullaModifiche(elementoPassato){
    // individuo elemento padre
    var elementoPadre = elementoPassato.parent();
    // nascondo input, conferma e annulla e mostro testo, modifica e cancella
    elementoPadre.children().toggleClass('hidden')
    //il valore della input non viene resettato ora ma nel momento in cui si cliccherà nuovamente su modifica verrà sovrascritto
};
