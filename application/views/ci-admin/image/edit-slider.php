<form method="post" action="<?php echo base_url('ci-admin/multi-image/edit/'.$data[0]['id']) ?>">
   <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />

   <input type="hidden" name="id" value="<?php echo $data[0]['id'] ?>" id="id">
    <div class="form-group">
      <label for="url">Url : </label>
      <input type="text" class="form-control" value="<?php echo $data[0]['url'] ?>" name="url" id="url">
    </div>

    <div class="form-group">
      <label for="title">Title Image : </label>
      <input type="text" class="form-control" value="<?php echo  $data[0]['title'] ?>" name="title" id="title">
    </div>

    <div class="form-group">
      <label for="alt">Alt Image : </label>
      <input type="text" class="form-control" value="<?php echo  $data[0]['alt'] ?>" name="alt" id="alt">
    </div>

    <div class="form-group">
      <label for="url">Show or Hidden Image : </label>
      <select class="form-control" name="active" id="active">
         <option value="1" <?php if($data[0]['active'] ==1) echo 'selected="selected"'; ?> >Show</option>
         <option value="0" <?php if($data[0]['active'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
    </div>
    <button type="submit" name="subEditMultiImage" class="btn btn-default">Submit</button>
  </form>