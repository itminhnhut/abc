<?php

class Product extends CI_Model
{
   public function __construct(){
      parent::__construct();
    }

    public function MaxPrice()
    {
       $sql = $this->db->select('MAX(price) as MaxPrice')
                ->from('product')
                ->get();
      $rs = $sql->result_array();
      return $rs;
    }
    public function TinTrangLoai($id)
    {
       //`idParent`, `idSubChild`, `idChild`
      $sql = $this->db->select('product.id as id, name, slug , des, content, keyword, description, price, salePrice')
                       ->from('product')
                       ->join('imageProduct', 'imageProduct.idProduct = product.id')
                       ->or_where('idParent =', $id)
                       ->or_where('idSubChild =', $id)
                       ->or_where('idChild =', $id)
                       ->where('product.status',1)
                       ->get();
      $rs = $sql->result_array();
      return $rs;
    }
    public function record_count($id){
       $sql = $this->db->select('product.id AS id, name, slug , des, content, keyword, description, price, salePrice, url_image')
                       ->from('product')
                       ->join('imageProduct', 'imageProduct.idProduct = product.id')
                       ->or_where('idParent =', $id)
                       ->or_where('idSubChild =', $id)
                       ->or_where('idChild =', $id)
                       ->where('product.status',1)
                       ->where('imageProduct.avata',1)

                       ->order_by('id', 'ASC')
                       ->group_by('id')

                       ->get();
      $rs = $sql->result_array();
      return count($rs);
    }
    public function fetch_data($limit, $offset ,$id) {
        $query = $this->db->select('product.id AS id, name, slug ,des, content, keyword, description, price, salePrice, url_image ,avata')
                       ->from('imageProduct')

                       ->where(array('product.status' => 1,'imageProduct.avata' => 1))
                       ->where('idParent' ,$id )
                       ->or_where(array('idSubChild' => $id , 'idChild'=> $id))

                        ->join('product', 'imageProduct.idProduct = product.id')

                       ->order_by('id', 'ASC')
                        ->group_by('id')
                       ->limit($limit,$offset)

                       ->get();

       if ($query->num_rows() > 0) {
          foreach ($query->result_array() as $row) {
             $data[] = $row;
          }

          return $data;
       }
       return false;
    }
    public function tags($id)
    {
       $sql = $this->db->select('product.id AS id , tags ,slug')
                       ->from('product')
                       ->join('imageProduct', 'imageProduct.idProduct = product.id')
                       ->or_where('idParent =', $id)
                       ->or_where('idSubChild =', $id)
                       ->or_where('idChild =', $id)
                       ->where('product.status',1)
                       ->where('imageProduct.avata',1)
                       ->order_by('id', 'ASC')
                       ->group_by('id')

                       ->get();

      $rs = $sql->result_array();
      return $rs;
    }
    //gia min max
    public function record_minmax($id,$min,$max,$limit, $offset){
       $query = $this->db->select('product.id AS id, name, des, slug ,content, keyword, description, price, salePrice, url_image')
                       ->from('product')
                       ->join('imageProduct', 'imageProduct.idProduct = product.id')

                       ->where('price >=', $min)
                       ->where('price <=', $max)
                       ->where('product.status',1)
                       ->where('imageProduct.avata',1)

                       ->where('idParent =', $id)
                       ->or_where('idSubChild =', $id)
                       ->or_where('idChild =', $id)

                       ->order_by('id', 'ASC')
                       ->group_by('id');
   if($limit == 0)
   {
     $query = $this->db->get();
      $rs = $query->result_array();
      return count($rs);
   }
   else
   {
       $query = $this->db->limit($limit,$offset);
       $query = $this->db->get();

       if ($query->num_rows() > 0) {
         foreach ($query->result_array() as $row) {
           $data[] = $row;
         }

         return $data;
       }
       return false;
   }
   // echo $this->db->last_query();die;

    }
}