<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ci_Admin extends CI_Controller {

  private $CI;

  public function __construct(){
    parent::__construct();
    $this->CI =& get_instance();
  }

  public function index()
  {
    $this->template->set('title', 'Dashboard | Klorofil - Free Bootstrap Dashboard Template');
    $this->template->load('layout', 'contents' , 'ci-admin/index.php');
  }
}
