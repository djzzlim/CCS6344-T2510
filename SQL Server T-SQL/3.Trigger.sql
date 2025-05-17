CREATE OR ALTER TRIGGER trg_AuditPaymentStrict
ON Payment
AFTER INSERT
AS
BEGIN
    INSERT INTO AUDIT_LOGS (
        id,
        timestamp,
        actor_type,
        actor_id,
        action,
        target_id,
        status
    )
    SELECT
        CONCAT('AUDIT-', NEWID()),
        GETDATE(),
        'Customer',
        acc.UserID,
        CONCAT('Made payment of ', p.Amount, 
               ' from AccountID ', p.AccountID, 
               ' to UtilityID ', p.UtilityID, 
               COALESCE(CONCAT('. Description: ', p.Description), '')),
        p.PaymentID,
        'Completed' -- You may replace this with a column like p.Status if it exists
    FROM INSERTED p
    LEFT JOIN Account acc ON acc.AccountID = p.AccountID;
END;

CREATE OR ALTER TRIGGER trg_AuditTransferStrict
ON Transfer
AFTER INSERT
AS
BEGIN
    INSERT INTO AUDIT_LOGS (
        id,
        timestamp,
        actor_type,
        actor_id,
        action,
        target_id,
        status
    )
    SELECT
        CONCAT('AUDIT-', NEWID()),
        GETDATE(),
        'Customer',
        acc.UserID,
        CONCAT('Initiated transfer of ', tr.Amount, 
               ' from ', tr.FromAccountID, 
               ' to ', tr.ToAccountID),
        tr.TransferID,
        tr.Status
    FROM INSERTED tr
    JOIN Account acc ON acc.AccountID = tr.FromAccountID;
END;