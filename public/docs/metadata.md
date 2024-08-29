---
title: Meta Data
---

Here you can see an overview of meta data types :
``` js
title: string,
show_title?: boolean,
slug: string,
date?: string,
dir?: Direction,
lang?: string,
author?: Author,
authors?: Author[],
image?: string,
spoiler?: string,
keywords?: string,
tags?: string
posts_list: boolean | PostList
```

## Metadata

The term "Metadata" generally refers to the data that provides information about other data. In the context of a blog or website, metadata is often used for SEO purposes and to provide additional context about the content. In the `Config`, the `metadata_base` property is particularly important as it serves as the base URL for generating canonical URLs, Open Graph tags, and other metadata.

### Properties

- **`metadata_base`** (string, required):  
  The base URL used in metadata generation. This should be the root URL of your blog or website, and it is typically used for constructing canonical URLs and other metadata.


## Supporting Types

### `Author`

The `Author` type defines the structure for author information. It can either be a string representing the author's name or an object with more detailed information.

- **`name`** (string, required):  
  The author's name.

- **`url`** (optional, string):  
  A URL to the author's website or profile.

### `Direction`

Defines the text direction for the content.

- **`ltr`**: Left-to-right text direction.
- **`rtl`**: Right-to-left text direction.

### `NavLink`

The `NavLink` type defines the structure for navigation links.

- **`name`** (string, required):  
  The display name of the navigation link.

- **`href`** (string, required):  
  The URL or path that the navigation link points to.

### `PostList`

The `PostList` type defines the configuration for displaying a list of posts.

- **`size`** (optional, "default" | "minimal" | "compact"):  
  The display size of the posts in the list.
  
- **`pagination`** (optional, boolean):  
  Whether to enable pagination for the post list.

- **`posts_per_page`** (optional, number | "all"):  
  The number of posts to display per page. Can be a number or "all" to display all posts on one page.
