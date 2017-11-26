<header class="entry-header">
   <div class="container">
      <h1 class="entry-title">Thông tin khách hàng</h1>
   </div>
</header>
<div class="page-content">
   <div class="container">
      <div class="breadcrumbs"><a href="<?php base_url() ?>">Home</a><span class="separator">&gt;</span><span> Checkout</span>
      </div>
      <article id="post-21" class="post-21 page type-page status-publish hentry">
         <div class="entry-content">
            <div class="vc_row wpb_row vc_row-fluid">
               <div class="row-container">
                  <div class="wpb_column vc_column_container vc_col-sm-12">
                     <div class="wpb_wrapper">
                        <div class="wpb_text_column wpb_content_element ">
                           <div class="wpb_wrapper">
                              <div class="woocommerce">
                                 <div class="checkout-login">
                                    <form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php base_url('ordercart') ?>">
                                       <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
                                       <div class="row">
                                          <div class="col-xs-12 col-md-12">
                                             <div id="customer_details">
                                                <div class="woocommerce-billing-fields">
                                                   <h3>Thông tin khách hàng</h3>
                                                   <div class="form-row form-row form-row-wide"">
                                                      <label for="billing_first_name" class="">Tên khách hàng <abbr class="required" title="required">*</abbr>
                                                      </label>
                                                      <input type="text" class="input-text " name="name" id="name" placeholder="Tên khách hàng" value="" required>
                                                   </div>

                                                   <div class="clear"></div>

                                                   <div class="form-row form-row form-row-first">
                                                      <label for="billing_email" class="">Email <abbr class="required" title="required">*</abbr>
                                                      </label>
                                                      <input type="email" class="input-text " name="email" id="billing_email" placeholder="Email" value="" aria-describedby="emailHelp" required>
                                                   </div>

                                                  <div class="form-row form-row form-row-last">
                                                      <label for="billing_phone" class="">Số điện thoại <abbr class="required" title="required">*</abbr>
                                                      </label>
                                                      <input type="number" class="input-text " name="sdt" id="billing_phone" placeholder="Số điện thoại" required maxlength="11" value="">
                                                   </div>

                                                   <div class="clear"></div>

                                                      <div class="form-row form-row form-row-wide">
                                                         <label for="billing_address_1" class="">Địa chỉ giao hàng <abbr class="required" title="required">*</abbr>
                                                         </label>
                                                         <input type="text" class="input-text " name="address" id="billing_address_1" required placeholder="Địa chỉ giao hàng" value="">
                                                      </div>

                                                   </div>

                                                   <div class="woocommerce-shipping-fields">
                                                         <p class="form-row form-row notes woocommerce-validated" id="order_comments_field">
                                                            <label for="order_comments" class="">Ghi chú</label>
                                                            <textarea name="meno" class="input-text " id="order_comments" placeholder="Ghi chú về đơn hàng của bạn, ví dụ: ghi chú đặc biệt để giao hàng." rows="2" cols="5"></textarea>
                                                         </p>
                                                      </div>
                                                   </div>
                                                   <button style="float:right;margin:0 1%" type="submit" name="submitOrderCart" class="btn btn-success">Đặt hàng</button>
                                                   <a href="<?php echo base_url('cart/destroy'); ?>">
                                                      <button style="" type="button" name="submitBackCart" class="btn btn-warning">Hủy đặt hàng</button>
                                                   </a>
                                                   <a href="<?php echo base_url('cart')?>">
                                                       <button style="float:right;" type="button" name="submitDeleteOrder" class="btn btn-info">Quay lại Giỏ Hàng</button>
                                                   </a>

                                                </div>
                                             </form>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <footer class="entry-meta"> </footer>
                  </article>
                  <div id="comments" class="comments-area"></div>
               </div>
            </div>