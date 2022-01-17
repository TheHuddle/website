MAKEFLAGS += --silent
#####################################################################

APP_NAME := codehuddle
REPO     := thehuddle

#####################################################################

DEV_TAG := thehuddle/website:dev
BUILDER_TAG := $(REPO)/$(APP_NAME):app-builder
IMAGE_TAG := $(REPO)/$(APP_NAME):app

PROJECT_ROOT := $(shell pwd)
PROJECT_BIN  := $(PROJECT_ROOT)/bin

ifdef HUDDLE_AWS_REPOSITORY
REPO := $(HUDDLE_AWS_REPOSITORY)
endif

#####################################################################

default: help

serve: build serve # run local container in angular development mode
.: # ---

build: build-prod # build production container
run:   run        # run production container
.: # ---

help: # print this message
	DIR=$(PROJECT_ROOT) NAME=$(APP_NAME) $(PROJECT_BIN)/help

#####################################################################

build:
	docker build . \
		-f $(PROJECT_ROOT)/docker/Dockerfile.dev \
		-t $(DEV_TAG) \
		--quiet

serve:
	docker run --rm -it \
		--publish=4200:4200 \
		--mount src="$(PROJECT_ROOT)/src",target=/app/src,type=bind \
		$(DEV_TAG) \
		ng serve --host=0.0.0.0

#####################################################################

build-prod:
	docker build . \
		-f $(PROJECT_ROOT)/docker/Dockerfile \
		-t $(IMAGE_TAG) \
		--quiet

run:
	docker run -it \
		--publish=4200:80 \
		$(IMAGE_TAG)

#####################################################################

ecr-push: aws-docker-login
	docker push $(IMAGE_TAG)

ecr-pull: aws-docker-login
	docker pull $(IMAGE_TAG)

ifndef HUDDLE_AWS_PROFILE
aws-docker-login:
	echo 'missing HUDDLE_AWS_PROFILE'
	false
else
aws-docker-login:
	aws --profile=$(HUDDLE_AWS_PROFILE) \
		ecr get-login-password --region us-east-2 \
		| docker login --username AWS --password-stdin $(REPO)
endif
