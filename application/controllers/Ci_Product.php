<?php
   /**
   *
   */
   class Ci_Product extends CI_Controller
   {
      private $CI;
      public  $csrf = null;
      private $upload_path = "./uploads/product/multi-image";

      function __construct()
      {
         parent::__construct();
         $this->CI =& get_instance();
         $this->csrf = array(
            'name' => $this->security->get_csrf_token_name(),
            'hash' => $this->security->get_csrf_hash()
         );
          $this->template->add_js('assets/js/slug.js');
      }


      public function index()
      {
         $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'Product'),
         );
         $this->template->breadcrum($breadcrum);
         $this->template->load('layout', 'contents' , 'ci-admin/product/index.php',array('csrf'=>$this->csrf));
      }

      public function create()
      {
          $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'Product','url'=>'ci-admin/product'),
            'br3' => array('name' => 'Create Product'),
         );
         $this->template->breadcrum($breadcrum);
         $this->template->add_js('ckeditor/ckeditor.js');
         $this->template->add_js('assets/js/ckeditor.js');

         $data = $this->load->model('MenuMulti');
         $data = $this->MenuMulti->get_categories();
         $array = json_decode(json_encode($data),TRUE);

         $this->template->add_js('assets/js/ajax-menu-product.js');
         if(isset($_POST['btnAddProduct']))
         {

            $name          =  $this->security->xss_clean($this->input->post('name'));
            $slug          =  $this->security->xss_clean($this->input->post('slug'));
            $idParent      =  $this->security->xss_clean($this->input->post('idParent'));
            $idSubChild    =  $this->security->xss_clean($this->input->post('idSubChild'));
            $idChild       =  $this->security->xss_clean($this->input->post('idChild'));
            $des           =  $this->security->xss_clean($this->input->post('des'));
            $content       =  $this->security->xss_clean($this->input->post('content'));
            $keyword       =  $this->security->xss_clean($this->input->post('keyword'));
            $description   =  $this->security->xss_clean($this->input->post('description'));
            $tags          =  $this->security->xss_clean($this->input->post('tags'));

            $price         =  $this->security->xss_clean($this->input->post('price'));
            $salePrice     =  $this->security->xss_clean($this->input->post('salePrice'));
            $status        =  $this->security->xss_clean($this->input->post('status'));
            $data = array(
                  'name'            =>  $name,
                  'slug'            =>  $slug,
                  'idParent'        =>  $idParent,
                  'idSubChild'      =>  $idSubChild,
                  'idChild'         =>  $idChild,
                  'des'             =>  $des,
                  'content'         =>  $content,
                  'keyword'         =>  $keyword,
                  'description'     =>  $description,
                  'tags'            =>  $tags,
                  'price'           =>  $price,
                  'salePrice'       =>  $salePrice,
                  'create_date'     =>  date('Y-m-d H:i:s'),
                  'status'          =>  $status
            );

            $this->db->insert('product', $data);
            if ($this->db->trans_status() === TRUE)
            {
               redirect('ci-admin/product');
            }
            die;

         }
         else {
            $this->template->load('layout', 'contents' , 'ci-admin/product/create.php',array('dataMenu'=>$array,'csrf'=>$this->csrf));
         }

      }

      public function ajaxMenu(){
         $idloai = $this->input->post('idloai');
         $idsub = $this->input->post('idsub');

         $data = $this->load->model('MenuMulti');
         if($idloai ==0)
         {
            if($idsub !=0)
            {
               $data = $this->MenuMulti->get_categories_auto($idsub);
               $array = json_decode(json_encode($data),TRUE);
               $this->load->helper('menu_product');
            }
            else
            {
               $array = null;
               $this->load->helper('menu_product');
            }

            MenuProductSub($array);
         }
         else
         {
             $data = $this->MenuMulti->get_categories_id($idloai);
             $array = json_decode(json_encode($data),TRUE);
             $this->load->helper('menu_product');
             MenuProduct($array,$idsub);
         }

      }
      public function edit($id)
      {
         $data = $id;
         $query = $this->db->get_where('product',array('id'=>$id));
         $this->template->add_js('ckeditor/ckeditor.js');
         $this->template->add_js('assets/js/ckeditor.js');
         $this->template->add_js('assets/js/ajax-edit-menu-product.js');

         if(isset($_POST['btnEditProduct']))
         {
            $name          =  $this->security->xss_clean($this->input->post('name'));
            $slug          =  $this->security->xss_clean($this->input->post('slug'));
            $idParent      =  $this->security->xss_clean($this->input->post('idParent'));
            $idSubChild    =  $this->security->xss_clean($this->input->post('idSubChild'));
            $idChild       =  $this->security->xss_clean($this->input->post('idChild'));
            $des           =  $this->security->xss_clean($this->input->post('des'));
            $content       =  $this->security->xss_clean($this->input->post('content'));
            $keyword       =  $this->security->xss_clean($this->input->post('keyword'));
            $description   =  $this->security->xss_clean($this->input->post('description'));
            $tags          =  $this->security->xss_clean($this->input->post('tags'));
            $price         =  $this->security->xss_clean($this->input->post('price'));
            $salePrice     =  $this->security->xss_clean($this->input->post('salePrice'));
            $status        =  $this->security->xss_clean($this->input->post('status'));
            $data = array(
               'name'            =>  $name,
               'slug'            =>  $slug,
               'idParent'        =>  $idParent,
               'idSubChild'      =>  $idSubChild,
               'idChild'         =>  $idChild,
               'des'             =>  $des,
               'content'         =>  $content,
               'keyword'         =>  $keyword,
               'description'     =>  $description,
               'tags'            =>  $tags,
               'price'           =>  $price,
               'salePrice'       =>  $salePrice,
               'create_date'     =>  date('Y-m-d H:i:s'),
               'status'          =>  $status
            );
            $this->db->where('id', $this->security->xss_clean($this->input->post('id')));
            $this->db->update('product', $data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === TRUE)
            {

               redirect('ci-admin/product');
            }

         }
         else if(isset($_POST['btnBackProduct']))
         {
            redirect('ci-admin/product');
         }
         else
         {
            $this->template->load('layout', 'contents' , 'ci-admin/product/edit.php',array('data'=>$query->result_array(),'csrf'=>$this->csrf));
         }

      }

      public function ajaxEditMenu(){
           $change = $this->input->post('change');
           $idloai = $this->input->post('idloai');
           $idsub = $this->input->post('idsub');
           $idchild = $this->input->post('idchild');
           $this->load->helper('menu_product');

           if($change ==0){
              if($idloai !=0)
              {
                 $data    = $this->load->model('MenuMulti');
                 $data    = $this->MenuMulti->get_categories_auto(0);
                 $array   = json_decode(json_encode($data),TRUE);

                 $data1        = $this->load->model('MenuMulti');
                 $data1        = $this->MenuMulti->get_categories_auto($idloai);
                 $array_idloai = json_decode(json_encode($data1),TRUE);

                 $data2          = $this->load->model('MenuMulti');
                 $data2          = $this->MenuMulti->get_categories_auto($idsub);
                 $array_idsub    = json_decode(json_encode($data2),TRUE);

                 MenuEditProduct($array,$array_idloai,$array_idsub,$idloai,$idsub,$idchild);
              }
              else
              {
                 //change idsub => tra idchild
                 if($idsub == 0)
                 {
                    $array = null;
                 }
                 else
                 {
                    $data    = $this->load->model('MenuMulti');
                    $data    = $this->MenuMulti->get_categories_auto($idsub);
                    $array   = json_decode(json_encode($data),TRUE);
                 }

                 ChangeIdsub($array);

              }

           }
           else
           {
             if($idloai ==0){
                 if($idsub > 0)
                 {
                    $data1         = $this->load->model('MenuMulti');
                    $data1         = $this->MenuMulti->get_categories_auto($idsub);
                    $array  = json_decode(json_encode($data1),TRUE);
                 }
                 else
                 {
                    $array = null;
                 }

                 MenuSubChangProduct($array,$idsub);
             }
             else {
                $data1         = $this->load->model('MenuMulti');
                $data1         = $this->MenuMulti->get_categories_auto($idloai);
                $array_idsub   = json_decode(json_encode($data1),TRUE);
                MenuChangProduct($array_idsub,$idloai);
             }
           }
      }

      public function dataProduct(){
        $draw = intval($this->input->get("draw"));
        $start = intval($this->input->get("start"));
        $length = intval($this->input->get("length"));
        $query = $this->db->select('id, name, price, salePrice,status')->order_by('id','asc')->get('product');

        $row = array();
        $data = array();
        foreach($query->result_array() as $key =>$value)
        {
          $data[] = array(
            $value['name'],
            number_format($value['price']),
            number_format($value['salePrice']),
            ($value['status']) ? 'On' : 'Off',
            $value[] = '<a href="'.base_url('ci-admin/product/image/'.$value['id']).'"><span type="button" name="update" id="" class="glyphicon glyphicon-picture"></span></a>',
            $value[] = '<a href="'.base_url('ci-admin/product/edit/'.$value['id']).'"><span type="button"  name="edit" id="" class="glyphicon glyphicon-edit"></span></a>',
            $value[] = '<a class="productdelete"><span type="button" value="'.$value['id'].'" data="'.$value['name'].'" name="delete" id="productdelete" class="glyphicon glyphicon-trash"></span></a>'
          );
        }
        $output = array(
          "draw" => $draw,
          "recordsTotal" => $query->num_rows(),
          "recordsFiltered" => $query->num_rows(),
          "data" => $data
        );
        echo json_encode($output);
        exit();
      }
      public function delete()
      {
        $id = $this->security->xss_clean($this->input->post('idProduct'));
        $this->db->where('id', $id);
        $this->db->delete('product');
        if ($this->db->trans_status() === TRUE){
          echo 1;
          exit();
        }
      }

     /**
      * multi image for product
      */
     public function image($id)
     {
        $data = $id;
        $query = $this->db->select('*')->from('imageProduct')->where('idProduct',$data)->get()->result_array();

         $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'Product','url'=>'ci-admin/product'),
            'br3' => array('name' => 'Multi Image'),
         );
        $this->template->breadcrum($breadcrum);
        $this->template->load('layout', 'contents' , 'ci-admin/product/image.php',array('id'=>$id,'data'=>$query,'csrf'=>$this->csrf));
     }
     public function uploadMultiImageProduct($id)
     {
        $data = $id;

         $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'Image Product','url'=>'ci-admin/product/image/'.$id),
            'br3' => array('name' => 'Create Multi Image'),
         );

        $this->template->add_js('assets/js/dropzone_multi_product.js');
         $this->template->breadcrum($breadcrum);
        $this->template->load('layout', 'contents' , 'ci-admin/product/multiimageproduct.php',array('data'=>$data,'csrf'=>$this->csrf));
     }
     public function list_files($id)
     {
       //`id`, `idProduct`, `url_image`, `image`, `avata`, `status`
        $files = $this->db->select('url_image, image')->from('imageProduct')->where('idProduct',$id)->get()->result_array();
        if(count($files) > 0){
        foreach ($files as &$file) {
          $file = array(
            'name'  => $file['url_image'],
            'image' => $file['image'],
            'size'  => filesize($file['url_image'])
          );
         }
      }
      else{
          $files = [];
      }

      header("Content-type: text/json");
      header("Content-type: application/json");
      echo json_encode($files);
     }
     public function upload($id)
    {

      $this->load->library('upload');
      $uploadDir = 'uploads/product/multi-image/'.$id;
       if (is_dir($uploadDir) == false) {
          mkdir($uploadDir, 0777);
       }

      if (!empty($_FILES)) {

       $tmpFile = $_FILES['file']['tmp_name'];
       $filename = $uploadDir.'/'.time().'-'. $_FILES['file']['name'];
       move_uploaded_file($tmpFile,$filename);
       //`id`, `idProduct`, `url_image`, `image`, `avata`, `status`
       $count = $this->db->select('id')->from('imageProduct')->where('idProduct',$id)->get()->result_array();
       if($count == null)
       {
         $file = array(
              'idProduct'       =>  $id,
              'url_image'       => $filename,
              'image'           => $_FILES['file']['name'],
              'avata'           => '1',
              'status'          => '1'
            );
       }
       else
       {
           $file = array(
              'idProduct'       => $id,
              'url_image'       => $filename,
              'image'           => $_FILES['file']['name'],
              'avata'           => '0',
              'status'          => '1'
            );

       }
       $this->db->insert('imageProduct', $file);
      }
    }
    public function remove()
    {
      //`idProduct`, `url_image`, `image`, `avata`, `status`
      $file = $this->security->xss_clean($this->input->post("file"));
      $id = $this->security->xss_clean($this->input->post("id"));
      if ($file && file_exists($file)) {
        unlink($file);
        $this->db->where(array('url_image'=>$file,'idProduct'=>$id));
        $this->db->delete('imageProduct');
      }
    }
    public function editImage($id)
    {
        // imageProduct `id`, `idProduct`, `url_image`, `image`, `avata`, `status`
      if(isset($_POST['btnEditImageProduct']))
      {
        $idProduct  = $this->security->xss_clean($this->input->post("idProduct"));
        $avata  = $this->security->xss_clean($this->input->post("avata"));
        $status = $this->security->xss_clean($this->input->post("status"));

        $data = array(
          'avata'              => 0,
        );
        $this->db->where('idProduct', $idProduct);
        $this->db->update('imageProduct', $data);
        /**/
        $data2 = array(
          'avata'              => $avata,
          'status'             => $status
        );
        $this->db->where('id', $id);
        $this->db->update('imageProduct', $data2);

        $this->db->trans_complete();
        if ($this->db->trans_status() === TRUE)
        {
          redirect('ci-admin/product/image/'.$idProduct);
        }
      }
      else if(isset($_POST['btnBackImageProduct']))
      {
        redirect('ci-admin/product/image/'.$idProduct);
      }
      else
      {
        $query = $this->db->select('avata , status, idProduct')->from('imageProduct')->where('id',$id)->get()->result_array();
        $this->template->load('layout', 'contents' , 'ci-admin/product/edit-image-product.php',array('id'=>$id,'data'=>$query,'csrf'=>$this->csrf));
      }


    }
   }
?>