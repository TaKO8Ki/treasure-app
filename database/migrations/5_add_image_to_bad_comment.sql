-- +goose Up
ALTER TABLE bad_comment
ADD image VARCHAR(255) NOT NUll;

-- +goose Down
ALTER TABLE bad_comment
DROP image;