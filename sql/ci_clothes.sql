/*
Navicat MySQL Data Transfer

Source Server         : 192.168.10.10
Source Server Version : 50720
Source Host           : 192.168.10.10:3306
Source Database       : ci_clothes

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2017-11-25 11:30:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `url_image` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `title` varchar(10) NOT NULL,
  `alt` varchar(10) NOT NULL,
  `order_image` tinyint(3) NOT NULL,
  `active` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('3', 'uploads/multi-banner/1510475786-15-500x600.jpg', '15-500x600.jpg', '', '', '', '0', '1');
INSERT INTO `banner` VALUES ('4', 'uploads/multi-banner/1510475786-10-500x600.jpg', '10-500x600.jpg', '', '', '', '0', '1');
INSERT INTO `banner` VALUES ('5', 'uploads/multi-banner/1510475786-18-115x148.jpg', '18-115x148.jpg', '', '', '', '0', '1');

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `idCustomer` int(100) NOT NULL,
  `discount` int(100) NOT NULL,
  `status` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bill
-- ----------------------------
INSERT INTO `bill` VALUES ('1', '1', '10', '1');
INSERT INTO `bill` VALUES ('3', '2', '0', '0');
INSERT INTO `bill` VALUES ('4', '3', '0', '0');
INSERT INTO `bill` VALUES ('5', '4', '0', '0');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `idProduct` int(100) NOT NULL,
  `price` int(100) NOT NULL,
  `quantity` int(100) NOT NULL,
  `idBill` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('1', '1', '10000', '2', '1');
INSERT INTO `cart` VALUES ('2', '2', '10000', '4', '2');
INSERT INTO `cart` VALUES ('3', '619', '61000', '1', '3');
INSERT INTO `cart` VALUES ('4', '619', '61000', '1', '4');
INSERT INTO `cart` VALUES ('5', '1', '20000', '4', '5');

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sdt` int(100) NOT NULL,
  `meno` varchar(100) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('1', 'nhut', 'test', '', '1667423434', 'test', '2017-11-12 00:00:00');
INSERT INTO `customer` VALUES ('2', 'aaaaa', 'ttttt', 'itnguyenhominhnhut@gmail.com', '1667423430', 'ttttt', '2017-11-20 16:55:23');
INSERT INTO `customer` VALUES ('3', 'adsaaa', 'ttt', 'itnguyenhominhnhut@gmail.com', '1667423434', 'aaaaa', '2017-11-20 16:56:23');
INSERT INTO `customer` VALUES ('4', 'nhut', 'aaa', 'itnguyenhominhnhut@gmail.com', '1667423434', 'aaaaa', '2017-11-24 16:11:47');

-- ----------------------------
-- Table structure for imagefooter
-- ----------------------------
DROP TABLE IF EXISTS `imagefooter`;
CREATE TABLE `imagefooter` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `url_image` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `title` varchar(10) NOT NULL,
  `alt` varchar(10) NOT NULL,
  `order_image` tinyint(3) NOT NULL,
  `active` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of imagefooter
-- ----------------------------
INSERT INTO `imagefooter` VALUES ('1', 'uploads/multi-footer/1510476165-4-480x635.jpg', '4-480x635.jpg', '', '', '', '2', '1');
INSERT INTO `imagefooter` VALUES ('3', 'uploads/multi-footer/1510476165-10-500x600.jpg', '10-500x600.jpg', '', '', '', '1', '1');

-- ----------------------------
-- Table structure for imageProduct
-- ----------------------------
DROP TABLE IF EXISTS `imageProduct`;
CREATE TABLE `imageProduct` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `idProduct` int(100) NOT NULL,
  `url_image` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `avata` tinyint(3) NOT NULL,
  `status` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of imageProduct
-- ----------------------------
INSERT INTO `imageProduct` VALUES ('1', '1', 'uploads/product/multi-image/1/1511454434-1510420922-4-480x635.jpg', '1510420922-4-480x635.jpg', '1', '1');
INSERT INTO `imageProduct` VALUES ('2', '2', 'uploads/product/multi-image/2/1511454590-1510420922-4-480x635.jpg', '1510420922-4-480x635.jpg', '1', '1');
INSERT INTO `imageProduct` VALUES ('3', '3', 'uploads/product/multi-image/3/1511454638-1510420922-4-480x635.jpg', '1510420922-4-480x635.jpg', '1', '1');
INSERT INTO `imageProduct` VALUES ('4', '4', 'uploads/product/multi-image/4/1511454672-1510420922-4-480x635.jpg', '1510420922-4-480x635.jpg', '1', '1');
INSERT INTO `imageProduct` VALUES ('5', '5', 'uploads/product/multi-image/5/1511533383-1510420922-4-480x635.jpg', '1510420922-4-480x635.jpg', '1', '1');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `alt` varchar(100) NOT NULL,
  `des` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `url_image` varchar(100) NOT NULL,
  `img` varchar(100) NOT NULL,
  `menu_image` tinyint(3) NOT NULL,
  `status_menu_img` tinyint(3) NOT NULL,
  `order_menu` int(10) NOT NULL,
  `parent` int(10) NOT NULL,
  `status` tinyint(3) NOT NULL,
  `menu` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', 'Quần áo người lớn 1', 'Quần áo người lớn', 'Quần áo người lớn', 'Quần áo người lớn', 'quan-ao-nguoi-lon-1', './uploads/menu/15104765700_1.jpg', '15104765700_1.jpg', '2', '1', '1', '0', '1', '1');
INSERT INTO `menu` VALUES ('2', 'Quần áo người lớn 2', 'Quần áo người lớn 2', 'Quần áo người lớn 2', '', 'quan-ao-nguoi-lon-2', './uploads/menu/15104766980_1.jpg', '15104766980_1.jpg', '1', '1', '2', '1', '1', '0');
INSERT INTO `menu` VALUES ('3', 'Quần áo người lớn 3', 'Quần áo người lớn 3', 'Quần áo người lớn 3', '', 'Quần áo người lớn 3', '', '', '0', '0', '4', '2', '1', '0');
INSERT INTO `menu` VALUES ('4', 'Quần áo người lớn 4', 'Quần áo người lớn 4', 'Quần áo người lớn 4', '', 'quan-ao-nguoi-lon-4', '', '', '0', '0', '3', '2', '0', '0');
INSERT INTO `menu` VALUES ('5', 'Quần áo người lớn 5', 'Quần áo người lớn 6', 'Quần áo người lớn 6', 'Quần áo người lớn 6', 'quan-ao-nguoi-lon-6', '', '', '0', '0', '4', '0', '0', '1');
INSERT INTO `menu` VALUES ('6', 'Quần áo người lớn 6', 'Quần áo người lớn 7', 'Quần áo người lớn 7', 'Quần áo người lớn 7', 'quan-ao-nguoi-lon-7', '', '', '0', '0', '5', '8', '0', '0');
INSERT INTO `menu` VALUES ('7', 'Quần áo người lớn 7', 'Quần áo người lớn 8', 'Quần áo người lớn 8', 'Quần áo người lớn 8', 'quan-ao-nguoi-lon-8', '', '', '0', '0', '4', '8', '0', '0');
INSERT INTO `menu` VALUES ('8', 'Quần áo người lớn 8', 'Quần áo người lớn 9', 'Quần áo người lớn 9', 'Quần áo người lớn 9', 'quan-ao-nguoi-lon-9', '', '', '0', '0', '3', '1', '0', '0');
INSERT INTO `menu` VALUES ('9', 'Quần áo người lớn 9', 'Quần áo người lớn 10', 'Quần áo người lớn 10', 'Quần áo người lớn 10', 'quan-ao-nguoi-lon-10', '', '', '0', '0', '5', '5', '0', '1');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `idParent` int(100) NOT NULL,
  `idSubChild` int(100) NOT NULL,
  `idChild` int(100) NOT NULL,
  `des` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `keyword` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `price` int(100) NOT NULL,
  `salePrice` int(100) NOT NULL,
  `create_date` datetime NOT NULL,
  `status` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', 'áo thun nam', 'ao-thun-nam', '1', '2', '4', '', '<p>áo thun nam</p>\r\n', '', '', 'áo thun nam', '50000', '20000', '2017-11-23 16:28:22', '1');
INSERT INTO `product` VALUES ('2', 'áo thun nam-1', 'ao-thun-nam-1', '1', '2', '4', '', '<p>áo thun nam</p>\r\n', '', '', 'áo thun nam 1', '70000', '0', '2017-11-23 16:28:22', '1');
INSERT INTO `product` VALUES ('3', 'áo thun nam-2', 'ao-thun-nam-2', '1', '2', '4', '', '<p>áo thun nam</p>\r\n', '', '', 'áo thun nam 2', '80000', '0', '2017-11-23 16:28:22', '1');
INSERT INTO `product` VALUES ('4', 'áo thun nam-3', 'ao-thun-nam-3', '1', '2', '4', '', '<p>áo thun nam</p>\r\n', '', '', 'áo thun nam 3', '90000', '0', '2017-11-23 16:28:22', '1');
INSERT INTO `product` VALUES ('5', 'áo thun nam 4', 'ao-thun-nam-4', '1', '2', '4', '', '<p>áo thun nam</p>\r\n', '', '', 'áo thun nam 3', '100000', '0', '2017-11-23 16:28:22', '1');

-- ----------------------------
-- Table structure for slider
-- ----------------------------
DROP TABLE IF EXISTS `slider`;
CREATE TABLE `slider` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `url_image` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `title` varchar(10) NOT NULL,
  `alt` varchar(10) NOT NULL,
  `order_image` tinyint(3) NOT NULL,
  `active` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of slider
-- ----------------------------
INSERT INTO `slider` VALUES ('1', 'uploads/multi-slider/1510475291-1-480x635.jpg', '1-480x635.jpg', '', '', '', '2', '1');
INSERT INTO `slider` VALUES ('6', 'uploads/multi-slider/1510477480-4-500x600.jpg', '4-500x600.jpg', '', '', '', '0', '1');
INSERT INTO `slider` VALUES ('7', 'uploads/multi-slider/1510477480-1-500x600.jpg', '1-500x600.jpg', '', '', '', '0', '1');
INSERT INTO `slider` VALUES ('8', 'uploads/multi-slider/1510477492-15-500x600.jpg', '15-500x600.jpg', '', '', '', '0', '1');
INSERT INTO `slider` VALUES ('9', 'uploads/multi-slider/1510477492-18-115x148.jpg', '18-115x148.jpg', '', '', '', '0', '1');
INSERT INTO `slider` VALUES ('11', 'uploads/multi-slider/1510477496-19-115x148.jpg', '19-115x148.jpg', '', '', '', '0', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `group_admin` tinyint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '827ccb0eea8a706c4c34a16891f84e7b', '1');
