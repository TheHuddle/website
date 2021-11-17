#####################################################################

APP_NAME   := the-huddle-website
ECR_TARGET := donthaveoneyet

#####################################################################

APP_PORT := 4200
REPO := $(ECR_TARGET)/$(APP_NAME)

#####################################################################

default: build

build:
	docker build . -t $(REPO):local

run: build
	docker run -it \
		--publish=$(APP_PORT):80 \
		$(REPO):local

#####################################################################
