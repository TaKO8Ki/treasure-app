package controller

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"

	"github.com/voyagegroup/treasure-app/httputil"
	"github.com/voyagegroup/treasure-app/model"
	"github.com/voyagegroup/treasure-app/repository"
	"github.com/voyagegroup/treasure-app/service"
)

type BadComment struct {
	db *sqlx.DB
}

func NewBadComment(db *sqlx.DB) *BadComment {
	return &BadComment{db: db}
}

func (a *BadComment) Index(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	bad_comments, err := repository.AllBadComment(a.db)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	return http.StatusOK, bad_comments, nil
}

func (a *BadComment) Show(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}

	aid, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	badComment, err := repository.FindBadComment(a.db, aid)
	if err != nil && err == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusCreated, badComment, nil
}

func (a *BadComment) Create(w http.ResponseWriter, r *http.Request) (int, interface {}, error) {
	reqParam := &model.BadComment{}
	if err := json.NewDecoder(r.Body).Decode(&reqParam); err != nil {
		return http.StatusBadRequest, nil, err
	}

	createBadComment := &model.BadComment{ 
		Text:  reqParam.Text,
		ReferenceUrl:   reqParam.ReferenceUrl,
	}

	badCommentService := service.NewBadComment(a.db)
	id, err := badCommentService.Create(createBadComment)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	respParam := &model.ResponseCreateBadComment{
		ID:     id,
		Text:  createBadComment.Text,
		ReferenceUrl:   createBadComment.ReferenceUrl,
		Point: 0,
	}

	return http.StatusCreated, respParam, nil
}

func (a *BadComment) Update(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}

	aid, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	reqParam := &model.BadComment{}
	if err := json.NewDecoder(r.Body).Decode(&reqParam); err != nil {
		return http.StatusBadRequest, nil, err
	}

	badCommentService := service.NewBadComment(a.db)
	err = badCommentService.Update(aid, reqParam)
	if err != nil && errors.Cause(err) == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusNoContent, nil, nil
}

func (a *BadComment) Destroy(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}

	aid, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	badCommentService := service.NewBadComment(a.db)
	err = badCommentService.Destroy(aid)
	if err != nil && errors.Cause(err) == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusNoContent, nil, nil
}
