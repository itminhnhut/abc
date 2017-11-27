<?php
$this->csrf = array(
	'name' => $this->security->get_csrf_token_name(),
	'hash' => $this->security->get_csrf_hash(),
);
if (!isset($this->session->userdata['id'])):
	$this->load->view('login/login', array('csrf' => $this->csrf));
else:
?>

<!doctype html>
<html lang="en">
<head>
  <title><?php if (isset($title)) {
	echo $title;
} else {
	echo 'Dashboard | Klorofil - Free Bootstrap Dashboard Template';
}
?></title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <!-- VENDOR CSS -->
  <meta name="token" content=""></meta>
  <link rel="stylesheet" href="<?php echo base_url('assets/vendor/bootstrap/css/bootstrap.min.css') ?>">
  <link rel="stylesheet" href="<?php echo base_url('assets/vendor/font-awesome/css/font-awesome.min.css') ?>">
  <link rel="stylesheet" href="<?php echo base_url('assets/vendor/linearicons/style.css') ?>">
  <link rel="stylesheet" href="<?php echo base_url('assets/vendor/chartist/css/chartist-custom.css') ?>">
  <!-- MAIN CSS -->
  <link rel="stylesheet" href="<?php echo base_url('assets/css/main.css') ?>">
  <!-- FOR DEMO PURPOSES ONLY. You should remove this in your project -->
  <link rel="stylesheet" href="<?php echo base_url('assets/css/demo.css') ?>">
  <!-- GOOGLE FONTS -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
  <!-- ICONS -->
  <link rel="apple-touch-icon" sizes="76x76" href="<?php echo base_url('assets/img/apple-icon.png') ?>">
  <link rel="icon" type="image/png" sizes="96x96" href="<?php echo base_url('assets/img/favicon.png') ?>">
  <!-- -->
  <link rel="stylesheet" href="<?php echo base_url('vendor/dropzone/dropzone.min.css'); ?>">

  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/mysite.css') ?>">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/design.css') ?>">
  <link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/jquery.dataTables.min.css') ?>">
</head>

<body>
  <input type="hidden" name="BASE_URL" value="<?php echo base_url(); ?>" >
  <!-- WRAPPER -->
  <div id="wrapper">
    <!-- NAVBAR -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="brand">
        <a href="<?php echo base_url('ci-admin'); ?>"><img src="<?php echo base_url('assets/img/logo-dark.png') ?>" alt="Klorofil Logo" class="img-responsive logo"></a>
      </div>
      <div class="container-fluid">
        <div class="navbar-btn">
          <button type="button" class="btn-toggle-fullwidth"><i class="lnr lnr-arrow-left-circle"></i></button>
        </div>
        <div id="navbar-menu">
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">

              <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="<?php echo base_url('assets/img/user.png') ?>" class="img-circle" alt="Avatar"> <span><?php echo $this->session->userdata['user'] ?></span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
              <ul class="dropdown-menu">
                <li><a href="<?php echo base_url('login/logout') ?>"><i class="lnr lnr-exit"></i> <span>Logout</span></a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- END NAVBAR -->
    <!-- LEFT SIDEBAR -->
    <div id="sidebar-nav" class="sidebar">
      <div class="sidebar-scroll">
        <nav>
          <ul class="nav">
            <li><a href="index.html" class="active"><i class="lnr lnr-home"></i> <span>Dashboard</span></a></li>

            <li>
              <a href="#subPages" data-toggle="collapse" class="collapsed"><i class="lnr lnr-menu"></i> <span>Menu</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
              <div id="subPages" class="collapse ">
                <ul class="nav">
                   <li><a href="<?php echo base_url('ci-admin/menu/create'); ?>" class="">Create</a></li>
                   <li><a href="<?php echo base_url('ci-admin/menu'); ?>" class="">Menu</a></li>
                   <li><a href="<?php echo base_url('ci-admin/menu/order'); ?>" class="">Order</a></li>
                </ul>
              </div>
            </li>

            <li>
              <a href="#subImage" data-toggle="collapse" class="collapsed"><i class="lnr lnr-chart-bars"></i> <span>Image</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
              <div id="subImage" class="collapse ">
                <ul class="nav">
                  <li><a href="<?php echo base_url('ci-admin/image-slider'); ?>" class="">Image Slider</a></li>
                  <li><a href="<?php echo base_url('ci-admin/image-banner'); ?>" class="">Image Baner</a></li>
                  <li><a href="<?php echo base_url('ci-admin/image-footer'); ?>" class="">Image Footer</a></li>
                </ul>
              </div>
            </li>

            <li>
              <a href="#subProduct" data-toggle="collapse" class="collapsed"><i class="fa fa-product-hunt"></i> <span>Product</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
              <div id="subProduct" class="collapse ">
                <ul class="nav">
                  <li><a href="<?php echo base_url('ci-admin/product'); ?>" class="">Product</a></li>
                  <li><a href="<?php echo base_url('ci-admin/product/create'); ?>" class="">Product Create</a></li>
                </ul>
              </div>
            </li>

            <li><a href="<?php echo base_url('ci-admin/bill') ?>" class=""><i class="lnr lnr-cart"></i> <span>Bill</span></a></li>



            <li>
              <a href="#subPage" data-toggle="collapse" class="collapsed"><i class="lnr lnr-file-empty"></i> <span>Pages</span> <i class="icon-submenu lnr lnr-chevron-left"></i></a>
              <div id="subPage" class="collapse ">
                <ul class="nav">
                  <li><a href="<?php echo base_url('ci-admin/pages'); ?>" class="">Pages</a></li>
                  <li><a href="<?php echo base_url('ci-admin/page/create'); ?>" class="">Create Page</a></li>
                  <li><a href="<?php echo base_url('ci-admin/content/page'); ?>" class="">Content Pages</a></li>
                  <li><a href="<?php echo base_url('ci-admin/page/content/create'); ?>" class="">Create Content Page</a></li>
                  
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- END LEFT SIDEBAR -->
    <!-- MAIN -->
    <div class="main">
      <!-- MAIN CONTENT -->
      <div class="main-content">
        <div class="container-fluid">
          <div class="row">
            <?php echo $breadcrum; ?>
            <?php echo $contents; ?>
          </div>
        </div>
      </div>
      <!-- END MAIN CONTENT -->
    </div>
    <!-- END MAIN -->
    <div class="clearfix"></div>
    <footer>
      <div class="container-fluid">
        <p class="copyright">&copy; 2017 <a href="https://www.themeineed.com" target="_blank">Theme I Need</a>. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
  <!-- END WRAPPER -->
  <!-- Javascript -->

