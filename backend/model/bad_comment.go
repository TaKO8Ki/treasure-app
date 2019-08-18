package model

type ResponseCreateBadComment struct {
	ID     int64   `json:"id"`
	Text  string  `json:"text"`
	ReferenceUrl   string  `json:"reference_url"`
	Point int  `json:"point"`
	Image string `db:"image" json:"img"`
}

type BadComment struct {
	ID     int64  `db:"id" json:"id"`
	Text  string `db:"text" json:"text"`
	ReferenceUrl   string `db:"reference_url" json:"reference_url"`
	Point int `db:"point" json:"point"`
	Image string `db:"image" json:"img"`
}