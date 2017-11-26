<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class View404 extends CI_Controller {
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

   public function index()
   {
      $this->template->masterlayoutFondend('layout', 'contents', '404.php');
   }
}
