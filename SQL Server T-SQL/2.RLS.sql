CREATE VIEW vw_Account
AS
SELECT a.*
FROM dbo.Account a;

GRANT SELECT ON vw_Account TO [Officer];
DENY SELECT ON vw_Account TO [User];

CREATE VIEW vw_Payment
AS
SELECT a.*
FROM dbo.Payment a;

GRANT SELECT ON vw_Payment TO [Officer];
DENY SELECT ON vw_Payment TO [User];

CREATE VIEW vw_Transfer
AS
SELECT a.*
FROM dbo.Transfer a;

GRANT SELECT ON vw_Transfer TO [Officer];
DENY SELECT ON vw_Transfer TO [User];

CREATE VIEW vw_User
AS
SELECT *
FROM dbo.[User]
WHERE Role = 'Customer';

GRANT SELECT ON vw_User TO [Officer];
GRANT SELECT ON vw_User TO [User];

DENY SELECT ON dbo.Account TO [User];
DENY SELECT ON dbo.Payment TO [User];
DENY SELECT ON dbo.Transfer TO [User];
DENY SELECT ON dbo.[User] TO [User];
DENY SELECT ON dbo.AUDIT_LOGS TO [User];

DENY SELECT ON dbo.Account TO [Officer];
DENY SELECT ON dbo.Payment TO [Officer];
DENY SELECT ON dbo.Transfer TO [Officer];
DENY SELECT ON dbo.[User] TO [Officer];
DENY SELECT ON dbo.AUDIT_LOGS TO [Officer];