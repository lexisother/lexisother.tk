---
title: 'Rewriting my website'
date: '2021-05-05'
tags:
  - 'meta'
---

Ever since the base for a website was set up for me, I hadn't done anything with it. Though, with time, I started growing more of a need to publish my banter somewhere, y'know?

So, I set out to build something that was truly comfortable for me to work with, something I was both already familiar with, but something I could also experiment with.

...though, it wasn't the smoothest ride I've ever been on.

## Nunjucks + 11ty

The first setup I had was made by my boyfriend, who, at the time, used an identical setup for [his website](https://keanucode.ml).

It was, at the time of writing, set up 9 months ago, and was rather simplistic.

It used [Nunjucks](https://mozilla.github.io/nunjucks/) as its templating engine and [Eleventy](https://www.11ty.dev/) as the static site generator. The code for this *historically old* project can be found [here](https://github.com/lexisother/lexisother.tk/tree/9e1c61885a2df7b5c2b92cf1423e9bc5cb0db4c6).

Regardless of his efforts, at the time, I didn't have a use for it.

It looked like this:
![Old Nunjucks site](Keanu-old.png)

## VueJS

My second setup was written by me in [VueJS](https://vuejs.org). I started writing it on the 17th of April 2021. It used [Babel](https://babeljs.io) as the building system.

The result was me building up endless hate for Vue. I despise it. It was not only extremely uncomfortable for me to work with, but also ridiculously lacking in libraries.

Another reason for ditching it was being completely unable to properly implement a blog without a ton of hacky stuff I didn't want to bother doing. Like, merely rendering Markdown correctly was a huge hack job. I rather not have to do 34 hack jobs for one simple feature.

The code for this project can be found [here](https://github.com/NovaGM/lexisother.tk/tree/be5acd103bec0726656e8e5cf86b7a9101725ba8).

It looked like this:
![Old Vue site](vueold.png)

## React

The current setup is written by me in [React](https://reactjs.org).

I started writing it on the 4th of May 2021.

It uses [Gatsby](https://gatsbyjs.com) as the building system, which in turn, uses [Webpack](https://webpack.js.org) for bundling.

This is honestly the most comfortable experience I've had writing a website *by far.*

It's trivial to add new components, dynamically generate content, and hell, even automatically generates typedefs.

There's a system for querying the site for data on-build-time with GraphQL, so, for example:
```graphql
query {
  site {
    siteMetadata {
      siteUrl
      title
      description
    }
  }
}
```
will return:
```JSON
{
  "data": {
    "site": {
      "siteMetadata": {
        "description": "Alyxia Sother (@lexisother) is a software developer.",
        "siteUrl": "https://lexisother.tk",
        "title": "Alyxia Sother"
      }
    }
  }
}
```

and there's a [script](https://github.com/lexisother/lexisother.tk/tree/master/pullExternalData.js) for automatically generating the data used on the [projects](/projects) page.

Another reason why this is so great: I completely understand the codebase, since I'm the one that wrote it.

Previously, I used a template project generated by `vuecli`, and before that, someone else wrote the structure for me.

All in all, switching to React was a huge benefit for me because:
- I'm using a language that I'm familiar with
- I'm using a framework that I'm familiar with
- I'm using a codebase that I wrote

I keep wanting to work on more features for this thing, so I think it was the right decision.

---

Well, that's all there is to say about it.

I'll probably be writing more stuff here over time, so pay attention or use the links below!