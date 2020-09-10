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

    $(document).on("click","#change",function(){
        $(this).addClass("hidden").attr("data-id");
        var source = $("#delete-template").html();
        var template = Handlebars.compile(source);
        var context = $("#change-voice").attr("data-id3");
        var html = template(context);
        $(".todos").append(html);
        });
        $(document).on("dblclick","#change-voice",function(){
            var newsElement = $(this).val();
            console.log(newsElement);
            $.ajax(
                {
                    url: "http://157.230.17.132:3017/todos/"+ data-id,
                    method: "PUT",
                    data: {
                        fonte: newsElement,
                    },
                    success: function(risposta){
                        console.log(risposta);
                        $(".todos").html(" ");
                        getData();
                    },
                    error: function(){
                        alert("ERRORE")
                    }

            })

        });








}); // fine document

// ***********FUNZIONI**************


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
                console.log(risposta);
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
