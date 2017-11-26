<h2>Create Product</h2>
<!--
`id`, `name`, `slug`, `idParent`, `idSubChild`, `idChild`, `des`, `content`, `keyword`, `description`, `price`, `salePrice`, `create_date`, `status`
 -->
<form class="form-create-product" method="post" action="<?php echo base_url('ci-admin/product/create') ?>">
    <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" value="" name="name">
    </div>

   <div class="form-group">
      <label for="slug">Slug:</label>
      <input type="text" class="form-control" id="slug" value="" name="slug">
   </div>

   <div class="form-group col-md-4 form-select">
      <label for="idParent">idParent:</label>
      <select class="form-control" name="idParent" id="idParent">
         <?php foreach($dataMenu as $key=>$value): ?>
            <option value="<?php  echo $value['id']; ?>"><?php  echo $value['name']; ?></option>
         <?php endforeach; ?>
      </select>
   </div>

   <div id="menu-ajax"></div>

   <div class="form-group">
      <label for="des">des:</label>
      <textarea class="form-control" rows="5" name="des" id="des"></textarea>
   </div>

   <div class="form-group">
      <label for="content">content:</label>
      <textarea class="form-control" rows="5" name="content" id="content"></textarea>
   </div>


   <div class="form-group col-md-6 form-select">
      <label for="price">price:</label>
      <input type="text" class="form-control" id="price" value="" name="price">
    </div>

    <div class="form-group col-md-6 form-select">
      <label for="salePrice">salePrice:</label>
      <input type="text" class="form-control" id="salePrice" value="" name="salePrice">
    </div>

    <div class="form-group">
      <label for="description">description:</label>
      <textarea class="form-control" rows="5" name="description" id="description"></textarea>
   </div>

   <div class="form-group">
      <label for="keyword">keyword:</label>
      <textarea class="form-control" rows="5" name="keyword" id="keyword"></textarea>
   </div>

    <div class="form-group">
      <label for="tags">tags:</label>
      <textarea class="form-control" rows="5" name="tags" id="tags"></textarea>
   </div>

   <div class="form-group col-md-4 form-select">
      <label for="status">Status:</label>
      <select class="form-control" name="status" id="status">
         <option value="1">Show</option>
         <option value="0">Hidden</option>
      </select>
   </div>
   <div class="col-md-12">
      <button type="submit" name="btnAddProduct" class="btn btn-primary">Submit</button>
     <button type="submit" class="btn btn-default">Back</button>
   </div>
  </form>
