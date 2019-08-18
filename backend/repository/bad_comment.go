package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/voyagegroup/treasure-app/model"
)

func AllBadComment(db *sqlx.DB) ([]model.BadComment, error) {
	a := make([]model.BadComment, 0)
	if err := db.Select(&a, `SELECT id, text, reference_url, point, image FROM bad_comment`); err != nil {
		return nil, err
	}
	return a, nil
}

func RandomComment(db *sqlx.DB) ([]model.BadComment, error) {
	a := make([]model.BadComment, 0)
	if err := db.Select(&a, `SELECT id, text, reference_url, point, image FROM bad_comment ORDER BY RAND() LIMIT 2`); err != nil {
		return nil, err
	}
	return a, nil
}

func FindBadComment(db *sqlx.DB, id int64) (*model.BadComment, error) {
	a := model.BadComment{}
	if err := db.Get(&a, `
SELECT id, text, reference_url, point, image FROM bad_comment WHERE id = ?
`, id); err != nil {
		return nil, err
	}
	return &a, nil
}

func CreateBadComment(db *sqlx.Tx, a *model.BadComment) (sql.Result, error) {
	stmt, err := db.Prepare(`
INSERT INTO bad_comment (text, reference_url, image) VALUES (?, ?, ?)
`)
	if err != nil {
		return nil, err
	}
	
	defer stmt.Close()
	return stmt.Exec(a.Text, a.ReferenceUrl, a.Image)
}

func UpdateBadComment(db *sqlx.Tx, id int64, a *model.BadComment) (sql.Result, error) {
	stmt, err := db.Prepare(`
UPDATE bad_comment SET point = ? WHERE id = ?
`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(a.Point,id)
}

func DestroyBadComment(db *sqlx.Tx, id int64) (sql.Result, error) {
	stmt, err := db.Prepare(`
DELETE FROM bad_comment WHERE id = ?
`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(id)
}
