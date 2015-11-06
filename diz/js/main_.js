$(function(){  // старт скрипта после загрузки страницы

  //   alert('jQuery подключен. Версия '+  jQuery.fn.jquery);    fun
  // alert($("#java-pagetype").val()+' '+$("#java-pageid").val());

   
/* $.ajax({
  url: "/inc/ajax/main-menu.php",
  dataType: 'json',
  async: false,
  data: '',
  success: function(json){
  // получаем данные 
  $("#main-menu-ajax").append(json.data);        
  }});
 
*/
/*
$("a").each(function(index,element){
  var send = new Object();  
  send.url = $(element).attr('href');      
 
  $.ajax({
    url: "/inc/ajax/check-link.php",
    dataType: 'json',
    async: false,
    data: send,
    success: function(json){
    // получаем данные 
       if (json.data != "200"){
       $(element).css('color','#FF0000'); 
       $(element).attr('title',json.id);   
       }        
            }
  });   
});     
*/   
        
/*  var send = new Object();  
  send.url = location.href;          
 $.ajax({
  url: "/inc/ajax/rightbox.php",
  dataType: 'json',
  type: 'GET',
  async: true,
  data: send,
  success: function(json){
  // получаем данные 
   $("#block-faq10").html(json.faq);      
   $("#block-top10").html(json.top);      
  }});*/
 
         
        

// количество просмотров
function showAJAXVcount(type,id,mode){

    var data = new Object();
    data.pagetype = type;
    data.pageid = id;

  $.ajax({
    url: '/inc/ajax/get_vcount.php',
    type: 'GET',
    data: data,
    dataType: 'json',
    async: false,
    success: function(json) {
      if (mode == 0) {  
        $("#v-count").text(json.data);
      }
      data.r = json.data;
    }

  });
  return data.r;
}


  


$(".item-seria-box").each(function(i){
   var id = $(this).find(".java-pageid").val();
   var type = $(this).find(".java-pagetype").val();
 $(this).find(".v-count").text(showAJAXVcount(type,id,1));   
});     
             

showAJAXVcount($("#java-pagetype").val(),$("#java-pageid").val(),0); 


             
/* // Обёртываем картинки 
 $("#razdel-text1 img").wrap('<div class="img-wrap"><div class="img-title"></div></div>');           
 $("#razdel-text1 div>div.img-title").each(function(i){
  var  elDiv = $(this);
  var  elDiv2 = $(this).parent();
  var  elImg = $(this).find('img');
  var  f = elImg.css('float');
//  var  pl = elImg.css('padding-left');
//  var  pr = elImg.css('padding-right');
//  var  pt = elImg.css('padding-top');
//  var  pb = elImg.css('padding-bottom');
//   elImg.css('padding','0');
 var  w = elImg.width();
 var  t = elImg.attr('title');
      

   elImg.css('float','none'); 
   elDiv2.css('float',f);             
//   elDiv2.css('padding-left',pl);             
//   elDiv2.css('padding-right',pr);             
//   elDiv2.css('padding-top',pt);             
//   elDiv2.css('padding-bottom',pb);             
   elDiv.width(w);             
   elDiv.append('<div>' + t + '</div>'); 
 });

*/
javaEditable = $("#java-editable").val();
//alert(javaEditable); 
if ( javaEditable == "no") { 
 
$("#razdel-text1 img").each(function(i){
    $(this).wrap('<div class="screenshort"><a href=""></a></div>');
});

$("#razdel-text2 img").each(function(i){
    $(this).wrap('<div class="screenshort"><a href=""></a></div>');
});


$(".screenshort").each(function(i){
  var img = $(this).find('img');
  var a = $(this).find('a');
  var ut = $(this).find('.img-under-text');
 // !!??!! заменить /content/pictures/normal/ на /content/pictures/original/
  var img_src = +img.attr('src'); 
  var reg = new RegExp('^/content/pictures/normal/');
  var img_src_original = img_src.replace(reg,"/content/pictures/original/");
  a.attr('href',img_src_original);  
 });

 $(".screenshort a").lightBox();

} else {
  $("#razdel-text1 img, #razdel-text2 img").css('cursor','pointer');
     
}



// Комментарии


$("#comm-form").submit(function(event){
  event.preventDefault();
});



function checkmail(value) {
var reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
if (value == '') {return true;}
if (!value.match(reg)) {alert("Пожалуйста, введите свой настоящий e-mail"); 
document.getElementById('email').value=""; return false; }
}

function checkName(value){
   if (value == '') {
       alert('Введите ваше имя.');
       return false;} 
}

function checkMess(value){
   if (value == '') {
       alert('А где текст сообщения?');
       return false;} 
}


function checkComment() {
    
    var data = new Object();
    data.name = $("#com-name").val();
    data.name =  data.name.trim();
    data.email = $("#com-mail").val();
    data.message = $("#com-message").val();
    data.message =  data.message.trim();
   
      if ((checkmail(data.email) != false)  ){
      if ((checkName(data.name) != false) ){
      if ((checkMess(data.message) != false) ){
        return true;
      }}}
      return false;  
}





function addComment() {

    var data = new Object();
    data.pagetype = $("#java-pagetype-comm").val();
    data.pageid = $("#java-pageid").val();
    data.name = $("#com-name").val();
    data.name =  data.name.trim();
    data.email = $("#com-mail").val();
    data.message = $("#com-message").val();
    data.message =  data.message.trim();
  
  $.ajax({
    url: '/inc/ajax/add_comment.php',
    type: 'GET',
    data: data,
    dataType: 'json',
    async: false,
    success: function(json) {

    if (json.error == true  ){ 
      $("#comments").append(json.data);  
      $("#com-name").val('');
      $("#com-mail").val('');
      $("#com-message").val('');
      $("#keystring").val('');
    //  
      $("#img-captcha").attr('src','');
      $("#img-captcha").attr('src',"/lib/kcaptcha/index.php?<?php echo session_name()?>=<?php echo session_id()?>");
      
       
    } else { 
        alert(json.error); }
    }
  });

}



$("#com-submit").click(function(){

alert('sadasd');    
    
if (checkComment() == true) {


   var data = new Object();
   data.keystring = $("#keystring").val();
   data.captcha = 'check';
     $.ajax({
    url: location.href,
    type: 'POST',
    data: data,
    dataType: 'json',
    async: false,
    success: function(json) {
    
        if (json.error == false  ){ 
          
        alert('Неправильный код!');
        return false;
      } 
    }
  });
    
}    

addComment();    
 

    return false;
});


$("#refresh-captcha").click(function(){
      $("#img-captcha").attr('src','');
      $("#img-captcha").attr('src',"/lib/kcaptcha/index.php?<?php echo session_name()?>=<?php echo session_id()?>");
    
    
});






});