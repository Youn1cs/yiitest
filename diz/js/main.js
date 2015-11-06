$(function() {






// Показать данные
function toAjax(id){

        var postData = new Object();
        postData.id = id;
        postData.mode = 'getitems';
        $.ajax({
            type: "POST",
            url: "ajax.php",
            dataType: 'json', async: false, data: postData,
            success: function(json){
                 alert(json.data);
            }
        });
}



$('#btn').click(function(){
    console.log('hello');
    toAjax(1234567890);
  //  debugger;

});



});




