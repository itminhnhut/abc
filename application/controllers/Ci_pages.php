<?php
   /**
   *
   */
   class Ci_pages extends CI_Controller
   {
    private $CI;
    public  $csrf = null;

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
    public function index(){
        $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'Pages'),
         );
         $this->template->breadcrum($breadcrum);
         $this->template->load('layout', 'contents' , 'ci-admin/pages/index.php',array('csrf'=>$this->csrf));
    }
    public function createPage()
    {
        $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'pages', 'url'=>'ci-admin/pages'),
            'br3' => array('name' => 'create page'),
         );
        $this->template->breadcrum($breadcrum);
        if(isset($_POST['btnAddPage']))
        {
            $name =  $this->security->xss_clean($this->input->post('name'));
            $slug =  $this->security->xss_clean($this->input->post('slug'));
            $status =  $this->security->xss_clean($this->input->post('status'));
            $show_hiden =  $this->security->xss_clean($this->input->post('show_hiden'));
            //`nane`, `slug`, `status`, `show_hiden`
            $data = array(
                'name'             => $name,
                'slug'             => $slug,
                'status'           => $status,
                'show_hiden'       => $show_hiden
              );
             
              $this->db->insert('pages', $data);
              if ($this->db->trans_status() === TRUE)
              {
                 redirect('ci-admin/pages');
              }
        }
        else  if(isset($_POST['btnBackPage']))
        {
            redirect('ci-admin/pages');
        }
        else
        {
            $this->template->load('layout', 'contents' , 'ci-admin/pages/createPage.php',array('csrf'=>$this->csrf));
        }
        
    }
   }