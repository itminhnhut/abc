<?php
function MenuCart($infoCart) {
   $total = count($infoCart);
   $html = '';
   $html .= '<div class="widget_shopping_cart_content">';
   $html .= '<div class="cart-toggler">';
   $html .= '<a href="'.base_url('cart').'">';
   $html .= '<span class="mini-cart-link">';
   $html .= '<i class="fa fa-shopping-cart"></i>';
   $html .= '</span>';
   $html .= '<span class="cart-quantity">' . $total . '</span>';
   $html .= '</a>';
   $html .= '</div>';

   $html .= '<div class="mini_cart_content" style="height: 0px;">';
   $html .= '<div class="mini_cart_inner">';
   $html .= '<div class="mini_cart_arrow"></div>';
   if ($total == 0) {
      $html .= '<li>Bạn có 0 sản phầm trong giỏ hàng</li>';
      $html .= '<li class="total">Tổng Tiền : <span class="amount"> 0 VNĐ</span></li>';
   } else {
      $totalPrice = 0;
      $html .= '<ul class="cart_list product_list_widget ">';
      $html .= '<li>Bạn có ' . $total . ' sản phầm trong giỏ hàng</li>';
      foreach ($infoCart as $key => $value) {

         $totalPrice += $value['price'] * $value['qty'];

         $html .= '<li id="mcitem-' . $value['rowid'] . '">';
         $html .= '<a class="product-image">';
         $html .= '<img src="' . base_url($value['img']) . '">';
         $html .= '<span class="quantity">' . $value['qty'] . '</span>';
         $html .= '<a>';
         $html .= '<div class="product-details">';
         $html .= '<a class="remove" data-product_rowid="' . $value['rowid'] . '" >';
         $html .= '<i class="fa fa-times-circle"></i>';
         $html .= '</a>';
         $html .= '<a class="product-name" href="'.base_url($value['href']).'" >';
         $html .= '<span>' . $value['name'] . '</span>';
         $html .= '</a>';
         $html .= '<span class="quantity">';
         $html .= '<span class="amount">' . number_format($value['price']) .' VNĐ'. '</span>';
         $html .= '</span>';
         $html .= '</div>';
         $html .= '</li>';
      }
      $html .= '</ul>';
      $html .= '<p class="total">';
      $html .= 'Tổng Tiền : <span class="amount">' . number_format($totalPrice) . ' VNĐ </span>';
      $html .= '</p>';
      $html .= '<p class="buttons">';
      $html .= '<a href="'.base_url('cart').'" class="button checkout wc-forward" >Xem giỏ hàng</a>';
      $html .= '</p>';
   }

   $html .= '</div>';
   //$html .= '<div class="loading"></div>';
   $html .= '</div>';
   $html .= '</div>';
   echo $html;
}
function PopupCart($name, $price, $img ,$href) {
   $html = '';
   $html .= '<div class="atc-notice-wrapper">';
   $html .= '<div class="atc-notice">';
   $html .= '<h3>sản phầm thêm vào giỏ hàng</h3>';
   $html .= '<div class="product-wrapper">';
   $html .= '<div class="product-image">';
   $html .= '<img width="115" height="148" src="' . base_url($img) . '" class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt="" sizes="(max-width: 115px) 100vw, 115px">';
   $html .= '</div>';
   $html .= '<div class="product-info">';
   $html .= '<h4>' . $name . '</h4>';
   $html .= '<p class="price"><span class="special-price"><span class="amount">' . number_format($price) . ' VNĐ</span></span></p>';
   $html .= '</div>';
   $html .= '</div>';

   $html .= '<div class="buttons">';
   $html .= '<a class="button" href="'.base_url('cart').'">Xem giỏ hàng</a>';
   $html .= '</div>';
   $html .= '</div>';

   $html .= '<div class="close">';
   $html .= '<i class="fa fa-times-circle"></i>';
   $html .= '</div>';
   $html .= '</div>';

   echo $html;
}
function Rowid($infoCart) {
    $total = count($infoCart);
    $rs_total = "Bạn có ".$total." sản phầm trong giỏ hàng";
    $totalPrice = 0;
    foreach ($infoCart as $key => $value) {
         $totalPrice += $value['price'] * $value['qty'];
   }
     echo json_encode(array(
              'tt'         => $total,
              'total'      => $rs_total,
              'totalPrice' => number_format($totalPrice)
           ));
}
?>