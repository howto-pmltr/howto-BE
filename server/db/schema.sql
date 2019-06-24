BEGIN TRANSACTION;

CREATE TABLE `users` (
  `id` integer not null primary key autoincrement,
  `email` text not null,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

CREATE TABLE `articles` (
  `id` integer not null primary key autoincrement,
  `author_email` text not null,
  `title` text not null,
  `description` text,
  `published_at` datetime,
  `created_at` datetime not null default CURRENT_TIMESTAMP,
  `updated_at` datetime not null default CURRENT_TIMESTAMP
);

CREATE TABLE `steps` (
  `id` integer not null primary key autoincrement,
  `article_id` integer not null,
  `order` integer not null,
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

COMMIT TRANSACTION;
