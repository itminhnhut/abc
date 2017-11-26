<h2>Product Image</h2>

<!-- `idProduct`, `url_image`, `image`, `avata`, `status` -->
<table class="table productImage">
   <thead>
      <tr>
         <th>Image</th>
         <th>Name Image</th>
         <th>Avata</th>
         <th>Status</th>
         <th>
            <a href="<?php echo base_url('ci-admin/product/upload-multi-image-product/'.$id)?>">Upload Multi Image</a></th>
      </tr>
   </thead>
   <tbody>

      <?php foreach($data as $key => $value): ?>
      <tr>

         <td class="image-thumb">
             <img class="img-thumbnail"   src="<?php echo base_url($value['url_image']) ?>" >
         </td>
         <td><?php echo $value['image'] ?></td>
         <td>
            <a title="<?php echo ($value['avata'] == 1 ) ? 'Avata On' : 'Avata off' ?>" class="<?php echo ($value['avata'] == 1 ) ? 'fa fa-toggle-on' : 'fa fa-toggle-off' ?>" href=""></a>
         </td>
         <td>
            <a title="<?php echo ($value['status'] == 1 ) ? 'Status On' : 'Status Off' ?>" class="<?php echo ($value['status'] == 1 ) ? 'fa fa-toggle-on' : 'fa fa-toggle-off' ?>" href=""></a>
         </td>
         <td>
            <a title="Edit" href="<?php echo base_url('ci-admin/product/image/edit/'.$value['id']) ?>" class="fa fa-pencil-square-o"></a>
         </td>
      </tr>
     <?php endforeach; ?>
   </tbody>
</table>