<h2>Form control: input</h2>
<form method="post" action="<?php echo base_url('ci-admin/bill/edit/'.$id) ?>">
   <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />

   <div class="form-group col-md-6">
      <label for="des">Discount : </label>
      <input type="text" class="form-control" id="discount" value="<?php echo $data[0]['discount']?>" name="discount">
   </div>

    <div class="form-group col-md-6">
      <label for="status">Status:</label>
      <select class="form-control" name="status" id="status">
         <option value="1" <?php if($data[0]['status'] ==1) echo 'selected="selected"'; ?> >Đã Giao Hàng</option>
         <option value="0" <?php if($data[0]['status'] ==0) echo 'selected="selected"'; ?> >Chưa Giao Hàng</option>
      </select>
   </div>

   <div class="col-md-12">
     <button type="submit" name="btnEditBill" class="btn btn-primary">Submit</button>
     <button type="submit" name="btnBackBill" class="btn btn-default">Back</button>
   </div>
</form>