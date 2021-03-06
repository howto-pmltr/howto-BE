BEGIN TRANSACTION;

CREATE TABLE `users` (
  `id` integer not null primary key autoincrement,
  `username` text not null,
  `email` text not null,
  `password_hash` text not null,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

CREATE TABLE `articles` (
  `id` integer not null primary key autoincrement,
  `author_username` text not null,
  `title` text not null,
  `image_path` text,
  `description` text,
  `published_at` datetime,
  `likes_count` integer,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

CREATE TABLE `steps` (
  `id` integer not null primary key autoincrement,
  `article_id` integer not null,
  `image_path` text,
  `step_number` integer not null,
  `title` text not null,
  `content` text,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

CREATE TABLE `tags` (
  `id` integer not null primary key autoincrement,
  `title` text not null,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

CREATE TABLE `article_tags` (
  `id` integer not null primary key autoincrement,
  `article_id` integer not null,
  `tag_title` text not null,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

CREATE TABLE `article_ratings` (
  `id` integer not null primary key autoincrement,
  `article_id` integer not null,
  `rating` integer not null,
  `user_username` text,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

COMMIT TRANSACTION;
