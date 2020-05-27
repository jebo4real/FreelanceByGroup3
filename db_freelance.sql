-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2020 at 10:28 PM
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

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `JobId`, `SenderId`, `ReceiverId`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'what up', '2020-05-20 23:56:55', '2020-05-20 23:56:55'),
(2, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'damn', '2020-05-20 23:58:57', '2020-05-20 23:58:57'),
(3, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'dafew', '2020-05-21 00:00:31', '2020-05-21 00:00:31'),
(4, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'ok', '2020-05-21 00:02:46', '2020-05-21 00:02:46'),
(5, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'ok', '2020-05-21 00:02:48', '2020-05-21 00:02:48'),
(6, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'blahssd', '2020-05-21 00:04:29', '2020-05-21 00:04:29'),
(7, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.Nice to meet you.', '2020-05-21 00:19:12', '2020-05-21 00:19:12'),
(8, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'nice', '2020-05-22 01:05:40', '2020-05-22 01:05:40'),
(9, 2, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'hi', '2020-05-27 10:08:25', '2020-05-27 10:08:25'),
(10, 1, '6073a8d3-3149-4c22-89a5-69a7c70c8c0c', NULL, 'ok', '2020-05-27 10:29:52', '2020-05-27 10:29:52'),
(11, 1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', NULL, 'ok back', '2020-05-27 10:31:44', '2020-05-27 10:31:44'),
(12, 1, '6073a8d3-3149-4c22-89a5-69a7c70c8c0c', NULL, 'ok', '2020-05-27 13:55:29', '2020-05-27 13:55:29');

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

--
-- Dumping data for table `contracts`
--

INSERT INTO `contracts` (`id`, `JobId`, `status`, `acceptance`, `note`, `createdAt`, `updatedAt`) VALUES
(1, NULL, NULL, NULL, NULL, '2020-05-27 10:06:57', '2020-05-27 10:06:57');

-- --------------------------------------------------------

--
-- Table structure for table `jobapplications`
--

CREATE TABLE `jobapplications` (
  `id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `JobId` int(11) DEFAULT NULL,
  `FreelanceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobapplications`
--

INSERT INTO `jobapplications` (`id`, `status`, `createdAt`, `updatedAt`, `JobId`, `FreelanceId`) VALUES
(1, 'accepted', '2020-05-17 21:11:44', '2020-05-27 10:06:57', 1, '6073a8d3-3149-4c22-89a5-69a7c70c8c0c'),
(2, NULL, '2020-05-18 21:43:10', '2020-05-18 21:43:10', 1, '32fe0cf3-d47d-452b-aae8-06d16a5fa480'),
(3, 'awarded', '2020-05-18 22:52:16', '2020-05-18 22:58:18', 2, '32fe0cf3-d47d-452b-aae8-06d16a5fa480'),
(7, NULL, '2020-05-27 12:38:51', '2020-05-27 12:38:51', 1, 'ea1bee0b-25f9-4462-a730-85374e1500cf');

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

--
-- Dumping data for table `jobfiles`
--

INSERT INTO `jobfiles` (`id`, `JobId`, `UserId`, `filename`, `createdAt`, `updatedAt`) VALUES
(1, 2, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', 'jobfile-1590594007124.pdf', '2020-05-27 15:40:07', '2020-05-27 15:40:07');

-- --------------------------------------------------------

--
-- Table structure for table `jobpayments`
--

CREATE TABLE `jobpayments` (
  `id` int(11) NOT NULL,
  `clientPaymentReceipt` varchar(255) DEFAULT NULL,
  `clientPay` tinyint(1) DEFAULT NULL,
  `freelancePay` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `JobId` int(11) DEFAULT NULL
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
  `title` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `timeLength` varchar(255) DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `CatId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `details`, `timeLength`, `price`, `skills`, `status`, `createdAt`, `updatedAt`, `ClientId`, `CatId`) VALUES
(1, 'Website develop', '                                nothing much\r\n                            ', 'Less than 1 month', '322.00', 'HTML, CSS', 'awarded', '2020-05-17 16:48:39', '2020-05-18 21:53:37', '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', 2),
(2, 'Freelance website', 'Develop a freelance website', 'Less than 1 month', '321.00', 'Node JS', 'awarded', '2020-05-18 22:40:09', '2020-05-18 22:58:18', '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', 1),
(3, 'Deleivery App', 'Develop a delivery app for a small company', 'More than 1 month', '1000.00', 'Flutter', NULL, '2020-05-18 22:41:02', '2020-05-18 22:41:02', '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', 1),
(4, 'Fill a form', 'Fill  200 forms', 'Less than 1 month', '10.00', '', NULL, '2020-05-18 22:41:33', '2020-05-18 22:41:33', '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', 2);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ReceiverId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `title`, `message`, `createdAt`, `updatedAt`, `ReceiverId`) VALUES
(1, 'Kwame applied for a job you posted', '/user/jobs', '2020-05-27 12:38:51', '2020-05-27 12:38:51', '76e20105-1ced-4bc4-9120-cfffc1ad4f9e');

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
(2, 'freelancer', '2020-05-17 00:00:00', '2020-05-17 00:00:00'),
(3, 'admin', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
('20200527145902-create-job-files.js');

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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `useraccounts`
--

INSERT INTO `useraccounts` (`id`, `UserId`, `username`, `password`, `verified`, `blocked`, `RoleId`, `createdAt`, `updatedAt`) VALUES
(1, '76e20105-1ced-4bc4-9120-cfffc1ad4f9e', 'jebo', 'db35bdeaec11478701759030c9da1bc83f0e1e235c0140e0133457f3625bb26b', NULL, NULL, 1, '2020-05-17 16:45:07', '2020-05-17 16:45:07'),
(2, '6073a8d3-3149-4c22-89a5-69a7c70c8c0c', 'ekow', 'db35bdeaec11478701759030c9da1bc83f0e1e235c0140e0133457f3625bb26b', 1, 1, 2, '2020-05-17 21:07:22', '2020-05-25 22:38:37'),
(3, '32fe0cf3-d47d-452b-aae8-06d16a5fa480', 'fei', 'c1f2f1ac32540df1a96930a3b368921a5e6074eb16ad04def5b5734e94f75d29', NULL, NULL, 3, '2020-05-18 21:42:18', '2020-05-18 21:42:18'),
(4, '32fe0cf3-d47d-452b-aae8-06d16a5fa520', 'admin1', 'c1f2f1ac32540df1a96930a3b368921a5e6074eb16ad04def5b5734e94f75d29', NULL, NULL, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, '32fe0cf3-d47d-452b-aae8-06d16a5fa520', 'admin2', 'c1f2f1ac32540df1a96930a3b368921a5e6074eb16ad04def5b5734e94f75d29', NULL, NULL, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'f7ed36ce-e5b7-4e1c-b0cf-6004094e0318', 'kofi', 'db35bdeaec11478701759030c9da1bc83f0e1e235c0140e0133457f3625bb26b', NULL, NULL, 1, '2020-05-27 10:05:00', '2020-05-27 10:05:00'),
(7, 'ea1bee0b-25f9-4462-a730-85374e1500cf', 'km', 'db35bdeaec11478701759030c9da1bc83f0e1e235c0140e0133457f3625bb26b', NULL, NULL, 2, '2020-05-27 12:14:27', '2020-05-27 12:14:27');

-- --------------------------------------------------------

--
-- Table structure for table `userpaymentinfos`
--

CREATE TABLE `userpaymentinfos` (
  `id` int(11) NOT NULL,
  `accountNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
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
('32fe0cf3-d47d-452b-aae8-06d16a5fa480', 'Kwame', 'Fei', 'male', '0000-00-00', 'Graphic Designer', 'john.jebo@amalitech.org', '', '', '', 'picture-1589838311805.png', '2020-05-18 21:42:18', '2020-05-18 21:45:11'),
('32fe0cf3-d47d-452b-aae8-06d16a5fa520', 'Joe', 'Fraizier', NULL, NULL, NULL, 'admin1@gmail.com', '02344534656', NULL, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('56fe0cf3-d47d-492b-aae8-06d16a5fa410', 'Joe', 'Luis', NULL, NULL, NULL, 'admin2@gmail.com', '02323444656', NULL, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
('6073a8d3-3149-4c22-89a5-69a7c70c8c0c', 'Ekow Benya', 'Jebo', 'male', '2012-02-14', 'Software Developer', 'jeboelectroneum@gmail.com', '', 'Ghana', '', 'picture-1589838275257.png', '2020-05-17 21:07:22', '2020-05-26 02:53:41'),
('76e20105-1ced-4bc4-9120-cfffc1ad4f9e', 'John', 'Jebo', 'female', '2020-05-13', '', 'johnjebo@gmail.com', '0244557984', 'Ghana', 'Takoradi', 'picture-1589734019192.png', '2020-05-17 16:45:07', '2020-05-26 03:41:22'),
('ea1bee0b-25f9-4462-a730-85374e1500cf', 'Kwame', 'Oppong', NULL, NULL, NULL, 'kwame1@gmail.com', '', NULL, NULL, NULL, '2020-05-27 12:14:27', '2020-05-27 12:14:27'),
('f7ed36ce-e5b7-4e1c-b0cf-6004094e0318', 'Kofi', 'Man', NULL, NULL, NULL, 'kofi@gmail.com', '', NULL, NULL, NULL, '2020-05-27 10:04:58', '2020-05-27 10:04:58');

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
  ADD KEY `JobId` (`JobId`),
  ADD KEY `FreelanceId` (`FreelanceId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jobapplications`
--
ALTER TABLE `jobapplications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `jobcategories`
--
ALTER TABLE `jobcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobfiles`
--
ALTER TABLE `jobfiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `useraccounts`
--
ALTER TABLE `useraccounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  ADD CONSTRAINT `jobapplications_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jobapplications_ibfk_2` FOREIGN KEY (`FreelanceId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `jobpayments_ibfk_1` FOREIGN KEY (`JobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`CatId`) REFERENCES `jobcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`ReceiverId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `userpaymentinfos_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
