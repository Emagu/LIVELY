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
  PRIMARY KEY (`F00`),
  KEY `F01` (`F01`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Firm`
--

LOCK TABLES `Firm` WRITE;
/*!40000 ALTER TABLE `Firm` DISABLE KEYS */;
/*!40000 ALTER TABLE `Firm` ENABLE KEYS */;
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
  `UA04` varchar(30) DEFAULT NULL,
  `UA05` varchar(30) DEFAULT NULL,
  `UA000` datetime DEFAULT NULL,
  `UA001` datetime DEFAULT NULL,
  `UA002` tinyint(4) DEFAULT '0',
  `UA06` int(2) DEFAULT '0',
  PRIMARY KEY (`UA00`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccount`
--

LOCK TABLES `UserAccount` WRITE;
/*!40000 ALTER TABLE `UserAccount` DISABLE KEYS */;
INSERT INTO `UserAccount` VALUES (5,'NdcFoCKlLc2ueLeQ9lPDMA==','cdaed6ea5a9f868681909e3f32da9a9d1d5a427496821af29c3bb7277a06fa63','ZbVqNmFFBDbLVvxz2+EDmA==','HgZq+X0ua+PU5s+rFxPc2ulR47Piar','vXnndQuFeD1xYb6j5qzjbQ==','2017-01-07 08:39:30','2017-01-13 09:37:22',0,2),(6,'w8waT7pEDdbmVJfCPc8T0A==','cdaed6ea5a9f868681909e3f32da9a9d1d5a427496821af29c3bb7277a06fa63','ZbVqNmFFBDbLVvxz2+EDmA==','HgZq+X0ua+PU5s+rFxPc2ulR47Piar','vXnndQuFeD1xYb6j5qzjbQ==','2017-01-07 15:25:06','2017-01-07 15:25:06',0,0);
/*!40000 ALTER TABLE `UserAccount` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-09  3:49:48
