$(document).ready(function(){
   var url = $("input[name='BASE_URL']").val();
   var idloai = $('#idParent option:selected').val();

   $('#idParent').change(function(){
        var idloai = $('#idParent option:selected').val();
        ajax(idloai,0);

    });

   function ajax(idloai,idsub){
      $.ajax({
          url: url+'ci-admin/product/ajax-menu-product',
          type: "post",
          data : {'idloai':idloai,'idsub':idsub},
          success: function (data) {
            $('#menu-ajax').html(data);
            $('#idSubChild').change(function(){
              var idSubChild = $('#idSubChild option:selected').val();
                $.ajax({
                  url: url+'ci-admin/product/ajax-menu-product',
                  type: "post",
                  data : {'idloai':0,'idsub':idSubChild},
                  success: function (data) {
                    $('#idChild').html(data);
                  }
                });
            });
          }
        });
   }
   ajax(idloai,0);

});