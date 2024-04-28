-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `tpVirtualisation`;
CREATE DATABASE `tpVirtualisation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tpVirtualisation`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cv` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `nom`, `prenom`, `mail`, `password`, `cv`, `photo`) VALUES
(1,	'undefined',	'undefined',	'undefined',	'undefined',	'http://localstack:4566/mes-fichiers/aaron.jpg',	'http://localstack:4566/mes-fichiers/aaron.jpg'),
(2,	'GHEMNING',	'Aaron',	'aaron@gmail.com',	'password',	'http://localstack:4566/mes-fichiers/CV_GHEMNING%20KOM_Aaron%20Laurent.pdf',	'http://localstack:4566/mes-fichiers/OLC.jpeg');

-- 2024-04-18 19:13:05
