-- Mask email, show only the domain
ALTER TABLE dbo.[User] 
ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()');

-- Mask first name, show only first character
ALTER TABLE dbo.[User] 
ALTER COLUMN FirstName ADD MASKED WITH (FUNCTION = 'partial(1, "**", 0)');

-- Mask last name, show only first character
ALTER TABLE dbo.[User] 
ALTER COLUMN LastName ADD MASKED WITH (FUNCTION = 'partial(1, "**", 0)');

-- Mask contact number, show last 4 digits
ALTER TABLE dbo.[User] 
ALTER COLUMN ContactNumber ADD MASKED WITH (FUNCTION = 'partial(0, "***", 4)');

-- Mask address fields
ALTER TABLE dbo.[User]
ALTER COLUMN AddressLine1 ADD MASKED WITH (FUNCTION = 'default()');

ALTER TABLE dbo.[User]
ALTER COLUMN AddressLine2 ADD MASKED WITH (FUNCTION = 'default()');

-- Mask zip code, show only last 2 characters
ALTER TABLE dbo.[User]
ALTER COLUMN ZipCode ADD MASKED WITH (FUNCTION = 'partial(0, "*", 2)');

-- Mask DateOfBirth to default (returns 01-01-1900 to unprivileged users)
ALTER TABLE dbo.[User]
ALTER COLUMN DateOfBirth ADD MASKED WITH (FUNCTION = 'default()');

ALTER TABLE dbo.Payment
ALTER COLUMN Description ADD MASKED WITH (FUNCTION = 'default()');

ALTER TABLE dbo.Payment
ALTER COLUMN AccountID ADD MASKED WITH (FUNCTION = 'partial(0, "**", 4)');

ALTER TABLE dbo.Transfer
ALTER COLUMN FromAccountID ADD MASKED WITH (FUNCTION = 'partial(0, "**", 4)');

ALTER TABLE dbo.Transfer
ALTER COLUMN ToAccountID ADD MASKED WITH (FUNCTION = 'partial(0, "**", 4)');

ALTER TABLE dbo.Transfer
ALTER COLUMN Description ADD MASKED WITH (FUNCTION = 'default()');