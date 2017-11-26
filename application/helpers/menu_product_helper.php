<?php
function MenuProduct($array,$idsub)
{

   $html_sub = '';

   $html_sub .='<div class="form-group col-md-4 form-select">';
   $html_sub .='<label for="idSubChild">idSubChild:</label>';
   $html_sub .='<select class="form-control" name="idSubChild" id="idSubChild">';
   $html_sub .='<option value="0">Mời bạn chọn</option>';
   foreach($array as $key =>$value){
      $html_sub .= '<option value="'.$value['id'].'">'.$value['name'].'</option>';
   }
   $html_sub .='</select>';
   $html_sub .='</div>';

   if($idsub ==0)
   {
      $html_sub .='<div class="form-group col-md-4 form-select idChild">';
      $html_sub .='<label for="idChild">idChild:</label>';
      $html_sub .='<select class="form-control" name="idChild" id="idChild">';
      $html_sub .='<option value="0">Mời bạn chọn</option>';
      $html_sub .='</select>';
      $html_sub .='</div>';

   }
   else
   {
      $html_sub .='<div class="form-group col-md-4 form-select idChild">';
      $html_sub .='<label for="idChild">idChild:</label>';
      $html_sub .='<select class="form-control" name="idChild" id="idChild">';
      $html_sub .='<option value="0">Mời bạn chọn</option>';
      foreach($array as $key =>$value){
         if(count($value['sub']) > 0){
            foreach($value['sub'] as $key1 =>$value1){
               $html_sub .= '<option value="'.$value1['id'].'">'.$value1['name'].'</option>';
            }
         }
      }
      $html_sub .='</select>';
      $html_sub .='</div>';
   }


   echo $html_sub;
}
function MenuProductSub($array){
   if($array == null)
   {
      $html_sub = '';

      $html_sub .='<label for="idSubChild">idSubChild:</label>';
      $html_sub .='<select class="form-control" name="idSubChild" id="idSubChild">';
      $html_sub .='<option value="0">Mời bạn chọn</option>';
      $html_sub .='</select>';
      echo $html_sub;
   }
   else
   {
      $html_parent = '<option value="0">Mời bạn chọn</option>';
      $html_sub = '';

      $html_sub .='<label for="idChild">idChild:</label>';
      $html_sub .='<select class="form-control" name="idChild" id="idChild">';
      $html_sub .='<option value="0">Mời bạn chọn</option>';
      foreach($array as $key =>$value){
         $html_sub .= '<option value="'.$value['id'].'">'.$value['name'].'</option>';
      }
      $html_sub .='</select>';

      echo $html_sub;
   }
}
function MenuEditProduct($array,$array_idloai,$array_idsub,$idloai,$idsub,$idchild)
{
   $html_sub = '';
   $html_sub .='<div class="form-group col-md-4 form-select">';
   $html_sub .='<label for="idParent">idParent:</label>';
   $html_sub .='<select class="form-control" name="idParent" id="idParent">';
   foreach($array as $key =>$value){
      if($value['id'] == $idloai )
         $html_sub .= '<option selected="selected"   value="'.$value['id'].'">'.$value['name'].'</option>';
      else
         $html_sub .= '<option   value="'.$value['id'].'">'.$value['name'].'</option>';
   }
   $html_sub .='</select>';
   $html_sub .='</div>';

   $html_sub .='<div id="menu2-edit-ajax">';
   $html_sub .='<div class="form-group col-md-4 form-select">';
   $html_sub .='<label for="idSubChild">idSubChild:</label>';
   $html_sub .='<select class="form-control" name="idSubChild" id="idSubChild">';

   $html_sub .='<option value="0">Mời bạn chọn</option>';
   foreach($array_idloai as $key =>$value){
      if($value['id'] == $idsub )
         $html_sub .= '<option selected="selected"   value="'.$value['id'].'">'.$value['name'].'</option>';
      else
         $html_sub .= '<option   value="'.$value['id'].'">'.$value['name'].'</option>';
   }

   $html_sub .='</select>';
   $html_sub .='</div>';

   $html_sub .='<div class="form-group col-md-4 form-select idChild">';
   $html_sub .='<label for="idChild">idChild:</label>';
   $html_sub .='<select class="form-control" name="idChild" id="idChild">';
   if($idsub ==0)
      $html_sub .='<option value="0">Mời bạn chọn</option>';
   else
   {
      $html_sub .='<option value="0">Mời bạn chọn</option>';
      foreach($array_idsub as $key =>$value){
         if($value['id'] == $idchild )
            $html_sub .= '<option selected="selected"   value="'.$value['id'].'">'.$value['name'].'</option>';
         else
            $html_sub .= '<option   value="'.$value['id'].'">'.$value['name'].'</option>';
      }
   }


   $html_sub .='</select>';
   $html_sub .='</div>';
   $html_sub .='</div>';

   echo $html_sub;
}
function MenuChangProduct($array_idsub,$idloai){
   $html_sub = '';

   $html_sub .='<div class="form-group col-md-4 form-select">';
   $html_sub .='<label for="idSubChild">idSubChild:</label>';
   $html_sub .='<select class="form-control" name="idSubChild" id="idSubChild">';

   $html_sub .='<option value="0">Mời bạn chọn</option>';
   foreach($array_idsub as $key =>$value){

      $html_sub .= '<option   value="'.$value['id'].'">'.$value['name'].'</option>';
   }

   $html_sub .='</select>';
   $html_sub .='</div>';

   $html_sub .='<div class="form-group col-md-4 form-select idChild">';
   $html_sub .='<label for="idChild">idChild:</label>';
   $html_sub .='<select class="form-control" name="idChild" id="idChild">';
   $html_sub .='<option value="0">Mời bạn chọn</option>';

   $html_sub .='</select>';
   $html_sub .='</div>';

   echo $html_sub;
}
function MenuSubChangProduct($array,$idloai)
{
   $html_sub = '';
   if($array != null)
   {
      $html_sub .='<option value="0">Mời bạn chọn</option>';
      foreach($array as $key =>$value){
         $html_sub .= '<option   value="'.$value['id'].'">'.$value['name'].'</option>';
      }
   }
   else
   {
      $html_sub = '<option value="0">Mời bạn chọn</option>';

   }
   echo $html_sub;
}
function ChangeIdsub($array)
{
   $html_sub = '';
   if($array != null)
   {
      $html_sub .='<option value="0">Mời bạn chọn</option>';
      foreach($array as $key =>$value){
         $html_sub .= '<option   value="'.$value['id'].'">'.$value['name'].'</option>';
      }
   }
   else
   {
      $html_sub = '<option value="0">Mời bạn chọn</option>';

   }
   echo $html_sub;
}
?>