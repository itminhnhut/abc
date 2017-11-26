<h2>Upload multi Image</h2>
<div id="dropzone">
  <form action="/upload" class="dropzone" id="my-dropzone">
  <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
   <div class="dz-message needsclick">
      Drop files here or click to upload.<br>
      <span class="note needsclick">(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>
   </div>
  </form>
</div>
