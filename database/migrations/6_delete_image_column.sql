
-- +goose Up
ALTER TABLE bad_comment
ADD image VARCHAR(10000) NOT NUll;