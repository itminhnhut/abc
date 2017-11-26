<div class="category_header">
    <div class="category_header_inner">
        <div class="container">
            <?php
                foreach($menu as $key => $value):
            ?>
            <h1><?php echo $value['name'] ?></h1>
            <?php if(count($value['sub']) >=1): ?>
            <ul>
                <?php foreach($value['sub'] as $key1 => $value1): ?>
                    <li><a href="<?php echo base_url().$value1['slug'].'-'.$value1['id'] ?>"><?php  echo $value1['name']; ?></a></li>
                <?php endforeach; ?>
            </ul>
            <?php endif; ?>
            <?php endforeach; ?>

            <p class="category-image-desc"><img src="<?=base_url()?>assets/img/anh/category.jpg" alt="" />
            </p>
        </div>
    </div>
</div>
<div class="shop_content">
    <div class="container">
        <nav class="woocommerce-breadcrumb">
            <a href="<?php echo base_url(); ?>">Home</a>
             <?php
                foreach($menu as $key => $value):
            ?>
                <span class="separator">|</span><a href="<?php echo base_url().$value['slug'].'-'.$value['id'] ?>"><?php echo $value['name'] ?></a>
            <?php endforeach; ?>
        </nav>
        <div class="row">
            <div id="secondary" class="col-xs-12 col-md-3 sidebar-category">
                <aside id="text-1" class="widget widget_text">
                    <h3 class="widget-title"><span>Shop By</span></h3>
                    <div class="textwidget"></div>
                </aside>

                <aside id="woocommerce_product_categories-1" class="widget woocommerce widget_product_categories">
                    <h3 class="widget-title"><span>Categories</span></h3>
                    <div class="widget_content">
                        <ul class="product-categories">
                            <?php
                                foreach($categories as $key => $value):
                             ?>
                            <li class="cat-item "><a href="<?php echo base_url().$value['slug'].'-'.$value['id'] ?>" ><?php echo $value['name'] ?></a>
                                <?php if(count($value['sub']) >=1): ?>
                                <ul class='children'>
                                    <?php foreach($value['sub'] as $key1 => $value1): ?>
                                        <li class="">
                                            <a href="<?php echo base_url().$value1['slug'].'-'.$value1['id'] ?>" ><?php echo $value1['name']?></a>

                                            <?php if(count($value1['sub']) >=1): ?>
                                                <ul class='children'>
                                                    <?php foreach($value1['sub'] as $key2 => $value2): ?>
                                                        <li class="">
                                                            <a href="<?php echo base_url().$value2['slug'].'-'.$value2['id'] ?>" ><?php echo $value2['name']?></a>
                                                        </li>
                                                    <?php endforeach; ?>
                                                </ul>
                                            <?php endif; ?>

                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                                 <?php endif; ?>
                            </li>
                            <?php endforeach; ?>
                            </li>
                        </ul>
                    </div>
                </aside>

                <aside id="woocommerce_price_filter-1" class="widget woocommerce widget_price_filter">
                    <h3 class="widget-title"><span>Filter By Price</span></h3>
                    <div class="widget_content search_price">
                        <!--http://demo.roadthemes.com/maroko/product-category/men/ -->
                        <form id="formfilter" method="get" action="<?php echo base_url($slug.'-'.$id.'/')?>">
                            <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
                            <div class="price_slider_wrapper">
                                <div class="price_slider" style="display:none;"></div>
                                <div class="price_slider_amount">
                                    <input type="text" id="min_price" name="min_price" value="" data-min="0" placeholder="Min price" />
                                    <input type="text" id="max_price" name="max_price" value="" data-max="<?php echo $max ?>" placeholder="Max price" />
                                    <button type="submit" class="button">Lọc</button>
                                    <div class="price_label" style="display:none;"> Giá : <span class="from"></span> &mdash; <span class="to"></span>
                                    </div>
                                      <div class="clearfix"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </aside>
                <aside id="yith-woocompare-widget-1" class="widget yith-woocompare-widget"></aside>
                <aside id="yith-woocompare-widget-1" class="widget yith-woocompare-widget">
                    <h3 class="widget-title"><span>Tags</span></h3>
                    <div class="widget_content">
                        <div class="tagcloud">
                            <?php
                                foreach($tags as $key => $value):
                                   if($value['tags'] !='')
                                   {
                                       $rs_tags[] = $value['tags'];
                                       $rs_tag[] = array(
                                                   'id'    =>    $value['slug'].'-'.$value['id'],
                                                   'tags'  =>    $value['tags']
                                               );
                                       foreach($rs_tag as $key1 =>$value1):
                                            $rs_implode[$value1['id']] =  explode(",",$value1['tags']);
                                       endforeach;
                                   }
                                   else
                                   {
                                      $rs_implode    =    array();
                                   }
                                endforeach;

                                $i = 0;
                                foreach($rs_implode as $key2 =>$value2):
                                   foreach($value2 as $key3 =>$value3):
                                       $i++;
                                       if($i <= 3):
                            ?>
                                <a href="<?php echo $key2 ?>" class="tag-link-24" title="4 topics" style="font-size: 17.3333333333pt;"><?php echo $value3; ?></a>
                            <?php endif; ?>
                            <?php endforeach; ?>
                            <?php endforeach; ?>

                         </div>
                    </div>
                </aside>

            </div>
            <div id="archive-product" class="col-xs-12 col-md-9">
                <div class="archive-border shop-sidebar left-sidebar">
                    <div class="row"></div>
                    <div class="toolbar">
                        <div class="view-mode"> <a href="#" class="grid  active" title="Grid"><i class="fa fa-th-large"></i></a> <a href="#" class="list " title="List"><i class="fa fa-th-list"></i></a>
                        </div>
                        <p class="woocommerce-result-count"> Hiển thị 1&ndash;<?php echo $per_page ?> của <?php echo $total ?> kết quả</p>
                        <div class="clearfix"></div>
                    </div>

                    <div id="tl">



                    <div class="shop-products row grid-view">
                    <!-- `id`, `name`, `slug`, `idParent`, `idSubChild`, `idChild`, `des`, `content`, `keyword`, `description`, `price`, `salePrice`, `create_date`, `status`-->
                    <?php
                        if(!empty($data) ):
                        foreach($data as $key =>$value) :?>
                        <div class=" item-col col-xs-12 col-sm-4">
                            <div class="product-wrapper">
                                <div class="list-col4 ">
                                    <div class="product-image">
                                        <a href="index-63.htm"  title="Auctor gravida enim">
                                                <img width="480" height="635" src="<?php echo base_url($value['url_image'])?>"  class="primary_image wp-post-image" alt="1" />
                                               <!--  <img width="480" height="635" src="assets/img/anh/4-480x635.jpg"  class="secondary_image" alt="4" /> -->
                                        </a>
                                        <div class="price-box">

                                             <?php if($value['salePrice'] > 0){  ?>
                                                 <span class="special-price">
                                                     <span class="amount"><?php echo number_format($value['salePrice']) ?></span>
                                                 </span>
                                                 <span class="old-price">
                                                     <span class="amount"></span><?php echo number_format($value['price']) ?>
                                                 </span>
                                             <?php }else{ ?>
                                                 <span class="special-price">
                                                     <span class="amount"><?php echo number_format($value['price']) ?></span>
                                                 </span>
                                             <?php } ?>


                                        </div>
                                        <div class="actions">
                                            <div class="action-buttons">
                                                <div class="add-to-cart">
                                                    <p class="product woocommerce add_to_cart_inline " style="border:4px solid #ccc; padding: 12px;">
                                                           <a data-product_saleprice=<?php echo $value['salePrice'] ?> data-product_href="<?php echo $value['slug'].'-'.$value['id']; ?>"  data-product_image="<?php echo $value['url_image'] ?>" data-product_id="<?php echo $value['id'] ?>" data-product_name="<?php echo $value['name'] ?>" data-product_price="<?php echo $value['price'] ?>" data-quantity="1" class="button add_to_cart_button product_type_simple">Add to cart</a>
                                                    </p>
                                                </div>
                                                <div class="add-to-links">
                                                    <div class="quickviewbtn"><a class="detail-link quickview" data-quick-id="319" href="index-60.htm"  title="Xem trang chi tiết">Xem</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-col8 ">
                                    <div class="gridview">
                                        <h2 class="product-name"> <a href="index-63.htm"><?php echo $value['name']?></a></h2>
                                    </div>
                                    <div class="listview">
                                        <h2 class="product-name"> <a href="index-63.htm" ><?php echo $value['name']?></a></h2>
                                        <div class="price-rate">

                                            <div class="price-box">
                                                <?php if($value['salePrice'] > 0){  ?>
                                                 <span class="special-price">
                                                     <span class="amount"><?php echo number_format($value['salePrice']) ?></span>
                                                 </span>
                                                 <span class="old-price">
                                                     <span class="amount"></span><?php echo number_format($value['price']) ?>
                                                 </span>
                                             <?php }else{ ?>
                                                 <span class="special-price">
                                                     <span class="amount"><?php echo number_format($value['price']) ?></span>
                                                 </span>
                                             <?php } ?>

                                            </div>
                                        </div>
                                        <div class="product-desc">
                                            <p><?php echo $value['des'] ?></p>
                                        </div>
                                        <div class="actions">
                                            <div class="action-buttons">
                                                <div class="add-to-cart">
                                                    <p class="product woocommerce add_to_cart_inline " style="border:4px solid #ccc; padding: 12px;">
                                                        <?php if($value['salePrice'] > 0){  ?>
                                                        <span class="special-price">
                                                            <span class="amount"><?php echo number_format($value['salePrice']) ?></span>
                                                        </span>
                                                        <span class="old-price">
                                                            <span class="amount"></span><?php echo number_format($value['price']) ?>
                                                        </span>
                                                        <?php }else{ ?>
                                                        <span class="special-price">
                                                            <span class="amount"><?php echo number_format($value['price']) ?></span>
                                                        </span>
                                                        <?php } ?>
                                                        <a data-product_saleprice=<?php echo $value['salePrice'] ?> data-product_href="<?php echo $value['slug'].'-'.$value['id']; ?>" data-product_image="<?php echo $value['url_image'] ?>" data-product_id="<?php echo $value['id'] ?>" data-product_name="<?php echo $value['name'] ?>" data-product_price="<?php echo $value['price'] ?>" data-quantity="1" class="button add_to_cart_button product_type_simple">Add to cart</a>
                                                    </p>
                                                </div>
                                                <div class="add-to-links">
                                                    <div class="quickviewbtn"><a class="detail-link quickview" data-quick-id="319" href="index-60.htm" tppabs="" title="Xem chi tiết">Xem</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                    <?php else: ?>
                        <div>Chưa có sản phẩm nào</div>
                    <?php endif; ?>
                    </div>


                    <div class="toolbar tb-bottom">
                        <nav class="woocommerce-pagination">
                           <?php echo $pagination; ?>
                        </nav>
                        <div class="clearfix"></div>
                    </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="inner-brands">
    <div class="container">
        <div class="brands-carousel slide-logo">
            <div>
                <a href="#" title="Brand-logo1"><img src="<?=base_url()?>assets/img/anh/brand_logo5.png" tppabs="http://demo.roadthemes.com/maroko/wp-content/uploads/2015/06/brand_logo5.png" alt="Brand-logo1" />
                </a>
            </div>
            <div>
                <a href="#" title="Brand-logo2"><img src="<?=base_url()?>assets/img/anh/brand_logo4.png" tppabs="http://demo.roadthemes.com/maroko/wp-content/uploads/2015/06/brand_logo4.png" alt="Brand-logo2" />
                </a>
            </div>
            <div>
                <a href="#" title="Brand-logo3"><img src="<?=base_url()?>assets/img/anh/brand_logo3.png" tppabs="http://demo.roadthemes.com/maroko/wp-content/uploads/2015/06/brand_logo3.png" alt="Brand-logo3" />
                </a>
            </div>
            <div>
                <a href="#" title="Brand-logo4"><img src="<?=base_url()?>assets/img/anh/brand_logo2.png" tppabs="http://demo.roadthemes.com/maroko/wp-content/uploads/2015/06/brand_logo2.png" alt="Brand-logo4" />
                </a>
            </div>
            <div>
                <a href="#" title="Brand-logo5"><img src="<?=base_url()?>assets/img/anh/brand_logo1.png" tppabs="http://demo.roadthemes.com/maroko/wp-content/uploads/2015/06/brand_logo1.png" alt="Brand-logo5" />
                </a>
            </div>
            <div>
                <a href="#" title="Brand-logo6"><img src="<?=base_url()?>assets/img/anh/brand_logo3.png" tppabs="http://demo.roadthemes.com/maroko/wp-content/uploads/2015/06/brand_logo3.png" alt="Brand-logo6" />
                </a>
            </div>
        </div>
    </div>
</div>