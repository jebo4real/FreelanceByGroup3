-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2020 at 02:18 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_freelance`
--

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `SenderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ReceiverId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

CREATE TABLE `contracts` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `acceptance` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobapplications`
--

CREATE TABLE `jobapplications` (
  `id` int(11) NOT NULL,
  `FreelanceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `JobId` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobcategories`
--

CREATE TABLE `jobcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobcategories`
--

INSERT INTO `jobcategories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'IT & Software', '2020-05-17 00:00:00', '2020-05-17 00:00:00'),
(2, 'Data Entry', '2020-05-17 00:00:00', '2020-05-17 00:00:00'),
(3, 'Video Editing', '0000-00-00 00:00:00', '2020-05-21 02:35:34'),
(4, 'Photography', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Data Analysis', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Editor', '2020-05-21 02:19:22', '2020-05-21 02:19:22');

-- --------------------------------------------------------

--
-- Table structure for table `jobfiles`
--

CREATE TABLE `jobfiles` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobpayments`
--

CREATE TABLE `jobpayments` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `clientPaymentReceipt` varchar(255) DEFAULT NULL,
  `clientPay` tinyint(1) DEFAULT NULL,
  `freelancePay` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobreports`
--

CREATE TABLE `jobreports` (
  `id` int(11) NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `report` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `ClientId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `CatId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `timeLength` varchar(255) DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `SenderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ReceiverId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `SenderId`, `ReceiverId`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 'c3ac223d-5b3b-40cc-981b-e177c48e4456', 'd4e0590a-56dd-4a13-850e-a4128cb52073', 'hi, want to connect with you', '2020-05-30 22:22:58', '2020-05-30 22:22:58'),
(2, 'c3ac223d-5b3b-40cc-981b-e177c48e4456', 'd4e0590a-56dd-4a13-850e-a4128cb52073', 'so what time  ?', '2020-05-30 22:23:25', '2020-05-30 22:23:25'),
(3, 'd4e0590a-56dd-4a13-850e-a4128cb52073', 'd4e0590a-56dd-4a13-850e-a4128cb52073', 'ok so when', '2020-05-30 22:47:01', '2020-05-30 22:47:01'),
(4, 'd4e0590a-56dd-4a13-850e-a4128cb52073', 'c3ac223d-5b3b-40cc-981b-e177c48e4456', 'ok', '2020-05-30 22:55:40', '2020-05-30 22:55:40'),
(5, 'c3ac223d-5b3b-40cc-981b-e177c48e4456', 'd4e0590a-56dd-4a13-850e-a4128cb52073', 'heard you', '2020-05-30 22:58:55', '2020-05-30 22:58:55');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `ReceiverId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `paymentdetails`
--

CREATE TABLE `paymentdetails` (
  `id` int(11) NOT NULL,
  `apikey` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portfolios`
--

CREATE TABLE `portfolios` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `projectLinks` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portfolios`
--

INSERT INTO `portfolios` (`id`, `title`, `description`, `projectLinks`, `picture`, `createdAt`, `updatedAt`, `UserId`) VALUES
(5, NULL, NULL, NULL, NULL, '2020-05-30 14:51:58', '2020-05-30 14:51:58', 'c3ac223d-5b3b-40cc-981b-e177c48e4456'),
(6, NULL, NULL, NULL, NULL, '2020-05-30 14:56:19', '2020-05-30 14:56:19', 'd4e0590a-56dd-4a13-850e-a4128cb52073'),
(8, NULL, NULL, NULL, NULL, '2020-05-30 18:43:57', '2020-05-30 18:43:57', '0a1d3599-4591-4edb-a654-255bc3e5f11c');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'client', '2020-05-17 00:00:00', '2020-05-17 00:00:00'),
(2, 'freelancer', '2020-05-17 00:00:00', '2020-05-17 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200515003238-create-user.js'),
('20200515003446-create-role.js'),
('20200515003518-create-user-account.js'),
('20200515003600-create-job-category.js'),
('20200515003627-create-job.js'),
('20200515003712-create-job-application.js'),
('20200515003918-create-job-payment.js'),
('20200515004140-create-chat.js'),
('20200515004219-create-notification.js'),
('20200515004308-create-user-payment-info.js'),
('20200515004349-create-payment-details.js'),
('20200519200442-create-contract.js'),
('20200519200530-create-job-report.js'),
('20200527145902-create-job-files.js'),
('20200529220237-create-portfolio.js'),
('20200530114452-create-message.js');

-- --------------------------------------------------------

--
-- Table structure for table `useraccounts`
--

CREATE TABLE `useraccounts` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `useraccounts`
--

INSERT INTO `useraccounts` (`id`, `UserId`, `username`, `password`, `verified`, `blocked`, `RoleId`, `token`, `createdAt`, `updatedAt`) VALUES
(8, 'c3ac223d-5b3b-40cc-981b-e177c48e4456', 'jean', 'db35bdeaec11478701759030c9da1bc83f0e1e235c0140e0133457f3625bb26b', 1, NULL, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJqb2huamVib0BnbWFpbC5jb20iLCJpYXQiOjE1OTA4NTAzMTcsImV4cCI6MTU5MDkzNjcxN30.nI-phQGfzGYzvOtWcXldlirTCV745TCstkbelPo7nEU', '2020-05-30 14:51:58', '2020-05-30 14:52:13'),
(9, 'd4e0590a-56dd-4a13-850e-a4128cb52073', 'loma', 'db35bdeaec11478701759030c9da1bc83f0e1e235c0140e0133457f3625bb26b', 1, NULL, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJqZWJvZWxlY3Ryb25ldW1AZ21haWwuY29tIiwiaWF0IjoxNTkwODUwNTc5LCJleHAiOjE1OTA5MzY5Nzl9.Tam_mKVke5CDG5vTr9fr3Xij9BkvKXuO8bZ10YkTlHI', '2020-05-30 14:56:19', '2020-05-30 14:56:44'),
(11, '0a1d3599-4591-4edb-a654-255bc3e5f11c', 'owusu', 'db35bdeaec11478701759030c9da1bc83f0e1e235c0140e0133457f3625bb26b', 0, NULL, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJqb2huLmplYm9AYW1hbGl0ZWNoLm9yZyIsImlhdCI6MTU5MDg2NDIzNiwiZXhwIjoxNTkwOTUwNjM2fQ.QHa6VQXD74KbJO_VKukNpEj7MDC-ClOkr95o1R6vLhs', '2020-05-30 18:43:57', '2020-05-30 18:43:57');

-- --------------------------------------------------------

--
-- Table structure for table `userpaymentinfos`
--

CREATE TABLE `userpaymentinfos` (
  `id` int(11) NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `accountNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `gender`, `dob`, `jobTitle`, `email`, `mobile`, `country`, `city`, `picture`, `createdAt`, `updatedAt`) VALUES
('0a1d3599-4591-4edb-a654-255bc3e5f11c', 'John', 'Jebo', NULL, NULL, NULL, 'john.jebo@amalitech.org', '', NULL, NULL, NULL, '2020-05-30 18:43:56', '2020-05-30 18:43:56'),
('c3ac223d-5b3b-40cc-981b-e177c48e4456', 'Jay ', 'Jebo', 'female', '0000-00-00', '', 'johnjebo@gmail.com', '', 'Ghana', '', NULL, '2020-05-30 14:51:57', '2020-05-30 19:06:40'),
('d4e0590a-56dd-4a13-850e-a4128cb52073', 'vasily', 'loma', 'male', '0000-00-00', '', 'jeboelectroneum@gmail.com', '', 'Ghana', '', 'picture-1590866367937.jpg', '2020-05-30 14:56:19', '2020-05-30 19:19:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`),
  ADD KEY `SenderId` (`SenderId`),
  ADD KEY `ReceiverId` (`ReceiverId`);

--
-- Indexes for table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `jobapplications`
--
ALTER TABLE `jobapplications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FreelanceId` (`FreelanceId`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `jobcategories`
--
ALTER TABLE `jobcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobfiles`
--
ALTER TABLE `jobfiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `jobpayments`
--
ALTER TABLE `jobpayments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`);

--
-- Indexes for table `jobreports`
--
ALTER TABLE `jobreports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `JobId` (`JobId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ClientId` (`ClientId`),
  ADD KEY `CatId` (`CatId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SenderId` (`SenderId`),
  ADD KEY `ReceiverId` (`ReceiverId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ReceiverId` (`ReceiverId`);

--
-- Indexes for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `useraccounts`
--
ALTER TABLE `useraccounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `RoleId` (`RoleId`);

--
-- Indexes for table `userpaymentinfos`
--
ALTER TABLE `userpaymentinfos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobapplications`
--
ALTER TABLE `jobapplications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobcategories`
--
ALTER TABLE `jobcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobfiles`
--
ALTER TABLE `jobfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobpayments`
--
ALTER TABLE `jobpayments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobreports`
--
ALTER TABLE `jobreports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolios`
--
ALTER TABLE `portfolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `useraccounts`
--
ALTER TABLE `useraccounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `userpaymentinfos`
--
ALTER TABLE `userpaymentinfos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`SenderId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_ibfk_3` FOREIGN KEY (`ReceiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contracts`
--
ALTER TABLE `contracts`
  ADD CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobapplications`
--
ALTER TABLE `jobapplications`
  ADD CONSTRAINT `jobapplications_ibfk_1` FOREIGN KEY (`FreelanceId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobapplications_ibfk_2` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobfiles`
--
ALTER TABLE `jobfiles`
  ADD CONSTRAINT `jobfiles_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobfiles_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobpayments`
--
ALTER TABLE `jobpayments`
  ADD CONSTRAINT `jobpayments_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobreports`
--
ALTER TABLE `jobreports`
  ADD CONSTRAINT `jobreports_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobreports_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`CatId`) REFERENCES `jobcategories` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`SenderId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`ReceiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`ReceiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `portfolios`
--
ALTER TABLE `portfolios`
  ADD CONSTRAINT `portfolios_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `useraccounts`
--
ALTER TABLE `useraccounts`
  ADD CONSTRAINT `useraccounts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `useraccounts_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `userpaymentinfos`
--
ALTER TABLE `userpaymentinfos`
  ADD CONSTRAINT `userpaymentinfos_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
