.PHONY: help serve build clean install update new-post new-project

help:
	@echo "Available commands:"
	@echo "  make serve       - Run Jekyll server with live reload"
	@echo "  make build       - Build the site"
	@echo "  make clean       - Clean the site"
	@echo "  make install     - Install dependencies"
	@echo "  make update      - Update dependencies"
	@echo "  make new-post    - Create a new blog post"
	@echo "  make new-project - Create a new project"

serve:
	bundle exec jekyll serve --livereload --drafts

build:
	JEKYLL_ENV=production bundle exec jekyll build

clean:
	bundle exec jekyll clean

install:
	bundle install

update:
	bundle update

new-post:
	@read -p "Enter post title: " title; \
	bundle exec jekyll compose "$$title" --draft

new-project:
	@read -p "Enter project name: " name; \
	bundle exec jekyll compose "$$name" --collection "projects"