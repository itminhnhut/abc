<h2>Create menu</h2>
<form class="form-create-menu" method="post" action="<?php echo base_url('ci-admin/menu/create') ?>">
    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="" name="name">
    </div>

   <div class="form-group">
      <label for="name">Slug:</label>
      <input type="text" class="form-control" id="slug" value="" name="slug">
   </div>

   <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" value="" name="title">
   </div>

   <div class="form-group">
      <label for="alt">Alt:</label>
      <input type="text" class="form-control" id="alt" value="" name="alt">
   </div>

   <div class="form-group">
      <label for="des">Description:</label>
      <textarea class="form-control" rows="5" name="des" id="des"></textarea>
   </div>

   <div class="form-group col-md-4">
      <label for="status">Status:</label>
      <select class="form-control" name="status" id="status">
         <option value="1">Show</option>
         <option value="0">Hidden</option>
      </select>
   </div>
   <div class="col-md-12">
      <button type="submit" name="btnAddMenu" class="btn btn-primary">Submit</button>
     <button type="submit" class="btn btn-default">Back</button>
   </div>
  </form>