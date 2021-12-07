#####################################################################

APP_NAME := codehuddle
ECR_REPO := 088935110352.dkr.ecr.us-east-2.amazonaws.com

#####################################################################

APP_PORT := 80

DEV_TAG := thehuddle/website:dev
BUILDER_TAG := $(ECR_REPO)/$(APP_NAME):app-builder
IMAGE_TAG := $(ECR_REPO)/$(APP_NAME):app

PROJECT_ROOT := $(shell pwd)
PROJECT_BIN  := $(PROJECT_ROOT)/bin

ifndef HUDDLE_PUBLISH_USER
	HUDDLE_PUBLISH_USER := $(USER)
endif

#####################################################################

MAKEFLAGS += --silent

#####################################################################

default: help

serve: # run local container in angular development mode
.: # ---

build: # build production container
run:   # run production container
.: # ---


.: # 
help: # print this message
	DIR=$(PROJECT_ROOT) NAME=$(APP_NAME) $(PROJECT_BIN)/help

#####################################################################

serve: dev-build dev-run
build: prod-build
run:   build prod-run

#####################################################################

dev-build:
	docker build . \
		-f $(PROJECT_ROOT)/docker/Dockerfile.dev \
		-t $(DEV_TAG) \
		--quiet

dev-run:
	docker run --rm -it \
		--publish=4200:4200 \
		--mount src="$(PROJECT_ROOT)",target=/app,type=bind \
		$(DEV_TAG) \
		ng serve --host=0.0.0.0

prod-build:
	docker build . -f $(PROJECT_ROOT)/docker/Dockerfile -t $(IMAGE_TAG)

prod-run: prod-build
	docker run -it \
		--publish=4200:$(APP_PORT) \
		$(IMAGE_TAG)

#####################################################################

deploy:
	$(MAKE) build-prod
	$(MAKE) ecr-push
	$(MAKE) publish

publish:
	ssh -i $(HUDDLE_PUBLISH_ID) $(HUDDLE_PUBLISH_USER)@huddle.wryn.cloud \
		-- ./deploy app $(APP_PORT)

#####################################################################

ecr-push: aws-docker-login
	docker push $(IMAGE_TAG)

aws-docker-login: %aws-docker-login
%aws-docker-login:
	aws --profile=$(HUDDLE_AWS_PROFILE) \
		ecr get-login-password --region us-east-2 \
		| docker login --username AWS --password-stdin $(ECR_REPO)

ifndef HUDDLE_AWS_PROFILE
%aws-docker-login:
	echo 'missing HUDDLE_AWS_PROFILE'
	false
endif

ifndef HUDDLE_PUBLISH_ID
%aws-docker-login:
	echo 'must provide credential file HUDDLE_PUBLISH_ID'
	false
endif
