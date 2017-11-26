<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
  const   abc = 1;
  public  $csrf = null;

  public function __construct(){
    parent::__construct();
    $config['csrf_protection']   = FALSE;
     $this->csrf = array(
        'name' => $this->security->get_csrf_token_name(),
        'hash' => $this->security->get_csrf_hash()
   );

  }

  public function index(){
    if (isset($_POST['subLogin']))
    {
       $user = $this->security->xss_clean($this->input->post('username'));
       $pass = $this->security->xss_clean($this->input->post('password'));
       $this->load->model('Login_User');
       $result = $this->Login_User->CheckLoginAdmin($user,$pass);
       if($result)
       {
           $data= array(
                   'id'  => $result[0]->id,
                   'user'     => $result[0]->user,

               );
          $this->session->set_userdata($data);

          redirect(base_url('ci-admin'));
       }
       else
       {
          $rs  = self::abc;
          $this->load->view('login/login',array('csrf'=>$this->csrf,'data'=>$rs));
       }
    }
    else
      $this->load->view('login/login',array('csrf'=>$this->csrf));
  }


  /**
   *
  */

  public function logout(){
    $array_items = array('id', 'user');
    $this->session->unset_userdata($array_items);
    redirect (base_url('login'));
  }
}
