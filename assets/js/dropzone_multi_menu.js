$(document).ready(function() {
 var url = $("input[name='BASE_URL']").val();
 var idImage = $('#my-dropzone-menu #imagemenu').attr('value');
 Dropzone.autoDiscover = false;
 var myDropzone = new Dropzone("#my-dropzone-menu", {
   url: url+'ci-admin/menu/upload/'+idImage,
   addRemoveLinks: true,
   autoProcessQueue: true,
   autoDiscover: false,
   uploadMultiple: true,
   maxFiles: 1,
   acceptedFiles: ".jpeg,.jpg,.png,.gif",
   removedfile: function(file) {
     var name = file.name;
     console.log(name);
     $.ajax({
       type: "post",
       url: url+'ci-admin/menu/remove',
       cache:false,
       dataType: 'html',
       data: {file: name ,'id':idImage},
     });

        // remove the thumbnail
        var previewElement;
        return (previewElement = file.previewElement) != null ? (previewElement.parentNode.removeChild(file.previewElement)) : (void 0);
      },

      init: function() {
        var me = this;
        this.on("success", function(file, response){
            location.reload();
        });

        $.get(url+'ci-admin/menu/list_files/'+idImage, function(data) {
          // if any files already in server show all here
          if (data.length > 0) {
            $.each(data, function(key, value) {
              var mockFile = value;
              me.emit("addedfile", mockFile);
              me.emit("thumbnail", mockFile, url+'uploads/menu/' + value.name);
              me.emit("complete", mockFile);
            });
          }
        });
      }

    });
});