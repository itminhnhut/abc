<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Trangchu extends CI_Controller {

    public $data = array();
    private $CI;
    public function __construct() {
        parent::__construct();
        $this->load->library('javascript');
        $this->CI = &get_instance();
        $this->csrf = array(
        'name' => $this->security->get_csrf_token_name(),
        'hash' => $this->security->get_csrf_hash()
        );
    }

    public function index() {
        $this->output->cache(5);
        $this->template->masterlayoutFondend('layout', 'contents', 'layouts/font_end/trangchu', $this->data);
    }

    public function trangloai($slug,$id) {
        $this->template->add_js('assets/js/jquery/trangloai.js');
        $this->template->add_js('assets/js/jquery/plugin_6.js');



         $this->load->model('Menu');
         $rs = $this->Menu->check($slug,$id);
         if($rs > 0)
         {
              $this->load->model('Product');
              $csrf  =  $this->security->xss_clean($this->input->get('csrf_test_name'));
              $get_min  =  $this->security->xss_clean($this->input->get('min_price'));
              $get_max  =  $this->security->xss_clean($this->input->get('max_price'));

             if($csrf != $this->csrf['hash'] && $csrf !='')
             {
               redirect (base_url('404'));
             }
             else if($csrf == $this->csrf['hash'])
             {
               if( $get_max =='' || $get_min == '')
               {
                 redirect (base_url('404'));
               }
               else
               {
                 $action = 'price';
                 $rs = $this->checkGet($action,$get_min,$get_max);
                 if($rs == 0)
                   redirect (base_url('404'));
                 else
                 {
                   $action_results = 'price';
                   $total_row = $this->Product->record_minmax($id,$get_min,$get_max,0,0);

                 }
               }
             }
             else
             {
               $action_results = 'trangloai';
               $total_row = $this->Product->record_count($id);

             }

             // menu
              $data = $this->Menu->get_categories_tl($id);
              $arr  = json_decode(json_encode($data),TRUE);

              $this->load->model('MenuMulti');
              $categories = $this->MenuMulti->get_categories();
              $arr_categories  = json_decode(json_encode($categories),TRUE);


              $max = $this->Product->MaxPrice();

             // $show = $this->Product->TinTrangLoai($id);

              $this->load->library('pagination');
              /**/
              $config = array();

              $config["base_url"] = base_url() .$slug.'-'.$id;

              $config["total_rows"] = $total_row;

              $config["per_page"] = 3;

              $config['full_tag_open'] = "<ul class='page-numbers'>";
              $config['full_tag_close'] ="</ul>";
              $config['num_tag_open'] = '<li>';
              $config['num_tag_close'] = '</li>';
              $config['cur_tag_open'] = "<li class='page-numbers'><li class='active'><a href='#'>";
              $config['cur_tag_close'] = "<span class='sr-only'></span></a></li>";
              $config['next_tag_open'] = "<li>";
              $config['next_tagl_close'] = "</li>";
              $config['prev_tag_open'] = "<li>";
              $config['prev_tagl_close'] = "</li>";
              $config['first_tag_open'] = "<li>";
              $config['first_tagl_close'] = "</li>";
              $config['last_tag_open'] = "<li>";
              $config['last_tagl_close'] = "</li>";
              $config['display_pages'] = true;
              $config['suffix'] = '?' . http_build_query($_GET, '', "&");

              $this->pagination->initialize($config);

              $offset  =  ($this->uri->segment(2)=='') ? 0 : $this->uri->segment(2);



              if($action_results == 'trangloai')
              {
                $data["results"] = $this->Product->fetch_data($config["per_page"],$offset, $id);
              }
              else if($action_results == 'price')
              {
                $data["results"] = $this->Product->record_minmax($id,$get_min,$get_max,$config["per_page"],$offset);
              }

              $pagination = $this->pagination->create_links();
              /* tags */
              $tags = $this->Product->tags($id);
              /**/
              $this->template->masterlayoutFondend('layout', 'contents', 'layouts/font_end/trangloai',array(
                  'menu'        => $arr,
                  'categories'  => $arr_categories,
                  'max'         => $max[0]['MaxPrice'],
                  'data'        => $data["results"],
                  'pagination'  => $pagination,
                  'slug'        => $slug,
                  'id'          => $id,
                  'tags'        => $tags,
                  'total'       => $total_row,
                  'per_page'    => $config["per_page"],
                  'csrf'        => $this->csrf
              ));
              $this->load->view('layouts/font_end/popup_cart');
         }
         else
         {
             redirect('/');
         }

    }
    public function checkGet($action,$min,$max)
    {
      if($action == 'price')
      {
        if($min < 0 || $max < 0)
        {
          return 0;
        }
        else
        {
          return 1;
        }

      }
    }


    public function blog() {
        $this->template->masterlayoutFondend('layout', 'contents', 'layouts/font_end/blog', $this->data);
    }

    public function blog_chitiet() {
        $this->template->masterlayoutFondend('layout', 'contents', 'layouts/font_end/blog_chitiet', $this->data);
    }

    public function popup_cart() {

        $this->load->view('layouts/font_end/popup_cart');
    }
}

?>