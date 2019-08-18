-- +goose Up
CREATE TABLE bad_comment (
  id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  text VARCHAR(255) NOT NULL,
  reference_url TEXT,
  point int,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- +goose Down
DROP TABLE IF EXISTS bad_comment;