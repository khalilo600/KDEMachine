
# Use the official Ruby image as a base
FROM ruby:3.1.0

# Install Node.js and Yarn
RUN apt-get update -qq && apt-get install -y nodejs yarn

# Set the working directory
WORKDIR /usr/src/app

# Install Bundler
RUN gem install bundler

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the rest of the application code
COPY . .

# Expose the port for the Rails server
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
