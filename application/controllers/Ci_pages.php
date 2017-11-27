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
    public function dataPages()
    {
        $draw = intval($this->input->get("draw"));
        $start = intval($this->input->get("start"));
        $length = intval($this->input->get("length"));
    $query = $this->db->select('id, name, slug, status, show_hiden')->order_by('id','asc')->get('pages');

    $data = array();

    foreach($query->result_array() as $key =>$value)
    {

      $data[] = array(
            $value['name'],
           ($value['status']) ? 'On' : 'Off',
           ($value['show_hiden']) ? 'On' : 'Off',
            $value[] = '<a href="'.base_url('ci-admin/page/edit/'.$value['id']).'"><span type="button"  name="edit" id="" class="glyphicon glyphicon-edit"></span></a>',
            $value[] = '<a class="pagedelete"><span type="button" value="'.$value['id'].'" data="'.$value['name'].'" name="delete" id="pagedelete" class="glyphicon glyphicon-trash"></span></a>'
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
        $id = $this->security->xss_clean($this->input->post('idPages'));
        $this->db->where('id', $id);
        $this->db->delete('pages');
        if ($this->db->trans_status() === TRUE){
           echo 1;
           exit();
         }
    }
    public function edit($id)
    {
        $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'pages', 'url'=>'ci-admin/pages'),
            'br3' => array('name' => 'edit page'),
         );
        $this->template->breadcrum($breadcrum);

        if(isset($_POST['btnEditPage']))
        {
          $name         =  $this->security->xss_clean($this->input->post('name'));
          $slug         =  $this->security->xss_clean($this->input->post('slug'));
          $status       =  $this->security->xss_clean($this->input->post('status'));
          $show_hiden   =  $this->security->xss_clean($this->input->post('show_hiden'));
          //`nane`, `slug`, `status`, `show_hiden`
          $data = array(
            'name'          => $name,
            'slug'          => $slug,
            'status'        => $status,
            'show_hiden'    => $show_hiden,
          );
          $this->db->where('id', $this->security->xss_clean($this->input->post('id')));
          $this->db->update('pages', $data);
          $this->db->trans_complete();
          if ($this->db->trans_status() === TRUE)
          {
            redirect('ci-admin/pages');
          }
  
        }
        else if(isset($_POST['btnBackPage']))
        {
            redirect(base_url('ci-admin/pages'));
        }
        else
        {
            $query = $this->db->get_where('pages',array('id'=>$id));
            $this->template->load('layout', 'contents' , 'ci-admin/pages/editPage.php',array('csrf'=>$this->csrf,'data'=>$query->result_array()));
        }
    }
    public function PagesContents()
    {
        $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'Pages Contens'),
         );
         $this->template->breadcrum($breadcrum);
         $this->template->load('layout', 'contents' , 'ci-admin/pages/pages_contents.php',array('csrf'=>$this->csrf));
    }
    public function dataPagesContents()
    {
        $draw = intval($this->input->get("draw"));
        $start = intval($this->input->get("start"));
        $length = intval($this->input->get("length"));
        $query = $this->db->select('content_page.id AS id, content_page.name AS name, content_page.status AS status, pages.name AS Pname')
                          ->from('content_page')
                          ->join('pages','pages.id = content_page.idPage')
                          ->order_by('id','asc')
                          ->get();
        $data = array();

        foreach($query->result_array() as $key =>$value)
        {
        $data[] = array(
            $value['name'],
            $value['Pname'],
            ($value['status']) ? 'On' : 'Off',
                $value[] = '<a href="'.base_url('ci-admin/pages/content/edit/'.$value['id']).'"><span type="button"  name="edit" id="" class="glyphicon glyphicon-edit"></span></a>',
                $value[] = '<a class="pagescontentdelete"><span type="button" value="'.$value['id'].'" data="'.$value['name'].'" name="delete" id="pagescontentdelete" class="glyphicon glyphicon-trash"></span></a>'
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
    public function PagesContentDelete()
    {
        $id = $this->security->xss_clean($this->input->post('idcontent'));
        $this->db->where('id', $id);
        $this->db->delete('content_page');
        if ($this->db->trans_status() === TRUE){
           echo 1;
           exit();
         }
    }
    public function createPageContent()
    {
        $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'pages', 'url'=>'ci-admin/pages/contents'),
            'br3' => array('name' => 'create page content'),
         );
        $this->template->breadcrum($breadcrum);
        $this->template->add_js('ckeditor/ckeditor.js');
        $this->template->add_js('assets/js/ckeditor.js');
        /**
         * page
         */
        if(isset($_POST['btnAddContentPage']))
        {
            $name           =  $this->security->xss_clean($this->input->post('name'));
            $idPage         =  $this->security->xss_clean($this->input->post('idPage'));
            $content        =  $this->security->xss_clean($this->input->post('content'));
            $description    =  $this->security->xss_clean($this->input->post('description'));
            $keyword        =  $this->security->xss_clean($this->input->post('keyword'));
            $status         =  $this->security->xss_clean($this->input->post('status'));
            // content_page `name`, `slug`, `idPage`, `content`, `description`, `keyword`, `status`
            $data = array(
              'name'            => $name,
              'idPage'          => $idPage,
              'content'         => $content,
              'description'     => $description,
              'keyword'         => $keyword,
              'status'          => $status
             
            );
            $this->db->insert('content_page', $data);
            if ($this->db->trans_status() === TRUE)
            {
                redirect('ci-admin/pages/contents');
            }
        }
        else if(isset($_POST['btnBacContentkPage']))
        {
            redirect('ci-admin/pages/contents');
        }
        else
        {
            $this->load->model('Pages');
            $data_pages = $this->Pages->show();
            $this->template->load('layout', 'contents' , 'ci-admin/pages/createpagecontent.php',array('csrf'=>$this->csrf,'pages'=>$data_pages));
        }
        
    }
    public function PagesContentEdit($id)
    {
        $breadcrum = array(
            'br1' => array('name' => 'Home', 'url'=>'ci-admin'),
            'br2' => array('name' => 'pages', 'url'=>'ci-admin/pages/contents'),
            'br3' => array('name' => 'edit pages contents'),
         );
         /**
          * 
        */
        if(isset($_POST['btnEditContentPage']))
        {
            $name           =  $this->security->xss_clean($this->input->post('name'));
            $idPage         =  $this->security->xss_clean($this->input->post('idPage'));
            $content        =  $this->security->xss_clean($this->input->post('content'));
            $description    =  $this->security->xss_clean($this->input->post('description'));
            $keyword        =  $this->security->xss_clean($this->input->post('keyword'));
            $status         =  $this->security->xss_clean($this->input->post('status'));
            // content_page `name`, `slug`, `idPage`, `content`, `description`, `keyword`, `status`
            $data = array(
              'name'            => $name,
              'idPage'          => $idPage,
              'content'         => $content,
              'description'     => $description,
              'keyword'         => $keyword,
              'status'          => $status
             
            );
            
            $this->db->where('id', $this->security->xss_clean($this->input->post('id')));
            $this->db->update('content_page', $data);
            $this->db->trans_complete();
            if ($this->db->trans_status() === TRUE)
            {
                redirect('ci-admin/pages/contents');
            }
        }
        else if(isset($_POST['btnBacContentkPage']))
        {
            redirect('ci-admin/pages/contents');
        }

        $this->template->add_js('ckeditor/ckeditor.js');
        $this->template->add_js('assets/js/ckeditor.js');
        $this->load->model('Pages');
        $data_pages     = $this->Pages->show();
        $query = $this->db->get_where('content_page',array('id'=>$id));
        $data  = $query->result_array();
        $this->template->load('layout', 'contents' , 'ci-admin/pages/editpagecontent.php',array(
            'csrf'      =>$this->csrf,
            'pages'     =>$data_pages,
            'data'      =>$data
        ));
    }
   }