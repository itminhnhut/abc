<?php
  /**
  *
  */
  class MenuMulti extends CI_Model
  {
    public function __construct(){
      parent::__construct();
    }
    public function get_categories()
    {
      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('parent', 0);
      $this->db->order_by('order_menu','asc');

      $parent = $this->db->get();
      $categories = $parent->result();
      $i=0;
      foreach($categories as $p_cat){
        $categories[$i]->sub = $this->sub_categories($p_cat->id);
        $i++;
      }
      return $categories;
    }
    public function sub_categories($id){

      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('parent', $id);
      $this->db->order_by('order_menu','asc');

      $child = $this->db->get();
      $categories = $child->result();
      $i=0;
      foreach($categories as $p_cat){

        $categories[$i]->sub = $this->sub_categories($p_cat->id);
        $i++;
      }
      return $categories;
    }

    public function get_categories_auto($id)
    {
      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('parent', $id);
      $this->db->order_by('order_menu','asc');

      $parent = $this->db->get();
      $categories = $parent->result();
      $i=0;
      foreach($categories as $p_cat){
        $categories[$i]->sub = $this->sub_categories($p_cat->id);
        $i++;
      }
      return $categories;
    }

    public function get_categories_id($id)
    {
      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('parent', $id);
      $this->db->order_by('order_menu','asc');

      $parent = $this->db->get();
      $categories = $parent->result();
      $i=0;
      foreach($categories as $p_cat){
        $categories[$i]->sub = $this->sub_categories_id($p_cat->id);
        $i++;
      }
      return $categories;
    }

    public function sub_categories_id($id){
      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('parent', $id);
      $this->db->order_by('order_menu','asc');

      $child = $this->db->get();
      $categories = $child->result();
      $i=0;
      foreach($categories as $p_cat){

        $categories[$i]->sub = $this->sub_categories_id($p_cat->id);
        $i++;
      }
      return $categories;
    }

    public function sub_categories_auto($id){
      $this->db->select('*');
      $this->db->from('menu');
      $this->db->where('parent', $id);
      $this->db->order_by('order_menu','asc');

      $child = $this->db->get();
      $categories = $child->result();
      $i=0;
      foreach($categories as $p_cat){

        $categories[$i]->sub = $this->sub_categories($p_cat->id);
        $i++;
      }
      return $categories;
    }

  }
  ?>