MAKEFLAGS += --silent
#####################################################################

APP_NAME := codehuddle
ECR_REPO := 088935110352.dkr.ecr.us-east-2.amazonaws.com

#####################################################################

APP_PORT := 80
IMAGE_TAG := $(ECR_REPO)/$(APP_NAME):app

ifndef HUDDLE_PUBLISH_USER
	HUDDLE_PUBLISH_USER := $(USER)
endif

#####################################################################

default: build

build:
	docker build . -t $(IMAGE_TAG)

run: build
	docker run -it \
		--publish=4200:$(APP_PORT) \
		$(IMAGE_TAG)

serve:
	ng serve --host=0.0.0.0

deploy:
	$(MAKE) build
	$(MAKE) ecr-push
	$(MAKE) publish

#####################################################################

aws-docker-login:
	aws --profile=$(HUDDLE_AWS_PROFILE) \
		ecr get-login-password --region us-east-2 \
		| docker login --username AWS --password-stdin $(ECR_REPO)

ifndef HUDDLE_AWS_PROFILE
aws-docker-login:
	echo 'missing HUDDLE_AWS_PROFILE'
	false
endif

ifndef HUDDLE_PUBLISH_ID
aws-docker-login:
	echo 'must provide credential file HUDDLE_PUBLISH_ID'
	false
endif

#####################################################################

ecr-push: aws-docker-login
	docker push $(IMAGE_TAG)

publish:
	ssh -i $(HUDDLE_PUBLISH_ID) $(HUDDLE_PUBLISH_USER)@huddle.wryn.cloud \
		-- ./deploy app $(APP_PORT)
