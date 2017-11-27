<h2>Create page content</h2>
<!-- `nane`, `slug`, `status`, `show_hiden` -->
<form class="form-create-page-content" method="post" action="<?php echo base_url('ci-admin/pages/content/edit/'.$data[0]['id']) ?>">
    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <input type="hidden" name="id" value="<?php echo $data[0]['id'] ?>" id="id">

    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="<?php echo $data[0]['name'] ?>" name="name">
    </div>

   <div class="form-group col-md-6">
      <label for="status">Menu Pages</label>
      <select class="form-control" name="idPage" id="idPage">
        <?php 
            foreach($pages as $key =>$value):
        ?>
         <option  value="<?php echo $value['id']?>" <?php if($data[0]['idPage'] == $value['id']) echo 'selected="selected"'; ?> ><?php echo $value['name'] ?></option>
        <?php endforeach; ?>
      </select>
   </div>

   <div class="form-group col-md-6">
      <label for="status">Status</label>
      <select class="form-control" name="status" id="status">
        <option value="1" <?php if($data[0]['status'] ==1) echo 'selected="selected"'; ?> >Show</option>
        <option value="0" <?php if($data[0]['status'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
   </div>

   <div class="form-group col-md-13">
      <label for="content">Content:</label>
      <textarea class="form-control" rows="5" name="content" id="content"><?php echo $data[0]['content'] ?></textarea>
   </div>

   <div class="form-group">
      <label for="description">Description:</label>
      <textarea class="form-control" rows="5" name="description" id="description"><?php echo $data[0]['description'] ?></textarea>
   </div>

   <div class="form-group">
      <label for="keyword">Keyword:</label>
      <textarea class="form-control" rows="5" name="keyword" id="keyword"><?php echo $data[0]['keyword'] ?></textarea>
   </div>

   <div class="col-md-12">
      <button type="submit" name="btnEditContentPage" class="btn btn-primary">Submit</button>
     <button type="submit" name="btnBacContentkPage" class="btn btn-default">Back</button>
   </div>
  </form>