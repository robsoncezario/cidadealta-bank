-- --------------------------------------------------------
-- Servidor:                     localhost
-- Versão do servidor:           8.0.20 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela cidadealta.deposits
CREATE TABLE IF NOT EXISTS `deposits` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Amount` int unsigned NOT NULL,
  `UserId` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `FK_deposits_users` (`UserId`),
  CONSTRAINT `FK_deposits_users` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela cidadealta.deposits: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
INSERT INTO `deposits` (`Id`, `Amount`, `UserId`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 600, 1, '2020-10-27 03:34:12', '2020-10-27 03:34:12'),
	(2, 600, 1, '2020-10-27 03:34:14', '2020-10-27 03:34:14'),
	(3, 200, 1, '2020-10-28 02:50:29', '2020-10-28 02:50:29');
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;

-- Copiando estrutura para tabela cidadealta.transfers
CREATE TABLE IF NOT EXISTS `transfers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Amount` int unsigned NOT NULL,
  `UserId` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SenderId` int NOT NULL,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `FK_transfers_users` (`UserId`),
  KEY `FK_transfers_users_2` (`SenderId`),
  CONSTRAINT `FK_transfers_users` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  CONSTRAINT `FK_transfers_users_2` FOREIGN KEY (`SenderId`) REFERENCES `users` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela cidadealta.transfers: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` (`Id`, `Amount`, `UserId`, `CreatedAt`, `SenderId`, `UpdatedAt`) VALUES
	(1, 600, 2, '2020-10-27 03:37:50', 1, '2020-10-27 03:37:50'),
	(2, 600, 2, '2020-10-27 03:37:54', 1, '2020-10-27 03:37:54'),
	(3, 600, 2, '2020-10-27 03:37:56', 1, '2020-10-27 03:37:56'),
	(4, 600, 2, '2020-10-27 03:38:04', 1, '2020-10-27 03:38:04'),
	(5, 600, 2, '2020-10-27 13:38:08', 1, '2020-10-27 13:38:08'),
	(6, 300, 2, '2020-10-28 02:49:50', 1, '2020-10-28 02:49:50'),
	(7, 450, 2, '2020-10-28 02:50:09', 1, '2020-10-28 02:50:09'),
	(8, 250, 2, '2020-10-28 02:54:46', 1, '2020-10-28 02:54:46');
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;

-- Copiando estrutura para tabela cidadealta.users
CREATE TABLE IF NOT EXISTS `users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(64) NOT NULL DEFAULT '',
  `Money` int DEFAULT '0',
  `BankMoney` int NOT NULL DEFAULT '0',
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela cidadealta.users: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`Id`, `Name`, `Money`, `BankMoney`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 'Robson Cezario', 7400, 2500, '2020-10-26 22:16:50', '2020-10-27 00:23:14'),
	(2, 'Elon Musk', 0, 5000, '2020-10-26 22:16:50', '2020-10-26 22:16:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Copiando estrutura para tabela cidadealta.withdraws
CREATE TABLE IF NOT EXISTS `withdraws` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Amount` int unsigned NOT NULL,
  `UserId` int NOT NULL,
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `FK_withdraws_users` (`UserId`),
  CONSTRAINT `FK_withdraws_users` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela cidadealta.withdraws: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `withdraws` DISABLE KEYS */;
INSERT INTO `withdraws` (`Id`, `Amount`, `UserId`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 300, 1, '2020-10-27 02:33:15', '2020-10-27 02:33:15'),
	(2, 300, 1, '2020-10-27 02:38:43', '2020-10-27 02:38:43'),
	(3, 300, 1, '2020-10-27 02:38:48', '2020-10-27 02:38:48'),
	(4, 300, 1, '2020-10-27 03:11:32', '2020-10-27 03:11:32'),
	(5, 300, 1, '2020-10-27 03:11:38', '2020-10-27 03:11:38'),
	(6, 300, 1, '2020-10-27 03:11:47', '2020-10-27 03:11:47'),
	(7, 300, 1, '2020-10-27 03:12:28', '2020-10-27 03:12:28'),
	(8, 300, 1, '2020-10-27 03:14:55', '2020-10-27 03:14:55'),
	(9, 300, 1, '2020-10-27 03:15:21', '2020-10-27 03:15:21'),
	(10, 300, 1, '2020-10-27 03:15:39', '2020-10-27 03:15:39'),
	(11, 300, 1, '2020-10-27 03:19:50', '2020-10-27 03:19:50'),
	(12, 300, 1, '2020-10-27 03:22:52', '2020-10-27 03:22:52'),
	(13, 300, 1, '2020-10-27 03:25:32', '2020-10-27 03:25:32'),
	(14, 300, 1, '2020-10-27 03:26:38', '2020-10-27 03:26:38'),
	(15, 600, 1, '2020-10-27 03:26:46', '2020-10-27 03:26:46'),
	(16, 600, 1, '2020-10-27 03:26:58', '2020-10-27 03:26:58'),
	(17, 600, 1, '2020-10-27 03:27:26', '2020-10-27 03:27:26'),
	(18, 600, 1, '2020-10-27 03:27:58', '2020-10-27 03:27:58'),
	(19, 600, 1, '2020-10-27 03:29:20', '2020-10-27 03:29:20'),
	(20, 600, 1, '2020-10-27 03:29:27', '2020-10-27 03:29:27'),
	(21, 600, 1, '2020-10-27 03:31:27', '2020-10-27 03:31:27'),
	(22, 100, 1, '2020-10-28 02:50:36', '2020-10-28 02:50:36');
/*!40000 ALTER TABLE `withdraws` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
