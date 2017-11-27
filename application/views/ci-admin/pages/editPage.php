<h2>Edit page</h2>
<!-- `nane`, `slug`, `status`, `show_hiden` -->
<form class="form-create-menu" method="post" action="<?php echo base_url('ci-admin/page/edit/'.$data[0]['id']) ?>">
   <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
   <input type="hidden" name="id" value="<?php echo $data[0]['id'] ?>" id="id">

    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="<?php echo $data[0]['name']?>" name="name">
    </div>

   <div class="form-group">
      <label for="name">Slug:</label>
      <input type="text" class="form-control" id="slug" value="<?php echo $data[0]['slug']?>" name="slug">
   </div>


   <div class="form-group col-md-6">
      <label for="status">Hiện ở menu</label>
      <select class="form-control" name="status" id="status">
        <option value="1" <?php if($data[0]['status'] ==1) echo 'selected="selected"'; ?> >Show</option>
        <option value="0" <?php if($data[0]['status'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
   </div>
   <div class="form-group col-md-6">
      <label for="show_hiden">Status:</label>
      <select class="form-control" name="show_hiden" id="show_hiden">
        <option value="1" <?php if($data[0]['show_hiden'] ==1) echo 'selected="selected"'; ?> >Show</option>
        <option value="0" <?php if($data[0]['show_hiden'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
   </div>
  
   <div class="col-md-12">
      <button type="submit" name="btnEditPage" class="btn btn-primary">Submit</button>
     <button type="submit" name="btnBackPage" class="btn btn-default">Back</button>
   </div>
  </form>