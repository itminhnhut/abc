<h2>Đây là trang view của bill</h2>
<form>
   <table class="table table-hover">
      <thead>
         <tr>
            <th>STT</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
         </tr>
      </thead>
      <tbody>
         <?php
            $i = 1;
            $total = 0;
            foreach($data as $key => $value):

               $total += $value['price'] * $value['quantity'];
         ?>
         <tr>
            <td><?php echo $i++ ?></td>
            <td><?php echo $value['nameProdcut']; ?></td>
            <td><?php echo number_format($value['price']).' VNĐ'; ?></td>
            <td><?php echo $value['quantity']; ?></td>
            <td><?php echo number_format($value['price'] * $value['quantity']).' VNĐ' ?></td>
         </tr>
         <?php if($i ==(count($data)+1)): ?>
            <tr>
               <td></td>
               <td></td>
               <td></td>
               <td>Total : </td>
               <td><?php echo number_format($total) ?> VNĐ</td>
            </tr>
         <?php endif; ?>
         <?php if(($value['discount'] >0)&& $i ==(count($data)+1)) : ?>
            <tr>
               <td></td>
               <td></td>
               <td></td>
               <td>Giảm Giá : </td>
               <td><?php echo $value['discount'].' %'; ?></td>
            </tr>
             <tr>
               <td></td>
               <td></td>
               <td></td>
               <td>Total : </td>
               <td><?php echo number_format($total - (($total*$value['discount'])/100)).' VNĐ'; ?> </td>
            </tr>
         <?php endif;  ?>
         <?php endforeach; ?>

      </tbody>
   </table>
   <h2>Thông tin Khách Hàng</h2>
   <table class="table table-condensed">
    <thead>
      <tr>
        <th style="width:15%"></th>
        <th style="width:80%"></th>
      </tr>
    </thead>
    <tbody>
     <?php foreach($customer as $key => $value): ?>
      <tr>
        <td>Tên khách hàng : </td>
        <td><?php echo $value['nameCustomer']; ?></td>
      </tr>
      <tr>
        <td>Địa chỉ : </td>
        <td><?php echo $value['address']; ?></td>
      </tr>
      <tr>
        <td>Số điện thoại : </td>
        <td><?php echo '0'.$value['sdt']; ?></td>
      </tr>
      <tr>
        <td>Ghi chú : </td>
        <td><?php echo $value['meno']; ?></td>
      </tr>
     <?php endforeach; ?>

    </tbody>
  </table>
</form>