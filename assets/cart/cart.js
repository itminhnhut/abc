$(document).ready(function() {
   var url = $("input[name='BASE_URL']").val();

   $.ajax({
      type: "post",
      url: url+'ajax-cart/beforeadd',
      data: {'id':1},
      success: function(data) {
         $('#cartMenu').html(data);
      }
   });

$('#cartMenu').on("click",".remove", function(e) {
      var rowId = $(this).attr('data-product_rowid');
      console.log(rowId);
      $.ajax({
         type: "post",
         dataType: 'json',
         url: url+'ajax-cart/removeId',
         data: {'rowid':rowId},
         success: function(data) {
           // $('#cartMenu').html(data);
            jQuery('#mcitem-' + rowId).animate({
                'height': '0',
                'margin-bottom': '0',
                'padding-bottom': '0',
                'padding-top': '0'
            });
            setTimeout(function() {
                jQuery('#mcitem-' + rowId).remove();
                jQuery('#lcitem-' + rowId).remove();
                jQuery('#lcitem-' + rowId).remove();
                jQuery('span.cart-quantity').html(data.tt);
                jQuery('.product_list_widget  li:nth-child(1)').html(data.total);
                jQuery('.total span').html(data.totalPrice+' VNĐ');
                var mCartHeight = jQuery('.mini_cart_inner').outerHeight();
                jQuery('.mini_cart_content').animate({
                    'height': mCartHeight
                });
            }, 1200);
         }
      });

  })


   $('.add_to_cart_button').click(function(){
      //data-product_id="620" data-product_name="nhut2"  data-product_price="61000" data-quantity="1"
      var id,quantity,price,name,img,href,salePrice;
      id        = $(this).attr('data-product_id');
      quantity  = $(this).attr('data-quantity');
      price     = $(this).attr('data-product_price');
      name      = $(this).attr('data-product_name');
      img       = $(this).attr('data-product_image');
      href      = $(this).attr('data-product_href');
      salePrice = $(this).attr('data-product_saleprice');

      if(salePrice > 0)
        price = salePrice;

      $.ajax({
         type: "post",
         url: url+'ajax-cart/add',
         data: {'id':id,'quantity':quantity,'price':price,'name':name,'img':img ,'href' : href},
         success: function(data) {
            $('#cartMenu').html(data);
            $.ajax({
               type: "post",
               url: url+'ajax-cart/popcart',
               data: {'price':price,'name':name,'img':img,'href' : href},
               success: function(data) {
                  $('#popupcart').html(data);
                  $('#popupcart .close').click(function(){
                     $('.atc-notice-wrapper').fadeOut();
                     $('.atc-notice').html(' ');
                  });
               }
            });
         }
      });
   });
   $('.cart_item').on('change','.quantity .input-text',function(e){
      var _self = $(this),
      gettr = _self.parents("tr").eq(0),
      rowid = gettr.attr('id'),
      qty   = _self.val();

      var regex = new RegExp("^[(1-9)(\.)]\d*$");
      var regex1 = new RegExp("^(10)\d*$");
      if(regex.test(qty) || regex1.test(qty) )
      {
         var price = $('#'+rowid+ ' .product-price span').attr('data-product_price');

         $('#'+rowid+' .product-subtotal span.amount').html(number_format(qty*price)+' VNĐ');
         $.ajax({
            type: "post",
            dataType: 'json',
            url: url+'cart/addrowId',
            data: {'rowid':rowid ,'qty':qty},
            success: function(data) {
               $('#font_car_total1').html(data.totalPrice+' VNĐ');
            }
         });
      }
      else{
          location.reload();
          alert('Số lượng không được nhỏ hơn 1 và lớn hơn 10');
      }


   });

    $('.cart_item').on('click','.del',function(e){
       var _self = $(this),
          gettr = _self.parents("tr").eq(0),
          rowid = gettr.attr('id');
          $.ajax({
         type: "post",
         dataType: 'json',
         url: url+'ajax-cart/removeId',
         data: {'rowid':rowid},
         success: function(data) {
           $('#font_car_total1').html(data.totalPrice+' VNĐ');
           if(data.tt ==0)
           {
              var delay = 1000;
              setTimeout(function(){ window.location = url; }, delay);
           }
         }
      });
      gettr.remove();

    });

   function number_format (number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
})