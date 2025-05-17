-- ===== Drop Existing Tables in Correct Order =====
DROP TABLE IF EXISTS AUDIT_LOGS;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Transfer;
DROP TABLE IF EXISTS Utilities;
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS [User];

-- ===== Create Tables =====

-- User Table (with Role: 'Customer', 'Officer', 'Admin')
CREATE TABLE [User] (
    UserID NVARCHAR(50) PRIMARY KEY,
    Role NVARCHAR(50) CHECK (Role IN ('Customer', 'Officer', 'Admin')),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    ContactNumber NVARCHAR(20),
    DateOfBirth DATE,
    AddressLine1 NVARCHAR(255),
    AddressLine2 NVARCHAR(255),
    City NVARCHAR(100),
    State NVARCHAR(100),
    ZipCode NVARCHAR(10),
    PasswordHash NVARCHAR(255) NOT NULL,
    AccountOpenDate DATE
);

-- Account Table (links to UserID)
CREATE TABLE Account (
    AccountID NVARCHAR(50) PRIMARY KEY,
    UserID NVARCHAR(50) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    Balance DECIMAL(18,2) NOT NULL,
    AccountType NVARCHAR(50) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

-- Utilities Table
CREATE TABLE Utilities (
    UtilityID NVARCHAR(50) PRIMARY KEY,
    AccountName NVARCHAR(255) NOT NULL,
    AccountNumber NVARCHAR(100) UNIQUE NOT NULL
);

-- Transfer Table
CREATE TABLE Transfer (
    TransferID NVARCHAR(50) PRIMARY KEY,
    ToAccountID NVARCHAR(50) NOT NULL,
    FromAccountID NVARCHAR(50) NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    Description NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME,
    Status NVARCHAR(50) NOT NULL,
    TransferType NVARCHAR(50) NOT NULL,
    FOREIGN KEY (ToAccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (FromAccountID) REFERENCES Account(AccountID)
);

-- Payment Table
CREATE TABLE Payment (
    PaymentID NVARCHAR(50) PRIMARY KEY,
    AccountID NVARCHAR(50) NOT NULL,
    UtilityID NVARCHAR(50) NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    Timestamp DATETIME DEFAULT GETDATE(),
    Description NVARCHAR(255),
    FOREIGN KEY (AccountID) REFERENCES Account(AccountID),
    FOREIGN KEY (UtilityID) REFERENCES Utilities(UtilityID)
);

-- Audit Logs Table
CREATE TABLE AUDIT_LOGS (
    id NVARCHAR(50) PRIMARY KEY,
    timestamp DATETIME DEFAULT GETDATE(),
    actor_type NVARCHAR(50) NOT NULL,
    actor_id NVARCHAR(50) NOT NULL,
    action NVARCHAR(255) NOT NULL,
    target_id NVARCHAR(50),
    status NVARCHAR(50) NOT NULL
);

CREATE TABLE Session (
    SessionID NVARCHAR(50) PRIMARY KEY,
    UserID NVARCHAR(50) NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

-- ===== Insert Sample Data =====

-- User Data (Role: Customer, Officer, Admin all in one table)
INSERT INTO [User] (UserID, Role, FirstName, LastName, Email, ContactNumber, DateOfBirth, AddressLine1, AddressLine2, City, State, ZipCode, PasswordHash, AccountOpenDate)
VALUES
('U100', 'Customer', 'Alice', 'Smith', 'alice100@example.com', '1234567890', '1990-05-10', '123 Main St', NULL, 'Los Angeles', 'CA', '90001', '$2b$10$FgY1AGx1Mp/ayNX6a0fjleo4KxJ8pY1nzwBzulezbX4QJoi3P7XrS', '2025-01-01'),
('U200', 'Customer', 'Bob', 'Johnson', 'bob200@example.com', '0987654321', '1985-11-20', '456 Oak St', 'Apt 2B', 'New York', 'NY', '10001', '$2b$10$FgY1AGx1Mp/ayNX6a0fjleo4KxJ8pY1nzwBzulezbX4QJoi3P7XrS', '2025-02-15'),
('U300', 'Officer', 'John', 'Smith', 'john.smith@bank.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$FgY1AGx1Mp/ayNX6a0fjleo4KxJ8pY1nzwBzulezbX4QJoi3P7XrS', NULL),
('U400', 'Officer', 'Karen', 'Davis', 'karen.davis@bank.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$FgY1AGx1Mp/ayNX6a0fjleo4KxJ8pY1nzwBzulezbX4QJoi3P7XrS', NULL),
('U500', 'Admin', 'Amy', 'Wong', 'amy.wong@bank.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$FgY1AGx1Mp/ayNX6a0fjleo4KxJ8pY1nzwBzulezbX4QJoi3P7XrS', NULL),
('U600', 'Admin', 'Mike', 'Brown', 'mike.brown@bank.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2b$10$FgY1AGx1Mp/ayNX6a0fjleo4KxJ8pY1nzwBzulezbX4QJoi3P7XrS', NULL), ('U700', 'Customer', 'Navaneethan', 'Arjuman', 'navaneethan@example.com', '0123456789', '1975-12-05', '789 Maple St', NULL, 'Kuala Lumpur', 'WP', '50000', '$2b$10$FgY1AGx1Mp/ayNX6a0fjleo4KxJ8pY1nzwBzulezbX4QJoi3P7XrS', '2025-05-15')
;

-- Account Data (linked to UserID)
INSERT INTO Account (AccountID, UserID, Status, Balance, AccountType)
VALUES
('ACC100', 'U100', 'Active', 2500.00, 'Checking'),
('ACC200', 'U100', 'Active', 1500.00, 'Savings'),
('ACC300', 'U200', 'Active', 800.00, 'Checking');

-- Utilities Data
INSERT INTO Utilities (UtilityID, AccountName, AccountNumber)
VALUES
('UTIL100', 'LADWP', 'ACC-123456'),
('UTIL200', 'Spectrum Internet', 'ACC-654321'),
('UTIL300', 'SoCalGas', 'ACC-111222');

-- Transfer Data
INSERT INTO Transfer (TransferID, ToAccountID, FromAccountID, Amount, Description, CreatedAt, Status, TransferType)
VALUES
('T100', 'ACC300', 'ACC100', 100.00, 'Rent payment', '2025-04-20 10:00:00', 'Approved', 'Internal'),
('T200', 'ACC200', 'ACC300', 50.00, 'Reimbursement', '2025-04-21 15:30:00', 'Pending', 'Internal');

-- Payment Data
INSERT INTO Payment (PaymentID, AccountID, UtilityID, Amount, Timestamp, Description)
VALUES
('P100', 'ACC100', 'UTIL100', 60.00, '2025-04-18 08:00:00', 'Electricity bill'),
('P200', 'ACC300', 'UTIL200', 45.50, '2025-04-19 14:15:00', 'Internet bill');

-- Audit Logs Data
INSERT INTO AUDIT_LOGS (id, timestamp, actor_type, actor_id, action, target_id, status)
VALUES
('LOG100', '2025-04-20 10:05:00', 'Customer', 'U100', 'TransferCreated', 'T100', 'Success'),
('LOG200', '2025-04-21 16:00:00', 'Admin', 'U500', 'AccountStatusUpdated', 'ACC300', 'Success'),
('LOG300', '2025-04-21 16:30:00', 'Officer', 'U400', 'PasswordReset', 'U200', 'Success');