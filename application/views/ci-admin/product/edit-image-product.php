<form class="form-create-product" method="post" action="<?php echo base_url('ci-admin/product/image/edit/'.$id) ?>">
    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <input type="hidden" name="idProduct" value="<?php echo $data[0]['idProduct'] ?>" />

     <div class="form-group col-md-6 form-select">
      <label for="avata">avata:</label>
      <select class="form-control" name="avata" id="avata">
          <option value="1" <?php if($data[0]['avata'] ==1) echo 'selected="selected"'; ?> >Show</option>
         <option value="0" <?php if($data[0]['avata'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
   </div>

    <div class="form-group col-md-6 form-select">
      <label for="status">Status:</label>
      <select class="form-control" name="status" id="status">
          <option value="1" <?php if($data[0]['status'] ==1) echo 'selected="selected"'; ?> >Show</option>
         <option value="0" <?php if($data[0]['status'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
   </div>
    <div class="col-md-12">
      <button type="submit" name="btnEditImageProduct" class="btn btn-primary">Submit</button>
      <button type="submit" name="btnBackImageProduct" class="btn btn-default">Back</button>
   </div>
</form>