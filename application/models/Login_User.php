<?php
  /**
  *
  */
  class Login_User extends CI_Model
  {
    public function __construct(){
      parent::__construct();
    }
    public function CheckLoginAdmin($user,$pass){
      $this->db->select();
      $this->db->from('user');
      $this->db->where('user', $user);
      $this->db->where('pass', MD5($pass));
      $this->db->limit(1);

      $query = $this->db->get();

      if($query->num_rows() == 1)
      {
        return $query->result();
      }
      else
      {
        return false;
      }
    }
  }
  ?>