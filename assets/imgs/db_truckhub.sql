-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2024 at 11:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_truckhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

CREATE TABLE `tbl_accounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `subscription_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`id`, `user_id`, `username`, `password`, `subscription_id`, `status`, `role`) VALUES
(9, 19, 'ads', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 3, 1),
(10, 20, 'puso', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 2, 1),
(11, 21, '123', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 2, 1),
(12, 22, '12321312321', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 2, 1),
(13, 23, '12321312321', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 2, 1),
(14, 24, '12321312321', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 2, 1),
(15, 25, '12321312321', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 1, 1),
(16, 26, '12321312321', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 1, 1),
(17, 27, '12321312321', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 1, 1),
(18, 28, 'wanna', '6f8df95976135296ce1fe4ffb71ab8401d3eae1ddb955dcac7', NULL, 1, 1),
(19, 29, 'wanna', '6f8df95976135296ce1fe4ffb71ab8401d3eae1ddb955dcac7', NULL, 1, 1),
(20, 30, 'johndoe123', 'ef92b778bafe771e89245b89ecbc08a44a4e166c0665991188', 4, 2, 2),
(21, 31, 'wanna', '6f8df95976135296ce1fe4ffb71ab8401d3eae1ddb955dcac7', NULL, 1, 1),
(22, 32, 'johndoe123', 'ef92b778bafe771e89245b89ecbc08a44a4e166c0665991188', NULL, 0, 2),
(23, 33, 'johndoe123', 'ef92b778bafe771e89245b89ecbc08a44a4e166c0665991188', NULL, 3, 2),
(24, 34, 'wanna', '6f8df95976135296ce1fe4ffb71ab8401d3eae1ddb955dcac7', NULL, 1, 1),
(25, 35, 'johndoe123', 'ef92b778bafe771e89245b89ecbc08a44a4e166c0665991188', NULL, 2, 2),
(26, 36, 'wannamarz', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e99', NULL, 2, 1),
(27, 37, '123wanna', '123', 1, 2, 1),
(28, 38, 'johndoe123', 'password123', 2, 2, 2),
(29, 39, 'johndoe123', 'password123', 3, 2, 2),
(30, 40, 'johnny12345', '12345', 5, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company_information`
--

CREATE TABLE `tbl_company_information` (
  `id` int(11) NOT NULL,
  `companyname` varchar(255) NOT NULL,
  `street` varchar(50) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `documentpermit` varchar(255) NOT NULL,
  `document` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_company_information`
--

INSERT INTO `tbl_company_information` (`id`, `companyname`, `street`, `barangay`, `city`, `mobile`, `telephone`, `documentpermit`, `document`) VALUES
(1, '', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document'),
(2, '', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document'),
(3, '', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document'),
(4, '', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document'),
(5, '', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document'),
(6, 'abcd', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document'),
(7, 'abcd', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document'),
(8, 'abcd', 'abcd', 'Barangay 1', 'Cityville', '09123456789', '034-123-4567', '034-123-4567', 'document');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_enterprise`
--

CREATE TABLE `tbl_enterprise` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `id` int(11) NOT NULL,
  `account.id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `purpose` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `details` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subscription`
--

CREATE TABLE `tbl_subscription` (
  `id` int(11) NOT NULL,
  `cardNo` varchar(50) NOT NULL,
  `cvv` varchar(10) NOT NULL,
  `expiry` int(11) NOT NULL,
  `card_holder` varchar(255) NOT NULL,
  `subscriptionType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_subscription`
--

INSERT INTO `tbl_subscription` (`id`, `cardNo`, `cvv`, `expiry`, `card_holder`, `subscriptionType`) VALUES
(1, '0', '0', 31, '$2b$10$3GLaRw52dcLYapOxZustDOq10/7mxQlGHgvPQAenqktc3Ue1ssKuy', 1),
(2, '$2b$10$KiV5g2g51/sIppGuMd.Sc.y5nfh1cS1w86ahEo72CQt', '$2b$10$iba', 21, '$2b$10$yMvTxM9gge8ZaiExy4mV2uKp7rEUiXHpUPGIwUacUHsNaApigw8JO', 2),
(3, '$2b$10$U41p4ec.FLFBp9E92KI3y.Gi3vbP0LjD52UuA6BgLJa', '$2b$10$Bdf', 92, '$2b$10$cDoVmiQGvQeiDUmYY3Ts7.lfW4NBGZsPmbzOyEypXOfxuHb8bD6g6', 2),
(4, '$2b$10$rWbUGeC5sgn/v74x.klHmOR7zPukuAhfZjYhwd9Boes', '$2b$10$pTU', 32, '$2b$10$562t2K.N.UEcy4OyAuGRFOe111NsCzbuyIIfMB60ygV./ct/zhOj.', 3),
(5, '$2b$10$TtAYDw/LPrukYbDZ8vDN9OaBl/VBN9jJBEGJONdnw8I', '$2b$10$CAN', 32, '$2b$10$MVaB5IlxITXIRJROwnGGEe90XO8w3eQp47f.mPNDgGHfEkEx66fIi', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_information_id` int(11) DEFAULT NULL,
  `company_info_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `fname`, `lname`, `email`, `user_information_id`, `company_info_id`) VALUES
(3, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 7, NULL),
(4, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 8, NULL),
(5, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 9, NULL),
(6, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 10, NULL),
(7, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 11, NULL),
(8, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 12, NULL),
(9, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 13, NULL),
(10, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 14, NULL),
(11, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 15, NULL),
(12, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 17, NULL),
(14, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 19, NULL),
(15, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 20, NULL),
(16, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 21, NULL),
(17, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 22, NULL),
(18, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 23, NULL),
(19, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 24, NULL),
(20, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 25, NULL),
(21, '123', '123', '123@gmail.com', 26, NULL),
(22, '123', '123', '123@gmail.com', 27, NULL),
(23, '123', '123', '123@gmail.com', 28, NULL),
(24, '123', '123', '123@gmail.com', 29, NULL),
(25, '123', '123', '123@gmail.com', 30, NULL),
(26, '123', '123', '123@gmail.com', 31, NULL),
(27, '123', '123', '123@gmail.com', 32, NULL),
(28, 'Gabriel', 'Bangilan', 'wanna@wanna.com', 33, NULL),
(29, 'Gabriel', 'Bangilan', 'wanna@wanna.com', 34, NULL),
(30, 'John', 'Doe', 'john.doe@example.com', NULL, 2),
(31, 'Gabriel', 'Bangilan', 'wanna@wanna.com', 35, NULL),
(32, 'John', 'Doe', 'john.doe@example.com', NULL, 3),
(33, 'John', 'Doe', 'john.doe@example.com', NULL, 4),
(34, 'Gabriel', 'Bangilan', 'wanna@wanna.com', 36, NULL),
(35, 'John', 'Doe', 'john.doe@example.com', NULL, 5),
(36, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 37, NULL),
(37, 'Gabriel', 'Malanday', 'nanooomannn@gmail.com', 38, NULL),
(38, 'John', 'Doe', 'john.doe@example.com', NULL, 6),
(39, 'John', 'Doe', 'john.doe@example.com', NULL, 7),
(40, 'John', 'Doe', 'john.doe@example.com', NULL, 8);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_information`
--

CREATE TABLE `tbl_user_information` (
  `id` int(11) NOT NULL,
  `street` varchar(50) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `telephone` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user_information`
--

INSERT INTO `tbl_user_information` (`id`, `street`, `barangay`, `city`, `contact`, `telephone`) VALUES
(1, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(2, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(3, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(4, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(5, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(6, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(7, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(8, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(9, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(10, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(11, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(12, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(13, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(14, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(15, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(16, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(17, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(18, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(19, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(20, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(21, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(22, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(23, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(24, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404'),
(25, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', 'Wanna', 'Bacolod City', '09222932404', '4442671'),
(26, '123', '123', '123', '123', '123'),
(27, '123', '12321321312', '123', '123', '123'),
(28, '123', '12321321312', '123', '123', '123'),
(29, '123', '12321321312', '123', '123', '123'),
(30, '123', '12321321312', '123', '123', '123'),
(31, '123', '12321321312', '123', '123', '123'),
(32, '123', '12321321312', '123', '123', '123'),
(33, 'wanna', 'wanna', 'wanna', 'wanna', 'wanna'),
(34, 'wanna', 'wanna', 'wanna', 'wanna', 'wanna'),
(35, 'wanna', 'wanna', 'wanna', 'wanna', 'wanna'),
(36, 'wanna', 'wanna', 'wanna', 'wanna', 'wanna'),
(37, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', 'wannamarz', 'Bacolod City', 'wannamarz', '09222932404'),
(38, 'Lot 2 Block 2 Purok Matahum Barangay Tangub', '123', 'Bacolod City', '123', '09222932404');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user.id` (`user_id`),
  ADD KEY `subscription.id` (`subscription_id`);

--
-- Indexes for table `tbl_company_information`
--
ALTER TABLE `tbl_company_information`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_enterprise`
--
ALTER TABLE `tbl_enterprise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account.id` (`account.id`);

--
-- Indexes for table `tbl_subscription`
--
ALTER TABLE `tbl_subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_info.id` (`company_info_id`),
  ADD KEY `user_information.id` (`user_information_id`),
  ADD KEY `user_information_id` (`user_information_id`);

--
-- Indexes for table `tbl_user_information`
--
ALTER TABLE `tbl_user_information`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_company_information`
--
ALTER TABLE `tbl_company_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_enterprise`
--
ALTER TABLE `tbl_enterprise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_subscription`
--
ALTER TABLE `tbl_subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `tbl_user_information`
--
ALTER TABLE `tbl_user_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD CONSTRAINT `tbl_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`),
  ADD CONSTRAINT `tbl_accounts_ibfk_2` FOREIGN KEY (`subscription_id`) REFERENCES `tbl_subscription` (`id`);

--
-- Constraints for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `tbl_products_ibfk_1` FOREIGN KEY (`account.id`) REFERENCES `tbl_accounts` (`id`);

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_ibfk_1` FOREIGN KEY (`user_information_id`) REFERENCES `tbl_user_information` (`id`),
  ADD CONSTRAINT `tbl_users_ibfk_2` FOREIGN KEY (`company_info_id`) REFERENCES `tbl_company_information` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
