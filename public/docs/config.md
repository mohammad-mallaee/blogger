---
title: Config
---

# Configuration Reference

## `Config`

The `Config` type is used to define the overall configuration for a blog or website. It includes various settings that control the appearance, behavior, and metadata of the site.

### Properties

- **`blog_name`** (string, required):  
  The name of the blog or website.

- **`description`** (string, required):  
  A brief description of the blog or website.

- **`author`** (optional, string | [Author](#author)):  
  The main author of the blog or website. This can be a simple string representing the author's name, or an object containing more detailed information.

- **`authors`** (optional, [Author](#author)[]):  
  An array of authors associated with the blog or website. Each item in the array can be either a string or an object containing detailed author information.

- **`theme`** ("light" | "dark" | "auto", required):  
  The default theme of the blog or website.  
  - `light`: The light theme.
  - `dark`: The dark theme.
  - `auto`: Automatically switch theme based on system settings.

- **`direction`** ("ltr" | "rtl", required):  
  The text direction for the blog or website.
  - `ltr`: Left-to-right text direction.
  - `rtl`: Right-to-left text direction.

- **`logo`** (string, required):  
  The URL or path to the logo image of the blog or website.

- **`header`** (object, required):  
  Configuration for the header section of the blog or website.
  - **`logo`** (boolean, required):  
    Whether to display the logo in the header.
  - **`blog_name`** (boolean, required):  
    Whether to display the blog name in the header.
  - **`theme_toggle`** (boolean, required):  
    Whether to include a theme toggle switch in the header.
  - **`nav_links`** (optional, [NavLink](#navlink)[]):  
    An array of navigation links to be included in the header.

- **`content_entry`** (string, required):  
  The entry point or main content directory for the blog or website.

- **`lang`** (string, required):  
  The default language code for the blog or website (e.g., "en", "es").

- **`posts_list`** ([PostList](#postlist), required):  
  Configuration for displaying a list of posts on the blog or website.

- **`metadata_base`** (string, required):  
  The base URL to be used for generating metadata links (e.g., canonical URLs).
