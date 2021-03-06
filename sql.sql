-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: 0.0.0.0    Database: lively
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AccountAuthority`
--

DROP TABLE IF EXISTS `AccountAuthority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccountAuthority` (
  `UA00` int(8) NOT NULL,
  `AA01` tinyint(1) DEFAULT '0',
  `AA02` tinyint(1) DEFAULT '0',
  `AA03` tinyint(1) DEFAULT '0',
  `AA000` datetime DEFAULT NULL,
  PRIMARY KEY (`UA00`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountAuthority`
--

LOCK TABLES `AccountAuthority` WRITE;
/*!40000 ALTER TABLE `AccountAuthority` DISABLE KEYS */;
INSERT INTO `AccountAuthority` VALUES (4,1,1,1,'2017-03-10 19:08:24');
/*!40000 ALTER TABLE `AccountAuthority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Firm`
--

DROP TABLE IF EXISTS `Firm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Firm` (
  `F00` int(8) NOT NULL AUTO_INCREMENT,
  `F01` varchar(30) DEFAULT NULL,
  `F02` varchar(30) DEFAULT NULL,
  `F03A` int(4) DEFAULT NULL,
  `F03B` int(4) DEFAULT NULL,
  `F03C` text,
  `F04` varchar(30) DEFAULT NULL,
  `F05` varchar(30) DEFAULT NULL,
  `F000` datetime DEFAULT NULL,
  `F001` tinyint(4) DEFAULT '0',
  `F07` varchar(2) DEFAULT NULL,
  `F08` varchar(2) DEFAULT NULL,
  `F09` varchar(2) DEFAULT NULL,
  `F10` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`F00`),
  KEY `F01` (`F01`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Firm`
--

LOCK TABLES `Firm` WRITE;
/*!40000 ALTER TABLE `Firm` DISABLE KEYS */;
INSERT INTO `Firm` VALUES (5,'BE+q/C8/UlbK//JqOjVziA==','asdasdas',0,0,'21ZsBNwxOa2TYGGU9tG85A==','AERNbccB0oBHIDaBjqCuEw==','PUuP5ii12icgCU2fvm8ppQ==','2017-03-27 20:28:34',1,'1','1','0','12312'),(6,'BE+q/C8/UlbK//JqOjVziA==','asdasdas',0,0,'21ZsBNwxOa2TYGGU9tG85A==','AERNbccB0oBHIDaBjqCuEw==','PUuP5ii12icgCU2fvm8ppQ==','2017-03-27 20:28:34',0,'1','1','0','12312');
/*!40000 ALTER TABLE `Firm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GuestBook`
--

DROP TABLE IF EXISTS `GuestBook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GuestBook` (
  `GB00` int(8) NOT NULL AUTO_INCREMENT,
  `UA00` int(8) NOT NULL,
  `F00` int(8) NOT NULL,
  `GB01` text NOT NULL,
  `GB02` text,
  `GB000` datetime DEFAULT NULL,
  `GB001` datetime DEFAULT NULL,
  `GB002A` tinyint(1) DEFAULT '0',
  `GB002B` tinyint(1) DEFAULT '0',
  `GB003` tinyint(1) DEFAULT '0',
  `GB004` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`GB00`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GuestBook`
--

LOCK TABLES `GuestBook` WRITE;
/*!40000 ALTER TABLE `GuestBook` DISABLE KEYS */;
INSERT INTO `GuestBook` VALUES (9,4,5,'7MeJ8KLfgR8Z3KQRw/Y9xczHvG2G3LUwcfKAE6hHSs2KaCVxDwJfjhJbWm6UDewdIQMN304z4KUs\n7cpLKqcihG84eAfaC8Q8sbXq+bm+FGsR3w3GmynJOoWBdAD7z5El','EZsTu1idXH6svWstzKpCEPjtAU3LqqGE9VF/DlUzd5SKg5exo4rVsumV3aPdZbEKBiNt232o4iik\nbOT9jCPl1Q==','2017-03-15 21:45:44','2017-03-15 21:48:56',0,0,1,1),(10,5,5,'5WhZMJqVsVXWKDCVwF4btO4dUAFqgsGnJ7GNb7yh3iJAa8FyVBW6APx3a1sWpqfk','FVfgAy93szEDVzkgdNqAFg==','2017-03-15 22:00:56','2017-03-21 19:07:03',0,0,1,1),(11,4,5,'AsOnAo+YHVhvOALDKzIqyQ==','ybxK2J5Ju2pCn3/rudY8JQ==','2017-03-21 19:08:43','2017-03-26 17:29:54',0,0,0,0),(12,6,5,'7AQPilkcx9qWMtyQio/0hulGazItcEqdV2/R0MZP+KE/Ao60sEb4nTLEcwKGX8Iooo5HIpMjg4pI\ntHwy9YfpOhO3JXxCJrH3sJlp+2rpn1I=',NULL,'2017-03-26 17:42:53',NULL,0,0,0,1);
/*!40000 ALTER TABLE `GuestBook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GusetBook`
--

DROP TABLE IF EXISTS `GusetBook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GusetBook` (
  `GB00` int(8) NOT NULL AUTO_INCREMENT,
  `F00` int(8) DEFAULT NULL,
  `UA00A` int(8) DEFAULT NULL,
  `GB01` text,
  `GB000` datetime DEFAULT NULL,
  `UA00B` int(8) DEFAULT NULL,
  `GB02` text,
  `GB001` datetime DEFAULT NULL,
  `GB002A` tinyint(4) DEFAULT '0',
  `GB002B` tinyint(4) DEFAULT '0',
  `GB003` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`GB00`),
  KEY `F00` (`F00`,`UA00A`,`UA00B`,`GB002A`,`GB002B`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GusetBook`
--

LOCK TABLES `GusetBook` WRITE;
/*!40000 ALTER TABLE `GusetBook` DISABLE KEYS */;
/*!40000 ALTER TABLE `GusetBook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Message` (
  `M00` int(11) NOT NULL AUTO_INCREMENT,
  `UA00A` int(11) DEFAULT NULL,
  `UA00B` int(11) DEFAULT NULL,
  `M01` text,
  `M000` datetime DEFAULT NULL,
  `M001` tinyint(4) DEFAULT '0',
  `M002` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`M00`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (7,6,5,'XZs31dHrhR2lNerBGl5Qjw==','2017-01-07 16:29:29',0,1),(8,6,5,'21ZsBNwxOa2TYGGU9tG85A==','2017-01-07 16:30:49',0,1),(9,5,6,'tAzV/Wn2JZvO06OyGWRgfQ==','2017-01-07 16:32:50',0,1),(10,6,5,'Tix/elxEecwLNRmslnuPVw==','2017-01-07 16:32:58',0,1);
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAccount`
--

DROP TABLE IF EXISTS `UserAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAccount` (
  `UA00` int(11) NOT NULL AUTO_INCREMENT,
  `UA01` varchar(30) DEFAULT NULL,
  `UA02` varchar(70) DEFAULT NULL,
  `UA03` varchar(30) DEFAULT NULL,
  `UA04` text,
  `UA05` varchar(30) DEFAULT NULL,
  `UA000` datetime DEFAULT NULL,
  `UA001` datetime DEFAULT NULL,
  `UA002` tinyint(4) DEFAULT '0',
  `UA003` tinyint(1) DEFAULT '0',
  `UA06` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`UA00`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccount`
--

LOCK TABLES `UserAccount` WRITE;
/*!40000 ALTER TABLE `UserAccount` DISABLE KEYS */;
INSERT INTO `UserAccount` VALUES (4,'Vb1RfOKoHoWZri/3lKGXuA==','36b481152ba40f4eec67cb63e9f1ad785c164e0fcabda0d296ba956c64e0380f','vbWoNo0ihwviKkxnTtvx/g==','1CcJYaZ+fQdOBDwOVba8V4Q8lf/fMlB7aI/nJTPvIO4=','r4jOWSiHDVMzYkEaBTqMGw==','2017-03-10 19:08:24','2017-03-28 01:29:01',0,0,'/RK2hf2clisKpK+NZtYjqQ=='),(5,'HWRZHY8kNOJTrkMhphdzBA==','10578a515b1475b2f1ba6e165a5f33e27cbc43366ded5da4e1d2954b36fe818b','vbWoNo0ihwviKkxnTtvx/g==','Imh8iPrwnKsPRAnQF8K4WQ==','78iOfm8PaSRu8EiG4n24AA==','2017-03-15 21:59:41','2017-03-28 01:29:01',0,0,NULL),(6,'k3sGq1UZ3h1gt8fySi00bQ==','1d9634ef825cb45e9c42ae4a3328fc3d996a92a5e72b6df88ecf83ecaa4a994f','vbWoNo0ihwviKkxnTtvx/g==','0fPFmaOS89iF7g0cpe/tRpAFwKS10kJnKUg8LLjMp7A=','78iOfm8PaSRu8EiG4n24AA==','2017-03-26 17:35:52','2017-03-28 01:29:01',0,0,NULL);
/*!40000 ALTER TABLE `UserAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAccountAction`
--

DROP TABLE IF EXISTS `UserAccountAction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAccountAction` (
  `UAA00` int(8) NOT NULL AUTO_INCREMENT,
  `UA00` int(8) DEFAULT NULL,
  `UAA01` int(8) DEFAULT NULL,
  `UAA02` text,
  `UAA03` text,
  `UAA000` datetime DEFAULT NULL,
  PRIMARY KEY (`UAA00`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccountAction`
--

LOCK TABLES `UserAccountAction` WRITE;
/*!40000 ALTER TABLE `UserAccountAction` DISABLE KEYS */;
INSERT INTO `UserAccountAction` VALUES (48,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-15%2021%3A43%3A14%22%20%3B','124.218.128.37','2017-03-15 21:43:14'),(49,4,1,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20Firm%20(F01%2CF02%2CF03A%2CF03B%2CF03C%2CF04%2CF05%2CF000)%20Values%20(TO_BASE64(AES_ENCRYPT(%222313215%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%22%E7%AD%96%E6%98%AF%22%2C%40key_str%2C%20%40init_vector))%2C%220%22%2C%220%22%2CTO_BASE64(AES_ENCRYPT(%22%E7%AD%96%E6%98%AF%E8%B7%AF%E7%AD%96%E6%98%AF%E5%A5%BD%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%22123132%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%22213213132%22%2C%40key_str%2C%20%40init_vector))%2C%222017-03-15%2021%3A44%3A00%22)%3B','124.218.128.37','2017-03-15 21:44:00'),(50,4,5,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20GuestBook%20(UA00%2CF00%2CGB01%2CGB000)%20Values%20(%224%22%2C%225%22%2CTO_BASE64(AES_ENCRYPT(%22etstesatae%250A%25E7%25AD%2596%25E6%2598%25AF%250A12132%250A%2540%2523!%2524%2524%2523%2523%250A%250A!%2540%2523%2540!%2540%2524%22%2C%40key_str%2C%20%40init_vector))%2C%222017-03-15%2021%3A45%3A44%22)%3B','124.218.128.37','2017-03-15 21:45:44'),(51,4,6,'Update%20GuestBook%20SET%20GB02%3D%20TO_BASE64(AES_ENCRYPT(%22%25E7%25AD%2596%25E6%2598%25AF%250A12313213%250A%250A213143asds%250A%250A%2523%2540%2524%2525%255E*%22%2C%40key_str%2C%20%40init_vector))%2CGB001%3D%20%222017-03-15%2021%3A45%3A59%22%20Where%20GB00%20%3D%20%229%22%3B','124.218.128.37','2017-03-15 21:45:59'),(52,4,6,'Update%20GuestBook%20SET%20GB02%3D%20TO_BASE64(AES_ENCRYPT(%22%25E7%25AD%2596%25E6%2598%25AF%250A12313213%250A%250Aasds%250A%250A%2523%2540%2524%2525%255E*%22%2C%40key_str%2C%20%40init_vector))%2CGB001%3D%20%222017-03-15%2021%3A48%3A56%22%20Where%20GB00%20%3D%20%229%22%3B','124.218.128.37','2017-03-15 21:48:56'),(53,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-15%2021%3A57%3A33%22%20%3B','124.218.128.37','2017-03-15 21:57:33'),(54,4,7,'Update%20GuestBook%20SET%20GB003%3D%20%221%22%20Where%20GB00%20%3D%20%229%22%3B','124.218.128.37','2017-03-15 21:57:37'),(55,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-15%2021%3A58%3A25%22%20%3B','124.218.128.37','2017-03-15 21:58:25'),(56,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-15%2021%3A58%3A56%22%20%3B','124.218.128.37','2017-03-15 21:58:56'),(57,-1,2,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20UserAccount%20(UA01%2CUA02%2CUA03%2CUA04%2CUA05%2CUA000%2CUA001)%20Values%20(TO_BASE64(AES_ENCRYPT(%22n3np6%22%2C%40key_str%2C%20%40init_vector))%2CSHA2(%22ji39417%22%2C%20256)%2CTO_BASE64(AES_ENCRYPT(%220912345678%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%22test%40gmail.com%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%22undefined%22%2C%40key_str%2C%20%40init_vector))%2C%222017-03-15%2021%3A59%3A41%22%2C%222017-03-15%2021%3A59%3A41%22)%3B','124.218.128.37','2017-03-15 21:59:41'),(58,5,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-15%2021%3A59%3A50%22%20%3B','124.218.128.37','2017-03-15 21:59:50'),(59,5,5,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20GuestBook%20(UA00%2CF00%2CGB01%2CGB000)%20Values%20(%225%22%2C%225%22%2CTO_BASE64(AES_ENCRYPT(%22sadasd%250Aasdasda1%250A1212313%250Aasdasd%250A213%22%2C%40key_str%2C%20%40init_vector))%2C%222017-03-15%2022%3A00%3A56%22)%3B','124.218.128.37','2017-03-15 22:00:56'),(60,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-16%2010%3A09%3A08%22%20%3B','60.248.123.154','2017-03-16 10:09:08'),(61,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-20%2020%3A03%3A32%22%20%3B','124.218.128.37','2017-03-20 20:03:32'),(62,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-21%2019%3A05%3A56%22%20%3B','112.104.52.147','2017-03-21 19:05:56'),(63,4,6,'Update%20GuestBook%20SET%20GB02%3D%20TO_BASE64(AES_ENCRYPT(%22aadasda%250A%22%2C%40key_str%2C%20%40init_vector))%2CGB001%3D%20%222017-03-21%2019%3A07%3A03%22%20Where%20GB00%20%3D%20%2210%22%3B','112.104.52.147','2017-03-21 19:07:03'),(64,4,7,'Update%20GuestBook%20SET%20GB003%3D%20%221%22%20Where%20GB00%20%3D%20%2210%22%3B','112.104.52.147','2017-03-21 19:07:19'),(65,4,5,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20GuestBook%20(UA00%2CF00%2CGB01%2CGB000)%20Values%20(%224%22%2C%225%22%2CTO_BASE64(AES_ENCRYPT(%22asdasdas%22%2C%40key_str%2C%20%40init_vector))%2C%222017-03-21%2019%3A08%3A43%22)%3B','112.104.52.147','2017-03-21 19:08:43'),(66,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-21%2019%3A12%3A06%22%20%3B','112.104.52.147','2017-03-21 19:12:06'),(67,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-21%2019%3A53%3A35%22%20%3B','112.104.52.147','2017-03-21 19:53:35'),(68,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-26%2017%3A17%3A01%22%20%3B','124.218.128.37','2017-03-26 17:17:01'),(69,4,6,'Update%20GuestBook%20SET%20GB02%3D%20TO_BASE64(AES_ENCRYPT(%22asdsadadsa%22%2C%40key_str%2C%20%40init_vector))%2CGB001%3D%20%222017-03-26%2017%3A17%3A18%22%20Where%20GB00%20%3D%20%2211%22%3B','124.218.128.37','2017-03-26 17:17:18'),(70,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-26%2017%3A22%3A54%22%20%3B','124.218.128.37','2017-03-26 17:22:54'),(71,4,7,'Update%20GuestBook%20SET%20GB02%3D%20%22null%22%2CGB001%3D%20%22null%22%20Where%20GB00%20%3D%20%2211%22%3B','124.218.128.37','2017-03-26 17:22:57'),(72,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-26%2017%3A28%3A20%22%20%3B','124.218.128.37','2017-03-26 17:28:20'),(73,4,7,'Update%20GuestBook%20SET%20GB004%3D%20%220%22%20Where%20GB00%20%3D%20%2211%22%3B','124.218.128.37','2017-03-26 17:28:23'),(74,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-26%2017%3A29%3A50%22%20%3B','124.218.128.37','2017-03-26 17:29:50'),(75,4,6,'Update%20GuestBook%20SET%20GB02%3D%20TO_BASE64(AES_ENCRYPT(%22asdasdasdas%22%2C%40key_str%2C%20%40init_vector))%2CGB001%3D%20%222017-03-26%2017%3A29%3A54%22%2CGB004%3D%20%221%22%20Where%20GB00%20%3D%20%2211%22%3B','124.218.128.37','2017-03-26 17:29:54'),(76,4,7,'Update%20GuestBook%20SET%20GB004%3D%20%220%22%20Where%20GB00%20%3D%20%2211%22%3B','124.218.128.37','2017-03-26 17:29:56'),(77,-1,2,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20UserAccount%20(UA01%2CUA02%2CUA03%2CUA04%2CUA05%2CUA000%2CUA001)%20Values%20(TO_BASE64(AES_ENCRYPT(%22jackyLee%22%2C%40key_str%2C%20%40init_vector))%2CSHA2(%22jackyLee%22%2C%20256)%2CTO_BASE64(AES_ENCRYPT(%220912345678%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%22jackylee%40gmail.mail%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%22undefined%22%2C%40key_str%2C%20%40init_vector))%2C%222017-03-26%2017%3A35%3A52%22%2C%222017-03-26%2017%3A35%3A52%22)%3B','124.218.128.37','2017-03-26 17:35:52'),(78,6,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-26%2017%3A39%3A49%22%20%3B','124.218.128.37','2017-03-26 17:39:49'),(79,6,5,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20GuestBook%20(UA00%2CF00%2CGB01%2CGB000)%20Values%20(%226%22%2C%225%22%2CTO_BASE64(AES_ENCRYPT(%22adsfdasfs%250A%25E5%2582%25BB%25E9%2580%25BCJackyLee%250A%2520%2520%2520%2520%2520%2520%2520%25202132%22%2C%40key_str%2C%20%40init_vector))%2C%222017-03-26%2017%3A42%3A53%22)%3B','124.218.128.37','2017-03-26 17:42:53'),(80,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2001%3A29%3A54%22%20%3B','124.218.128.37','2017-03-27 01:29:54'),(81,6,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A10%3A22%22%20%3B','124.218.128.37','2017-03-27 15:10:22'),(82,6,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A11%3A16%22%20%3B','124.218.128.37','2017-03-27 15:11:16'),(83,6,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A11%3A58%22%20%3B','124.218.128.37','2017-03-27 15:11:58'),(84,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A18%3A39%22%20%3B','124.218.128.37','2017-03-27 15:18:39'),(85,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A21%3A13%22%20%3B','124.218.128.37','2017-03-27 15:21:13'),(86,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A31%3A49%22%20%3B','124.218.128.37','2017-03-27 15:31:49'),(87,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A33%3A43%22%20%3B','124.218.128.37','2017-03-27 15:33:43'),(88,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A35%3A12%22%20%3B','124.218.128.37','2017-03-27 15:35:12'),(89,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A36%3A32%22%20%3B','124.218.128.37','2017-03-27 15:36:32'),(90,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2015%3A37%3A59%22%20%3B','124.218.128.37','2017-03-27 15:37:59'),(91,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2016%3A08%3A00%22%20%3B','124.218.128.37','2017-03-27 16:08:00'),(92,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2016%3A08%3A54%22%20%3B','124.218.128.37','2017-03-27 16:08:54'),(93,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2016%3A16%3A18%22%20%3B','124.218.128.37','2017-03-27 16:16:18'),(94,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2016%3A24%3A04%22%20%3B','124.218.128.37','2017-03-27 16:24:04'),(95,4,4,'Update%20Firm%20SET%20F01%3D%20TO_BASE64(AES_ENCRYPT(%222313215%22%2C%40key_str%2C%20%40init_vector))%2CF02%3D%20TO_BASE64(AES_ENCRYPT(%22%E7%AD%96%E6%98%AF%22%2C%40key_str%2C%20%40init_vector))%2CF03A%3D%20%220%22%2CF03B%3D%20%220%22%2CF03C%3D%20TO_BASE64(AES_ENCRYPT(%22%E7%AD%96%E6%98%AF%E8%B7%AF%E7%AD%96%E6%98%AF%E5%A5%BD%22%2C%40key_str%2C%20%40init_vector))%2CF04%3D%20TO_BASE64(AES_ENCRYPT(%22123132%22%2C%40key_str%2C%20%40init_vector))%2CF05%3D%20TO_BASE64(AES_ENCRYPT(%22213213132%22%2C%40key_str%2C%20%40init_vector))%2CF000%3D%20%222017-03-27%2016%3A26%3A22%22%20%3B','124.218.128.37','2017-03-27 16:26:22'),(96,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2016%3A32%3A37%22%20%3B','124.218.128.37','2017-03-27 16:32:37'),(97,4,9,'Update%20Firm%20SET%20F001%3D%20%221%22%20%3B','124.218.128.37','2017-03-27 16:33:55'),(98,4,9,'Update%20Firm%20SET%20F001%3D%20%221%22%20%3B','124.218.128.37','2017-03-27 16:34:06'),(99,4,9,'Update%20Firm%20SET%20F001%3D%20%221%22%20%3B','124.218.128.37','2017-03-27 16:34:08'),(100,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2016%3A37%3A17%22%20%3B','124.218.128.37','2017-03-27 16:37:17'),(101,4,9,'Update%20Firm%20SET%20F001%3D%20%221%22%20Where%20F00%20%3D%20%225%22%3B','124.218.128.37','2017-03-27 16:37:24'),(102,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2017%3A54%3A01%22%20%3B','124.218.128.37','2017-03-27 17:54:01'),(103,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2018%3A02%3A15%22%20%3B','124.218.128.37','2017-03-27 18:02:15'),(104,4,1,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20Firm%20(F01%2CF02%2CF03A%2CF03B%2CF03C%2CF04%2CF05%2CF07%2CF08%2CF09%2CF10%2CF000)%20Values%20(TO_BASE64(AES_ENCRYPT(%2212312313%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%221132%22%2C%40key_str%2C%20%40init_vector))%2C%220%22%2C%220%22%2CTO_BASE64(AES_ENCRYPT(%22asdasd%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%2212132%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%2221321%22%2C%40key_str%2C%20%40init_vector))%2C%220%22%2C%220%22%2C%220%22%2C%22undefined%22%2C%222017-03-27%2018%3A02%3A43%22)%3B','124.218.128.37','2017-03-27 18:02:43'),(105,4,1,'SET%20block_encryption_mode%20%3D%20%22aes-128-cbc%22%3BSET%20%40key_str%20%3D%20%22etsetestsetesttt%22%3BSET%20%40init_vector%20%3D%20%22etsttstststtsete%22%3BInsert%20Into%20Firm%20(F01%2CF02%2CF03A%2CF03B%2CF03C%2CF04%2CF05%2CF07%2CF08%2CF09%2CF10%2CF000)%20Values%20(TO_BASE64(AES_ENCRYPT(%2212312313%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%221132%22%2C%40key_str%2C%20%40init_vector))%2C%220%22%2C%220%22%2CTO_BASE64(AES_ENCRYPT(%22asdasd%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%2212132%22%2C%40key_str%2C%20%40init_vector))%2CTO_BASE64(AES_ENCRYPT(%2221321%22%2C%40key_str%2C%20%40init_vector))%2C%220%22%2C%220%22%2C%220%22%2C%22undefined%22%2C%222017-03-27%2018%3A03%3A08%22)%3B','124.218.128.37','2017-03-27 18:03:08'),(106,4,4,'Update%20Firm%20SET%20F01%3D%20TO_BASE64(AES_ENCRYPT(%2212312313%22%2C%40key_str%2C%20%40init_vector))%2CF02%3D%20TO_BASE64(AES_ENCRYPT(%221132%22%2C%40key_str%2C%20%40init_vector))%2CF03A%3D%20%220%22%2CF03B%3D%20%220%22%2CF03C%3D%20TO_BASE64(AES_ENCRYPT(%22asdasd%22%2C%40key_str%2C%20%40init_vector))%2CF04%3D%20TO_BASE64(AES_ENCRYPT(%2212132%22%2C%40key_str%2C%20%40init_vector))%2CF05%3D%20TO_BASE64(AES_ENCRYPT(%2221321%22%2C%40key_str%2C%20%40init_vector))%2CF07%3D%20%220%22%2CF08%3D%20%220%22%2CF09%3D%20%220%22%2CF10%3D%20%22100000%22%2CF000%3D%20%222017-03-27%2018%3A05%3A15%22%20%3B','124.218.128.37','2017-03-27 18:05:15'),(107,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2018%3A05%3A53%22%20%3B','124.218.128.37','2017-03-27 18:05:53'),(108,4,4,'Update%20Firm%20SET%20F01%3D%20TO_BASE64(AES_ENCRYPT(%2212312313%22%2C%40key_str%2C%20%40init_vector))%2CF02%3D%20TO_BASE64(AES_ENCRYPT(%221132%22%2C%40key_str%2C%20%40init_vector))%2CF03A%3D%20%220%22%2CF03B%3D%20%220%22%2CF03C%3D%20TO_BASE64(AES_ENCRYPT(%22asdasd%22%2C%40key_str%2C%20%40init_vector))%2CF04%3D%20TO_BASE64(AES_ENCRYPT(%2212132%22%2C%40key_str%2C%20%40init_vector))%2CF05%3D%20TO_BASE64(AES_ENCRYPT(%2221321%22%2C%40key_str%2C%20%40init_vector))%2CF07%3D%20%221%22%2CF08%3D%20%221%22%2CF09%3D%20%220%22%2CF10%3D%20%2212312%22%2CF000%3D%20%222017-03-27%2018%3A06%3A38%22%20%3B','124.218.128.37','2017-03-27 18:06:38'),(109,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2020%3A28%3A17%22%20%3B','124.218.128.37','2017-03-27 20:28:17'),(110,4,4,'Update%20Firm%20SET%20F01%3D%20TO_BASE64(AES_ENCRYPT(%2212312313%22%2C%40key_str%2C%20%40init_vector))%2CF02%3D%20%22asdasdas%22%2CF03A%3D%20%220%22%2CF03B%3D%20%220%22%2CF03C%3D%20TO_BASE64(AES_ENCRYPT(%22asdasd%22%2C%40key_str%2C%20%40init_vector))%2CF04%3D%20TO_BASE64(AES_ENCRYPT(%2212132%22%2C%40key_str%2C%20%40init_vector))%2CF05%3D%20TO_BASE64(AES_ENCRYPT(%2221321%22%2C%40key_str%2C%20%40init_vector))%2CF07%3D%20%221%22%2CF08%3D%20%221%22%2CF09%3D%20%220%22%2CF10%3D%20%2212312%22%2CF000%3D%20%222017-03-27%2020%3A28%3A34%22%20%3B','124.218.128.37','2017-03-27 20:28:34'),(111,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2022%3A39%3A42%22%20%3B','124.218.128.37','2017-03-27 22:39:42'),(112,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2022%3A46%3A47%22%20%3B','124.218.128.37','2017-03-27 22:46:47'),(113,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2022%3A47%3A40%22%20%3B','124.218.128.37','2017-03-27 22:47:40'),(114,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2023%3A01%3A18%22%20%3B','124.218.128.37','2017-03-27 23:01:18'),(115,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-27%2023%3A07%3A26%22%20%3B','124.218.128.37','2017-03-27 23:07:26'),(116,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-28%2001%3A15%3A17%22%20%3B','124.218.128.37','2017-03-28 01:15:17'),(117,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-28%2001%3A16%3A15%22%20%3B','124.218.128.37','2017-03-28 01:16:15'),(118,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-28%2001%3A17%3A04%22%20%3B','124.218.128.37','2017-03-28 01:17:04'),(119,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-28%2001%3A17%3A38%22%20%3B','124.218.128.37','2017-03-28 01:17:38'),(120,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-28%2001%3A20%3A58%22%20%3B','124.218.128.37','2017-03-28 01:20:58'),(121,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-28%2001%3A25%3A44%22%20%3B','124.218.128.37','2017-03-28 01:25:44'),(122,4,3,'Update%20UserAccount%20SET%20UA001%3D%20%222017-03-28%2001%3A29%3A01%22%20%3B','124.218.128.37','2017-03-28 01:29:01');
/*!40000 ALTER TABLE `UserAccountAction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-27 17:57:18
