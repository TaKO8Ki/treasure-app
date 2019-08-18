export GO111MODULE := on

UID := demo
PORT := 1991
HOST := localhost
TOKEN_FILE := .idToken

ARTICLE_ID:=1
ARTICLE_TITLE:=title
ARTICLE_BODY:=body

ARTICLE_COMMENT_BODY:=bodycomment

create-token:
	go run ./cmd/customtoken/main.go $(UID) $(TOKEN_FILE)

req-articles:
	curl -v $(HOST):$(PORT)/articles

req-bad-comments:
	curl -v $(HOST):$(PORT)/comments

req-random-bad-comments:
	curl -v $(HOST):$(PORT)/random_comments

req-img-pei:
	curl -v $(HOST):$(PORT)/img/pei.png

req-articles-get:
	curl -v $(HOST):$(PORT)/articles/$(ARTICLE_ID)

req-articles-post:
	curl -v -XPOST -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/articles -d '{"title": "$(ARTICLE_TITLE)", "body": "$(ARTICLE_BODY)", "tag_ids": [1, 2]}'

req-bad-comments-post:
	curl -v -XPOST -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/comments -d '{"text": "$(ARTICLE_TITLE)", "reference_url": "$(ARTICLE_BODY)"}'

req-articles-update:
	curl -v -XPUT -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/articles/$(ARTICLE_ID) -d '{"title": "$(ARTICLE_TITLE)", "body": "$(ARTICLE_BODY)"}'

req-bad-comments-update:
	curl -v -XPUT -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/comments/17 -d '{"text": "hoge", "reference_url": "hogehoge", "point": 1}'

req-articles-delete:
	curl -v -XDELETE -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/articles/$(ARTICLE_ID)

req-articles-comment-post:
	curl -v -XPOST -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/articles/$(ARTICLE_ID)/comments -d '{"body": "$(ARTICLE_COMMENT_BODY)"}'

req-public:
	curl -v $(HOST):$(PORT)/public

req-private:
	curl -v -H "Authorization: Bearer $(shell cat ./$(TOKEN_FILE))" $(HOST):$(PORT)/private

database-init:
	make -C ../database init
