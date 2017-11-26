<h2>Order Menu</h2>
<div class="menu-box">
   <ul class="menu-list sortable-menu ui-sortable">
      <input type="hidden" name="<?=$csrf['name'];?>" value="<?=$csrf['hash'];?>" />
      <?php foreach($data as $key=>$value): ?>
         <li id="items_<?php echo $value['id']?>">
            <a href="javascript:void(0)" class="ui-sortable-handle handle"><?php  echo $value['name']; ?></a>
            <ul>
               <?php if(count($value['sub']) >=1): ?>
               <?php foreach($value['sub'] as $key1 => $value1): ?>
                  <li id="items_<?php echo $value1['id']?>"><a href="javascript:void(0)" class="ui-sortable-handle handle"><?php  echo $value1['name']; ?></a></li>
                   <ul>
                   <?php if(count($value1['sub']) >=1): ?>
                       <?php foreach($value1['sub'] as $key2 => $value2): ?>
                           <li id="items_<?php echo $value2['id']?>"><a href="javascript:void(0)" class="ui-sortable-handle handle"><?php  echo $value2['name']; ?></a></li>
                       <?php endforeach; ?>
                      <?php endif; ?>
                   </ul>
               <?php endforeach; ?>
            <?php endif; ?>
            </ul>
         </li>
      <?php endforeach; ?>
   </ul>
 </div>