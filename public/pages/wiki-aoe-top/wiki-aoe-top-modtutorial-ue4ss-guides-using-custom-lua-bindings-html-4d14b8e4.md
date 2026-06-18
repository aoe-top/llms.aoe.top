# Using Custom Lua Bindings | 小莫的维基库

Source: https://wiki.aoe.top/ModTutorial/UE4SS/guides/using-custom-lua-bindings.html
Friendly site: 小莫Wiki
Group: AOE.TOP
Fetched: 2026-06-18T02:26:57.859Z
Status: 200
Content-Type: text/html; charset=utf-8
Content-Status: captured

Description: 小莫的wiki库,记录一些有用的合集

## Content

# Using Custom Lua Bindings ​

To make development of Lua mods easier, we've added the ability to dump custom Lua bindings from your game. We also have a shared types file that contains default UE types and the API functions/classes/objects that are available to you.

## Dumping Custom Lua Bindings ​

Simply open the Dumpers tab in the GUI console window and hit the "Dump Lua Bindings" button.

The generator will place the files into the Mods/shared/types folder.

Warning: Do not include any of the generated files in your Lua scripts. If they are included, any globals set by UE4SS will be overridden and things will break.

## To Use Bindings ​

I recommend using Visual Studio Code to do your Lua development. You can install the extension just called "Lua" by sumneko.

Open the Mods folder as a workspace. You can also save this workspace so you don't have to do this every time you open VS Code.

When developing your Lua mods, the language server should automatically parse all the types files and give you intellisense.

Warning: For many games the number of types is so large that the language server will fail to parse everything. In this case, you can add a file called .luarc.json into the root of your workspace and add the following:

json
{
" $schema " : " https://raw.githubusercontent.com/sumneko/vscode-lua/master/setting/schema.json " ,
" workspace.maxPreload " : 50000 ,
" workspace.preloadFileSize " : 5000
}

1
2
3
4
5

### How to use your mod's directory as workspace ​

As alternative you can open just your mod's root directory as workspace.
In this case you need to add a .luarc.json with "workspace.library" entries containing a path to the "shared" folder and the "Scripts" directory of your mod.
Both paths can be relative.
Example .luarc.json:

json
{
" $schema " : " https://raw.githubusercontent.com/sumneko/vscode-lua/master/setting/schema.json " ,
" workspace.maxPreload " : 50000 ,
" workspace.preloadFileSize " : 5000 ,
" workspace.library " : [ " ../shared " , " Scripts " ]
}

1
2
3
4
5
6

## Annotating ​

To get context sensitive information about the custom game types, you need to annotate your code ( alternative documentation ). This is done by adding a comment above the function/class/object that you want to annotate.

## Example ​

lua
--- @class ITM_MisSel_Biome_C
local biome = FindFirstOf ( " ITM_MisSel_Biome_C " )

--- @type int
local numMissions = biome. NumMissions

--- @type FVector
local soundCoords = { 420.5 , 69.0 , 3.1 }
biome : SetSoundCoordinate (soundCoords)

1
2
3
4
5
6
7
8
9
