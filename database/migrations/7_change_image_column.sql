
-- +goose Up
 ALTER TABLE bad_comment DROP image;

-- +goose Down
ALTER TABLE bad_comment
ADD image VARCHAR(15000) NOT NUll;