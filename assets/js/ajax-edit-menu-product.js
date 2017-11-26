$(document).ready(function(){
   var url = $("input[name='BASE_URL']").val();
   var idParent,idSubChild,idChild;

   idParent = $('#idParent').val();
   idSubChild = $('#idSubChild').val();
   idChild = $('#idChild').val();

   $.ajax({
      url: url+'ci-admin/product/ajax-edit-menu-product',
      type: "post",
      data : {'change':0,'idloai':idParent,'idsub':idSubChild,'idchild':idChild},
      success: function (data) {
         $('#menu-edit-ajax').html(data);
         $('#menu-edit-ajax #idParent').change(function(){
            var idParent = $('#menu-edit-ajax #idParent option:selected').val();
            $.ajax({
               url: url+'ci-admin/product/ajax-edit-menu-product',
               type: "post",
               data : {'change':1,'idloai':idParent,'idsub':0,'idchild':0},
               success: function (data) {
                  $('#menu2-edit-ajax').html(data);
                  $('#menu2-edit-ajax #idSubChild').change(function(){
                      var idSubChild = $('#menu2-edit-ajax #idSubChild option:selected').val();
                         $.ajax({
                              url: url+'ci-admin/product/ajax-edit-menu-product',
                              type: "post",
                              data : {'change':1,'idloai':0,'idsub':idSubChild,'idchild':0},
                               success: function (data) {
                                   $('#menu2-edit-ajax #idChild').html(data);
                               }
                         });
                  });
               }
            });
         });
         $('#menu-edit-ajax #idSubChild').change(function(){
             var idSubChild = $('#menu-edit-ajax #idSubChild option:selected').val();
              $.ajax({
               url: url+'ci-admin/product/ajax-edit-menu-product',
               type: "post",
               data : {'change':1,'idloai':0,'idsub':idSubChild,'idchild':0},
               success : function(data){
                  $('#menu2-edit-ajax #idChild').html(data);
               }
            });
         });

      }
   });

});