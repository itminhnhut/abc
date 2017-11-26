<?php
/**
 *
 */
include_once APPPATH . "third_party/PhpOffice/PhpWord/Autoloader.php";

use PhpOffice\PhpWord\Autoloader;
use PhpOffice\PhpWord\Settings;

Autoloader::register();
Settings::loadConfig();
class Ci_Bill extends CI_Controller {

   private $CI;
   public $csrf = null;
   function __construct() {
      parent::__construct();
      // $this->load->library('word');

      $this->CI = &get_instance();
      $this->csrf = array(
         'name' => $this->security->get_csrf_token_name(),
         'hash' => $this->security->get_csrf_hash(),
      );
   }
   public function index() {
      $data = array();
      $breadcrum = array(
         'br1' => array('name' => 'Home', 'url' => 'ci-admin'),
         'br2' => array('name' => 'Bill'),
      );

      $this->template->breadcrum($breadcrum);

      $this->template->load('layout', 'contents', 'ci-admin/bill/index.php', array('data' => $data, 'csrf' => $this->csrf));
   }
   public function edit($id) {
      $breadcrum = array(
         'br1' => array('name' => 'Home', 'url' => 'ci-admin'),
         'br2' => array('name' => 'Bill', 'url' => 'ci-admin/bill'),
         'br3' => array('name' => 'Edit Bill'),
      );

      $this->template->breadcrum($breadcrum);
      //`id`, `idCustomer`, `discount`, `status`
      if (isset($_POST['btnEditBill'])) {
         $discount = $this->security->xss_clean($this->input->post('discount'));
         $status = $this->security->xss_clean($this->input->post('status'));
         $data = array(
            'discount' => $discount,
            'status' => $status,
         );
         $this->db->where('id', $id);
         $this->db->update('bill', $data);
         if ($this->db->trans_status() === TRUE) {
            redirect('ci-admin/bill');
         }
      } else if (isset($_POST['btnBackBill'])) {
         redirect('ci-admin/bill');
      } else {
         $query = $this->db->select('discount , status')->from('bill')->where('id', $id)->get()->result_array();
         $this->template->load('layout', 'contents', 'ci-admin/bill/edit.php', array('id' => $id, 'data' => $query, 'csrf' => $this->csrf));
      }

   }
   public function dataBill() {
      $draw = intval($this->input->get("draw"));
      $start = intval($this->input->get("start"));
      $length = intval($this->input->get("length"));
      $query = $this->db->select('b.id as id, name, sdt, discount, status,create_date')
         ->from('bill As b,customer As c')
         ->where('b.idCustomer = c.id')
         ->order_by('id', 'asc')
         ->get();

      $row = array();
      $data = array();
      foreach ($query->result_array() as $key => $value) {
         $data[] = array(
            $value['name'],
            $value['sdt'],
            $value['discount'] . '%',
            ($value['status']) ? 'Đã Giao Hàng' : 'Chưa Giao Hàng',
            $value['create_date'],
            $value[] = '<a id="printBill" name="' . base_url('ci-admin/bill/prinfBill') . '" data="' . $value['id'] . '"  class="fa fa-print"></span></a>',
            $value[] = '<a href="' . base_url('ci-admin/bill/edit/' . $value['id']) . '"><span type="button"  name="edit" id="" class="glyphicon glyphicon-edit"></span></a>',
            $value[] = '<a href="' . base_url('ci-admin/bill/view/' . $value['id']) . '"><span type="button"  name="edit" id="" class="fa fa-file-o"></span></a>',
         );
      }
      $output = array(
         "draw" => $draw,
         "recordsTotal" => $query->num_rows(),
         "recordsFiltered" => $query->num_rows(),
         "data" => $data,
      );
      echo json_encode($output);
      exit();
   }
   public function view($id) {
      $query = $this->db->select('c.price as price, quantity,p.name As nameProdcut,discount')
         ->from('product AS p ,cart As c , customer AS ct,bill AS b')
         ->where('p.id = c.idProduct and c.idBill = b.id and ct.id = b.idCustomer')
         ->where('b.id', $id)
         ->get()
         ->result_array();

      $customer = $this->db->select('ct.name as nameCustomer,address,sdt,meno,discount')
         ->from('customer AS ct,bill AS b')
         ->where('ct.id = b.idCustomer')
         ->where('b.id', $id)
         ->get()
         ->result_array();
      $breadcrum = array(
         'br1' => array('name' => 'Home', 'url' => 'ci-admin'),
         'br2' => array('name' => 'Bill', 'url' => 'ci-admin/bill'),
         'br3' => array('name' => 'View Bill'),
      );

      $this->template->breadcrum($breadcrum);
      $this->template->load('layout', 'contents', 'ci-admin/bill/view.php', array('id' => $id, 'data' => $query, 'customer' => $customer, 'csrf' => $this->csrf));
   }
   public function prinfBill() {

      $phpWord = new \PhpOffice\PhpWord\PhpWord();
      $phpWord->getCompatibility()->setOoxmlVersion(14);
      $phpWord->getCompatibility()->setOoxmlVersion(15);
      $filename = 'test.docx';
      $section = $phpWord->addSection();
      $section->addText('Hello World! minh nhựt');
      $section->addTextBreak(1);

      $objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
      $objWriter->save($filename);
      // send results to browser to download
      header('Content-Description: File Transfer');
      header('Content-Type: application/octet-stream');
      header('Content-Disposition: attachment; filename=' . $filename);
      header('Content-Transfer-Encoding: binary');
      header('Expires: 0');
      header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
      header('Pragma: public');
      header('Content-Length: ' . filesize($filename));
      flush();
      readfile($filename);
      unlink($filename); // deletes the temporary file
      echo 1;
      exit;
   }
}
?>