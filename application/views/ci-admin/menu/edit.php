
<h2>Edit menu</h2>
<form  class="form-create-menu" method="post" action="<?php echo base_url('ci-admin/menu/edit/'.$data[0]['id']) ?>">
   <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
   <input type="hidden" name="id" value="<?php echo $data[0]['id'] ?>" id="id">

    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="<?php echo $data[0]['name']?>" name="name">
    </div>

   <div class="form-group">
      <label for="name">Slug:</label>
      <input type="text" class="form-control" id="slug" value="<?php echo $data[0]['name']?>" name="slug">
   </div>

   <div class="form-group">
      <label for="title">Title</label>
      <input type="text" class="form-control" id="title" value="<?php echo $data[0]['title']?>" name="title">
   </div>

   <div class="form-group">
      <label for="alt">Alt:</label>
      <input type="text" class="form-control" id="alt" value="<?php echo $data[0]['alt']?>" name="alt">
   </div>

   <div class="form-group">
      <label for="des">Description:</label>
      <textarea class="form-control" rows="5" name="des" id="des"><?php echo $data[0]['des']?></textarea>
   </div>

   <div class="form-group col-md-4">
      <label for="status">Status:</label>
      <select class="form-control" name="status" id="status">
         <option value="1" <?php if($data[0]['status'] ==1) echo 'selected="selected"'; ?> >Show</option>
         <option value="0" <?php if($data[0]['status'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
   </div>
   <div class="col-md-12">
     <button type="submit" name="btnEditMenu" class="btn btn-primary">Submit</button>
     <button type="submit" name="btnBackMenu" class="btn btn-default">Back</button>
   </div>
  </form>