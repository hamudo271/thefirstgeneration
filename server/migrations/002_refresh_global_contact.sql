-- The `global` (footer/header) and `contact` content rows were seeded from an
-- earlier version of shared/content-defaults.js. Because seedDefaultsIfMissing
-- uses ON CONFLICT DO NOTHING, later code updates (new phone/address) never
-- reached the DB, so the live site kept serving the stale values.
--
-- Delete these rows; seedDefaultsIfMissing() runs right after migrations on
-- boot and re-inserts them from the CURRENT defaults.
DELETE FROM content_entries WHERE key IN ('global', 'contact');
