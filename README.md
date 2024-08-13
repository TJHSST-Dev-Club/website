# TJHSST Dev Club Website

This is the codebase for the TJHSST Dev Club website.

The website is a Next.js project that uses Typescript and Tailwind. The
components and styling is based on [Shadcn UI](https://ui.shadcn.com/).

This README file goes over a bit about how the code is laid out and should give
some information on how to build onto the code.

# Colors

The colors can be quickly changed in `/app/globals.css`.

The `:root` segment is colors for light mode, while `:dark` is colors for dark
mode.

The colors are in **HSL format, not hex**. You can find hex to HSL converters
online. Enter the values without commas and without the `hsl()` function call
wrapper. Make sure you are entering HSL values, not HSV values.

You can experiment with each line and different colors to see which lines
corresponds to which parts, but usually you would want to edit the background
and foreground (for text colors).

# React and Next.js

This project uses React, a Javascript library used to render UI. You should try
to get an understanding of React before you try to extensively modify the code.
However, if you just want to edit a just a few lines, the syntax should feel
similar to HTML, except that the code is in Typescript/Javascript files.

In addition, this website also uses Next.js. Next.js is a framework, unlike
React, which is just a UI library. This means that it gives extra tools like
compiling, development preview, image optimization, and backend functionality.
However, being a framework, it also adds some constraints to how the code can
look like.

We use Next.js in our project because of the build and development tools it
gives us and also because it works well with the component library we use. Since
our website is static at least for now, we don't use the other functionalities,
such as image optimization and backend functionality.

# Typescript

Typescript (TS) is sort of a variant of Javascript. It is very syntatically
similar to Javascript, but adds stricter typing. This is helpful for reducing
bugs, but also makes the code more rigid and makes development slower.

To justify using TS: TS is the default language used by the component library we
are using, so it is easier to remain consistent and use one language. TS code
can also be less prone to bugs because of its more stricter typing. Finally, our
website is primarily markup, and you likely won't be encountering the heart of
TS in this codebase.

# Shadcn

Shadcn UI is a component library written by [Shadcn](https://shadcn.com/). A
component library is a library that contains prewritten React components as well
as styling. This greatly speeds up development, as we can just reuse code.

Many component libraries exist, but we use Shadcn UI because of its
non-restrictive MIT license and also because it just looks good.

The documentation for Shadcn UI is at https://ui.shadcn.com/.

# Tailwind

Tailwind is a CSS framework. In vanilla CSS, you usually label elements as a
particular class or id, and then add styling in a seperate file for that class
or id. With Tailwind, you are given pre-written classes that you can add to your
elements. This works similarly to inline styling.

For example, instead of labeling a div as id "myDiv" and styling "myDiv" to have
a red background and be a flexbox, you can just add the red background class and
the flexblox class to "myDiv".

Of course, arbitrary values can be used, and more information about extending
Tailwind can be found on its website, https://tailwindcss.com/.

When using Tailwind, you should freqeuntly check the website or a search engine
on how to implement your design with Tailwind.

We use Tailwind because it is convenient, since we don't need to flip between
two files frequently or have to think up new CSS class names. It is also used by
Shadcn UI, so we stay consistent by using Tailwind CSS.

# App directory

Todo

# Images

Todo
