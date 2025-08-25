# tells bundler where to download gems from
source "https://rubygems.org"

# ruby 3.4 compatibility
gem "csv", "~> 3.2"
gem "base64", "~> 0.2.0"
gem "webrick"

# GitHub Pages gem including jekyll and all plugins that Github Pages supports
gem "github-pages", group: :jekyll_plugins

# core jekyll plugins
group :jekyll_plugins do
  gem "jekyll-paginate"      # splits posts across multiple pages
  gem "jekyll-seo-tag"       # auto-generates SEO meta tags (title, description, Open Graph)
  gem "jekyll-feed"          # RSS feed generation
  gem "jekyll-sitemap"       # generates sitemap.xml for search engines to crawl site
  gem "jekyll-gist"          # lets us embed Github Gists with {% gist username/id %}
  gem "jekyll-include-cache" # caches frequently used includes files for faster builds
  gem "jemoji"               # converts :emoji: notation to actual emoji (like GitHub)
end

# dev tools
group :development do
  gem "jekyll-compose"       # adds commands like 'jekyll post "Title"' to create posts easily
  gem "jekyll-admin"         # provides admin interface at localhost:4000/admin
end