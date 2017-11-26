<h2>Create page</h2>
<!-- `nane`, `slug`, `status`, `show_hiden` -->
<form class="form-create-menu" method="post" action="<?php echo base_url('ci-admin/page/create') ?>">
    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="" name="name">
    </div>

   <div class="form-group">
      <label for="name">Slug:</label>
      <input type="text" class="form-control" id="slug" value="" name="slug">
   </div>


   <div class="form-group col-md-6">
      <label for="status">Hiện ở menu</label>
      <select class="form-control" name="status" id="status">
         <option value="1">Show</option>
         <option value="0">Hidden</option>
      </select>
   </div>
   <div class="form-group col-md-6">
      <label for="show_hiden">Status:</label>
      <select class="form-control" name="show_hiden" id="show_hiden">
         <option value="1">Show</option>
         <option value="0">Hidden</option>
      </select>
   </div>
  
   <div class="col-md-12">
      <button type="submit" name="btnAddPage" class="btn btn-primary">Submit</button>
     <button type="submit" name="btnBackPage" class="btn btn-default">Back</button>
   </div>
  </form>