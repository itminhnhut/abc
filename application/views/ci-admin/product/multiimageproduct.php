<h2>Upload Image for Product</h2>
<div id="dropzone">
  <form action="/upload" class="dropzone" id="my-dropzone-image-product">
  <input type="hidden" id="idProduct" name="idProduct" value="<?php echo $data; ?>">
  <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
   <div class="dz-message needsclick">
      Drop files here or click to upload.<br>
      <span class="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
   </div>
  </form>
</div>
