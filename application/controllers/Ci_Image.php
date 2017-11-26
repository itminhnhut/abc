<?php
  /**
  *
  */
  class Ci_Image extends CI_Controller
  {

    private $CI;
    private $upload_path = "./uploads/multi-slider";
    public  $csrf = null;
    public function __construct(){
      parent::__construct();
      $this->CI =& get_instance();
      $this->csrf = array(
        'name' => $this->security->get_csrf_token_name(),
        'hash' => $this->security->get_csrf_hash()
      );
    }

    public function index()
    {
      $query = $this->db->order_by('order_image','asc')->get('slider');
      $this->template->set('title', 'Dashboard | Klorofil - Free Bootstrap Dashboard Template');

      $breadcrum = array(
        'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
        'br2' => array('name' => 'Image slider'),
      );

      $this->template->breadcrum($breadcrum);
      $this->template->load('layout', 'contents' , 'ci-admin/image/index.php',array('data'=>$query->result_array(),'csrf'=>$this->csrf));
    }
    public function slider()
    {
      $this->template->set('title', 'Dashboard | Klorofil - Free Bootstrap Dashboard Template');
      $this->template->add_js('assets/js/dropzone_multi_image.js');

      $breadcrum = array(
        'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
        'br2' => array('name' => 'Image slider','url'=>'ci-admin/image-slider'),
        'br3' => array('name' => 'Upload multi image', 'active' =>'active'),
      );

      $this->template->breadcrum($breadcrum);
      $this->template->load('layout', 'contents' , 'ci-admin/image/image-slider.php',array('csrf'=>$this->csrf));
    }
    public function upload()
    {
      // if ( ! empty($_FILES))
      // {
      //   $this->load->library('upload');
      //   $files = $_FILES;
      //   $cpt = count($_FILES['file']['name']);
      //   for($i=0; $i<$cpt; $i++)
      //   {
      //     $_FILES['file']['name']= $files['file']['name'][$i];
      //     $_FILES['file']['type']= $files['file']['type'][$i];
      //     $_FILES['file']['tmp_name']= $files['file']['tmp_name'][$i];
      //     $_FILES['file']['error']= $files['file']['error'][$i];
      //     $_FILES['file']['size']= $files['file']['size'][$i];

      //     $rs_ext = explode(".", $files['file']['name'][$i]);
      //     $ext    = end($rs_ext);
      //     $file_name = time().$i."_".($i+1).".".$ext;
      //     $_FILES['file']['name'] = $file_name;

      //     $this->upload->initialize($this->set_upload_options($file_name));
      //     if($this->upload->do_upload("file")){
      //       $file = array(
      //         'image'           =>  $file_name,
      //         'url'             => '',
      //         'title'           => '',
      //         'alt'             => '',
      //         'active'          => 0
      //       );
      //       $this->db->insert('slider', $file);
      //     }
      //   }
      // }
      $this->load->library('upload');
      $uploadDir = 'uploads/multi-slider';
       if (is_dir($uploadDir) == false) {
          mkdir($uploadDir, 0777);
       }

      if (!empty($_FILES)) {

       $tmpFile = $_FILES['file']['tmp_name'];
       $filename = $uploadDir.'/'.time().'-'. $_FILES['file']['name'];
       move_uploaded_file($tmpFile,$filename);
       $file = array(
         'url_image'       => $filename,
         'image'           => $_FILES['file']['name'],
         'url'             => '',
         'title'           => '',
         'alt'             => '',
         'active'          => 1
       );
       $this->db->insert('slider', $file);
     }
    }
    // private function set_upload_options($fileName)
    // {
    // //upload an image options
    //   $config = array();
    //   $config['upload_path']   = $this->upload_path;
    //   $config['allowed_types'] = 'gif|jpg|png';
    //   $config['max_size']      = '0';
    //   $config['overwrite']     = FALSE;
    //   $config['file_name']     = $fileName;

    //   return $config;
    // }
    public function remove()
    {
      $file = $this->security->xss_clean($this->input->post("file"));
      if ($file && file_exists($file)) {
        unlink($file);
        $this->db->where('url_image',$file);
        $this->db->delete('slider');
      }
    //return $this->db->delete('slider', array('image' => $file));
      // $this->db->where('url_image', $file);
      // $this->db->delete('slider');
    }

    public function list_files()
    {
      $files = $this->db->select('url_image, image')->from('slider')->get()->result_array();
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
    public function edit($id){

      if (isset($_POST['subEditMultiImage']))
      {
        $url    = $this->security->xss_clean($this->input->post('url'));
        $title  = $this->security->xss_clean($this->input->post('title'));
        $alt    = $this->security->xss_clean($this->input->post('alt'));
        $active = $this->security->xss_clean($this->input->post('active'));

        $data = array(
          'url'    => $url,
          'title'  => $title,
          'alt'    => $alt,
          'active' => $active
        );
        $this->db->where('id', $this->security->xss_clean($this->input->post('id')));
        $this->db->update('slider', $data);
        $this->db->trans_complete();
        if ($this->db->trans_status() === TRUE)
        {
          redirect('ci-admin/image-slider');
        }
      }
      else
      {
        $query = $this->db->get_where('slider',array('id'=>$id));
        $this->template->load('layout', 'contents' , 'ci-admin/image/edit-slider.php',array('csrf'=>$this->csrf,'data'=>$query->result_array()));
      }
    }
    /**
     *
    */
    public function orderImage(){
      $items = $this->security->xss_clean($this->input->post('data'));
      $total_items = count($this->security->xss_clean($this->input->post('data')));
      $list = explode('&' , $items);
      $i = 1;
      foreach ($list as $key => $value) {
          $data = explode('item[]=' , $value);
          $rs = array(
                'id'           => $data[1],
                'order_image'  => $i++
          );
          $this->db->where('id', $rs['id']);
          $this->db->update('slider', $rs);
      }
    }

  }
  ?>