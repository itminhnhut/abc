<h2>Create page content</h2>
<!-- `nane`, `slug`, `status`, `show_hiden` -->
<form class="form-create-page-content" method="post" action="<?php echo base_url('ci-admin/page/content/create') ?>">
    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="" name="name">
    </div>

   <div class="form-group col-md-6">
      <label for="status">Menu Pages</label>
      <select class="form-control" name="idPage" id="idPage">
        <?php 
            foreach($pages as $key =>$value):
        ?>
         <option value="<?php echo $value['id']?>"><?php echo $value['name'] ?></option>
        <?php endforeach; ?>
      </select>
   </div>

   <div class="form-group col-md-6">
      <label for="status">Status</label>
      <select class="form-control" name="status" id="status">
         <option value="1">Show</option>
         <option value="0">Hidden</option>
      </select>
   </div>

   <div class="form-group col-md-13">
      <label for="content">Content:</label>
      <textarea class="form-control" rows="5" name="content" id="content"></textarea>
   </div>

   <div class="form-group">
      <label for="description">Description:</label>
      <textarea class="form-control" rows="5" name="description" id="description"></textarea>
   </div>

   <div class="form-group">
      <label for="keyword">Keyword:</label>
      <textarea class="form-control" rows="5" name="keyword" id="keyword"></textarea>
   </div>

   <div class="col-md-12">
      <button type="submit" name="btnAddContentPage" class="btn btn-primary">Submit</button>
     <button type="submit" name="btnBacContentkPage" class="btn btn-default">Back</button>
   </div>
  </form>