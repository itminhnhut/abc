<?php
   /**
   *
   */
   class Ci_Menu extends CI_Controller
   {
      private $CI;
      public  $csrf = null;
      private $upload_path = "./uploads/menu";

      public function __construct(){
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
        'br2' => array('name' => 'Menu'),
      );

      $query = $this->db->select('id, img, url_image')->from('menu')->where('status_menu_img',1)->order_by('menu_image','asc')->get()->result_array();

      $this->template->breadcrum($breadcrum);
      $this->template->load('layout', 'contents' , 'ci-admin/menu/index.php',array('orderimg'=>$query,'csrf'=>$this->csrf));
    }

    public function dataMenu(){
       $draw = intval($this->input->get("draw"));
          $start = intval($this->input->get("start"));
          $length = intval($this->input->get("length"));
      $query = $this->db->select('id, name, slug, status, status_menu_img')->order_by('order_menu','asc')->get('menu');

      $row = array();
      $data = array();

      foreach($query->result_array() as $key =>$value)
      {

        $data[] = array(
              $value['name'],
              $value['slug'],
             ($value['status']) ? 'On' : 'Off',
             ($value['status_menu_img']) ? 'On' : 'Off',
              $value[] = '<a href="'.base_url('ci-admin/menu/image/'.$value['id']).'"><span type="button" name="update" id="" class="glyphicon glyphicon-picture"></span></a>',
              $value[] = '<a href="'.base_url('ci-admin/menu/edit/'.$value['id']).'"><span type="button"  name="edit" id="" class="glyphicon glyphicon-edit"></span></a>',
              $value[] = '<a class="menudelete"><span type="button" value="'.$value['id'].'" data="'.$value['name'].'" name="delete" id="menuDelete" class="glyphicon glyphicon-trash"></span></a>'
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

    public function create(){
       if(isset($_POST['btnAddMenu']))
       {
          $name =  $this->security->xss_clean($this->input->post('name'));
          $slug =  $this->security->xss_clean($this->input->post('slug'));
          $title =  $this->security->xss_clean($this->input->post('title'));
          $alt =  $this->security->xss_clean($this->input->post('alt'));
          $des =  $this->security->xss_clean($this->input->post('des'));
          $status =  $this->security->xss_clean($this->input->post('status'));
          //`id`, `name`, `title`, `alt`, `des`, `slug`, `img`, `menu_image`, `order_menu`, `parent`, `status`
          $data = array(
              'name'             => $name,
              'title'            => $title,
              'alt'              => $alt,
              'des'              => $des,
              'slug'             => $slug,
              'url_image'        => 0,
              'img'              => 0,
              'menu_image'       => '',
              'order_menu'       => 0,
              'parent'           => 0,
              'status_menu_img'  => 0,
              'status'           => $status
            );
            $this->db->insert('menu', $data);
            if ($this->db->trans_status() === TRUE)
            {
               redirect('ci-admin/menu');
            }
       }
       else
       {
          $this->template->load('layout','contents','ci-admin/menu/create.php',array('csrf'=>$this->csrf));
       }
    }
    /**
     *
     */
    public function order()
    {
      $data = $this->load->model('MenuMulti');
      $data = $this->MenuMulti->get_categories();
      $array = json_decode(json_encode($data),TRUE);
      $breadcrum = array(
        'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
        'br2' => array('name' => 'Menu','url'=>'ci-admin/menu'),
        'br3' => array('name' => 'Order Menu', 'active' =>'active'),
      );

      $this->template->breadcrum($breadcrum);
      $this->template->load('layout','contents','ci-admin/menu/order.php',array('data'=>$array,'csrf'=>$this->csrf));
    }

    public function orderMenu()
    {
       $items = $this->security->xss_clean($this->input->post('list'));
       // $arr = array();
       $i = 1;
       //  $list =  parse_str($items,$arr);
       //item_id
       foreach($items as $key => $value){
         if($value['item_id'] != '')
         {
            $rs = array(
                'parent'     => $value['parent_id'],
                'order_menu' => $i++
            );

           $this->db->where('id', $value['item_id']);
           $this->db->update('menu', $rs);
         }
       }
       //var_dump($value['item_id']);
        //    $this->db->where('id', $key);
        //    $this->db->update('menu', $rs);

        // }
    }
    public function edit($id)
    {
      if(isset($_POST['btnEditMenu']))
      {
        $name =  $this->security->xss_clean($this->input->post('name'));
        $slug =  $this->security->xss_clean($this->input->post('slug'));
        $title =  $this->security->xss_clean($this->input->post('title'));
        $alt =  $this->security->xss_clean($this->input->post('alt'));
        $des =  $this->security->xss_clean($this->input->post('des'));
        $status =  $this->security->xss_clean($this->input->post('status'));
        //`id`, `name`, `title`, `alt`, `des`, `slug`, `img`, `menu_image`, `order_menu`, `parent`, `status`
        $data = array(
          'name'   => $name,
          'title'  => $title,
          'alt'    => $alt,
          'des'    => $des,
          'slug'   => $slug,
          'status' => $status
        );
        $this->db->where('id', $this->security->xss_clean($this->input->post('id')));
        $this->db->update('menu', $data);
        $this->db->trans_complete();
        if ($this->db->trans_status() === TRUE)
        {
          redirect('ci-admin/menu');
        }

      }
      else if(isset($_POST['btnBackMenu']))
      {
          redirect(base_url('ci-admin/menu'));
      }
      else
      {
          $query = $this->db->get_where('menu',array('id'=>$id));
          $this->template->load('layout', 'contents' , 'ci-admin/menu/edit.php',array('csrf'=>$this->csrf,'data'=>$query->result_array()));
      }
    }
    public function delete()
    {
        $id = $this->security->xss_clean($this->input->post('idMenu'));
        $this->db->where('id', $id);
        $this->db->delete('menu');
        if ($this->db->trans_status() === TRUE){
           echo 1;
           exit();
         }
    }
    /*

     */
    public function menuImage($id)
    {
       $data = $id;
       $this->template->add_js('assets/js/dropzone_multi_menu.js');

       $breadcrum = array(
        'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
        'br2' => array('name' => 'Menu','url'=>'ci-admin/menu'),
        'br3' => array('name' => 'Upload Image', 'active' =>'active'),
      );

      $this->template->breadcrum($breadcrum);
       $this->template->load('layout','contents','ci-admin/menu/image.php',array('data'=>$data,'csrf'=>$this->csrf));
    }

     public function upload($id)
    {
      if ( ! empty($_FILES))
      {
        $this->load->library('upload');
        $files = $_FILES;
        $cpt = count($_FILES['file']['name']);
        for($i=0; $i<$cpt; $i++)
        {
          $_FILES['file']['name']= $files['file']['name'][$i];
          $_FILES['file']['type']= $files['file']['type'][$i];
          $_FILES['file']['tmp_name']= $files['file']['tmp_name'][$i];
          $_FILES['file']['error']= $files['file']['error'][$i];
          $_FILES['file']['size']= $files['file']['size'][$i];

          $rs_ext = explode(".", $files['file']['name'][$i]);
          $ext    = end($rs_ext);
          $file_name = time().$i."_".($i+1).".".$ext;
          $_FILES['file']['name'] = $file_name;

          $this->upload->initialize($this->set_upload_options($file_name));
          if($this->upload->do_upload("file"))
          {
            $filesold = $this->db->select('img')->from('menu')->where('id',$id)->get()->result_array();
            if(count($filesold) > 0){
              foreach ($filesold as $file) {
                unlink($this->upload_path . "/" . $file['img']);
              }
            }
            $data = array(
              'url_image'        => $this->upload_path . "/" . $file_name,
              'img'              => $file_name,
              'status_menu_img'  => 1
            );

            $this->db->where('id', $id);
            $this->db->update('menu', $data);
          }
        }
      }
    }
    private function set_upload_options($fileName)
    {
    //upload an image options
      $config = array();
      $config['upload_path']   = $this->upload_path;
      $config['allowed_types'] = 'gif|jpg|png';
      $config['max_size']      = '0';
      $config['overwrite']     = FALSE;
      $config['file_name']     = $fileName;

      return $config;
    }
    public function remove()
    {
      $file = $this->security->xss_clean($this->input->post("file"));
      $id = $this->security->xss_clean($this->input->post("id"));
      if ($file && file_exists($this->upload_path . "/" . $file)) {
        unlink($this->upload_path . "/" . $file);
        $data = array(
          'img'              => 0,
          'status_menu_img'  => 0
        );

        $this->db->where('id', $id);
        $this->db->update('menu', $data);
      }
    }

    public function list_files($id)
    {
      $files = $this->db->select('img')->from('menu')->where('id',$id)->get()->result_array();
      if(count($files) > 0){
        foreach ($files as &$file) {
          $file = array(
            'name' => $file['img'],
            'size' => filesize($this->upload_path . "/" . $file['img'])
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

   public function orderMenuImg(){
      $items = $this->security->xss_clean($this->input->post('data'));
      $total_items = count($this->security->xss_clean($this->input->post('data')));
      $list = explode('&' , $items);
      $i = 1;
      foreach ($list as $key => $value) {
          $data = explode('item[]=' , $value);
          $rs = array(
                'id'           => $data[1],
                'menu_image'  => $i++
          );
          $this->db->where('id', $rs['id']);
          $this->db->update('menu', $rs);
      }
    }

   }
?>