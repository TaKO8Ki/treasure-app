package service

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/voyagegroup/treasure-app/dbutil"

	"github.com/voyagegroup/treasure-app/model"
	"github.com/voyagegroup/treasure-app/repository"
)

type BadComment struct {
	db *sqlx.DB
}

func NewBadComment(db *sqlx.DB) *BadComment {
	return &BadComment{db}
}

func (a *BadComment) Update(id int64, newBadComment *model.BadComment) error {
	_, err := repository.FindBadComment(a.db, id)
	if err != nil {
		return errors.Wrap(err, "failed find bad_comment")
	}

	if err := dbutil.TXHandler(a.db, func(tx *sqlx.Tx) error {
		_, err := repository.UpdateBadComment(tx, id, newBadComment)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		return err
	}); err != nil {
		return errors.Wrap(err, "failed bad_comment update transaction")
	}
	return nil
}

func (a *BadComment) Destroy(id int64) error {
	_, err := repository.FindBadComment(a.db, id)
	if err != nil {
		return errors.Wrap(err, "failed find bad_comment")
	}

	if err := dbutil.TXHandler(a.db, func(tx *sqlx.Tx) error {
		_, err := repository.DestroyBadComment(tx, id)
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		return err
	}); err != nil {
		return errors.Wrap(err, "failed bad_comment delete transaction")
	}
	return nil
}

func (a *BadComment) Create(createBadComment *model.BadComment) (int64, error) {
	var createdId int64
	if err := dbutil.TXHandler(a.db, func(tx *sqlx.Tx) error {
		result, err := repository.CreateBadComment(tx, createBadComment)
		if err != nil {
			return err
		}
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		createdId = id
		return err
	}); err != nil {
		return 0, err
	}
	return createdId, nil
}
