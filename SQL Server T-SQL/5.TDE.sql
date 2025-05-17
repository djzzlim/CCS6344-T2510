-- TDE --
USE master;
GO
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'Pa$$w0rd';
GO

CREATE CERTIFICATE BankingAppCert
WITH SUBJECT = 'Banking App Encryption Certificate';
GO

BACKUP CERTIFICATE BankingAppCert 
TO FILE = 'C:\SQLCerts\BankingAppCert.cert'
WITH PRIVATE KEY (
    FILE = 'C:\SQLCerts\BankingAppCert.key',
    ENCRYPTION BY PASSWORD = 'Pa$$w0rd'
);

USE [BankingAppDB];
GO
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE BankingAppCert;
GO

ALTER DATABASE [BankingAppDB] SET ENCRYPTION ON;
GO


--- Verify TDE ON ---
SELECT 
    db.name, 
    dek.encryption_state,
    dek.encryptor_type,
    dek.key_algorithm,
    dek.key_length
FROM sys.dm_database_encryption_keys dek
JOIN sys.databases db ON dek.database_id = db.database_id
WHERE db.name = 'BankingAppDB';