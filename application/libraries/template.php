<?php
class Template {
   private $CI;
   private $template_data = array();
   private $_scripts_header = array();
   private $_breadcrumb = array();
   private $_styles = array();
   public function __construct()
   {
      $this->CI =& get_instance();
   }
   function set($content_area, $value)
   {
      $this->template_data[$content_area] = $value;
   }
    /**
     * add css
     *
     * @param  string $path
     * @param  string $media
     * @return void
     */
    public function add_css($href = NULL, $media = 'screen')
    {
      $href = ltrim($href, "/");
      $link = array(
         'href' => $href,
         'rel' => 'stylesheet',
         'type' => 'text/css'
      );
      if (!empty($media)) {
         $link['media'] = $media;
      }
      $this->_styles[] = link_tag($link);
    }
     /**
     * add js
     * add script on header or footer (before </body>)
     *
     * @param string  $src
     * @param boolean $is_footer
     */
     public function add_js($src, $is_footer = FALSE)
     {
      if (!$is_footer) {
         $this->_scripts_header[] = $this->script_tag($src);
      } else {
         $this->_scripts_footer[] = $this->script_tag($src);
      }
     }
       /**
     * script_tag
     *
     * Generates an javascript heading tag. First param is the data.
     *
     * @access private
     * @param  string
     * @return string
     */
       private function script_tag($src = NULL)
       {
         $scource = base_url(). $src;
         $script = "var s = document.createElement( 'script' );" .
         "s.setAttribute( 'src', " . $scource . " );" .
         "document.body.appendChild( s );" ;


         if (isset($src) and !empty($src)) {
            return '<script src="' .base_url(). $src . '" type="text/javascript"></script>';
         }
         return "";
       }
       /**
        * [load description]
        * @param  string  $template  [description]
        * @param  string  $name      [description]
        * @param  string  $view      [description]
        * @param  array   $view_data [description]
        * @param  boolean $return    [description]
        * @return [type]             [description]
        */
        public function breadcrum($data)
        {
           $html  = '<nav aria-label="breadcrumb" role="navigation">';
           $html .= '<ol class="breadcrumb">';

           foreach ($data as $key => $value){

                 $html .= '<li class="breadcrumb-item">';
                 if(isset($value['url']))
                   $html .= '<a href="'.base_url($value['url']).'">'.$value['name'].'</a>';
                 else
                   $html .= $value['name'];
                 $html .= '</li>';
           }

           $html .= '</ol>';
           $html .= '</nav>';
           $this->_breadcrumb[] = $html;
           return $this->_breadcrumb;
          // return $a;
        }
       /**
        * [load description]
        * @param  string  $template  [description]
        * @param  string  $name      [description]
        * @param  string  $view      [description]
        * @param  array   $view_data [description]
        * @param  boolean $return    [description]
        * @return [type]             [description]
        */
       function load($template = '', $name ='', $view = '' , $view_data = array(), $return = FALSE)
       {
         $this->set($name , $this->CI->load->view($view, $view_data, TRUE));
         $this->set('styles', implode("\r\n", $this->_styles) . "\r\n");
         $this->set('scripts_header', implode("\r\n", $this->_scripts_header) . "\r\n");
         $this->set('breadcrum', implode("\r\n", $this->_breadcrumb) . "\r\n");
         $this->CI->load->view('ci-admin/layout/backend/'.$template, $this->template_data);
       }
       function masterlayoutFondend($template = '', $name ='', $view = '' , $view_data = array(), $return = FALSE)
       {
         $this->set($name , $this->CI->load->view($view, $view_data, TRUE));
         $this->set('styles', implode("\r\n", $this->_styles) . "\r\n");
         $this->set('scripts_header', implode("\r\n", $this->_scripts_header) . "\r\n");
         $this->set('breadcrum', implode("\r\n", $this->_breadcrumb) . "\r\n");
         $this->CI->load->view('layouts/font_end/'.$template, $this->template_data);
       }
    }
    ?>