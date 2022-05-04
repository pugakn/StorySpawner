# Storybook Spwaner

This CLI tool lets you auto generate .stories files with a basic template for storybook tests.
Note: It's a work in progress so it has some limitants.

![image](https://user-images.githubusercontent.com/8117939/166837604-6bb663dc-ec07-4091-b7b1-d511b52fef60.png)


# How to use it?

Install globally with

    npm i -g https://github.com/pugakn/StorySpawner

- You need to go to the folder where the .vue components you want to doccument are placed.
- Run `storyspawn --name <component filename> ` to create a .stories for a single file
- Or `storyspawn` to create .stories for all .vue files on the current folder (a prompt will ask if you want to exclude some components)

![image](https://user-images.githubusercontent.com/8117939/166837485-99b4990d-26f0-4d26-99ef-dfb16981af45.png)



# Limitations
- Components need to be individual .vue files
- Currently props are not being automatically added
