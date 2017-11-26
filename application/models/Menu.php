<?php

class Menu extends CI_Model
{
   public function __construct(){
      parent::__construct();
    }

    public function check($slug,$id)
    {
      $sql = $this->db->select('id')
                ->from('menu')
                ->where(array('id'=>$id,'slug'=>$slug))
                ->get();
      $rs = $sql->result_array();
      return count($rs);
    }

    public function get_categories_tl($id)
    {
      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('id', $id);
      $this->db->order_by('order_menu','asc');

      $parent = $this->db->get();
      $categories = $parent->result();
      $i=0;
      foreach($categories as $p_cat){
        $categories[$i]->sub = $this->sub_categories_tl($p_cat->id);
        $i++;
      }
      return $categories;
    }


    public function sub_categories_tl($id){
      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('parent', $id);
      $this->db->order_by('order_menu','asc');

      $child = $this->db->get();
      $categories = $child->result();
      $i=0;
      foreach($categories as $p_cat){

        $categories[$i]->sub = $this->sub_categories_tl($p_cat->id);
        $i++;
      }
      return $categories;
    }
}

?>