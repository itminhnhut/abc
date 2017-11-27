<?php

class Pages extends CI_Model
{
   public function __construct(){
      parent::__construct();
    }
    public function show()
    {
        $sql = $this->db->select('id,name')
                          ->where('show_hiden',1)
                          ->get('pages');
        $rs = $sql->result_array();
        return $rs;
    }
}
