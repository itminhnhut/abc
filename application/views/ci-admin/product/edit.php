<h2>Edit Product</h2>
<!--
`id`, `name`, `slug`, `idParent`, `idSubChild`, `idChild`, `des`, `content`, `keyword`, `description`, `price`, `salePrice`, `create_date`, `status`
 -->
<form class="form-create-product" method="post" action="<?php echo base_url('ci-admin/product/edit/'.$data[0]['id']) ?>">
    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <input type="hidden" name="id" value="<?php echo $data[0]['id'] ?>" id="id">

    <input type="hidden" id="idParent" value="<?php echo $data[0]['idParent']?>">
    <input type="hidden" id="idSubChild" value="<?php echo $data[0]['idSubChild']?>">
    <input type="hidden" id="idChild" value="<?php echo $data[0]['idChild']?>">

    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="<?php echo $data[0]['name']?>" name="name">
    </div>

   <div class="form-group">
      <label for="slug">Slug:</label>
      <input type="text" class="form-control" id="slug" value="<?php echo $data[0]['slug']?>" name="slug">
   </div>


   <div id="menu-edit-ajax"></div>

   <div class="form-group">
      <label for="des">des:</label>
      <textarea class="form-control" rows="5" name="des" id="des"><?php echo $data[0]['des']?></textarea>
   </div>

   <div class="form-group">
      <label for="content">content:</label>
      <textarea class="form-control" rows="5" name="content" id="content"><?php echo $data[0]['content']?></textarea>
   </div>


   <div class="form-group col-md-6 form-select">
      <label for="price">price:</label>
      <input type="text" class="form-control" id="price" value="<?php echo $data[0]['price']?>" name="price">
    </div>

    <div class="form-group col-md-6 form-select">
      <label for="salePrice">salePrice:</label>
      <input type="text" class="form-control" id="salePrice" value="<?php echo $data[0]['salePrice']?>" name="salePrice">
    </div>

    <div class="form-group">
      <label for="description">description:</label>
      <textarea class="form-control" rows="5" name="description" id="description"><?php echo $data[0]['description']?></textarea>
   </div>

   <div class="form-group">
      <label for="keyword">keyword:</label>
      <textarea class="form-control" rows="5" name="keyword" id="keyword"><?php echo $data[0]['keyword']?></textarea>
   </div>

   <div class="form-group">
      <label for="tags">tags:</label>
      <textarea class="form-control" rows="5" name="tags" id="tags"><?php echo $data[0]['tags']?></textarea>
   </div>

   <div class="form-group col-md-4 form-select">
      <label for="status">Status:</label>
      <select class="form-control" name="status" id="status">
          <option value="1" <?php if($data[0]['status'] ==1) echo 'selected="selected"'; ?> >Show</option>
         <option value="0" <?php if($data[0]['status'] ==0) echo 'selected="selected"'; ?> >Hidden</option>
      </select>
   </div>
   <div class="col-md-12">
      <button type="submit" name="btnEditProduct" class="btn btn-primary">Submit</button>
     <button type="submit" name="btnBackProduct" class="btn btn-default">Back</button>
   </div>
  </form>
