$(document).ready(function(){
   var url = $("input[name='BASE_URL']").val();
    CKEDITOR.replace( 'content',
      {
         filebrowserBrowseUrl : url+'ckfinder/ckfinder.html',
         filebrowserImageBrowseUrl : url+'ckfinder/ckfinder.html?type=Images',
         filebrowserFlashBrowseUrl : url+'ckfinder/ckfinder.html?type=Flash',
         filebrowserUploadUrl : url+'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
         filebrowserImageUploadUrl : url+'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
         filebrowserFlashUploadUrl : url+'ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
      });

    CKEDITOR.replace( 'des', {
           toolbar: [
               [ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink' ],
               [ 'FontSize', 'TextColor', 'BGColor' ]
           ]
       });
});