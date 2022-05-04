# Storybook Spwaner

This CLI tool lets you auto generate .stories files with a basic template for storybook tests.
Note: It's a work in progress so it has some limitants.


# How to use it?

Install globally with

    npm i -g https://github.com/pugakn/StorySpawner

- You need to go to the folder where the .vue components you want to doccument are placed.
- Run `storyspawn --name <component filename> ` to create a .stories for a single file
- Or `storyspawn` to create .stories for all .vue files on the current folder (a prompt will ask if you want to exclude some components)


# Limitations
- Components need to be individual .vue files
- Currently props are not being automatically added