<!--   <script src="<?php echo base_url('assets/js/jquery-1.12.4.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/jquery-ui.js'); ?>"></script> -->

   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>

  <!-- <script src="<?php echo base_url('assets/vendor/jquery/jquery.min.js') ?>"></script> -->
  <script src="<?php echo base_url('assets/vendor/bootstrap/js/bootstrap.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/vendor/jquery.easy-pie-chart/jquery.easypiechart.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/vendor/chartist/js/chartist.min.js') ?>"></script>
  <script src="<?php echo base_url('assets/scripts/klorofil-common.js') ?>"></script>
  <!-- -->
  <script src="<?php echo base_url('vendor/dropzone/dropzone.min.js'); ?>"></script>
  <script type="text/javascript" src="<?php echo base_url('assets/js/a.js'); ?>"></script>
  <script src="<?php echo base_url('assets/js/jquery.dataTables.min.js'); ?>"></script>
  <?php echo $scripts_header; ?>
  <script>
  $( function() {
    $( "#sortable" ).sortable({
        opacity: 0.6,
        cursor: 'move',
        update: function(event, ui){
           var order = $(this).sortable("serialize");
           $.ajax({
             url: "<?php echo base_url('ci-admin/order-image') ?>",
             type: 'POST',
             data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','data':order},
             success: function (data) {

             }
           });
         }
    });

    $( "#sortable-baner" ).sortable({
        opacity: 0.6,
        cursor: 'move',
        update: function(event, ui){
           var order = $(this).sortable("serialize");
           console.log(order);
           $.ajax({
             url: "<?php echo base_url('ci-admin/banner/order-banner') ?>",
             type: 'POST',
             data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','data':order},
             success: function (data) {

             }
           });
         }
    });

     $( "#sortable-footer" ).sortable({
        opacity: 0.6,
        cursor: 'move',
        update: function(event, ui){
           var order = $(this).sortable("serialize");
           console.log(order);
           $.ajax({
             url: "<?php echo base_url('ci-admin/footer/order-footer') ?>",
             type: 'POST',
             data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','data':order},
             success: function (data) {

             }
           });
         }
    });

     $( "#sortable-menu" ).sortable({
        opacity: 0.6,
        cursor: 'move',
        update: function(event, ui){
           var order = $(this).sortable("serialize");
           console.log(order);
           $.ajax({
             url: "<?php echo base_url('ci-admin/menu/order-menu-img') ?>",
             type: 'POST',
             data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','data':order},
             success: function (data) {

             }
           });
         }
    });
  });


  </script>

  <script type="text/javascript">
    $(document).ready(function() {
      $('.sortable-menu').nestedSortable({
        forcePlaceholderSize: true,
        items: 'li',
        handle: '.handle',
        placeholder: 'menu-highlight',
        listType: 'ul',
        maxLevels: 3,
        opacity: .6,
        update : function (){
          var orderNew = $(this).nestedSortable('toArray');
          $.ajax({
            type: "post",
             url: "<?php echo base_url('ci-admin/menu/order-menu') ?>",
            data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','list':orderNew}
            });
        }
      });
    });
  </script>
  <script type="text/javascript">
    $(document).ready(function() {
      $('#dataMenu').DataTable( {
        "ajax": "<?php echo base_url('ci-admin/menu/data-menu') ?>"
      });

      $('#dataProduct').DataTable( {
        "ajax": "<?php echo base_url('ci-admin/product/data-product') ?>"
      });

      $('#dataBill').DataTable( {
        "ajax": "<?php echo base_url('ci-admin/bill/data-bill') ?>"
      });

      $('#dataPages').DataTable( {
        "ajax": "<?php echo base_url('ci-admin/pages/data-pages') ?>"
      });
      $('#dataPagesContents').DataTable( {
        "ajax": "<?php echo base_url('ci-admin/pages/dataPagesContents') ?>"
      });
      
      /**
       * 
       */
      $("#dataPagesContents").on("click", ".pagescontentdelete #pagescontentdelete", function(){
        var table = $('#dataPagesContents').DataTable();
        var mydata = $(this).attr('value');
        var name = $(this).attr('data');
        var conf=confirm("Are you sure you want to delet this : "+name);
        if(conf){
           var row = $(this).parents('tr');
          // table.row( $(this).parents('tr') ).remove().draw();
           $.ajax({
              type : "post",
              url: "<?php echo base_url('ci-admin/pages/contentdelete') ?>",
              data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','idcontent':mydata},
              async:false,
              success: function(data){
                   if(data ==1)
                   {
                       row.remove();
                   }
               }
           });
        }
        else {
          return false;
        }
      });

      /**
       * 
       */
      $("#dataPages").on("click", ".pagedelete #pagedelete", function(){
        var table = $('#dataPages').DataTable();
        var mydata = $(this).attr('value');
        var name = $(this).attr('data');
        var conf=confirm("Are you sure you want to delet this : "+name);
        if(conf){
           var row = $(this).parents('tr');
          // table.row( $(this).parents('tr') ).remove().draw();
           $.ajax({
              type : "post",
              url: "<?php echo base_url('ci-admin/pages/delete') ?>",
              data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','idPages':mydata},
              async:false,
              success: function(data){
                   if(data ==1)
                   {
                       row.remove();
                   }
               }
           });
        }
        else {
          return false;
        }
      });

      $("#dataMenu").on("click", ".menudelete #menuDelete", function(){
        var table = $('#dataMenu').DataTable();
        var mydata = $(this).attr('value');
        var name = $(this).attr('data');
        var conf=confirm("Are you sure you want to delet this : "+name);
        if(conf){
           var row = $(this).parents('tr');
          // table.row( $(this).parents('tr') ).remove().draw();
           $.ajax({
              type : "post",
              url: "<?php echo base_url('ci-admin/menu/delete') ?>",
              data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','idMenu':mydata},
              async:false,
              success: function(data){
                   if(data ==1)
                   {
                       row.remove();
                   }
               }
           });
        }
        else {
          return false;
        }
      });
      // product delete
     $("#dataProduct").on("click", ".productdelete #productdelete", function(){
        var table = $('#dataProduct').DataTable();
        var mydata = $(this).attr('value');
        var name = $(this).attr('data');
        var conf=confirm("Are you sure you want to delet this : "+name);
        if(conf){
           var row = $(this).parents('tr');
          // table.row( $(this).parents('tr') ).remove().draw();
           $.ajax({
              type : "post",
              url: "<?php echo base_url('ci-admin/product/delete') ?>",
              data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','idProduct':mydata},
              async:false,
              success: function(data){
                   if(data ==1)
                   {
                       row.remove();
                   }
               }
           });
        }
        else {
          return false;
        }
      });

    });
  </script>
  <script>
    $(document).ready(function(){
      $("#dataBill").on("click", "#printBill", function(){
        idBill = $(this).attr('data');
        urlLink = $('#dataBill #printBill').attr('name');

        $.ajax({
            type: "post",
             url: "<?php echo base_url('ci-admin/bill/prinfBill') ?>",
             data: {'<?php echo $this->security->get_csrf_token_name(); ?>':'<?php echo $this->security->get_csrf_hash(); ?>','list':idBill},
             success: function(data) {
                  window.location = urlLink;// you can use window.open also
              }
            });
      });
    });
  </script>
</body>

</html>
<?php endif;?>
