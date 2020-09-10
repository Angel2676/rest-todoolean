// Creare una ToDoList per utilizza API
// per fre operaioni CRUD

$(document).ready(function(){
    getData();

    $(document).on("click",".delete",function(){
        var elemento = $(this);
        var idToDo = elemento.parent().attr('data-id');
        deletElement(idToDo);

    });
    $("#inserisci").click(function(){
        var newElement = $("#nuova-voce").val();
        createElement(newElement);
    });

    $(document).on("click",".testo",function(){
        var idNewE= $(this);
        $('.testo').removeClass('hidden');
        idNewE.addClass('hidden');

        $('.testo').next().addClass('hidden');
        idNewE.next().removeClass('hidden');
        });

    $(document).on("keydown",".change-voice",function(){
        var idNewsElement = $(this).parent().attr('data-id');
            if (event.which== 13|| event.keyCode ==13) {
                var newsElement = $(this).val();
                updateElement(idNewsElement,newsElement);
            };
        });

}); // fine document

// ***********FUNZIONI**************
// -2 funzione update elemento
function updateElement(id, valore){
    $.ajax(
        {
            url: "http://157.230.17.132:3017/todos/"+id,
            method: 'PUT',
            data: {
                text: valore
            },
            success:function(risposta){
                $(".todos").html(" ");
                getData();
            },
            error: function(){
                alert("ERRORE")
            }
    })
}

// -1 funzione creare un elemento

function createElement(elemento){
    $.ajax(
        {
            url: "http://157.230.17.132:3017/todos",
            method: "POST",
            data: {
                    text: elemento
            },
            success: function(risposta){

                $(".todos").html(" ");
                getData();



            },
            error: function(){
                alert("Errore")
            }
    })
}


// 0 funzione - cancellare al click della X
function deletElement(id){
    $.ajax(
        {
            url:"http://157.230.17.132:3017/todos/"+id,
            method: "DELETE",
            success: function(risposta){

                $(".todos").html(" ");
                getData();

            },
            error: function(){
                alert("ERRORE");
            }
    });
}


// 1 funzione - chiammata Ajax

function getData(){
    $.ajax(
        {
            url:"http://157.230.17.132:3017/todos",
            method: 'GET',
            success: function(risposta){
                getElement(risposta)
            },
            error: function(){
                alert("Errore");
            }
    });

}; // fine funzione 1

// 2 funzione - generazione success
function getElement(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
        // var context = risposta[i];
        var context =
                    {
                        text: data[i].text,
                        id: data[i].id

        }
        var html = template(context);
        $(".todos").append(html);
    }
    // console.log(risposta);  // E' un array quindi bisogna ciclare
}; // fine funzione 2
