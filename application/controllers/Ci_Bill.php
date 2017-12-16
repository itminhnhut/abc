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

    $id = 8;
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

      $phpWord = new \PhpOffice\PhpWord\PhpWord();
      $phpWord->getCompatibility()->setOoxmlVersion(14);
      $phpWord->getCompatibility()->setOoxmlVersion(15);
      $filename = 'test.docx';
      $section = $phpWord->addSection();
     
      $section->addText('Hello World! minh nhựt');
      $section->addTextBreak(1);
      
      $styleTable = array('borderSize' => 6, 'borderColor' => '006699', 'cellMargin' => 80);
      $styleFirstRow = array('borderBottomSize' => 18, 'borderBottomColor' => '0000FF', 'bgColor' => '66BBFF');
      $styleCell = array('valign' => 'center');
      $styleCellBTLR = array('valign' => 'center', 'textDirection' => \PhpOffice\PhpWord\Style\Cell::TEXT_DIR_BTLR);
      $fontStyle = array('bold' => true, 'align' => 'center');
      $fontStyleR = array('bold' => true, 'align' => 'right');
     
    /**
     * 
    */
    $section->addText('Thông tin khách hàng',$fontStyle);
    $phpWord->addTableStyle(' Table', $styleTable);
    $table = $section->addTable(' Table');
    foreach ($customer as $key => $value)
    {
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Tên Khách Hàng', $fontStyleR);
        $table->addCell(7200)->addText($value['nameCustomer']);
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Địa chỉ', $fontStyleR);
        $table->addCell(7200)->addText($value['address']);
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Số điện thoại', $fontStyleR);
        $table->addCell(7200)->addText($value['sdt']);
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Ghi chú', $fontStyleR);
        $table->addCell(7200)->addText($value['meno']);
    }
    /**
     * 
     */
   
    $section->addTextBreak(1);
    $section->addText('Thông tin khách hàng',$fontStyle);
    $phpWord->addTableStyle(' Table', $styleTable);
    $table = $section->addTable(' Table');
    foreach ($customer as $key => $value)
    {
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Tên Khách Hàng', $fontStyleR);
        $table->addCell(7200)->addText($value['nameCustomer']);
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Địa chỉ', $fontStyleR);
        $table->addCell(7200)->addText($value['address']);
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Số điện thoại', $fontStyleR);
        $table->addCell(7200)->addText($value['sdt']);
        $table->addRow();
        $table->addCell(2000, $styleCell)->addText('Ghi chú', $fontStyleR);
        $table->addCell(7200)->addText($value['meno']);
    }
    /**
     * 
     */
    $section->addTextBreak(1);
    $section->addText('Sản phẩm khác hàng',$fontStyle);
    $phpWord->addTableStyle('Fancy Table', $styleTable, $styleFirstRow);
    $table = $section->addTable('Fancy Table');
    $table->addRow(400);
    $table->addCell(500, $styleCell)->addText('STT', $fontStyle);
    $table->addCell(6000, $styleCell)->addText('Tên Sản Phẩm', $fontStyle);
    $table->addCell(1500, $styleCell)->addText('Giá', $fontStyle);
    $table->addCell(1500, $styleCell)->addText('Số Lượng', $fontStyle);
    $table->addCell(1500, $styleCell)->addText('Tổng Tiền', $fontStyle);
    $i = 1;
    $total = 0;
    foreach ($query as $key => $value)
    {
        $total += $value['price'] * $value['quantity'];
        $table->addRow();
        $table->addCell(2000)->addText($i++);
        $table->addCell(2000)->addText($value['nameProdcut']);
        $table->addCell(2000)->addText(number_format($value['price']));
        $table->addCell(2000)->addText($value['quantity']);
        $table->addCell(2000)->addText(number_format($value['quantity'] * $value['price']));
        if($i ==(count($query)+1)):
          $table->addRow();
          $table->addCell(2000)->addText();
          $table->addCell(2000)->addText();
          $table->addCell(2000)->addText();
          $table->addCell(2000)->addText('Tổng Tiền');
          $table->addCell(2000)->addText(number_format($total));
        endif;
        if(($value['discount'] >0)&& $i ==(count($query)+1)) :
            $table->addRow();
            $table->addCell(2000)->addText();
            $table->addCell(2000)->addText();
            $table->addCell(2000)->addText();
            $table->addCell(2000)->addText('Giảm Giá');
            $table->addCell(2000)->addText($value['discount'].' %');

            $table->addRow();
            $table->addCell(2000)->addText();
            $table->addCell(2000)->addText();
            $table->addCell(2000)->addText();
            $table->addCell(2000)->addText('Tổng Tiền');
            $table->addCell(2000)->addText(number_format($total - (($total*$value['discount'])/100)));
        endif;
    }
    /**
     * 
     */
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