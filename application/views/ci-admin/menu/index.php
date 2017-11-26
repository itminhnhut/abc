<table id="dataMenu" class="table table-striped table-bordered dataTable no-footer" cellspacing="0" width="100%">
   <thead>
      <tr>
         <th>name</th>
         <th>slug</th>
         <th>status</th>
         <th>status Image</th>
         <th></th>
         <th></th>
         <th></th>
      </tr>
   </thead>
</table>
<h3>Order Menu Image</h3>
<table class="table">
   <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
   <thead>
      <tr>
         <th>STT</th>
         <th>Image</th>
      </tr>
   </thead>
      <tbody id="sortable-menu">

      <?php
         //`id`, `image`, `url`, `title`, `alt`, `active`
          $i = 1;
          foreach($orderimg as $key => $value):
      ?>
      <tr class="ui-state-default" id="item-<?php echo $value['id'] ?>">
         <td><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><?php echo $i++; ?></td>
         <td class="image-thumb">
             <img class="img-thumbnail"   src="<?php echo base_url($value['url_image']) ?>" >
         </td>

      </tr>
   <?php endforeach; ?>
   </tbody>